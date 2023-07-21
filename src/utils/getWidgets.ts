interface Widget {
  widgetId: number;
  active: boolean;
  widgetName: string;
}

export default (): Widget[] => {
  return [
    {
      widgetId: 0,
      active: false,
      widgetName: 'Календарь',
    },
    {
      widgetId: 1,
      active: false,
      widgetName: 'Статистика',
    },
  ];
};
