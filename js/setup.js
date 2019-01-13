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

// module4-task1
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

(function () {
  // для смены цвета по клику нужно обозначить скрытые DOM элементы формы ввода .wizard-coat, .wizard-eyes, .setup-fireball-wrap
  var inputWizardCoat = document.querySelector('input[name=coat-color]');
  var inputWizardEyes = document.querySelector('input[name=eyes-color]');
  var inputWizardFireball = document.querySelector('input[name=fireball-color]');

  // для смены цвета по клику находим DOM элементы по классу
  var wizardCoatElement = document.querySelector('.wizard-coat');
  var wizardEyesElement = document.querySelector('.wizard-eyes');
  var wizardFireballElement = document.querySelector('.setup-fireball-wrap');
    
  var wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    },
    onFireballChange: function (color) {
      return color;
    }
  };
    
  wizardCoatElement.addEventListener('click', function () {
    var newColor = window.util.getRandomNum(COAT_COLOR);
    inputWizardCoat.value = newColor;
    wizardCoatElement.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var newColor = window.util.getRandomNum(EYES_COLOR);
    inputWizardEyes.style.fill = newColor;
    wizardEyesElement.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });
    
  wizardFireballElement.addEventListener('click', function () {
    var newColor = window.util.getRandomNum(FIREBALL_COLOR);
    inputWizardFireball.style.background = newColor;
    wizardFireballElement.style.background = newColor;
    wizard.onFireballChange(newColor);
  });
})();

window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNum: function (array) {
      var index = Math.floor(Math.random() * array.length);
      return array[index];
    },
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    FIREBALL_COLOR: FIREBALL_COLOR,
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR
  };
    
// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
