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
  getUserHasRequest({ commit, state, dispatch }, order) {
    if (!order.user_id) {
      return false
    }
    return db.doc(`user/${order.user_id}/request/${order.mapid}`).get().then((doc) => {
      return doc.data() !== undefined
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
    return db.collection(`markers/${order.mapid}/list`).add(order.marker).then((doc) => {
      return true
    })
  },
  pagnation({ commit, state, dispatch }, params) {
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
  },
  permissionRequest({ commit, state, dispatch }, order) {
    order.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    const permissionOrder = {
      mapid: order.mapid,
      name: order.name,
      picture: order.picture,
      user_id: order.user_id,
      check: false,
      approve: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      requestComment: order.requestComment
    }
    const userOrder = {
      title: order.title,
      mapid: order.mapid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    return Promise.all([
      db.doc(`permissionRequest/${order.mapid}/list/${order.user_id}`).set(permissionOrder),
      db.doc(`user/${order.user_id}/request/${order.mapid}`).set(userOrder)
    ]).then((response) => {
      return response
    })
  },
  permissionRequestTest({ commit, state, dispatch }, order) {
    order.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    const permissionOrder = {
      mapid: order.mapid,
      name: order.name,
      picture: order.picture,
      user_id: order.user_id,
      check: false,
      approve: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      requestComment: order.requestComment
    }
    return Promise.all([
      db.doc(`permissionRequest/${order.mapid}/list/${order.user_id}`).set(permissionOrder),
      // db.doc(`user/${order.user_id}/request/${order.mapid}`).set(userOrder)
    ]).then((response) => {
      return response
    })
  },
  getPermissionRequest({ commit, state, dispatch }, mapid) {
    const ref = db.collection(`permissionRequest/${mapid}/list`)
    const queryRef = ref.where('check', '==', false)
    return queryRef.get().then((snapshot) => {
      const list = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        data.requestId = doc.id
        list.push(data)
      })
      return list
    })
  },
  // ユーザーが承認されたリクエストを持っているか
  getUserHasAddMarkerPermission({ commit, state, dispatch }, order) {
    if (!order.user_id) {
      return false
    }
    const { mapid } = order
    const ref = db.collection(`permissionRequest/${mapid}/list`)
    const queryRef = ref.where('user_id', '==', order.user_id)
    return queryRef.get().then((snapshot) => {
      const hasAddMarkerPermission = snapshot.empty === false
      return hasAddMarkerPermission
    })
  },
  // 編集権、リクエスト承認
  requestDecree({ commit, state, dispatch }, order) {
    const value = {
      approve: order.approve,
      check: true
    }
    return db.doc(`permissionRequest/${order.mapid}/list/${order.requestId}`).update(value).then((doc) => {
      return true
    })
  },
  getComment({ commit, state, dispatch }, order) {
    const { mapid, markerId } = order
    const ref = db.collection(`comment/${mapid}/marker/${markerId}/list`)
    const queryRef = ref.orderBy('createdAt', 'asc')
    return queryRef.get().then((snapshot) => {
      const list = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        data.commentId = doc.id
        list.push(data)
      })
      return list
    })
  },
  removeMarker({ commit, state, dispatch }, order) {
    // return Promise.all([
    //   db.doc(`permissionRequest/${order.mapid}/list/${order.user_id}`).set(permissionOrder),
    // ]).then((response) => {
    //   return response
    // })
  },
  sendComment({ commit, state, dispatch }, order) {
    const commentData = {
      comment: order.comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: order.user.name,
      picture: order.user.picture,
      user_id: order.user.user_id
    }
    return db.collection(`comment/${order.mapid}/marker/${order.markerId}/list`).add(commentData).then((doc) => {
      return doc.get().then((r) => {
        const result = r.data()
        result.commentId = r.id
        return result
      })
    })
  }
}
