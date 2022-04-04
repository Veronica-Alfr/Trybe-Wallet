import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import currencies from '../actions/index';
import { currencies } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { currenciesData } = this.props;
    currenciesData();
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
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
