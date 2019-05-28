import ApiService from "@/core/services/ApiService";
import NotifyService from "@/core/services/NotifyService";

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
          NotifyService.alert("Bad login information provided!");
          return {
            success: false,
            user: null
          };
        }

        if (res.data && res.data.code === 200) {
          NotifyService.success(
            "Login successful! Welcome back, " + res.data.loggedUser.name
          );

          // save token to localStorage
          localStorage.setItem("token", res.data.token);

          // returned object
          return {
            success: true,
            user: res.data.loggedUser
          };
        }
      })
      .catch(err => {
        NotifyService.alert("An error has happened");
        return {
          success: false,
          user: null
        };
      });
  }
}
