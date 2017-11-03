//=========================================
// Made by Dmitry Glinskiy,
// contact me at glinskiy.net
//=========================================
// Patient object
//=========================================
var patient = {
}

//=========================================
// Helper functions
//=========================================
function rangeShort(x, min, max) {
  return x >= min && x < max;
};

//=========================================
// Калькуляторы параметров пациента
// для которых есть простые формулы
//=========================================
// Body Mass Index / индекс массы тела
function calculateBMI () {
  patient.bmi = (patient.weight / (patient.height * patient.height / 10000)).toFixed(2);
  $('#bmi').val(patient.bmi);
};

// Waist-Hip-Ratio / соотношение талия-бедра
function calculateWHR () {
  patient.whr = (patient.waistLength / patient.hipLength).toFixed(2);
  $('#whr').val(patient.whr);
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
// Вспоминаем рассчеты при импорте пациента
//=========================================
function recalculatePercentage() {
  let percentageInputs = ['massFat', 'massLean', 'massSkeletalMuscle', 'massActiveCellular'];
  percentageInputs.forEach(function(field, i, percentageInputs) {
    if ( patient[field] >= 0 ) {
      let calculatedPercentage = (parseFloat($('#' + field).val()) / patient.weight * 100).toFixed(1) + '%';
      $('#percentage-' + field).val(calculatedPercentage);
    } else {
      // если нет данных в поле
    };
  });
};

//=========================================
// Вспоминаем копируемые поля при импорте пациента
//=========================================
function refillCopiedFields() {
  let copiedInputs = ['fullName','idNumber','gender','ageYears','ageMonths','diagnosisMKB'];
  copiedInputs.forEach(function(field, i, copiedInputs) {
    let copiedString = $('#' + field).val();
    $('.' + field + '-copy').html(copiedString);
  });
  pasteRussianGender();
};

// Вставляет русское название пола, на основе value выбранного пола в селекте
function pasteRussianGender() {
  if (patient.gender == 'male') {
    genderSelectedRus = 'Мужской';
  } else if (patient.gender == 'female') {
    genderSelectedRus = 'Женский';
  } else {
    genderSelectedRus = 'Ошибочка, не выбран пол!';
  }
  $('.gender-copy').html(genderSelectedRus);
};

//=========================================
// Вспоминаем подписи при импорте пациента
//=========================================
function refillSignatures() {
  let signatureInputs = ['doctorA', 'doctorB', 'doctorC'];
  signatureInputs.forEach(function(field, i, signatureInputs) {
    let selectedDoctor = $('#' + field).val();
    $("#signature-" + field).attr('class', selectedDoctor);
  });
};

//=========================================
// Вспоминаем процентили при импорте пациента
//=========================================
function refillPercentiles() {
  let percentileParameters = [
    ['handStrengthLeft','PhysicalAttributes'],
    ['handStrengthRight','PhysicalAttributes'],
    ['legStrengthLeft','PhysicalAttributes'],
    ['legStrengthRight','PhysicalAttributes'],
    ['backStrength','PhysicalAttributes'],
    ['abdominalPress','PhysicalAttributes'],
    ['spineFlexibility','PhysicalAttributes']
  ];
  percentileParameters.forEach(function(pair, i, percentileParameters) {
    if ( patient[pair[0]] >= 0 ) {
      console.log(patient[pair[0]]);
      fillPercentile(pair[0],pair[1]);
    } else {
      // если нет параметра
    }
  });
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
    patient.ageConverted = patient.ageYears * 12 + patient.ageMonths;

    patient.gender && patient.ageConverted && fillReferenceValues();
  });

  // Реагируем на смену возраста
  $('#ageMonths').on('change', function() {
    patient.ageMonths = parseInt(this.value);
    patient.ageYears = parseInt($('#ageYears').val());
    patient.ageConverted = patient.ageYears * 12 + patient.ageMonths;

    patient.gender && patient.ageConverted && fillReferenceValues();
  });

  // Реагируем на смену пола
  $('#gender').on('change', function() {
    patient.gender = $('#gender').val();
    pasteRussianGender();
    patient.gender && patient.ageConverted && fillReferenceValues();
  });


  // Считаем Body Mass Index (BMI)
  $('#weight').on('change', function() {
    patient.weight = parseFloat(this.value);
    patient.weight && patient.height && calculateBMI();
  });

  $('#height').on('change', function() {
    patient.height = parseFloat(this.value);
    patient.weight && patient.height && calculateBMI();
  });

  // Считаем Waist-Hip-Ratio (WHR)
  $('#waistLength').on('change', function() {
    patient.waistLength = parseFloat(this.value);
    patient.waistLength && patient.hipLength && calculateWHR();
  });

  $('#hipLength').on('change', function() {
    patient.hipLength = parseFloat(this.value);
    patient.waistLength && patient.hipLength && calculateWHR();
  });

  // Считаем % от массы тела для жира, костей и активной клеточной массы
  $('.calculate-percentage').on('change', function() {
    let targetCell = $(this).attr('id');
    let calculatedPercentage = (parseFloat(this.value) / patient.weight * 100).toFixed(1) + '%';
    $('#percentage-' + targetCell).val(calculatedPercentage);
  });

  // Ставим подписи специалистов
  $('.doctor-select').on('change', function() {
    let selectedDoctor = $(this).val();
    let targetSignature = $(this).attr('id');
    $("#signature-" + targetSignature).attr('class',selectedDoctor);
  });

});


//=========================================
// Debug area stuff
//=========================================
$(document).ready(function(){
  // Кнопка для вывода объекта по строчкам в текстовый бокс
  $('#show-patient-object').click(function(){
    for (const prop in patient) {
      console.log(`patient.${prop} = ${patient[prop]}`);
      $('#debug-textarea').val($('#debug-textarea').val() + `patient.${prop} = ${patient[prop]}` + '\n');
    };
  });

  // Кнопка для вывода объекта в виде stringify
  $('#show-patient-stringify').click(function(){
    $('#debug-textarea').val(JSON.stringify(patient, "", 2));
  });

  // Кнопка для конверсии JSON string в объект пациента и заполнение всех полей из памяти
  $('#remember-patient').click(function(){
    var restoredPatient = $('#debug-textarea').val();
    patient = JSON.parse(restoredPatient);
    for (const prop in patient) {
      $('#' + prop).val(patient[prop]);
    };
    patient.gender && patient.ageConverted && fillReferenceValues();
    recalculatePercentage();
    refillCopiedFields();
    refillSignatures();
    refillPercentiles();
  });
});
