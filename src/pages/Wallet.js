import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencies } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valueExpense: 0,
      description: '',
      currency: '',
      // methodPayment: '',
      // category: '',
    };
  }

  componentDidMount() {
    const { currenciesData } = this.props;
    currenciesData();
  }

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, currenciesData } = this.props;
    const { valueExpense, description, currency } = this.state;
    return (
      <main>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              id="value"
              name="value-expense"
              value={ valueExpense }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="description"
              name="description-expense"
              value={ description }
            />
          </label>
          {/* <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              name="currency-expense"
            >
              {
                currenciesData
                  .map(
                    (curr, index) => (
                      <option
                        value={ currency }
                        key={ index }
                      >
                        { curr }
                      </option>
                    ),
                  )
              }
            </select>
          </label> */}
          <label htmlFor="method">
            Metódo de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method-payment"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              id="category"
              name="category-expense"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesData: (data) => dispatch(currencies(data)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
