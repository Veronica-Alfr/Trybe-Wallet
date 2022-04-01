// Coloque aqui suas actions
export const INFOS_USER = 'INFOS_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';

const isUserInfos = ({ email }) => ({ type: INFOS_USER, email });

export const getDataCurrencies = (data) => ({ type: GET_CURRENCIES, data });

export const currencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const dataFilter = data.filter((currencie) => currencie !== currencie.USDT);
    dispatch(getDataCurrencies(dataFilter));
    console.log(dataFilter);
  } catch (error) {
    console.error(error);
  }
};

export default isUserInfos;
