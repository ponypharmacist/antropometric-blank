//==================================================================================
// Функции, выбирающие и вставляющие значение на основании названия параметра
// и имени таблицы возрастных диапазонов
//==================================================================================
// Референсные интервалы
//=========================================
function fillReferenceInterval (parameterName, ageRangeTable) {
  let referenceTable = 'table_' + parameterName + '_' + patient.gender;
  let referenceTableIndex = getAgeGroup(ageRangeTable);
  let referenceInterval = window[referenceTable][referenceTableIndex];
  $('#reference-' + parameterName).val(referenceInterval);
};

function getAgeGroup (ageRangeTable) {
  let index;
  for (index = 0; index < ageRangeTable.length - 1; index++) {
    if (rangeShort(patient.ageConverted, ageRangeTable[index], ageRangeTable[index + 1])) {
      return index;
    } else {
    };
  };
};


//=========================================
// Процентили
//=========================================
function fillPercentile (parameterName, categoryName) {
  let patientParameterValue = $('#' + parameterName).val();
  let parametersTable = 'table_' + parameterName + '_' + patient.gender;
  let ageRangeForCategory = 'ageRangeTable' + categoryName;
  let parametersTableIndex = getAgeGroup(window[ageRangeForCategory]);
  let parameterValuesArray = window[parametersTable][parametersTableIndex];
  let percentileInterval = getPercentile(patientParameterValue, parameterValuesArray, categoryName);
  $('#percentile-' + parameterName).val(percentileInterval);
};

// Сканер массива параметров
function getPercentile (patientParameterValue, parameterValuesArray, categoryName) {
  let index;
  let percentilesTableName = ('percentiles' + categoryName);
  for (index = 0; index < parameterValuesArray.length - 1; index++) {
    if (rangeShort(patientParameterValue, parameterValuesArray[index], parameterValuesArray[index + 1])) {
      return window[percentilesTableName][index];
    } else {
    };
  };
};

//=========================================
// WHR
//=========================================
function fillReferenceWHR () {
  if (patient.gender == 'male') {
    $('#reference-whr').val('< 0.85');
  } else {
    $('#reference-whr').val('< 0.75');
  };
};

//==================================================================================
// Age group and tables for Reference values: Height, Weight
//==================================================================================
// 39 возр.групп, относится к таблицам: Рост, Вес
var ageRangeTableHeight = [
  0,
  1,2,3,4,5,
  6,7,8,9,10,
  11,12,15,18,21,
  24,27,30,33,36,
  42,48,54,60,66,
  72,78,84,96,108,
  120,132,144,156,168,
  180,192,204,240
];

// Рост (см), Мальчики
var table_height_male = [
  '50,0 - 53,2 см',
  '52,8 - 56,3 см',
  '55,8 - 59,5 см',
  '58,6 - 62,4 см',
  '61,3 - 65,6 см',
  '63,4 - 67,9 см',
  '65,6 - 69,9 см',
  '67,5 - 71,4 см',
  '68,9 - 73,0 см',
  '70,1 - 74,5 см',
  '71,3 - 76,1 см',
  '72,6 - 77,3 см',
  '73,8 - 78,5 см',
  '76,0 - 81,3 см',
  '78,4 - 84,4 см',
  '80,8 - 86,8 см',
  '83,0 - 88,4 см',
  '85,5 - 92,2 см',
  '87,5 - 94,8 см',
  '90,0 - 97,4 см',
  '92,1 - 99,7 см',
  '95,0 - 102,5 см',
  '98,3 - 105,5 см',
  '101,2 - 108,5 см',
  '105,9 - 112,0 см',
  '108,0 - 115,2 см',
  '110,8 - 118,8 см',
  '113,9 - 122,0 см',
  '117,0 - 125,0 см',
  '122,0 - 131,0 см',
  '127,5 - 136,5 см',
  '133,0 - 142,0 см',
  '138,0 - 148,3 см',
  '142,7 - 154,9 см',
  '147,4 - 160,4 см',
  '152,4 - 166,4 см',
  '158,0 - 172,0 см',
  '162,2 - 177,4 см',
  '168,1 - 181,2 см'
];

