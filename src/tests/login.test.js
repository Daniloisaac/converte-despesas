import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
// import Login from '../pages/Login';

const textEmail = 'test@test.com';

describe('login do usuario', () => {
  test('testando se o input "email" está na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(/email-input/i);
    expect(inputEmail).toBeInTheDocument();
  });

  test('testando se o input "password" está na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputPassword = screen.getByTestId(/password-input/i);
    expect(inputPassword).toBeInTheDocument();
  });

  test('testando se o "button" está na tela', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
  });

  test('testando se o "button" está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeDisabled();
  });

  test('testando se o "button" continua desabilitado se o "email" estiver preenchido de forma incorreta', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, 'testtest.com');
    userEvent.type(inputPassword, '123456');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'testtest');
    userEvent.type(inputPassword, '123456');

    expect(button).toBeDisabled();
  });

  test('testando se o "button" continua desabilitado se o "password" estiver menor que "seis" caracteres', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const button = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(inputEmail, textEmail);
    userEvent.type(inputPassword, '12345');

    expect(button).toBeDisabled();
  });

  test('testando se o "button" fica habilitado se os inputs tiverem preenchidos de forma correta', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, textEmail);
    userEvent.type(inputPassword, '123456');

    expect(button).toBeEnabled();
  });

  test('testando se ao clicar no button a pagina e redirecionada para o path "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
