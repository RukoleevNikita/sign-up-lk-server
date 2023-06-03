declare module 'sms_ru' {
  function sendSMS(options: any): Promise<any>;

  export = sendSMS;
}
