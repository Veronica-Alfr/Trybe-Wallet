import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            id="email"
          />
        </label>
        <label htmlFor="pass">
          Senha:
          <input
            data-testid="password-input"
            id="pass"
          />
        </label>
        <button type="button">Entrar</button>
      </form>
    );
  }
}

export default Login;
