import axios from 'axios'
import firebase from '~/plugins/firebase'
const db = firebase.firestore()

const functionsUrl = process.env.FUNCTIONSURL

export default {
  createMap({ commit, state, dispatch }, data) {
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    return db.collection('map').add(data).then((res) => {
      return res.id
    })
  },
  getMap({ commit, state, dispatch }, data) {
    return db.collection('map').get().then((snapshot) => {
      const mapList = []
      snapshot.forEach((doc) => {
        console.log('doc', doc.get('created_at'))
        const data = doc.data()
        data.id = doc.id
        mapList.push(data)
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
