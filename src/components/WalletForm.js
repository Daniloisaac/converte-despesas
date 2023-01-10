import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesAction, expensesAction, newAction } from '../redux/actions';
import getCurrencies from '../data/Getcurrencies';
import style from '../css/WalletForm.module.css';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currenciesAction());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  buttonSaveForm = async (event) => {
    event.preventDefault();
    const { dispatch, editor, idToEdit, expenses } = this.props;
    const Alimentação = 'Alimentação';
    if (!editor) {
      const curr = await getCurrencies();
      this.setState(
        { exchangeRates: curr },
        () => dispatch(
          expensesAction(this.state, expenses.length),
        ),
      );
      this.setState({
        value: '',
        description: '',
        method: 'Dinheiro',
        tag: Alimentação,
        currency: 'USD',
      });
    } else {
      const curr = await getCurrencies();
      this.setState(
        { exchangeRates: curr },
        () => {
          const t = expenses
            .map((v) => (v.id === idToEdit ? { ...this.state, id: idToEdit } : v));
          console.log(t);
          dispatch(newAction(t));
        },
      );
      this.setState({
        value: '',
        description: '',
        method: 'Dinheiro',
        tag: Alimentação,
        currency: 'USD',
      });
    }
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies, editor } = this.props;
    return (
      <section className={ style.section_container }>
        <form onSubmit={ this.buttonSaveForm }>
          <div className={ style.input }>
            <input
              className={ style.input_number }
              data-testid="value-input"
              onChange={ this.handleChange }
              type="number"
              name="value"
              value={ value }
              placeholder="Valor da despesa"
            />
            <input
              className={ style.input_description }
              data-testid="description-input"
              onChange={ this.handleChange }
              type="text"
              name="description"
              value={ description }
              placeholder="Descrição"
            />
          </div>
          <div className={ style.box_select }>
            <select
              className={ style.select_currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
              name="currency"
              value={ currency }
            >
              {currencies && currencies
                .map((currencie, i) => <option key={ i }>{currencie}</option>)}
            </select>
            <select
              className={ style.select_method }
              data-testid="method-input"
              onChange={ this.handleChange }
              name="method"
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
            <select
              className={ style.select_tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
              name="tag"
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>

            <button
              className={ style.btn_add }
              type="submit"
            >
              { editor ? 'Editar despesa' : 'Adicionar despesa'}
            </button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,

});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  map: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(WalletForm);
