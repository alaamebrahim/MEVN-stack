module.exports = {
  css: {
    loaderOptions: {
      css: {
        data: `
          @import "./src/assets/scss/_vars.scss"
        `
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
};
