export interface AppConfig {
  apiUrl: string;
  appTitle: string;
  maxLoginTries: number;
  secondsToBlockUserLogin: number;
}

const appConfig = {

  /**
   * API url
   */
  apiUrl: "http://localhost:3000/api/",
  /**
   * Application title.
   */
  appTitle: "APP",
  /**
   * Max login tries before app
   * prevents user from attempting
   * to login again
   */
  maxLoginTries: 3,
  /**
   * Time in seconds that user
   * will not be ale to login after
   * he reaches max login tries
   */
  secondsToBlockUserLogin: 10
};

export default appConfig;
