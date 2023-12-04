export default (number: string) =>
  number.indexOf('+') === 0
    ? number.split('+')[1].length === 11
      ? number.split('+')[1]
      : false
    : number.length === 11
      ? number
      : false;
// 79136553626

// export default (phoneNumber: string) => /^\+?\d{10,14}$/.test(phoneNumber);

// if (!phoneNumber || !/^\+?\d{10,14}$/.test(phoneNumber)) {
//   return res.status(400).json({ error: 'Неверный формат номера телефона.' });
// }
