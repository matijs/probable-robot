const { DateTime } = require('luxon');

module.exports = {
  humanReadableDate: (value) =>
    DateTime.fromJSDate(value, { zone: 'utc' }).toFormat('d LLLL y'),
  isoDate: (value) => DateTime.fromJSDate(value, { zone: 'utc' }).toISODate(),
};
