import { routerRedux } from 'dva/router';
import { fakeAccountLogin, fakeAccountprofile, fakeAdduser } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    password: undefined,
    userName: "选择全队",
    userNames: [],
    userpasswords: [],
    data:undefined,
  },
  effects: {
    *adduser({payload},{put,call}) {
      const response = yield call(fakeAdduser, payload);
      yield put({
        type: 'addUser',
        payload: response,
      });
    },
    *data({payload},{put,call}) {
      const response = yield call(fakeAccountprofile, payload);
      yield put({
        type: 'changeData',
        payload: response,
      });
    },
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }  
  },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        password: payload.password,
        type: payload.type,
        userName: payload.userName,
      };
    },
    changeData(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        data:payload.data,
      };
    },
    addUser(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        userNames: payload.userNames,
        userpasswords: payload.userpasswords,
      };
    },
  },
};