// Рост (см), Девочки
var table_height_female = [
  '49,2 - 52,1 см',
  '52,4 - 55,3 см',
  '55,0 - 58,6 см',
  '57,9 - 61,5 см',
  '60,5 - 64,1 см',
  '62,8 - 66,4 см',
  '64,3 - 68,2 см',
  '66,4 - 70,0 см',
  '67,7 - 71,6 см',
  '69,3 - 72,8 см',
  '70,5 - 74,2 см',
  '71,7 - 75,7 см',
  '72,8 - 76,3 см',
  '75,2 - 78,8 см',
  '77,5 - 82,1 см',
  '80,0 - 84,6 см',
  '82,6 - 87,5 см',
  '85,4 - 90,1 см',
  '87,8 - 92,8 см',
  '90,3 - 95,5 см',
  '92,9 - 98,1 см',
  '95,6 - 101,0 см',
  '98,4 - 104,2 см',
  '101,5 - 107,1 см',
  '104,9 - 110,7 см',
  '108,0 - 114,5 см',
  '111,0 - 118,0 см',
  '114,0 - 121,7 см',
  '117,1 - 125,0 см',
  '123,0 - 131,0 см',
  '128,5 - 136,7 см',
  '133,8 - 142,5 см',
  '138,6 - 148,6 см',
  '143,0 - 155,1 см',
  '148,0 - 160,3 см',
  '152,4 - 164,2 см',
  '156,3 - 167,0 см',
  '158,3 - 169,0 см',
  '161,2 - 170,0 см'
];

// Вес (кг), Мальчики
var table_weight_male = [
  '3,0 - 3,7 кг',
  '3,8 - 4,5 кг',
  '4,6 - 5,5 кг',
  '5,4 - 6,4 кг',
  '6,2 - 7,2 кг',
  '6,8 - 7,9 кг',
  '7,4 - 8,6 кг',
  '7,9 - 9,1 кг',
  '8,4 - 9,6 кг',
  '8,9 - 10,1 кг',
  '9,2 - 10,6 кг',
  '9,5 - 11,0 кг',
  '9,8 - 11,5 кг',
  '10,5 - 12,2 кг',
  '11,0 - 12,8 кг',
  '11,5 - 13,5 кг',
  '12,0 - 14,1 кг',
  '12,4 - 14,6 кг',
  '12,8 - 15,1 кг',
  '13,2 - 15,6 кг',
  '13,6 - 16,0 кг',
  '14,2 - 17,0 кг',
  '15,1 - 18,0 кг',
  '15,9 - 19,0 кг',
  '16,8 - 20,1 кг',
  '17,8 - 21,4 кг',
  '18,9 - 22,6 кг',
  '20,0 - 24,0 кг',
  '21,3 - 25,5 кг',
  '23,4 - 28,4 кг',
  '25,6 - 31,4 кг',
  '28,0 - 35,1 кг',
  '31,0 - 39,2 кг',
  '34,4 - 43,8 кг',
  '39,8 - 49,0 кг',
  '42,2 - 54,6 кг',
  '46,9 - 60,2 кг',
  '51,8 - 65,9 кг',
  '56,8 - 70,6 кг'
];

// Вес (кг), Девочки
var table_weight_female = [
  '3,0 - 3,5 кг',
  '3,7 - 4,3 кг',
  '4,4 - 5,0 кг',
  '5,0 - 5,7 кг',
  '5,6 - 6,5 кг',
  '6,2 - 7,2 кг',
  '6,8 - 7,9 кг',
  '7,3 - 8,5 кг',
  '7,7 - 9,1 кг',
  '8,2 - 9,6 кг',
  '8,7 - 10,1 кг',
  '9,1 - 10,6 кг',
  '9,4 - 11,0 кг',
  '10,0 - 11,7 кг',
  '10,6 - 12,5 кг',
  '11,1 - 13,1 кг',
  '11,6 - 13,5 кг',
  '12,0 - 14,0 кг',
  '12,5 - 14,5 кг',
  '12,9 - 14,9 кг',
  '13,3 - 15,4 кг',
  '14,0 - 16,3 кг',
  '14,8 - 17,2 кг',
  '15,8 - 18,4 кг',
  '16,9 - 19,8 кг',
  '17,8 - 21,2 кг',
  '18,8 - 22,5 кг',
  '19,9 - 24,0 кг',
  '20,8 - 25,3 кг',
  '23,0 - 28,5 кг',
  '25,4 - 32,0 кг',
  '28,0 - 36,0 кг',
  '31,1 - 40,3 кг',
  '35,2 - 45,4 кг',
  '40,0 - 51,8 кг',
  '44,0 - 55,0 кг',
  '47,6 - 58,0 кг',
  '51,0 - 61,0 кг',
  '52,4 - 62,0 кг'
];

