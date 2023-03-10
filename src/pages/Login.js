import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isUserInfos from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabledButtonSave: true,
    };
  }

  inputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    () => this.validationUser());
  }

  validationUser = () => {
    const { password, email } = this.state;
    const caracters = 6;
    const passValidate = password.length >= caracters;
    const validationEmail = /\S+@\S+\.\S+/;
    const emailValidate = validationEmail.test(email);
    if (emailValidate && passValidate) {
      this.setState({ disabledButtonSave: false });
    } else {
      this.setState({ disabledButtonSave: true });
    }
  };

  // fonte do Regex: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/

  handleClick = () => {
    const { history, saveUserData } = this.props; // salvar só email ou senha tbm?
    saveUserData(this.state);
    this.setState({
      email: '',
      password: '',
      disabledButtonSave: true,
    });
    history.push('/carteira');
  }

  render() {
    const { email, password, disabledButtonSave } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            id="email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.inputChange }
          />
        </label>
        <label htmlFor="pass">
          Senha:
          <input
            data-testid="password-input"
            id="pass"
            type="text"
            name="password"
            value={ password }
            onChange={ this.inputChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabledButtonSave }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (infoUser) => dispatch(isUserInfos(infoUser)),
});

Login.propTypes = {
  saveUserData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
