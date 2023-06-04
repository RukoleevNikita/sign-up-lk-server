export default (number: string) =>
  number.indexOf('+') === 0
    ? number.split('+')[1].length === 11
      ? number.split('+')[1]
      : false
    : number.length === 11
    ? number
    : false;
// 79136553626
