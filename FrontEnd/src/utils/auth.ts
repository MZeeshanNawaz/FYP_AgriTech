export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem("token"));
};

export const logout = () => {
  localStorage.removeItem("token");
};
