//=========================================
// Made by Dmitry Glinskiy,
// contact me at glinskiy.net
//=========================================
// Patient object
//=========================================
var patient = {
  // Личные данные пациента
  "fullName" : "",
  "idNumber" : "",
  "gender" : "",
  "ageYears" : "",
  "ageMonths" : "",
  "ageConverted" : "", // возраст пациента, выраженный месяцах
  "diagnosisMKB" : "",
  // Таблица 1. Антропометрические показатели
  "height" : "",
  "heightSitting" : "",
  "weight" : "",
  "bmi" : "",
  "waistLength" : "",
  "hipLength" : "",
  "whr" : "",
  "chestExcursion" : "",
  "legLengthDifferenceRelative" : "",
  "legLengthDifferenceAbsolute" : "",
  // Таблица 2. Соматоскопические показатели
  "chestDeformation" : "",
  "spineAxisSaggitalDeviation" : "",
  "pelvicTilt" : "",
  "breathingType" : "",
  "footDeformation" : "",
  "neckLordosis" : "",
  "chestKyphosis" : "",
  "waistLordosis" : "",
  "straightBack" : "",
  // Таблица 3. Гониометрические показатели
  "angleShoulderMovementLeft" : "",
  "angleShoulderMovementRight" : "",
  "angleElbowBendLeft" : "",
  "angleElbowBendRight" : "",
  "angleForearmBendLeft" : "",
  "angleForearmBendRight" : "",
  "anglePelvisJointBendLeft" : "",
  "anglePelvisJointBendRight" : "",
  "angleKneeJointBendLeft" : "",
  "angleKneeJointBendRight" : "",
  "angleAnkleJointBendLeft" : "",
  "angleAnkleJointBendRight" : "",
  // Таблица 4. Физические качества
  "handStrengthLeft" : "",
  "handStrengthRight" : "",
  "legStrengthLeft" : "",
  "legStrengthRight" : "",
  "palmStrengthLeft" : "",
  "palmStrengthRight" : "",
  "backStrength" : "",
  "abdominalPress" : "",
  "deadlift" : "",
  "spineFlexibility" : "",
  // Таблица 5. Толерантность к физическим нагрузкам
  "walkDistance" : "",
  "cardiorespiratoryRestorationTime" : "",
  // Таблица 6. Стабилометрические показатели
  "shiftFrontalEyesOpen" : "",
  "shiftFrontalEyesClosed" : "",
  "shiftSaggitalEyesOpen" : "",
  "shiftSaggitalEyesClosed" : "",
  "ellipseSquareEyesOpen" : "",
  "ellipseSquareEyesClosed" : "",
  "pressurePointSpeedEyesOpen" : "",
  "pressurePointSpeedEyesClosed" : "",
  // Таблица 7. Биоимпеданс
  "" : "",
  // Заключения, блок 1
  "conclusionAPhysicalDevelopment" : "",
  "conclusionAVisceralObesitySigns" : "",
  "conclusionABodyProportions" : "",
  "conclusionABreathType" : "",
  "conclusionASkeletalDeformations" : "",
  // Заключения, блок 2
  "conclsionBMovementLimitedInJoints" : "",
  "conclsionBStrengthEndurance" : "",
  "conclsionBPhysicalLoadEndurance" : "",
  // Заключения, блок 3
  "conclusionCPressureCenterPosition" : "",
  "conclusionCBalanceStability" : "",
  "conclusionCPrimarySensoricSystem" : "",
  // Заключения, блок 4
  "conclusionDPhysicalLoadReadinessLevel" : "",
  "conclusionDPhysicalActivityLevel" : "",
  "conclusionDMetabolicSyndromDevelopmentRisk" : "",
  // Отметки исследователя и даты по страницам
  "doctorA" : "",
  "dateA" : "",
  "doctorB" : "",
  "dateB" : "",
  "doctorC" : "",
  "dateC" : "",
  // Отметки "точек" контроля - для будущего функционала точек контроля и визуализации динамики параметров пациента
  "controlPoint" : ""
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
  patient.whr = (patient.waistLength / patient.hipsLength).toFixed(2);
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
    patient.waistLength && patient.hipsLength && calculateWHR();
  });

  $('#hipsLength').on('change', function() {
    patient.hipsLength = parseFloat(this.value);
    patient.waistLength && patient.hipsLength && calculateWHR();
  });

  // Считаем % от массы тела для жира, костей и активной клеточной массы
  $('.calculate-percentage').on('change', function() {
    let targetCell = $(this).attr('id');
    let calculatedPercentage = (parseFloat(this.value) / patient.weight * 100).toFixed(1) + '%';
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
  // Кнопка для вывода объекта в виде stringify
  $('#show-patient-stringify').click(function(){
    $('#debug-textarea').val(JSON.stringify(patient));
  });
});
