import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

describe('testando a page "wallet" ', () => {
  test('testando se o email colocado pelo usuario existe no "Header"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const emailUser = screen.getByTestId('email-field');
    expect(emailUser).toBeInTheDocument();
  });

  test('testando se o email colocado pelo usuario e igual no "Header"', () => {
    const initialStateMock = { user: {
      email: 'test@test.com',
      password: '453534',
    } };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: initialStateMock });

    const emailUser = screen.getByTestId('email-field');
    expect(emailUser).toHaveTextContent('test@test.com');
  });

  test('testando se o valor inicial das despesas no  Header e "0.00"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const initialExchange = screen.getByTestId('total-field');
    expect(initialExchange).toHaveTextContent('0.00');
  });

  test('testando se o valor inicial das despesas no  Header e "0.00"', () => {
    const initialState = { wallet: {
      expenses: [
        {
          id: 0,
          value: '43',
          description: '',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: mockData,
        },
      ],
      editor: false,
      idToEdit: 0,
      totalExchangeValue: 222.9,
      index: 0,
      convertedValue: '',
    } };

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'], initialState });

    const initialExchange = screen.getByTestId('total-field');
    expect(initialExchange).toHaveTextContent('222.9');
  });
});
