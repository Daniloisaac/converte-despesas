// Coloque aqui suas actions
import getCurrencies from '../../data/Getcurrencies';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMUVE_EXPENSE = 'REMUVE_EXPENSE';
export const EDITE_EXPENSE = 'EDITE_EXPENSE';
export const NEW_EXPENSE = 'NEW_EXPENSE';

export const emailAction = (emailInfo) => ({
  type: ADD_EMAIL,
  emailInfo,
});

export const editeAction = (id) => ({
  type: EDITE_EXPENSE,
  id,
});

export const newAction = (newExpense) => ({
  type: NEW_EXPENSE,
  newExpense,
});

export const remuveAction = (id) => ({
  type: REMUVE_EXPENSE,
  id,
});

export const expensesAction = (expensesInfo, index) => async (dispatch) => {
  dispatch({ type: ADD_EXPENSES,
    expenses: expensesInfo,
    index });
};

export const currenciesAction = () => async (dispatch) => {
  const curr = await getCurrencies();

  const currNome = Object.values(curr).filter((currencie) => currencie.codein !== 'BRLT')
    .map((currValue) => currValue.code);

  dispatch({ type: ADD_CURRENCIES,
    currencies: currNome });
};
