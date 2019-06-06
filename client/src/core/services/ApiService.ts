import axios from "axios";
import LoginService from "@/core/services/LoginService";
import appConfig from "@/core/config/app.config";
export default class ApiService {
  /**
   * Prepares Auth header to be sent with each request
   * @returns {{Authorization: string}|{}}
   */
  protected authHeader() {
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
   * @returns string
   */
  getApi(url: string): string {
    return appConfig.apiUrl + url;
  }

  /**
   * Make REQUESTS of any provided type
   * @param url
   * @param method
   * @param data
   * @return Promise<any>
   */
  fetch(url: string, method: any, data: any): Promise<any> {
    return axios.request({
      headers: this.authHeader(),
      method: method,
      url: this.getApi(url),
      data: data,
    });
  }

  /**
   * Make GET requests to backend api
   * @param url
   * @return Promise<any>
   */
  get(url: string): Promise<any> {
    return axios.get(this.getApi(url), {
      method: "GET",
      headers: this.authHeader()
    });
  }

  /**
   * Make POST requests to backend api
   * @param url
   * @param body
   */
  post(url: string, body: any) {
    return axios.post(this.getApi(url), body, {
      headers: this.authHeader()
    });
  }
}
