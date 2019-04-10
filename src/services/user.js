import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  // return request('/blog/v1.currentUser/index');
  return request('/blog/v1/user');
}

export async function queryAuthor() {
  return request('/blog/v1/author');
}