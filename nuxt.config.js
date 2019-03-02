const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/static/css/bootstrap.min.css',
    '@/static/skin/default_skin/css/theme.css',
    '@/static/css/customize.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue2-google-maps.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    timeout: 10000
  },

  vendor: ['vue2-google-maps'],

  env: {
    APIKEY: 'AIzaSyCkwSUwAoX1aLBVOqI5BgyZoemNvj3Mh48',
    AUTHDOMAIN: 'my-lunch-map.firebaseapp.com',
    DATABASEURL: 'https://my-lunch-map.firebaseio.com',
    PROJECTID: 'my-lunch-map',
    STORAGEBUCKET: 'my-lunch-map.appspot.com',
    MESSAGINGSENDERID: '150983543226',
    GOOGLE_MAPS_API_KEY: 'AIzaSyDuakEHdU68nsCD1iIQmLYTMDbYUaruNxU'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
      config.externals = config.externals || []
      if (!ctx.isClient) {
        config.externals.splice(0, 0, (context, request, callback) => {
          if (/^vue2-google-maps($|\/)/.test(request)) {
            callback(null, false)
          } else {
            callback()
          }
        })
      }
    }

  }
}
