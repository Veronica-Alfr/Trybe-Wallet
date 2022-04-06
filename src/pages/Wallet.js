import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currencies, getData } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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

  // changeId = () => {
  //   const test = ;
  // }

  saveDataForm = async () => {
    const { stateGlobal } = this.props;
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      console.log(data);
      const obj = {
        id: 0,
        ...this.state,
        exchangeRates: data,
      }; // id: state.id + 1 ?
      console.log(data);
      stateGlobal(obj);
    } catch (error) {
      console.error(error);
    }
  }

  // Ajuda de Thiago Zardo, Laís Nametala e Kleverson Eller (Tribo C) no requisito 6.
  // Não consigo alterar os dados do form

  sumWithExchange = () => {
    const { expenses } = this.props;
    console.log(expenses);
    // const exchange = expenses.reduce(()); // posso usar forEach
    // value, exchangeRates e currency estão em expenses; expenses[value]
    // pegar a moeda de conversão
    // 100 em USD deve ser 456 reais, por ex -> ask: 4.56
  }

  render() {
    const { email, currenciesExpenses, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
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
          {/* <td>{ test[0].description }</td> */}
          {
            expenses.map(
              (expense) => (
                <tbody key={ expense.id }>
                  <tr>
                    <td>{ expense.description }</td>
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
  // dataAPI: () => dispatch(fetchAPI()),
  stateGlobal: (obj) => dispatch(getData(obj)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesData: PropTypes.func.isRequired,
  currenciesExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  // dataAPI: PropTypes.func.isRequired,
  stateGlobal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
