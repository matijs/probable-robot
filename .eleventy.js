const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { humanReadableDate, isoDate } = require('./src/utils/date.js');

module.exports = (config) => {
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy('src/site/css/styles.css');
  config.addPassthroughCopy('src/site/robots.txt');
  config.addWatchTarget('src/utils');

  config.addNunjucksFilter('humanReadableDate', humanReadableDate);
  config.addNunjucksFilter('isoDate', isoDate);

  return {
    dir: {
      input: 'src/site',
      output: 'public',
    },
  };
};