//==================================================================================
// Центильные интервалы показателей физических качеств
//==================================================================================
// 11 возр.групп, 7-17 лет
var ageRangeTablePhysicalAttributes = [
  84,96,108,120,132,144,156,168,180,192,204,240
];

var percentilesPhysicalAttributes = [
  '< 3%',
  '3-10%',
  '10-25%',
  '25-50%',
  '50-75%',
  '75-90%',
  '90-97%',
  '> 97%'
];

// Мышцы спины (сек), Мальчики
var table_backStrength_male = [
  [0, 7, 11, 21, 31, 50, 71, 85, 500],
  [0, 10, 16, 26, 38, 51, 79, 122, 500],
  [0, 15, 20, 30, 47.5, 63, 86, 118, 500],
  [0, 12.3, 22, 35, 64, 84.5, 125, 155, 500],
  [0, 19, 30, 45, 72, 102, 140, 180, 500],
  [0, 19, 27, 60, 82.5, 123, 153.5, 187, 500],
  [0, 22, 30, 46, 84.5,	117, 156.5, 190, 500],
  [0, 14, 30, 52.4,	80, 110, 142, 201, 500],
  [0, 17, 42, 64, 90, 121, 150, 181, 500],
  [0, 35, 48, 59, 78, 110, 134, 158, 500],
  [0, 30, 47, 63, 83, 116, 132, 172, 500]
];

// Мышцы спины (сек), Девочки
var table_backStrength_female = [
  [0, 5, 10, 18, 27.5, 40, 61, 100, 500],
  [0, 5, 13, 22, 35, 50, 76, 105, 500],
  [0, 10, 16, 25, 47, 70, 90, 134, 500],
  [0, 10, 22, 31.8, 55, 93, 121, 180, 500],
  [0, 14, 22, 39, 58, 95, 129, 170, 500],
  [0, 14, 23, 43, 67, 97, 133, 185, 500],
  [0, 14, 30, 50, 79, 115, 140, 177, 500],
  [0, 17, 30, 49.5, 80, 117.5, 155, 199, 500],
  [0, 24, 40, 60.5, 90.5, 123, 172, 218, 500],
  [0, 21, 35, 50, 75, 117.6, 150, 208, 500],
  [0, 33, 47, 60, 77, 90, 127, 174, 500]
];

// Мышцы брюшного пресса (сек), Мальчики
var table_abdominalPress_male = [
  [0, 1, 1, 3, 5, 10, 17, 37, 500],
  [0, 1, 1, 4, 6, 10, 16, 30, 500],
  [0, 1, 2, 4, 7, 13, 22, 25, 500],
  [0, 1, 3, 5, 9.9, 17, 28, 45, 500],
  [0, 2, 4, 6, 11, 22, 33, 53, 500],
  [0, 2, 4, 7, 14, 24.5, 49, 56, 500],
  [0, 2, 5, 10, 18.4, 34, 50, 66, 500],
  [0, 1, 5, 12, 25, 35.2, 52, 65, 500],
  [0, 4, 8, 17, 27, 40, 54, 71, 500],
  [0, 6.5, 8, 17.5, 28.6, 42, 58, 65.4, 500],
  [0, 1, 3, 11, 21, 35, 49, 67.3, 500]
];

// Мышцы брюшного пресса (сек), Девочки
var table_abdominalPress_female = [
  [0, 1, 1, 3, 5, 8, 17, 30, 500],
  [0, 1, 1, 3, 5, 7, 14, 27, 500],
  [0, 1, 3, 4, 5.3, 8, 15, 20, 500],
  [0, 2, 3, 5, 8.5, 12, 21, 37.1, 500],
  [0, 1, 2.6, 4, 9, 17, 31, 44, 500],
  [0, 1, 3, 5.9, 10, 19, 36, 72, 500],
  [0, 2, 3, 6, 10, 20, 35.5, 55, 500],
  [0, 2, 3, 7, 14, 25, 40, 62, 500],
  [0, 2, 4, 7, 12.4, 27, 40, 58.7, 500],
  [0, 1, 4, 8, 17, 35, 52, 85, 500],
  [0, 2, 3, 8, 12, 29, 68, 83, 500]
];

