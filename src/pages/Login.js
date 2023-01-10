import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailAction } from '../redux/actions';
import style from '../css/Login.module.css';
import image from '../imgs/logo-apenas-a-seta.png';
import imageBack from '../imgs/porquinho-sem-fundo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateTheButton());
  };

  validateTheButton = () => {
    const { email, password } = this.state;

    const MIN_PASSWORD_LENGTH = 6;
    const REGEX_EMAIL = /^\w+([\\.-]?\w+)@\w+([\\.-]?\w+)(\.\w{3,3})+$/;

    const validationToEmail = REGEX_EMAIL.test(email);
    const validationToPassWord = password.length < MIN_PASSWORD_LENGTH;

    this.setState({ isButtonDisabled: !validationToEmail || validationToPassWord });
  };

  buttonSaveEmail = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { dispatch, history } = this.props;

    dispatch(emailAction({ email, password }));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    console.log(style);
    return (
      <div className={ style.form_container }>
        <img
          className={ style.img_back }
          src={ imageBack }
          alt="backConverte"
        />
        <div className={ style.form_box }>
          <img
            className={ style.img_logo }
            src={ image }
            alt="logo-converte"
          />
          <h1>
            Converte Despesas
          </h1>
          <form
            className={ style.form }
            onSubmit={ (event) => this.buttonSaveEmail(event) }
          >

            <input
              className={ style.input_from }
              onChange={ this.handleChange }
              name="email"
              value={ email }
              data-testid="email-input"
              placeholder="Seu Email"
              required
              type="email"
            />

            <input
              className={ style.input_from }
              onChange={ this.handleChange }
              data-testid="password-input"
              placeholder="Senha"
              name="password"
              value={ password }
              required
              type="password"
            />

            <button
              className={ isButtonDisabled ? style.button_disabled : style.button_form }
              disabled={ isButtonDisabled }
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Login);
