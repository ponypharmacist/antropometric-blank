// Made by Dmitry Glinskiy, contact me at glinskiy.net

// Global variables
// NEW! Patient object
var patient = {
  // Личные данные пациента
  "fullName" : "",
  "idNumber" : "",
  "gender" : "",
  "ageYears" : "",
  "ageMonths" : "",
  "ageConverted" : "", // возраст пациента, выраженный месяцах
  "diagnosisMKB" : ""

  // Таблица 1. Антропометрические показатели
}

// Patient Table 1
var heightStanding = null;
var heightStandingMeters = null;
var heightSitting = null;
var patientWeight = null;
var patientBMI = null;
var waistLength = null; // не печатается
var hipsLength = null; // не печатается
var patientWHR = null;
var chestExcursion = null;
var legLengthDifferenceRelative = null;
var legLengthDifferenceAbsolute = null;


//=========================================
// Helper functions
//=========================================
function rangeShort(x, min, max) {
  return x >= min && x < max;
};

function getSumm(a,b) {
  return a + b;
};

//=========================================
// Калькуляторы параметров пациента
// для которых есть простые формулы
//=========================================
function setAgeConverted (ageYears, ageMonths) {
  patient.ageConverted = ageYears * 12 + ageMonths;
};

function calculateBMI () {
  patientBMI = patientWeight / (heightStandingMeters * heightStandingMeters);
  $('#body-mass-index').val(patientBMI.toFixed(2));
};

function calculateWHR () {
  patientWHR = waistLength / hipsLength;
  $('#waist-hip-ratio').val(patientWHR.toFixed(2));
};

//=========================================
// Выставляем референсные значения
//=========================================
function fillReferenceValues() {
  fillReferenceInterval('height', ageRangeTableHeight);
  fillReferenceInterval('weight', ageRangeTableHeight);
  fillReferenceInterval('bmi', ageRangeTableBMI);
  fillReferenceWHR();
}

//=========================================
// Основные реакции на изменения полей
//=========================================
$(document).ready(function(){
  // Кнопки для скрытия элементов
  $('.element-remover').click(function(){
    var removeTarget = $(this).attr('id');
    $('.is-' + removeTarget).hide();
  });

  // Обновление объекта пациента
  $('.update-object').on('change', function() {
    let updatedParameter = $(this).attr('id');
    let updatedParameterValue = $(this).val();
    console.log('Updated "' + updatedParameter + '" with: ' + updatedParameterValue);
    patient[updatedParameter] = updatedParameterValue;
  });


  // Копирование полей пациента на другие страницы
  $('.copied-field').on('change', function() {
    var copyTarget = $(this).attr('id');
    $('.' + copyTarget + '-copy').html(this.value);
  });

  // Реагируем на смену возраста
  $('#ageYears').on('change', function() {
    patient.ageYears = parseInt(this.value);
    patient.ageMonths = parseInt($('#ageMonths').val());
    setAgeConverted (patient.ageYears, patient.ageMonths);

    patient.gender && patient.ageConverted && fillReferenceValues();
  });

  // Реагируем на смену возраста
  $('#ageMonths').on('change', function() {
    patient.ageMonths = parseInt(this.value);
    patient.ageYears = parseInt($('#ageYears').val());
    setAgeConverted (patient.ageYears, patient.ageMonths);

    patient.gender && patient.ageConverted && fillReferenceValues();
  });

  // Реагируем на смену пола
  $('#gender').on('change', function() {
    patient.gender = $('#gender').val();
    if (patient.gender == 'male') {
      genderSelectedRus = 'Мужской';
    } else if (patient.gender == 'female') {
      genderSelectedRus = 'Женский';
    } else {
      genderSelectedRus = 'Ошибочка, не выбран пол!';
    }
    $('.gender-copy').html(genderSelectedRus);

    patient.gender && patient.ageConverted && fillReferenceValues();
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

  // Считаем % от массы тела для жира, костей и активной клеточной массы
  $('.calculate-percentage').on('change', function() {
    let targetCell = $(this).attr('id');
    let calculatedPercentage = (parseInt(this.value) / patientWeight * 100).toFixed(1) + '%';
    $('#percentage-' + targetCell).val(calculatedPercentage);
  });

});


// Debug area stuff
$(document).ready(function(){
  // Кнопка для вывода объекта по строчкам в текстовый бокс
  $('#show-patient-object').click(function(){
    for (const prop in patient) {
      console.log(`patient.${prop} = ${patient[prop]}`);
      $('#debug-textarea').val($('#debug-textarea').val() + `patient.${prop} = ${patient[prop]}` + '\n');
    }
  });
});