// Мышцы рук (сек), Мальчики
var table_handStrengthLeft_male = [
  [0, 2, 4, 8, 15, 30, 42, 56, 500],
  [0, 5, 7, 10, 18, 28, 36, 56, 500],
  [0, 6, 9, 13, 19.5, 29, 46, 82, 500],
  [0, 4, 8, 12, 20, 31.5, 45, 65, 500],
  [0, 4, 6, 11, 19, 28, 45, 60, 500],
  [0, 7, 11, 15.9, 22, 35, 50, 70, 500],
  [0, 9, 14, 20, 31, 43, 61.4, 69.9, 500],
  [0, 8, 17, 26, 41, 53, 67, 78, 500],
  [0, 4, 9.2, 17, 30, 48, 65, 83, 500],
  [0, 8, 11, 17, 26, 36, 60, 85, 500],
  [0, 10, 19, 21, 30, 41, 90, 90, 500]
];

// Мышцы рук (сек), Девочки
var table_handStrengthLeft_female = [
  [0, 7, 9.4, 15, 24, 31, 39.5, 48, 500],
  [0, 4, 9, 15, 25, 36, 53, 70.1, 500],
  [0, 6, 13, 21, 35, 48, 60, 78, 500],
  [0, 7, 10, 20, 29.5, 40.5, 63, 79, 500],
  [0, 6, 12, 18, 25, 33, 48, 64, 500],
  [0, 8, 12, 18, 27, 41, 58, 70, 500],
  [0, 10, 15, 22, 35, 48, 60, 78, 500],
  [0, 13, 21, 29, 40, 56, 74, 85, 500],
  [0, 9, 16, 24, 33, 46, 60, 75, 500],
  [0, 12, 15, 21, 31, 39.5, 50, 65, 500],
  [0, 10, 13, 16, 27, 40, 50, 58, 500]
];

// Мышцы рук RIGHT (сек), Мальчики
var table_handStrengthRight_male = [
  [0, 2, 4, 8, 15, 30, 42, 56, 500],
  [0, 5, 7, 10, 18, 28, 36, 56, 500],
  [0, 6, 9, 13, 19.5, 29, 46, 82, 500],
  [0, 4, 8, 12, 20, 31.5, 45, 65, 500],
  [0, 4, 6, 11, 19, 28, 45, 60, 500],
  [0, 7, 11, 15.9, 22, 35, 50, 70, 500],
  [0, 9, 14, 20, 31, 43, 61.4, 69.9, 500],
  [0, 8, 17, 26, 41, 53, 67, 78, 500],
  [0, 4, 9.2, 17, 30, 48, 65, 83, 500],
  [0, 8, 11, 17, 26, 36, 60, 85, 500],
  [0, 10, 19, 21, 30, 41, 90, 90, 500]
];

// Мышцы рук RIGHT (сек), Девочки
var table_handStrengthRight_female = [
  [0, 7, 9.4, 15, 24, 31, 39.5, 48, 500],
  [0, 4, 9, 15, 25, 36, 53, 70.1, 500],
  [0, 6, 13, 21, 35, 48, 60, 78, 500],
  [0, 7, 10, 20, 29.5, 40.5, 63, 79, 500],
  [0, 6, 12, 18, 25, 33, 48, 64, 500],
  [0, 8, 12, 18, 27, 41, 58, 70, 500],
  [0, 10, 15, 22, 35, 48, 60, 78, 500],
  [0, 13, 21, 29, 40, 56, 74, 85, 500],
  [0, 9, 16, 24, 33, 46, 60, 75, 500],
  [0, 12, 15, 21, 31, 39.5, 50, 65, 500],
  [0, 10, 13, 16, 27, 40, 50, 58, 500]
];

// Мышцы ног (сек), Мальчики
var table_legStrengthLeft_male = [
  [0, 2.1, 5.3, 13, 23, 41, 66, 117, 500],
  [0, 3, 8, 13.8, 24, 52, 110, 150, 500],
  [0, 3, 6, 12, 20.5, 39.5, 88, 147, 500],
  [0, 6.4, 10, 18, 32.5, 66, 207, 240, 500],
  [0, 10, 17, 27, 46, 65, 98, 132, 500],
  [0, 5, 14, 29, 57, 87, 130, 154, 500],
  [0, 12, 25, 40.7, 57, 95, 131, 253, 500],
  [0, 8, 15, 22, 38, 72.5, 102, 150, 500],
  [0, 13, 23, 45, 67, 105, 130, 373, 500],
  [0, 14.6, 30, 48, 90, 150, 200, 329, 500],
  [0, 26, 44, 70, 120, 236, 325, 470, 500]
];

