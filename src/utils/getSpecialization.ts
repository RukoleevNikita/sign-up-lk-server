export default (service: number) => {
  switch (service) {
  case 0:
    /* 
          0 - master of nail service (Мастер ногтевого сервиса) 
          manicure - Маникюр c покрытием гель лаком - основное (указать цену)
          
        */
    return {
      service: 'Маникюр',
      basicService: 'Маникюр c покрытием гель лаком',
      additionalServices: [
        'Аппаратный маникюр',
        'Классический маникюр',
        'Японский маникюр',
        'Пилочный маникюр',
        'Комбинированный маникюр',
        'Мужской маникюр',
        'Наращивание ногтей',
      ],
    };
  case 1:
    /*
          1 - pedicure (педикюр) 
          pedicure - Педикюр с покрытием гель лаком - основное (указать цену)
        */
    return {
      service: 'Педикюр',
      basicService: 'Педикюр с покрытием гель лаком',
      additionalServices: [
        'Классический педикюр',
        'Аппаратный педикюр',
        'Дисковый педикюр',
        'Smart педикюр',
        'Педикюр экспресс (обработка пальцев без стопы)',
      ],
    };
  case 2:
    /*
          2 - makeupArtist (Визажист) 
          evening makeup - вечерний макияж  - основное (указать цену)
        */
    return {
      service: 'Визажист',
      basicService: 'Макияж вечерний',
      makeupArtist: [
        'Макияж дневной / нюд',
        'Укладка',
        'Образ (макияж и укладка)',
        'Свадебный образ в студии',
        'Репетиция свадебного образа',
        'Выезд',
      ],
    };
  default:
    null;
  }
};
