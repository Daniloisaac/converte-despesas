// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {

  email: '', // string que armazena o email da pessoa usuária

};

const User = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case ADD_EMAIL: {
    return {
      ...state,
      ...actions.emailInfo,
    };
  }
  default:
    return state;
  }
};

export default User;
