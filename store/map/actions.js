import axios from 'axios'
import firebase from '~/plugins/firebase'
const db = firebase.firestore()

const functionsUrl = process.env.FUNCTIONSURL

export default {
  createMap({ commit, state, dispatch }, data) {
    return db.collection('map').add(data).then((res) => {
      return res.id
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
  },
  getUser({ commit, state, dispatch }, uid) {
    return axios.get(`${functionsUrl}/getUser`, { params: { uid } })
  },
  getMapDetail({ commit, state, dispatch }, mapid) {
    return db.doc(`map/${mapid}`).get().then((doc) => {
      return doc.data()
    })
  }
}
