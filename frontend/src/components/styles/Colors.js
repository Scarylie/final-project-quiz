export const getBgColor = () => {
  const colors = [
    '#5697fe',
    '#2490d0',
    '#20cced',
    '#ffe437',
    '#ff4966',
    '#d85dfb',
    '#fd4472',
    '#fd4472',
    '#da43ff',
    '#ff7e46',
    '#7f60ff',
    '#ffaf20',
  ];

  const color = Math.floor(Math.random() * colors.length);
  return colors[color];
};
