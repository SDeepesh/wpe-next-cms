import axios from 'axios';

const apiRoot = 'atlas-search/v1/';

export default axios.create({
  baseURL: `${window.wpApiSettings.root}${apiRoot}`,
  headers: { 'X-WP-NONCE': window.wpApiSettings.nonce },
});
