import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyDcAGDq0RHHD3HfDnPstVzK6JtZoNV90hc',
  }
});

export default authApi;
