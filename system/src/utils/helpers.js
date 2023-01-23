export const addZero = (num) => {
  if (parseInt(num) <= 9) {
    return '0' + num.toString();
  }
  return num;
};
