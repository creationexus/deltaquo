import axios from 'axios';
import { BACKEND } from 'src/consts';

function Request() {
  this.client = null;
}

Request.prototype.init = function init() {
  this.client = axios.create({
    baseURL: `${BACKEND.API_URL}`,
    responseType: 'json'
  });
};

Request.prototype.getCancelTokenSource = function getCancelTokenSource() {
  const { CancelToken } = axios;
  return CancelToken.source();
};

Request.prototype.setBearerToken = function setBearerToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

Request.prototype.deleteBearerToken = function deleteBearerToken() {
  delete axios.defaults.headers.common['Authorization'];
};

Request.prototype.get = function get(url, config) {
  return this.client.get(url, config);
};

Request.prototype.post = function post(url, data, config) {
  return this.client.post(url, data, config);
};

Request.prototype.put = function put(url, data, config) {
  return this.client.put(url, data, config);
};

Request.prototype.delete = function deleteRequest(url, config) {
  return this.client.delete(url, config);
};

Request.prototype.send = function send(options) {
  return this.client.request(options);
};

const request = new Request();

export default request;