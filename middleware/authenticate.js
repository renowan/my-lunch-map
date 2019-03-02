// import auth from '~/plugins/auth'
// import firebase from '~/plugins/firebase'

export default function ({ store, redirect, app }) {
  if (process.server) {
    const token = app.$cookies.get('__session')
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return app.$axios.get('https://us-central1-my-lunch-map.cloudfunctions.net/app', { headers }).then((res) => {
      /* eslint-disable camelcase */
      const { user_id, name, picture, email, email_verified, auth_time } = res.data
      const user = {
        user_id,
        name,
        picture,
        email,
        email_verified,
        auth_time
      }
      store.commit('app/user', user)
      store.commit('app/isLogin', true)
    }).catch((error) => {
      console.log('no login', error)
    })
  }
}
