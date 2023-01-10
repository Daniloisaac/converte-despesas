import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

describe('testando o componente wallerForm', () => {
  test('testando se o "input value" esta na tela', () => {
    const initialState = { wallet: {
      expenses: [
        {
          id: 0,
          value: '43',
          description: 'hot dog',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'lazer',
          exchangeRates: mockData,
        },
      ],
      editor: false,
      idToEdit: 0,
      totalExchangeValue: 222.9,
      index: 0,
      convertedValue: '',
    } };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
    const buttonExpenses = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.type(inputValue, '200');
    userEvent.click(buttonExpenses);
    expect(inputValue).toHaveTextContent('');
  });
  test('testando se o option', () => {
    const initialState = { wallet: {
      expenses: [
        {
          id: 0,
          value: '43',
          description: 'hot dog',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'lazer',
          exchangeRates: mockData,
        },
      ],
      editor: false,
      idToEdit: 0,
      totalExchangeValue: 222.9,
      index: 0,
      convertedValue: '',
    } };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const option = screen.getByTestId('method-input');
    expect(option).toBeInTheDocument();
    // const buttonExpenses = screen.getByRole('button', { name: 'Adicionar despesa' });
    // userEvent.type(option, '200');
    // userEvent.click(option);
    expect(option).toHaveTextContent('Dinheiro');
  });

  // test('testando se ao clicar no butão é adicionado mais uma despesa', () => {
  //   const initialState = { wallet: {
  //     expenses: [
  //       {
  //         id: 0,
  //         value: '43',
  //         description: 'hot dog',
  //         currency: 'USD',
  //         method: 'Dinheiro',
  //         tag: 'lazer',
  //         exchangeRates: mockData,
  //       },
  //     ],
  //     editor: false,
  //     idToEdit: 0,
  //     totalExchangeValue: 222.9,
  //     index: 0,
  //     convertedValue: '',
  //   } };
  //   renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
  //   const buttonExpenses = screen.getByRole('button', { name: 'Adicionar despesa' });
  //   expect(buttonExpenses).toBeInTheDocument();
  //   userEvent.click(buttonExpenses);
  //   // expect(option).toHaveTextContent('Dinheiro');
  // });
});
