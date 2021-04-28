import axios from 'axios';
const DEVICES_API =
  'https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/';

export const getAllDevices = (token) =>
  axios.get(
    'https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/devices',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getDeviceDetails = (token, deviceId, page = 1) =>
  axios
    .get(
      `https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest?device=${deviceId}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => console.log(res.data));
