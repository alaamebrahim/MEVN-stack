import ApiService from "@/core/services/ApiService";
import NotifyService from "@/core/services/NotifyService";
import { i18n } from "@/i18n";

export default class UserService {
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
          localStorage.setItem("token", res.data.token);
          localStorage.setItem(
            "userPermissions",
            JSON.stringify(res.data.loggedUser.userPermissions)
          );
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
}
