import axios from 'axios';

const LOGIN_API =
  'https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/login';
export const login = async (username, password) => {
  const token = await axios
    .post(
      LOGIN_API,
      {},
      {
        auth: {
          username,
          password,
        },
      }
    )
    .then((res) => res.data.token);
  return token;
};
