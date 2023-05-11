import {GETACCESSTOKEN} from './action.types';

const initialState = {
  accessToken: '',
};

export const reducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case GETACCESSTOKEN: {
      return {...state, accessToken: payload};
    }
    default:
      return state;
  }
};
