import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencies, fetchAPI, getData } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valueExpense: 0,
      description: '',
      currency: '',
      method: '',
      category: '',
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

  saveDataForm = () => {
    const { formData, stateGlobal } = this.props;
    const obj = {
      id: 0,
      ...this.state,
      exchangeRates: formData(),
    };
    stateGlobal(obj);
  }

  // Ajuda de Kleverson Eller (Tribo C) no requisito 6.

  render() {
    const { email, currenciesExpenses, expenses } = this.props;
    const { valueExpense, description, currency, method, category } = this.state;
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
              onChange={ this.inputChange }
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
              onChange={ this.inputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              name="currency-expense"
              value={ currency }
              onChange={ this.inputChange }
            >
              {
                currenciesExpenses
                  .map(
                    (curr) => (
                      <option
                        key={ curr }
                      >
                        { curr }
                      </option>
                    ),
                  )
              }
            </select>
          </label>
          <label htmlFor="method">
            Metódo de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method-payment"
              value={ method }
              onChange={ this.inputChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              id="category"
              name="category-expense"
              value={ category }
              onChange={ this.inputChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={ this.saveDataForm }>Adicionar despesa</button>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Metódo de Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio Utilizado</th>
            <th>Valor Convertido</th>
            <th>Moeda de Conversão</th>
          </tr>
          {/* <td>{ test[0].description }</td> */}
          {
            expenses.map(
              (expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                </tr>),
            )
          }
        </table>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currenciesExpenses: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesData: (data) => dispatch(currencies(data)),
  dataAPI: () => dispatch(fetchAPI()),
  stateGlobal: (state) => dispatch(getData(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesData: PropTypes.func.isRequired,
  currenciesExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  formData: PropTypes.func.isRequired,
  stateGlobal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
