// Made by Dmitry Glinskiy, contact me at glinskiy.net

function range(x, min, max) {
  return x >= min && x <= max;
};

function getSumm(a,b) {
  return a + b;
};

// Global variables
var ageYears = 0;
var ageMonths = 0;
var ageConverted = null;
var genderSelected = null;

function setAgeConverted (a,b) {
  ageConverted = ageYears * 12 + ageMonths;
  $('.age-converted').html(ageConverted);
};


$(document).ready(function(){
  // Кнопки для скрытия элементов
  $('.element-remover').click(function(){
    var removeTarget = $(this).attr('id');
    $('.is-' + removeTarget).hide();
  });

  // Копирование полей пациента на другие страницы
  $('.copied-field').on('change', function() {
    var copyTarget = $(this).attr('id');
    $('.' + copyTarget + '-copy').html(this.value);
  });

  // Реагируем на смену возраста
  $('#patient-age-years').on('change', function() {
    ageYears = parseInt(this.value);
    ageMonths = parseInt($('#patient-age-months').val());
    setAgeConverted (ageYears, ageMonths);
  });

  // Реагируем на смену возраста
  $('#patient-age-months').on('change', function() {
    ageMonths = parseInt(this.value);
    ageYears = parseInt($('#patient-age-years').val());
    setAgeConverted (ageYears, ageMonths);
  });

  // Реагируем на смену пола
  $('#patient-gender').on('change', function() {
    genderSelected = $('#patient-gender').val();
    if (genderSelected == 'male') {
      genderSelectedRus = 'Мужской';
    } else if (genderSelected == 'female') {
      genderSelectedRus = 'Женский';
    } else {
      genderSelectedRus = 'Ошибочка!';
    }
    $('.patient-gender-copy').html(genderSelectedRus);
  });

});
