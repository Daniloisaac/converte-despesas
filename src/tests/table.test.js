import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

describe('testando o componente Table', () => {
  test('testando se o th "Descrição" está na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const thDescrição = screen.getByText('Descrição');
    expect(thDescrição).toBeInTheDocument();
  });

  test('testando se ao clicar no botão "adicionar despesa" os valores são adicionados na tela', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const initialState = { wallet: {
      expenses: [
        {
          id: 0,
          value: '43',
          description: 'hot dog',
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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const buttonExpenses = screen.getByRole('button', { name: /Adicionar despesa/ });
    expect(buttonExpenses).toBeInTheDocument();
    userEvent.click(buttonExpenses);
    const tdDescricao = screen.getByText('hot dog');
    expect(tdDescricao).toBeInTheDocument();
    expect(tdDescricao).toHaveTextContent('hot dog');
  });
  test('testando se ao clicar no "Excluir" a despesa clicada e removida', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const initialState = { wallet: {
      expenses: [
        {
          id: 0,
          value: '43',
          description: 'hot dog',
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
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const tdDescricao = screen.queryByText('hot dog');

    expect(tdDescricao).toBeInTheDocument();

    const buttondelete = screen.getByTestId('delete-btn');

    expect(buttondelete).toBeInTheDocument();

    userEvent.click(buttondelete);

    expect(tdDescricao).not.toBeInTheDocument();
  });
  test('testando o butão "Editar despesa" esta na tela', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

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
    const buttonExpenses = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(buttonExpenses).toBeInTheDocument();
    userEvent.click(buttonExpenses);
    const buttonEditeExpenses = screen.getByTestId('edit-btn');
    expect(buttonEditeExpenses).toBeInTheDocument();
  });

  it('testando se ao clicar no "Editar despesa" a despesa clicada e editada', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    console.log(mockData);
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
    const buttonEditeExpenses = screen.getByTestId('edit-btn');
    const inputDescription = screen.getByTestId('description-input');
    const tdDescricao = screen.queryByText('hot dog');

    expect(buttonEditeExpenses).toBeInTheDocument();
    expect(tdDescricao).toBeInTheDocument();

    userEvent.click(buttonEditeExpenses);

    const buttonSubmitExpenses = screen.getByRole('button', { name: 'Editar despesa' });
    const select = await screen.findByTestId('currency-input');

    userEvent.type(inputDescription, 'pizza');
    userEvent.selectOptions(select, 'USD');
    userEvent.click(buttonSubmitExpenses);

    await waitFor(() => expect(tdDescricao).toHaveTextContent('pizza'));
  });
});
