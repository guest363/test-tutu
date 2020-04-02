/**
 * Убирает из обьекта ненужные для отрисовки поля поля
 * @param {Object} 
 */
export const excluder = ({ adress, description, ...rest }) => rest;
