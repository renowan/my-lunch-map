import firebase from '~/plugins/firebase'
import axios from 'axios'
// const db = firebase.firestore()

const functionsUrl = process.env.FUNCTIONSURL

export default {
  async login({ commit, state, dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider)
    const token = await firebase.auth().currentUser.getIdToken()
    const headers = { 'Authorization': `Bearer ${token}` }
    const userResponse = await axios.get(`${functionsUrl}/app`, { headers })

    /* eslint-disable camelcase */
    const { user_id, name, picture, email, email_verified, auth_time } = userResponse.data

    const user = {
      user_id,
      name,
      picture,
      email,
      email_verified,
      auth_time
    }

    commit('user', user)
    commit('isLogin', true)

    return new Promise((resolve, reject) => {
      resolve(token)
    })
  },
  logout({ commit, state, dispatch }) {
    // return new Promise((resolve, reject) => {
    //   firebase.auth().signOut().then(() => {
    //     commit('user', null)
    //     commit('isLogin', false)
    //     resolve()
    //   })
    // })

    return firebase.auth().signOut().then(() => {
      commit('user', null)
      commit('isLogin', false)
    })
  }
}
