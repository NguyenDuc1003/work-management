const TOKEN_KEY = "token";
const USER_KEY = "user";

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log('🔑 getToken called, token:', token ? 'exists' : 'null');
  return token;
};

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const hasPermission = (perm) => {
  const user = getUser();
  console.log('🔍 hasPermission called for:', perm);
  console.log('👤 Current user:', user);
  if (!user?.permissions) {
    console.log('❌ No permissions found');
    return false;
  }
  const hasIt = user.permissions.some(p => p.code?.toUpperCase() === perm.toUpperCase());
  console.log(`🔐 Permission ${perm}:`, hasIt ? '✅ granted' : '❌ denied');
  return hasIt;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
