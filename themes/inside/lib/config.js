const cheerio = require('cheerio');
const gravatar = require('hexo/lib/plugins/helper/gravatar');
const urlFor = require('hexo/lib/plugins/helper/url_for');
const utils = require('./utils');
const pkg = require('../package.json');
const configSchema = require('./configSchema.json');
const resources = require('../source/_resources.json');
const external_regex = /^(\w+:)?\/\/\w+\.\w+/;

module.exports = function (hexo) {
  hexo.on('generateBefore', function () {
    const site = hexo.config;
    const theme = hexo.theme.config;
    const email = theme.profile && theme.profile.email || site.email || '';
    const feed = site.feed ? urlFor.call(this, site.feed.path) : '';
    const result = utils.parseConfig(configSchema, theme, {
      $email: email,
      $feed: feed,
      $copyright: `&copy; ${new Date().getFullYear()} • <a href="${site.url}">${site.author}</a>`,
      $gravatar: gravatar(email, 160),
      $title: site.title,
      $description: site.description
    });
    const urlFn = result.static_prefix ?
      a => external_regex.test(a) ? a : `${result.static_prefix}/${a}` :
      urlFor.bind(this);

    site.language = utils.localeId(site.language);
    const __ = this.theme.i18n.__(site.language);

    if (!result.data_prefix) result.data_prefix = result.data_dir;

    // attach disqus script
    if (result.comments && result.comments.disqus) {
      const disqus = result.comments.disqus;
      disqus.script = disqus.script || `//${disqus.shortname}.disqus.com/embed.js`;
      delete disqus.shortname;
    }

    if (result.sns) {
      const sns = [];
      if (result.sns.email !== undefined) result.sns.email = 'mailto:' + (result.sns.email || email);
      if (result.sns.feed !== undefined) result.sns.feed = result.sns.feed || feed;
      for (let key in result.sns) {
        if (result.sns[key]) sns.push([utils.escapeIdentifier(key), result.sns[key]]);
      }
      result.sns = sns;
    }

    result.plugins = [
      // plugins comes first to ensure that their libs is ready when executing dynamic code.
      ...(result.plugins || []),
      ...resources.styles,
      ...resources.scripts,
      resources.locales[site.language]
    ];

    if (theme.appearance.font && theme.appearance.font.url)
      result.plugins.unshift({ tag: 'link', href: theme.appearance.font.url });

    {
      const plugins = { $t: [] };
      const scripts = [];
      const styles = [];
      let minify;
      try {
        const htmlMinify = require('html-minifier').minify;
        minify = html => htmlMinify(html, {
          minifyCSS: true,
          collapseWhitespace: true,
          removeEmptyAttributes: true,
          removeComments: true
        });
      } catch (e) {
        minify = o => o;
      }
      result.plugins.forEach(plugin => {
        // Tags
        if (typeof plugin === 'string' || plugin.tag) {
          // Direct with url
          if (!plugin.tag) {
            const tag = plugin.split('?')[0].endsWith('.css') ? 'link' : 'script';
            plugin = tag === 'link' ? { tag, href: plugin } : { tag, src: plugin }
          }
          if (plugin.src) plugin.src = urlFn(plugin.src);
          if (plugin.href) plugin.href = urlFn(plugin.href);

          (plugin.tag === 'script' ? scripts : styles).push(utils.tag(plugin));
        }

        /**
         * Positioned plugins
         * convert into the following format
         * {
         *   $t: ['0', '1', '2', '3'],
         *   sidebar: [indexes],
         *   post: [indexes],
         *   page: [indexes],
         *   comments: [indexes]
         * }
         */
        else {
          const $ = cheerio.load(plugin.template, { decodeEntities: false });
          const index = plugins.$t.length;

          $.root().children('script').each(function () {
            const $script = $(this),
              html = $script.html();

            if (html) $script.replaceWith(utils.snippet(html));
          });
          plugins.$t.push(minify($.html()));

          (Array.isArray(plugin.position) ? plugin.position : [plugin.position])
            .forEach(p => (plugins[p] || (plugins[p] = [])).push(index));
        }
      });

      result.plugins = plugins;
      result.styles = styles.join('\n');
      result.scripts = scripts.join('\n');
    }

    // override boolean value to html string
    if (result.footer.powered) result.footer.powered = __('footer.powered', '<a href="https://hexo.io" target="_blank" rel="external nofollow noopener">Hexo</a>')
    if (result.footer.theme) result.footer.theme = __('footer.theme') + ' - <a href="https://github.com/ike-c/hexo-theme-inside" target="_blank" rel="external nofollow noopener">Inside</a>'

    result.runtime = {
      hash: utils.md5([
        ...hexo.locals.getters.pages().sort('-date').toArray(),
        ...hexo.locals.getters.posts().sort('-date').toArray()
      ].filter(utils.published).map(i => i.updated.toJSON()).join('')
        + JSON.stringify(result)
        + pkg.version
        , 6)
    };

    hexo.theme.config = result;
  });
}
