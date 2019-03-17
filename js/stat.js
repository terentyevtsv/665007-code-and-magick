var CLOUD_X = 100;
var CLOUD_Y = 10;
var HEIGHT = 270;
var WIDTH = 420;
var DELTA = 100;
var FONT_OPTIONS = "16px PT Mono";

var DIAGRAM_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_DISTANCE = 50;

var getMaxResult = function(times) {
  var maxTime = times[0];

  // Поиск максимального времени
  for (var i = 0; i < times.length; ++i) {
    if (times[i] > maxTime)
      maxTime = times[i];
  }

  return maxTime;
}

var drawDiagram = function(times, names, startX, topY, ctx) {
  var maxTime = getMaxResult(times);

  // Рисование диаграммы
  var currentX = startX;
  for (var i = 0; i < times.length; ++i) {
    drawBlock(currentX, topY, times[i], names[i], maxTime, ctx, "");
    currentX += (COLUMN_WIDTH + COLUMN_DISTANCE);
  }
}

var drawBlock = function(x, y, time, name, maxTime, ctx, fColor) {
  // Рисование одного блока диаграммы

  // Высота текущего блока в пикселях
  var blockHeight = DIAGRAM_HEIGHT * time / maxTime;

  // Расстояние от вершины диаграммы до верхней части текущего блока
  var topDistance = y + (DIAGRAM_HEIGHT - blockHeight);
  var maxDistance = y + DIAGRAM_HEIGHT + 10;

  //ctx.fillStyle = fColor;
  ctx.fillRect(x, topDistance, COLUMN_WIDTH, blockHeight);

  ctx.fillText(time.toString(), x, topDistance - 10);
  ctx.fillText(name, x, maxDistance);
}

var drawCloud = function(ctx, offset, cloudColor) {
  ctx.fillStyle = cloudColor;
  //ctx.fillRect(CLOUD_X, CLOUD_Y, WIDTH, HEIGHT);

  var xOffset = CLOUD_X + offset;
  var yOffset = CLOUD_Y + offset;

  ctx.beginPath();
  ctx.moveTo(xOffset, yOffset);
  ctx.lineTo(xOffset + WIDTH, yOffset);
  ctx.lineTo(xOffset + WIDTH + DELTA, yOffset + HEIGHT);
  ctx.lineTo(xOffset + DELTA, yOffset + HEIGHT);
  ctx.lineTo(xOffset, yOffset);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

var writeText = function(ctx, topX, topY, text) {
  ctx.font = FONT_OPTIONS;
  ctx.textBaseline = "hanging";
  ctx.fillStyle = "black";

  ctx.fillText(text, topX, topY);
}

var renderStatistics = function(ctx, names, times) {
  drawCloud(ctx, 10, "RGBA(0, 0, 0, 0.7)");
  drawCloud(ctx, 0, "#FFFFFF");

  var textX = CLOUD_X + DELTA;
  var textY = CLOUD_Y + 5;
  writeText(ctx, textX, textY, "Ура вы победили!");

  textY += 15;
  writeText(ctx, textX, textY, "Список результатов:");

  drawDiagram(times, names, textX, textY + 15, ctx);
}

