const { DateTime } = require('luxon');

module.exports = {
  humanReadableDate: (value) =>
    DateTime.fromJSDate(value, { zone: 'utc' }).toFormat('d LLLL y'),
  toISODate: (value) => DateTime.fromJSDate(value, { zone: 'utc' }).toISODate(),
  toISO: (value) => DateTime.fromJSDate(value, { zone: 'utc' }).toISO(),
  toRFC2822: (value) => DateTime.fromJSDate(value, { zone: 'utc' }).toRFC2822(),
};
