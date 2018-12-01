/* eslint strict: ['error', 'global']*/
'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_GAP = 20;
var FONT_GAP = 20;
var GIST_GAP = 30;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var barHeight = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  var i = 0;
  for (i; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP + TEXT_GAP, CLOUD_Y + GAP + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + TEXT_GAP, CLOUD_Y + GAP + FONT_GAP + TEXT_GAP);

  var maxTime = getMaxElement(times);
  var i = 0;
  for (i; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + GIST_GAP + (BAR_GAP + BAR_WIDTH) * i, 200 - ((barHeight * times[i]) / maxTime) + TEXT_GAP + GAP);
    ctx.fillText(names[i], CLOUD_X + GAP + GIST_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgb(0, 0, 255,' + Math.random() + ')';
    }
    ctx.fillRect(CLOUD_X + GAP + GIST_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GIST_GAP, BAR_WIDTH, (-barHeight * times[i]) / maxTime);
  }
};
