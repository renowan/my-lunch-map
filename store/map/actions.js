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
  getMap({ commit, state, dispatch }, count) {
    return db.collection('map')
      .orderBy('createdAt', 'desc')
      .limit(count)
      .get()
      .then((snapshot) => {
        const mapList = []
        snapshot.forEach((doc) => {
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
  },
  getMapMarkers({ commit, state, dispatch }, mapid) {
    return db.collection(`markers/${mapid}/list`).get().then((snapshot) => {
      const list = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        data.infoText = doc.title
        list.push(data)
      })
      return list
    })
  },
  pushMarker({ commit, state, dispatch }, order) {
    order.marker.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    return db.collection(`markers/${order.mapId}/list`).add(order.marker).then((doc) => {
      return true
    })
  },
  pagnation({ commit, state, dispatch }, params) {
    console.log('params', params)
    const { count, page } = params
    const offset = count * page

    const createList = (snapshot) => {
      const list = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        list.push(data)
      })
      return list
    } 

    if (offset === 0) {
      // 先頭の取得
      return db.collection('map')
        .orderBy('createdAt', 'desc')
        .limit(count)
        .get()
        .then((snapshot) => {
          return createList(snapshot)
        })
    } else {
      // ページネーション
      const first = db
        .collection('map')
        .orderBy('createdAt', 'desc')
        .limit(offset)

      return first.get().then((documentSnapshots) => {
        const firstList = []
        documentSnapshots.forEach((doc) => {
          firstList.push(doc.data())
        })
        // Get the last visible document
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]

        // Construct a new query starting at this document,
        // get the next 25 cities.
        const next = db
          .collection('map')
          .orderBy('createdAt', 'desc')
          .startAfter(lastVisible)
          .limit(count)
        return next.get().then((snapshot) => {
          return createList(snapshot)
        })
      })
    }

    // return db.collection('map')
    //   .orderBy('createdAt', 'desc')
    //   .startAfter(offset)
    //   .limit(6)
    //   .get()
    //   .then((snapshot) => {
    //     console.log('snapshot', snapshot)
    //     const list = []
    //     snapshot.forEach((doc) => {
    //       const data = doc.data()
    //       data.id = doc.id
    //       list.push(data)
    //     })
    //     return list
    //   })
  }
}
