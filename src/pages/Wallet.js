import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencies, getData } from '../actions/index';

const alimentacao = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
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

  saveDataForm = async () => {
    const { stateGlobal } = this.props;
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const obj = {
        ...this.state,
        exchangeRates: data,
      };
      stateGlobal(obj);
      this.setState((prev) => ({
        id: prev.id + 1,
        value: 0.00,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: alimentacao,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  // Ajuda de Thiago Zardo, Laís Nametala e Kleverson Eller (Tribo C), Lazáro Andriola, e
  // Gabriel Pinheiro (na monitoria) no requisito 6.

  sumWithExchange = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return expenses.reduce((acc, curr) => {
        acc += Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask);
        return acc;
      }, 0).toFixed(2);
    }
    return 0;
  }

  render() {
    const { email, currenciesExpenses, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <main>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{this.sumWithExchange()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              id="value"
              name="value"
              value={ value }
              onChange={ this.inputChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.inputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
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
              name="method"
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
              name="tag"
              value={ tag }
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
          <thead>
            <tr>
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
          </thead>
          {
            expenses.map(
              (expense) => (
                <tbody key={ expense.id }>
                  <tr>
                    <td>{ expense.description }</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{Number(expense.value).toFixed(2)}</td>
                    <td>{expense.exchangeRates[expense.currency].name}</td>
                    <td>
                      {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                    </td>
                    <td>
                      {(Number(expense.value)
                      * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      <button type="button">Editar</button>
                      <button type="button">Excluir</button>
                    </td>
                  </tr>
                </tbody>),
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
  stateGlobal: (obj) => dispatch(getData(obj)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesData: PropTypes.func.isRequired,
  currenciesExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  stateGlobal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
