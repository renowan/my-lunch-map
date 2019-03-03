// import auth from '~/plugins/auth'
// import firebase from '~/plugins/firebase'

export default function ({ store, redirect, app }) {
  if (process.server) {
    const token = app.$cookies.get('__session')

    if (token === '') {
      console.log('token なし')
      return
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    }

    return app.$axios.get('https://us-central1-my-lunch-map.cloudfunctions.net/app', { headers }).then((res) => {
      /* eslint-disable camelcase */
      const { user_id, name, picture, email, email_verified, auth_time, firebase } = res.data
      // console.log('res.data', res.data)
      const user = {
        user_id,
        name,
        picture,
        email,
        email_verified,
        auth_time,
        firebase
      }
      store.commit('app/user', user)
      store.commit('app/isLogin', true)
    }).catch((error) => {
      console.log('no login', error.response.data)
    })
  }
}
