import api from './axios';

export async function updateProfile(payload) {
  const { data } = await api.put('/profile', payload);
  return data;
}

export async function changePassword({ current_password, new_password, new_password_confirmation }) {
  const { data } = await api.post('/profile/password', {
    current_password,
    new_password,
    new_password_confirmation,
  });
  return data;
}