// Мышцы ног (сек), Девочки
var table_legStrengthLeft_female = [
  [0, 4.2, 8, 13, 25, 44, 88, 134, 500],
  [0, 4, 7, 12, 17, 41, 79, 180, 500],
  [0, 3, 6, 12, 22, 35, 60, 82, 500],
  [0, 6, 11, 20, 36.5, 69.5, 150, 193, 500],
  [0, 10, 17, 28, 55, 96, 135, 177, 500],
  [0, 12, 16, 24, 47.5, 76, 105, 140, 500],
  [0, 8, 16, 27, 47.5, 77, 121, 160, 500],
  [0, 13.5, 28, 44, 63, 101, 130, 193, 500],
  [0, 10, 15, 25, 49.5, 90.5, 170, 308, 500],
  [0, 7, 17, 33, 58.1, 90, 154, 235, 500],
  [0, 15.9, 26, 48, 90, 120, 168, 205, 500]
];

// Мышцы ног RIGHT (сек), Мальчики
var table_legStrengthRight_male = [
  [0, 2.1, 5.3, 13, 23, 41, 66, 117, 500],
  [0, 3, 8, 13.8, 24, 52, 110, 150, 500],
  [0, 3, 6, 12, 20.5, 39.5, 88, 147, 500],
  [0, 6.4, 10, 18, 32.5, 66, 207, 240, 500],
  [0, 10, 17, 27, 46, 65, 98, 132, 500],
  [0, 5, 14, 29, 57, 87, 130, 154, 500],
  [0, 12, 25, 40.7, 57, 95, 131, 253, 500],
  [0, 8, 15, 22, 38, 72.5, 102, 150, 500],
  [0, 13, 23, 45, 67, 105, 130, 373, 500],
  [0, 14.6, 30, 48, 90, 150, 200, 329, 500],
  [0, 26, 44, 70, 120, 236, 325, 470, 500]
];

// Мышцы ног RIGHT (сек), Девочки
var table_legStrengthRight_female = [
  [0, 4.2, 8, 13, 25, 44, 88, 134, 500],
  [0, 4, 7, 12, 17, 41, 79, 180, 500],
  [0, 3, 6, 12, 22, 35, 60, 82, 500],
  [0, 6, 11, 20, 36.5, 69.5, 150, 193, 500],
  [0, 10, 17, 28, 55, 96, 135, 177, 500],
  [0, 12, 16, 24, 47.5, 76, 105, 140, 500],
  [0, 8, 16, 27, 47.5, 77, 121, 160, 500],
  [0, 13.5, 28, 44, 63, 101, 130, 193, 500],
  [0, 10, 15, 25, 49.5, 90.5, 170, 308, 500],
  [0, 7, 17, 33, 58.1, 90, 154, 235, 500],
  [0, 15.9, 26, 48, 90, 120, 168, 205, 500]
];

// Гибкость позвоночника (cm), Мальчики
var table_spineFlexibility_male = [
  [-50, -5, -3, 0, 2, 5, 8, 10, 500],
  [-50, -10, -2, 2, 5, 8, 11, 12, 500],
  [-50, -15, -8, -1.5, 3, 6, 9, 12, 500],
  [-50, -15, -8, 0.5, 4, 9, 11, 14, 500],
  [-50, -12, -6, 1, 3, 7, 10, 14, 500],
  [-50, -9, -3.5, 1, 5, 9, 12, 17, 500],
  [-50, -10, -2, 3, 6, 10, 15, 20, 500],
  [-50, -14, -5, 2, 6, 11, 16, 21, 500],
  [-50, -14, -2, 3, 8, 14, 19, 23, 500],
  [-50, -8, 0, 4, 10, 15, 17, 21, 500],
  [0, 3, 5, 9, 11, 17, 18, 23, 500]
];

