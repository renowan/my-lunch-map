import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export default {
  login({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((user) => {
        resolve(user)
      })
    })
  },
  logout({ commit, state, dispatch }) {
    return firebase.auth().signOut()
  },
  test({ commit, state, dispatch }, data) {
    console.log('test', data)
  },
  createMap({ commit, state, dispatch }, data) {
    db.collection('map').add(data).then((res) => {
      console.log('res', res)
    })
  },
  getMap({ commit, state, dispatch }, data) {
    return db.collection('map').get().then((snapshot) => {
      const mapList = []
      snapshot.forEach((doc) => {
        mapList.push(doc.data())
      })
      return mapList
    })
  }
}
