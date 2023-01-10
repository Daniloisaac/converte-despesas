// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CURRENCIES, ADD_EXPENSES, REMUVE_EXPENSE, EDITE_EXPENSE, NEW_EXPENSE,
} from '../actions';

const INITIAL_STATE = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalExchangeValue: 0.00,
  index: '',
  convertedValue: '',

};

const wallet = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case ADD_CURRENCIES: { return { ...state, currencies: actions.currencies }; }
  case ADD_EXPENSES: {
    const { exchangeRates } = actions.expenses;
    const { ask } = exchangeRates[actions.expenses.currency];
    const result = state.totalExchangeValue + ask * actions.expenses.value;
    return {
      ...state,
      expenses: [...state.expenses, { id: actions.index,
        value: actions.expenses.value,
        description: actions.expenses.description,
        currency: actions.expenses.currency,
        method: actions.expenses.method,
        tag: actions.expenses.tag,
        exchangeRates: actions.expenses.exchangeRates,
      }],
      totalExchangeValue: Number(result.toFixed(2)),
      index: actions.index,
    };
  } case REMUVE_EXPENSE: {
    const expensesFilter = state.expenses.filter((idValue) => idValue.id === actions.id);
    const [{ exchangeRates }] = expensesFilter;
    const [{ currency }] = expensesFilter;
    const { ask } = exchangeRates[currency];
    const [{ value }] = expensesFilter;
    return { ...state,
      expenses: state.expenses.filter((idValue) => idValue.id !== actions.id),
      totalExchangeValue: state.totalExchangeValue - Number(ask * value).toFixed(2),
    };
  } case EDITE_EXPENSE: { return { ...state, editor: true, idToEdit: actions.id };
  } case NEW_EXPENSE: {
    let soma = 0;
    actions.newExpense.forEach((v) => {
      const { exchangeRates } = v;
      const { ask } = exchangeRates[v.currency];
      soma += ask * v.value;
    });

    return {
      ...state,
      expenses: actions.newExpense,
      totalExchangeValue: soma,
      editor: false,
    };
  } default: return state;
  }
};

export default wallet;
