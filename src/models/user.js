import { query as queryUsers, queryCurrent, queryAuthor } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    author:{}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchAuthor(_, { call, put }) {
      const response = yield call(queryAuthor);
      yield put({
        type: 'saveAuthor',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveAuthor(state, action) {
      return {
        ...state,
        author: action.payload || {},
      };
    }
  },
};