// Гибкость позвоночника (cm), Девочки
var table_spineFlexibility_female = [
  [-50, -6, -1, 1, 5, 9, 12, 16, 500],
  [-50, -8, 0, 3, 7, 11, 14, 18, 500],
  [-50, -12, -4, 4, 7.8, 12, 15, 19, 500],
  [-50, -7, 0, 3, 7.3, 10, 16, 19, 500],
  [-50, -7, -2, 3, 8, 12, 18, 23, 500],
  [-50, -8, -2, 4, 8, 12, 16, 21, 500],
  [-50, -5, 0.8, 5, 10, 15, 19, 21, 500],
  [-50, -3, 1, 5, 10, 14.5, 19, 26, 500],
  [-50, -5, 2, 7.5, 12, 18, 21, 25, 500],
  [0, 0, 5, 7, 13, 17, 21, 25, 500],
  [-50, -3, 2, 5, 11, 19, 23, 35, 500]
];

//==================================================================================
// BMI
//==================================================================================
var ageRangeTableBMI = [
  0,60,
  61,62,63,64,65,66,67,68,69,70,
  71,72,73,74,75,76,77,78,79,80,
  81,82,83,84,85,86,87,88,89,90,
  91,92,93,94,95,96,97,98,99,100,
  101,102,103,104,105,106,107,108,109,110,
  111,112,113,114,115,116,117,118,119,120,
  121,122,123,124,125,126,127,128,129,130,131,
  132,133,134,135,136,137,138,139,140,141,
  142,143,144,145,146,147,148,149,150,151,
  152,153,154,155,156,157,158,159,160,161,
  162,163,164,165,166,167,168,169,170,171,
  172,173,174,175,176,177,178,179,180,181,
  182,183,184,185,186,187,188,189,190,191,
  192,193,194,195,196,197,198,199,200,201,
  202,203,204,205,206,207,208,209,210,211,
  212,213,214,215,216,217,218,219,220,221,
  222,223,224,225,226,227,228,240
];

