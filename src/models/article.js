import { query, addArticle, queryDetail } from '@/services/article';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'article',

  state: {
    list: [],
    total: 0,
    info: {},
    comments: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addArticle, payload);
      yield put({
        type: 'insert',
        payload: response
      })
      if (response.status == 'ok') {
        message.success('发布成功');
        yield put(
          routerRedux.replace({
            pathname: '/'
          })
        );
      } else {
        message.error(response.msg);
      }
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(queryDetail, payload);
      if(response){
        yield put({
          type: 'saveDetail',
          payload: response
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: payload.list,
        total: payload.total
      };
    },
    insert(state, action) {
      return {
        ...state
      };
    },
    saveDetail(state, { payload }) {
      return {
        ...state,
        info: payload.article,
        comments: payload.comments
      };
    },
  },
};
