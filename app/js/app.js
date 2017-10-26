// Made by Dmitry Glinskiy, contact me at glinskiy.net

// Global variables
// Patient general
var ageYears = 0;
var ageMonths = 0;
var ageConverted = null;
var genderSelected = null;

// Patient Table 1
var heightStanding = null;
var heightStandingMeters = null;
var heightSitting = null;
var patientWeight = null;
var patientBMI = null;
var waistLength = null;
var hipsLength = null;
var patientWHR = null;
var chestExcursion = null;
var legLengthDifferenceRelative = null;
var legLengthDifferenceAbsolute = null;

// Patient Table 2


// Helper functions
function range(x, min, max) {
  return x >= min && x <= max;
};

function getSumm(a,b) {
  return a + b;
};

//=========================================
// Калькуляторы параметров пациента
//=========================================
function setAgeConverted (a,b) {
  ageConverted = ageYears * 12 + ageMonths;
  $('.age-converted').html(ageConverted);
};

function calculateBMI () {
  patientBMI = patientWeight / (heightStandingMeters * heightStandingMeters);
  $('#body-mass-index').val(patientBMI);
};

function calculateWHR () {
  patientWHR = waistLength / hipsLength;
  $('#waist-hip-ratio').val(patientWHR.toFixed(2));
};

//=========================================
// Основные реакции на изменения полей
//=========================================
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

  // Считаем Body Mass Index (BMI)
  $('#patient-weight').on('change', function() {
    patientWeight = parseInt(this.value);
    patientWeight && heightStanding && calculateBMI();
  });

  $('#height-standing').on('change', function() {
    heightStanding = parseInt(this.value);
    heightStandingMeters = heightStanding / 100;
    patientWeight && heightStanding && calculateBMI();
  });

  // Считаем Waist-Hip-Ratio (WHR)
  $('#waist-length').on('change', function() {
    waistLength = parseInt(this.value);
    waistLength && hipsLength && calculateWHR();
  });

  $('#hips-length').on('change', function() {
    hipsLength = parseInt(this.value);
    waistLength && hipsLength && calculateWHR();
  });

});
