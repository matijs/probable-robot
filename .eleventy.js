const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');
const {
  humanReadableDate,
  toRFC2822,
  toISO,
  toISODate,
} = require('./src/utils/date.js');

module.exports = (config) => {
  config.setLibrary(
    'md',
    markdownIt({
      html: true,
      linkify: false,
    }).use(markdownItFootnote)
  );
  config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'), {
    preAttributes: { tabindex: 0 },
  });
  config.addPassthroughCopy('src/site/robots.txt');
  config.addWatchTarget('src/utils');

  config.addNunjucksFilter('humanReadableDate', humanReadableDate);
  config.addNunjucksFilter('toISODate', toISODate);
  config.addNunjucksFilter('toISO', toISO);
  config.addNunjucksFilter('toRFC2822', toRFC2822);

  return {
    dir: {
      input: 'src/site',
      output: 'public',
    },
  };
};
