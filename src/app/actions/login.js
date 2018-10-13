import Types from './Types';

export const login = token => ({
  token,
  type: Types.ON_LOGIN,
});

export const logout = () => ({
  token: null,
  type: Types.ON_LOGOUT,
});
