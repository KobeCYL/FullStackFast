// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取所有user GET /api/user */
export async function getApiUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiUserParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建用户 POST /api/user */
export async function postApiUser(
  body: {
    username: string;
    password?: string;
    isAdmin?: boolean;
    url?: string;
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息 PATCH /api/user/${param0} */
export async function patchApiUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.patchApiUserIdParams,
  body: {
    username?: string;
    url?: string;
    isAdmin?: string;
    password?: string;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/api/user/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 通过token获取当前用户信息 GET /api/user/currentUser */
export async function getApiUserCurrentUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiUserCurrentUserParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/user/currentUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取某一个用户的信息 GET /user/${param0} */
export async function getUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除用户 DELETE /user/${param0} */
export async function deleteUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
