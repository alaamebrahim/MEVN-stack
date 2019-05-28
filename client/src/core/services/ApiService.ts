import axios from "axios";

export default class ApiService {
  /**
   * Prepares Auth header to be sent with each request
   * @returns {{Authorization: string}|{}}
   */
  authHeader() {
    // return authorization header with jwt token
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");

    if (user && token) {
      return { Authorization: "Bearer " + token };
    } else {
      return {};
    }
  }

  /**
   * Returns api url depends on current enironment
   * @returns {string}
   */
  getApi() {
    return "http://localhost:3000/api/";
  }

  fetch(url: string, method: string, data: any): Promise<any> {
    return axios.request({
      headers: this.authHeader(),
      method: method,
      url: this.getApi() + url,
      data: data
    });
  }
}
