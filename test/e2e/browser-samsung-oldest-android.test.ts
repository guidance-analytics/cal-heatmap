// @ts-ignore
import Runner from './Runner';

Runner(
  'Android / Samsung Internet Oldest',
  'https://cal-heatmap.com/tests/index-d3v7-umd.html',
  {
    'bstack:options': {
      osVersion: '7.0',
      deviceName: 'Samsung Galaxy S8',
    },
    browserName: 'samsung',
  },
);