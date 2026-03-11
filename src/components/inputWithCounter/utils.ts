export const getCounterColor = (current: number, max: number): string => {
  const percentage = (current / max) * 100;

  if (percentage >= 80) return 'error.main';
  if (percentage >= 60) return 'warning.main';
  
  return 'success.main';
};
