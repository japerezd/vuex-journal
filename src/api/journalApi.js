import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://vue-demos-cd16f-default-rtdb.firebaseio.com',
});

export default journalApi;
