import axios from 'axios';

const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/auth/`;

// Error handler ---------------------------------------------------------------
const errorHandler = error => {
  const message =
    // (error.response && error.response.data && error.response.data.message)
    error.response?.data?.message || error.message || error.toString();
  return message;
};

// Register user ---------------------------------------------------------------
const register = async userInputs => {
  const { data } = await axios.post(endpoint + 'register', userInputs);
  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data;
};

// Login user ---------------------------------------------------------------
const login = async userData => {
  const { data } = await axios.post(endpoint + 'login', userData);
  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data;
};

// Logout user
// const logout = () => {
//   localStorage.removeItem('user');
// };

const activate = (activationToken, userToken) => {
  const { data } = axios.post(
    `${endpoint}/activate/${activationToken}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return data;
};

const authService = {
  errorHandler,
  register,
  login,
  activate,
  // logout,
};

export default authService;
