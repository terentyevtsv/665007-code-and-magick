/* eslint strict: ['error', 'global']*/
'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var WIZARD_FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SECONDNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var randomIndex = function (minIndex, maxIndex) {
  return Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
};

var similarWizards = [];
var i = 0;
for (i; i < 4; i++) {
  similarWizards.push({
    firstname: WIZARD_FIRSTNAMES[randomIndex(0, 7)],
    secondname: WIZARD_SECONDNAMES[randomIndex(0, 7)],
    coatColor: COAT_COLOR[randomIndex(0, 5)],
    eyesColor: EYES_COLOR[randomIndex(0, 4)]
  });
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.firstname + ' ' + wizard.secondname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
var j = 0;
for (j; j < similarWizards.length; j++) {
  fragment.appendChild(renderWizard(similarWizards[j]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
