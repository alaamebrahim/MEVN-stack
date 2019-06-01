import ApiService from "@/core/services/ApiService";
import NotifyService from "@/core/services/NotifyService";
import { i18n } from "@/i18n";

export default class UserService {
  apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  /**
   * get Users from database
   * @param userLogin
   */
  getUsers(): Promise<any> {
    return this.apiService
      .get("users/get-all")
      .then(res => {
        return res.data;
      })
      .catch(err => {
        NotifyService.alert(i18n.tc("general_error"));
        return {
          success: false,
          users: []
        };
      });
  }
}
