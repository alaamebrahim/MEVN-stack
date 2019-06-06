module.exports = {
  pluginOptions: {
    css: {
      loaderOptions: {
        css: {
          data: `@import "./src/assets/scss/_base.scss"`
        }
      }
    },
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
