// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** login POST /api/user/login */
export async function postApiUserLogin(
  body: {
    username: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** register POST /api/user/register */
export async function postApiUserRegister(
  body: {
    username: string;
    password: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