// BMI (кг/м2), Мальчики
var table_bmi_male = [
  'до 5 лет',
  '14.071 - 16.645',
  '14.071 - 16.645',
  '14.066 - 16.648',
  '14.063 - 16.653',
  '14.061 - 16.659',
  '14.060 - 16.667',
  '14.060 - 16.676',
  '14.061 - 16.686',
  '14.063 - 16.699',
  '14.067 - 16.712',
  '14.071 - 16.727',
  '14.077 - 16.743',
  '14.083 - 16.761',
  '14.090 - 16.780',
  '14.098 - 16.799',
  '14.107 - 16.820',
  '14.116 - 16.842',
  '14.126 - 16.864',
  '14.136 - 16.888',
  '14.147 - 16.913',
  '14.158 - 16.938',
  '14.170 - 16.964',
  '14.183 - 16.991',
  '14.195 - 17.019',
  '14.209 - 17.047',
  '14.222 - 17.076',
  '14.236 - 17.106',
  '14.250 - 17.136',
  '14.265 - 17.167',
  '14.280 - 17.199',
  '14.295 - 17.231',
  '14.311 - 17.264',
  '14.327 - 17.297',
  '14.343 - 17.331',
  '14.360 - 17.366',
  '14.377 - 17.401',
  '14.394 - 17.437',
  '14.412 - 17.473',
  '14.429 - 17.510',
  '14.447 - 17.548',
  '14.466 - 17.586',
  '14.484 - 17.624',
  '14.503 - 17.663',
  '14.523 - 17.702',
  '14.542 - 17.742',
  '14.562 - 17.783',
  '14.582 - 17.824',
  '14.603 - 17.866',
  '14.624 - 17.908',
  '14.646 - 17.952',
  '14.668 - 17.996',
  '14.691 - 18.040',
  '14.714 - 18.086',
  '14.738 - 18.132',
  '14.763 - 18.179',
  '14.788 - 18.227',
  '14.814 - 18.276',
  '14.840 - 18.326',
  '14.867 - 18.376',
  '14.895 - 18.428',
  '14.923 - 18.480',
  '14.952 - 18.532',
  '14.982 - 18.586',
  '15.012 - 18.640',
  '15.043 - 18.696',
  '15.074 - 18.751',
  '15.106 - 18.808',
  '15.139 - 18.865',
  '15.172 - 18.923',
  '15.206 - 18.982',
  '15.241 - 19.042',
  '15.276 - 19.102',
  '15.312 - 19.163',
  '15.348 - 19.224',
  '15.385 - 19.287',
  '15.422 - 19.349',
  '15.461 - 19.413',
  '15.499 - 19.477',
  '15.539 - 19.542',
  '15.578 - 19.607',
  '15.619 - 19.674',
  '15.660 - 19.741',
  '15.702 - 19.808',
  '15.745 - 19.877',
  '15.788 - 19.946',
  '15.833 - 20.015',
  '15.877 - 20.086',
  '15.923 - 20.157',
  '15.969 - 20.229',
  '16.016 - 20.302',
  '16.063 - 20.375',
  '16.112 - 20.449',
  '16.161 - 20.524',
  '16.210 - 20.599',
  '16.260 - 20.675',
  '16.311 - 20.751',
  '16.362 - 20.829',
  '16.414 - 20.906',
  '16.466 - 20.984',
  '16.519 - 21.062',
  '16.572 - 21.140',
  '16.625 - 21.219',
  '16.679 - 21.298',
  '16.733 - 21.376',
  '16.787 - 21.455',
  '16.841 - 21.534',
  '16.895 - 21.613',
  '16.950 - 21.691',
  '17.004 - 21.770',
  '17.058 - 21.848',
  '17.113 - 21.926',
  '17.167 - 22.004',
  '17.221 - 22.081',
  '17.275 - 22.158',
  '17.329 - 22.235',
  '17.382 - 22.311',
  '17.435 - 22.387',
  '17.489 - 22.462',
  '17.541 - 22.537',
  '17.594 - 22.611',
  '17.647 - 22.685',
  '17.699 - 22.758',
  '17.750 - 22.831',
  '17.802 - 22.903',
  '17.853 - 22.975',
  '17.904 - 23.046',
  '17.954 - 23.116',
  '18.004 - 23.186',
  '18.053 - 23.255',
  '18.103 - 23.324',
  '18.151 - 23.391',
  '18.199 - 23.459',
  '18.247 - 23.525',
  '18.295 - 23.591',
  '18.342 - 23.656',
  '18.388 - 23.721',
  '18.434 - 23.785',
  '18.479 - 23.847',
  '18.524 - 23.910',
  '18.568 - 23.972',
  '18.612 - 24.032',
  '18.655 - 24.093',
  '18.698 - 24.152',
  '18.741 - 24.211',
  '18.782 - 24.269',
  '18.823 - 24.327',
  '18.864 - 24.383',
  '18.904 - 24.439',
  '18.944 - 24.494',
  '18.983 - 24.549',
  '19.022 - 24.603',
  '19.060 - 24.656',
  '19.097 - 24.708',
  '19.134 - 24.760',
  '19.171 - 24.811',
  '19.207 - 24.861',
  '19.242 - 24.911',
  '19.277 - 24.959',
  '19.311 - 25.008',
  '19.344 - 25.055',
  '19.377 - 25.102',
  '19.410 - 25.147',
  '19.442 - 25.193',
  '19.473 - 25.237',
  '19.504 - 25.281',
  '19.535 - 25.324',
  '19.564 - 25.366',
  '19.594 - 25.408',
  '19.622 - 25.449'
];

