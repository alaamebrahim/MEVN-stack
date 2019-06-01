import ApiService from "@/core/services/ApiService";
import NotifyService from "@/core/services/NotifyService";
import { i18n } from "@/i18n";

export default class LoginService {
  apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  /**
   * Login process
   * @param userLogin
   */
  postLogin(userLogin: any): Promise<any> {
    return this.apiService
      .fetch("users/login", "post", userLogin)
      .then(res => {
        if (
          !res.data ||
          res.data.code === undefined ||
          (res.data && res.data.code === 401)
        ) {
          NotifyService.alert(i18n.tc("login.bad_credentials"));
          return {
            success: false,
            user: null
          };
        }

        if (res.data && res.data.code === 200) {
          const username = res.data.loggedUser.name;
          NotifyService.success(
            i18n
              .t("login.login_success", {
                username: username
              })
              .toString()
          );
          // save token to localStorage
          localStorage.setItem("userData", JSON.stringify(res.data));
          // returned object
          return {
            success: true,
            user: res.data.loggedUser
          };
        }
      })
      .catch(err => {
        NotifyService.alert(i18n.tc("login.general_error"));
        return {
          success: false,
          user: null
        };
      });
  }

  /**
   * Checks if there is logged in user or not
   */
  static isAuthenticated(): boolean {
    const userDataObj = this.getUserData();
    if (userDataObj === null) {
      return false;
    }
    return !(userDataObj.token === null || userDataObj.loggedUser === null);
  }

  /**
   * Removes authenticated user localStorage
   */
  static unAuthenticateUser() {
    localStorage.removeItem("userData");
  }

  /**
   * Get logged user token || null
   */
  static getUserToken() {
    if (this.isAuthenticated()) {
      return this.getUserData().token;
    }
    return null;
  }

  /**
   * Get logged user object from storage.
   */
  static getUserData() {
    const userData = localStorage.getItem("userData");
    if (userData === null) return null;
    return JSON.parse(userData);
  }
}
