import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from '../css/Header.module.css';
import image from '../imgs/logo-apenas-a-seta.png';

class Header extends Component {
  render() {
    const { totalExchangeValue } = this.props;
    console.log(totalExchangeValue);
    return (
      <main className={ style.main_container }>
        <header className={ style.header_container }>
          <img src={ image } alt="logo converte" />
          <h1 className={ style.header_h1 }>
            Converte Despesas
          </h1>
        </header>
        <div className={ style.expenses }>
          <h3 className={ style.expenses_name }>Suas Despesas</h3>
          <span
            data-testid="total-field"
            // className={ style.expenses }
          >
            {
              (totalExchangeValue)
                .toFixed(2)
            }
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user,
  totalExchangeValue: state.wallet.totalExchangeValue,
});

Header.propTypes = {
  totalExchangeValue: PropTypes.shape().isRequired,

};

export default connect(mapStateToProps)(Header);