// BMI (кг/м2), Девочки
var table_bmi_female = [
  'до 5 лет',
  '13.891 - 16.870',
  '13.891 - 16.870',
  '13.885 - 16.879',
  '13.881 - 16.889',
  '13.876 - 16.900',
  '13.872 - 16.911',
  '13.869 - 16.923',
  '13.866 - 16.936',
  '13.864 - 16.950',
  '13.863 - 16.964',
  '13.862 - 16.979',
  '13.862 - 16.995',
  '13.862 - 17.011',
  '13.863 - 17.029',
  '13.865 - 17.047',
  '13.867 - 17.067',
  '13.870 - 17.087',
  '13.874 - 17.108',
  '13.879 - 17.131',
  '13.885 - 17.154',
  '13.892 - 17.179',
  '13.899 - 17.204',
  '13.907 - 17.231',
  '13.916 - 17.259',
  '13.927 - 17.289',
  '13.938 - 17.319',
  '13.950 - 17.350',
  '13.963 - 17.383',
  '13.976 - 17.417',
  '13.991 - 17.452',
  '14.007 - 17.488',
  '14.023 - 17.526',
  '14.041 - 17.564',
  '14.059 - 17.604',
  '14.078 - 17.645',
  '14.099 - 17.687',
  '14.120 - 17.730',
  '14.142 - 17.774',
  '14.164 - 17.820',
  '14.188 - 17.866',
  '14.212 - 17.914',
  '14.238 - 17.962',
  '14.264 - 18.012',
  '14.291 - 18.062',
  '14.318 - 18.113',
  '14.346 - 18.166',
  '14.375 - 18.219',
  '14.404 - 18.272',
  '14.434 - 18.326',
  '14.465 - 18.381',
  '14.496 - 18.437',
  '14.527 - 18.493',
  '14.559 - 18.551',
  '14.592 - 18.608',
  '14.625 - 18.666',
  '14.659 - 18.725',
  '14.694 - 18.785',
  '14.729 - 18.846',
  '14.764 - 18.907',
  '14.801 - 18.969',
  '14.838 - 19.032',
  '14.876 - 19.096',
  '14.914 - 19.161',
  '14.954 - 19.226',
  '14.994 - 19.293',
  '15.035 - 19.360',
  '15.076 - 19.429',
  '15.119 - 19.498',
  '15.162 - 19.568',
  '15.206 - 19.639',
  '15.251 - 19.712',
  '15.297 - 19.785',
  '15.343 - 19.859',
  '15.390 - 19.933',
  '15.438 - 20.009',
  '15.487 - 20.086',
  '15.536 - 20.163',
  '15.586 - 20.241',
  '15.637 - 20.320',
  '15.688 - 20.400',
  '15.740 - 20.480',
  '15.793 - 20.561',
  '15.846 - 20.642',
  '15.899 - 20.724',
  '15.953 - 20.806',
  '16.008 - 20.889',
  '16.062 - 20.972',
  '16.117 - 21.055',
  '16.172 - 21.138',
  '16.227 - 21.222',
  '16.282 - 21.305',
  '16.338 - 21.388',
  '16.393 - 21.471',
  '16.448 - 21.554',
  '16.503 - 21.637',
  '16.558 - 21.719',
  '16.612 - 21.800',
  '16.667 - 21.882',
  '16.721 - 21.962',
  '16.775 - 22.042',
  '16.828 - 22.122',
  '16.881 - 22.201',
  '16.934 - 22.279',
  '16.986 - 22.357',
  '17.037 - 22.433',
  '17.088 - 22.509',
  '17.139 - 22.584',
  '17.188 - 22.658',
  '17.238 - 22.731',
  '17.286 - 22.803',
  '17.334 - 22.874',
  '17.380 - 22.943',
  '17.427 - 23.012',
  '17.472 - 23.079',
  '17.516 - 23.145',
  '17.560 - 23.210',
  '17.603 - 23.273',
  '17.644 - 23.336',
  '17.685 - 23.396',
  '17.725 - 23.456',
  '17.764 - 23.514',
  '17.802 - 23.570',
  '17.839 - 23.625',
  '17.874 - 23.679',
  '17.909 - 23.731',
  '17.943 - 23.782',
  '17.976 - 23.832',
  '18.008 - 23.880',
  '18.039 - 23.927',
  '18.069 - 23.972',
  '18.098 - 24.017',
  '18.126 - 24.060',
  '18.153 - 24.101',
  '18.179 - 24.141',
  '18.205 - 24.180',
  '18.229 - 24.218',
  '18.253 - 24.254',
  '18.275 - 24.290',
  '18.297 - 24.324',
  '18.318 - 24.356',
  '18.338 - 24.388',
  '18.357 - 24.418',
  '18.376 - 24.448',
  '18.393 - 24.476',
  '18.411 - 24.503',
  '18.427 - 24.530',
  '18.443 - 24.555',
  '18.458 - 24.580',
  '18.472 - 24.603',
  '18.486 - 24.626',
  '18.499 - 24.649',
  '18.512 - 24.670',
  '18.525 - 24.691',
  '18.537 - 24.712',
  '18.548 - 24.731',
  '18.560 - 24.750',
  '18.571 - 24.769',
  '18.581 - 24.788',
  '18.592 - 24.805',
  '18.601 - 24.823',
  '18.611 - 24.840',
  '18.621 - 24.856',
  '18.630 - 24.873',
  '18.639 - 24.889',
  '18.648 - 24.905',
  '18.657 - 24.920',
  '18.665 - 24.935',
  '18.673 - 24.951',
  '18.681 - 24.965'
];
