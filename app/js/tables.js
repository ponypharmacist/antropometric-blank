//==================================================================================
// Функции, выбирающие и вставляющие значение на основании названия параметра
// и имени таблицы возрастных диапазонов
//==================================================================================
// Референсные интервалы
function fillReferenceInterval (parameterName, ageRangeTable) {
  let referenceTable = 'table_' + parameterName + '_' + genderSelected;
  let referenceTableIndex = getAgeGroup(ageRangeTable);
  let referenceInterval = window[referenceTable][referenceTableIndex];
  $('#reference-' + parameterName).val(referenceInterval);
};

function getAgeGroup (ageRangeTable) {
  let index;
  for (index = 0; index < ageRangeTable.length - 1; index++) {
    if (rangeShort(ageConverted, ageRangeTable[index], ageRangeTable[index + 1])) {
      return index;
    } else {
    };
  };
};

function getPercentile (patientParameterValue, parameterValuesArray, categoryName) {
  // передаем сюда ИНДЕКС под-массива значений, уже вычисленный на основе возрастного интервала
  // передаем сюда ЗНАЧЕНИЕ показателя реального пациента
  let index;
  let percentilesTableName = ('percentiles' + categoryName);
  for (index = 0; index < parameterValuesArray.length - 1; index++) {
    if (rangeShort(patientParameterValue, parameterValuesArray[index], parameterValuesArray[index + 1])) {
      return window[percentilesTableName][index];
    } else {
    };
  };
};

// Процентили
function fillPercentile (parameterName, categoryName) {
  let patientParameterValue = $('#patient-' + parameterName).val();
  let parametersTable = 'table_' + parameterName + '_' + genderSelected;
  let ageRangeForCategory = 'ageRangeTable' + categoryName;
  let parametersTableIndex = getAgeGroup(window[ageRangeForCategory]);
  let parameterValuesArray = window[parametersTable][parametersTableIndex];
  let percentileInterval = getPercentile(patientParameterValue, parameterValuesArray, categoryName);
  $('#percentile-' + parameterName).val(percentileInterval);
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
var table_back_strength_male = [
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
var table_back_strength_female = [
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
var table_abdominal_press_male = [
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
var table_abdominal_press_female = [
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
var table_hand_strength_left_male = [
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
var table_hand_strength_left_female = [
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
var table_hand_strength_right_male = [
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
var table_hand_strength_right_female = [
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
var table_leg_strength_left_male = [
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
var table_leg_strength_left_female = [
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
var table_leg_strength_right_male = [
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
var table_leg_strength_right_female = [
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
var table_spine_flexibility_male = [
  [0, -5, -3, 0, 2, 5, 8, 10, 500],
  [0, -10, -2, 2, 5, 8, 11, 12, 500],
  [0, -15, -8, -1.5, 3, 6, 9, 12, 500],
  [0, -15, -8, 0.5, 4, 9, 11, 14, 500],
  [0, -12, -6, 1, 3, 7, 10, 14, 500],
  [0, -9, -3.5, 1, 5, 9, 12, 17, 500],
  [0, -10, -2, 3, 6, 10, 15, 20, 500],
  [0, -14, -5, 2, 6, 11, 16, 21, 500],
  [0, -14, -2, 3, 8, 14, 19, 23, 500],
  [0, -8, 0, 4, 10, 15, 17, 21, 500],
  [0, 3, 5, 9, 11, 17, 18, 23, 500]
];

// Гибкость позвоночника (cm), Девочки
var table_spine_flexibility_female = [
  [0, -6, -1, 1, 5, 9, 12, 16, 500],
  [0, -8, 0, 3, 7, 11, 14, 18, 500],
  [0, -12, -4, 4, 7.8, 12, 15, 19, 500],
  [0, -7, 0, 3, 7.3, 10, 16, 19, 500],
  [0, -7, -2, 3, 8, 12, 18, 23, 500],
  [0, -8, -2, 4, 8, 12, 16, 21, 500],
  [0, -5, 0.8, 5, 10, 15, 19, 21, 500],
  [0, -3, 1, 5, 10, 14.5, 19, 26, 500],
  [0, -5, 2, 7.5, 12, 18, 21, 25, 500],
  [0, 0, 5, 7, 13, 17, 21, 25, 500],
  [0, -3, 2, 5, 11, 19, 23, 35, 500]
];
