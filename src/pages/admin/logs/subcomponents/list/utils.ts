export const getActionColor = (action: string) => {
  if (action.includes('created')) return 'success';
  if (action.includes('updated')) return 'info';
  if (action.includes('deleted')) return 'error';
  if (action.includes('signin') || action.includes('signup')) return 'primary';
  return 'default';
};

export const formatUser = (user: any) => {
  if (!user) return '-';
  if (typeof user === 'object') {
    return user.email || user.name || user._id || '-';
  }
  return user;
};