import api from './axios';

export async function login({ email, password }) {
  const { data } = await api.post('/login', { email, password });
  return {
    user:  { ...data.user, role: data.role },
    token: data.token,
  };
}

export async function forgotPassword({ email }) {
  const { data } = await api.post('/forgot-password', { email });
  return data;
}

export async function verifyToken() {
  const { data } = await api.get('/me');
  return { ...data.user, role: data.role };
}

export async function logoutApi() {
  await api.post('/logout');
}
