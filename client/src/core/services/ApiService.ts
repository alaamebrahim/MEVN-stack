import axios from "axios";
import LoginService from "@/core/services/LoginService";

export default class ApiService {
  /**
   * Prepares Auth header to be sent with each request
   * @returns {{Authorization: string}|{}}
   */
  authHeader() {
    // return authorization header with jwt token
    let token = LoginService.getUserToken();
    let user =
      LoginService.getUserData() === null
        ? null
        : LoginService.getUserData().loggedUser;
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

  get(url: string): Promise<any> {
    return axios.get(this.getApi() + url, {
      method: "GET",
      headers: this.authHeader()
    });
  }
}
