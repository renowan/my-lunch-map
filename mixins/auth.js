export default {
  methods: {
    login() {
      console.log('authMixin login')
      this.$store.dispatch('app/login').then((token) => {
        this.$cookies.set('__session', token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      })
    },
    logout() {
      this.$store.dispatch('app/logout').then((res) => {
        this.$cookies.set('__session', '', {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      })
    }
  }
}
