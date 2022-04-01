// Coloque aqui suas actions
export const INFOS_USER = 'INFOS_USER';

const isUserInfos = ({ email }) => ({ type: INFOS_USER, email });

export default isUserInfos;
