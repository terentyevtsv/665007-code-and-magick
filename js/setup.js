var ESCAPE = 27;
var ENTER = 13;

var setupOpen = document.querySelector(".setup-open");
var setup = document.querySelector(".setup");
var setupClose = setup.querySelector(".setup-close");
setupOpen.addEventListener("click", function() {
  setup.classList.remove("hidden");
});

setupClose.addEventListener("click", function() {
  setup.classList.add("hidden");
});

var documentKeydownHandler = function(evt) {
  setup.removeEventListener("keydown", setupKeydownHandler);
  if (evt.keyCode === ENTER)
    setup.classList.remove("hidden");
  if (evt.keyCode === ESCAPE)
  {
    if (evt.target.className !== "setup-user-name")
      setup.classList.add("hidden");
  }
};

var setupKeydownHandler = function(evt) {
  document.removeEventListener("keydown", documentKeydownHandler);
  if (evt.keyCode === ENTER)
    setup.classList.add("hidden");
};

setupClose.addEventListener("focus", function() {
  setup.addEventListener("keydown", setupKeydownHandler);
});

var setupOpenIcon = setupOpen.querySelector(".setup-open-icon");
setupOpenIcon.addEventListener("focus", function() {
  document.addEventListener("keydown", documentKeydownHandler);
});

var setupSimilar = document.querySelector(".setup-similar");
setupSimilar.classList.remove("hidden");

var template = document.querySelector("#similar-wizard-template")
  .content;

var setupSimilarList = document.querySelector(".setup-similar-list");

var firstNames = [  "Иван", "Хуан Себастьян",
                    "Мария", "Кристоф", "Виктор",
                    "Юлия", "Люпита", "Вашингтон"];

var lastNames = [ "да Марья", "Верон", "Мирабелла",
                  "Вальц", "Онопко", "Топольницкая",
                  "Нионго", "Ирвинг"];

var coatColors = ["rgb(101, 137, 164)", "rgb(241, 43, 107)", "rgb(146, 100, 161)",
                  "rgb(56, 159, 117)", "rgb(215, 210, 55)", "rgb(0, 0, 0)"];

var eyesColors = ["black", "red", "blue", "yellow", "green"];

var getRandomNumber = function(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);

  return rand;
}

// Функция генерации 4-х волшебников
var getWizards = function() {
  var wizards = [];

  for (var i = 0; i < 4; ++i) {
    var nameIndex = getRandomNumber(0, firstNames.length - 1);
    var surnameIndex = getRandomNumber(0, lastNames.length - 1);
    var coatColorsIndex = getRandomNumber(0, coatColors.length - 1);
    var eyesColorsIndex = getRandomNumber(0, eyesColors.length - 1);

    var wizard = {
      name: firstNames[nameIndex] + " " + lastNames[surnameIndex],
      coatColor: coatColors[coatColorsIndex],
      eyesColor: eyesColors[eyesColorsIndex]
    };

    wizards.push(wizard);
  }

  return wizards;
}

// Функция заполнения нового элемента из шаблона данными из JS объекта
var createWizard = function(wizard, wizardInfo) {
  var namePlace = wizard.querySelector(".setup-similar-label");
  var coatColorPlace = wizard.querySelector(".wizard-coat");
  var eyesColorPlace = wizard.querySelector(".wizard-eyes");

  namePlace.textContent = wizardInfo.name;
  coatColorPlace.style.fill = wizardInfo.coatColor;
  eyesColorPlace.style.fill = wizardInfo.eyesColor;
}

// Функция заполнения блока DOM-элементами на основе массива JS-объектов
var createWizards = function() {
  var wizardInfoItems = getWizards();

  for (var i = 0; i < wizardInfoItems.length; ++i) {
    var element = template.cloneNode(true);
    createWizard(element, wizardInfoItems[i]);

    setupSimilarList.appendChild(element);
  }
}

createWizards();
