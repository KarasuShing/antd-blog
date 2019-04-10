import request from '@/utils/request';

export async function query(page=1, size=10) {
  return request(`/blog/v1/article?page=${page}&size=${size}`);
}

export async function addArticle(params) {
  return request('/blog/v1/article', {
    method: 'POST',
    data: params
  });
}

export async function queryDetail(id) {
  return request(`/blog/v1/articleDetail?id=${id}`);
}