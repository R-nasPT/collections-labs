export const getFullName = (user) => {
  return `${user.firstName} ${user.lastName}`;
};

export const isAdmin = (user) => {
  return user.role === 'admin';
};

export const formatUserAddress = (user) => {
  return `${user.address.street}, ${user.address.city}, ${user.address.country}`;
};
