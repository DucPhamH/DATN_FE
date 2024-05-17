export const convertCentimeterToMeter = (centimeter) => {
  return centimeter / 100
}

export const calculateDayExpected = (weight_target, weight, purpose) => {
  // 1 calo = 0.00013 kg , 500 calo = 0.00013 * 500 = 0.065 kg = 1 ngày => muốn giảm 6 kg thì cần 6/0.065 = 92 ngày
  if (purpose === 0) {
    const day_expected = (weight_target - weight) / 0.065
    // làm tròn lên
    return Math.ceil(day_expected)
  }
  if (purpose === 1) {
    const day_expected = (weight - weight_target) / 0.065
    // làm tròn lên
    return Math.ceil(day_expected)
  }
}

export const cutString = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length) + '...'
  }
  return str
}
