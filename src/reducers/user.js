// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
//   wallet: {
//     currencies: [],
//     expenses: [],
//   },
};

const userData = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
  case 'INFOS_USER':
    return {
      ...state,
      email: action.user.email,
      password: action.user.password,
    };
  default:
    return state;
  }
};

export default userData;
