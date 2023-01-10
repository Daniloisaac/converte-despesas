import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editeAction, remuveAction } from '../redux/actions';
import style from '../css/Table.module.css';

class Table extends Component {
  deleteExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(remuveAction(id));
  };

  editeExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editeAction(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <section>
        <table className={ style.table_container }>
          <tr className={ style.table_tr }>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tbody className={ style.tbody }>
            {expenses.map((value) => (
              <tr
                className={ style.tbody_tr }
                key={ value.id }
              >
                <td>{value.description}</td>
                <td>{value.tag}</td>
                <td>{value.method}</td>
                <td>{ Number(value.value).toFixed(2)}</td>
                <td>{value.exchangeRates[value.currency].name}</td>
                <td>{Number(value.exchangeRates[value.currency].ask).toFixed(2) }</td>
                <td>
                  {(value.exchangeRates[value.currency].ask * value.value)
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  {' '}
                  <button
                    className={ style.btn_delete }
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(value.id) }
                  >
                    Excluir
                  </button>
                  {' '}
                  <button
                    className={ style.btn_edited }
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.editeExpense(value.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  map: PropTypes.func.isRequired,
  expenses: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
