// @ts-ignore
/* eslint-disable */
import getToken from '@/utils/get-token';
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: Record<string, any>) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 *
 * @param token 登陆下发的 token
 * @returns 登陆成功后的用户信息
 */
export async function userInfo(token: string) {
  return request<API.UserInfoResult>('/api/user/info/', {
    method: 'GET',
    headers: {
      token,
    },
  });
}

/**
 *
 * @param params.token token
 * @param params.username 用户名
 * @param params.password 密码
 * @returns
 */
export async function registerUser(params: API.RegisterParams) {
  const { token = '' } = params;
  delete params.token;
  return request<API.RegisterResult>('/api/user/register', {
    method: 'POST',
    headers: {
      token,
    },
    data: params,
  });
}

export async function changePassword(params: { password: string }) {
  return request<API.changePasswordResult>('/api/user/modifyPWD', {
    method: 'POST',
    data: params,
    headers: {
      token: getToken(),
    },
  });
}

export async function userList() {
  return request<API.UserListResult>(`/api/user/list`, {
    method: 'GET',
    headers: {
      token: getToken(),
    },
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
