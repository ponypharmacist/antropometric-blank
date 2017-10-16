// Made by Dmitry Glinskiy, contact me at glinskiy.net




$(document).ready(function(){
  // Реагируем на смену возраста
  $('#age-years').on('change', function() {
    ageYears = parseInt(this.value);
    ageMonths = parseInt($('#age-months').val());
    setAgeConverted (ageYears, ageMonths);
    ageConverted && genderSelected && choosePrimaryTable();
    ageConverted && genderSelected && chooseSecondaryTable();

    $('#age-years-copy').val(ageYears);
  });

  // Реагируем на смену возраста
  $('#age-months').on('change', function() {
    ageMonths = parseInt(this.value);
    ageYears = parseInt($('#age-years').val());
    setAgeConverted (ageYears, ageMonths);
    ageConverted && genderSelected && choosePrimaryTable();
    ageConverted && genderSelected && chooseSecondaryTable();
  });

  // Реагируем на смену пола
  $('.form-check-input').on('change', function() {
    genderSelected = $('input[name=gender-radio]:checked').val();
    $('.selected-gender').html(genderSelected);
    ageConverted && genderSelected && choosePrimaryTable();
    ageConverted && genderSelected && chooseSecondaryTable();
  });

// Непонятно, как обрабатывать 9 и 9a
  $('#subtest-8-select').on('change', function() {
    var strVal = this.value;
    var strVal2 = strVal - 4;
    $('.sub-res-8').attr('onchange','subtestGo(' + strVal + ',' + strVal2 + ');');

    if (strVal == 9) {
      $('.graph-caption-8').html('8b. Полные отжимания');
    } else {
      $('.graph-caption-8').html('8a. Отжимания с колен');
    }
  });

// Реагируем на ввод возраста, имени и даты исследования, дублирем их на второй лист
  $('#test-date').on('change', function() {
   $('#test-date-copy').val(this.value);
  });

  $('#patient-name').on('change', function() {
   $('#patient-name-copy').val(this.value);
  });

  $('#doctor-name').on('change', function() {
   $('#doctor-name-copy').val(this.value);
  });

});
