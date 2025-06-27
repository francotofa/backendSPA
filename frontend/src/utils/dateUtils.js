// src/utils/dateUtils.js
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}

export function getDayName(date) {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[date.getDay()];
}

export function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  return hour > 12 ? `${hour - 12}:${minutes} PM` : `${hour}:${minutes} AM`;
}