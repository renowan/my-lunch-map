<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-xs-6 pt10">
          <h2 class="mb20">
            API Test
          </h2>

          <p>誰でも編集できるシェアマップ: isLoading: {{ isLoading }}</p>

          <ul class="icon-list">
            <li>
              <a class="btn btn-default" @click="login">Login</a>
              <a class="btn btn-default" @click="logout">Logout</a>
              <a class="btn btn-default" @click="check">check</a>
              <a class="btn btn-default" @click="checkFunctions">check functions</a>
              <a class="btn btn-default" @click="createMap">create map</a>
              <a class="btn btn-default" @click="testMarker">testMarker</a>
              <a class="btn btn-default" @click="getMapList">get map</a>
            </li>
          </ul>

          <ul class="icon-list">
            <li v-for="(myMap, index) in mapList" :key="index">
              {{ myMap.name }}
            </li>
          </ul>
        </div>
        <div class="col-xs-6">
          <h2>User: {{ isLogin }}</h2>
          <ul class="icon-list" v-if="user">
            <li>{{ user.name }}</li>
            <li>{{ user.user_id }}</li>
          </ul>
        </div>
        <div class="col-xs-12">
          <h2>Map</h2>
          <ul class="icon-list">
            <li>center: {{ mapInfo.center.lat }}, {{ mapInfo.center.lng }}</li>
            <li>lat: {{ mapInfo.lat }}, {{ mapInfo.lng }}</li>
          </ul>
        </div>
        <div class="col-xs-12">
          <gmap-place-input :default-place="place"
      @place_changed="setPlace" />
        </div>
      </div>
    </div>
    <div class="map" id="map">
      <GmapMap
        :center="mapInfo.moveTo"
        :zoom="16"
        ref="map"
        map-type-id="roadmap"
        style="width: 100%; height: 100%"
        @center_changed="onCenterChanged"
        @bounds_changed="onBoundsChanged"
        @click="onCLickMap"
      >
        <gmap-info-window 
        :options="infoOptions" 
        :position="infoWindowPos" 
        :opened="infoWinOpen" 
        @closeclick="infoWinOpen = false">
          {{infoContent}}
        </gmap-info-window>
        <gmap-marker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="onClickMarker(m, index)"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
import auth from '~/plugins/auth'

export default {
  components: {
  },
  data() {
    return {
      foo: 0,
      mapList: [],

      // search
      place: '五反田',

      // map
      mapInfo: {
        moveTo: {
          lat: 35.6261591,
          lng: 139.72360219999996
        },
        center: {
          lat: 35.6261591,
          lng: 139.72360219999996
        },
        lat: { min: 0, max: 1 },
        lng: { min: 0, max: 1 }
      },
      

      // pin info
      infoWinOpen: false,
      infoWindowPos: null,
      currentMidx: null,
      infoContent: '',
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },

      // markers
      markers: [
        { position: { lat: 35.62538031935461, lng: 139.7222545873468 }, infoText: 'お店 1' },
        { position: { lat: 35.62387147595666, lng: 139.72152502649476 }, infoText: 'お店 2' }
      ]
    }
  },
  async asyncData({ store, app }) {
    const token = app.$cookies.get('__session')
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    const mapList = await store.dispatch('app/getMap')

    return { mapList }
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      user: 'app/user',
      isLoading: 'app/isLoading',
      isLogin: 'app/isLogin'
    }), {
    }
  ),
  created() {
  },
  methods: {
    login() {
      this.$store.dispatch('app/login').then((user) => {
        firebase.auth().currentUser.getIdToken().then((token) => {
          this.$cookies.set('__session', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
        })
      })
    },
    logout() {
      console.log('logout')
      this.$store.dispatch('app/logout').then((res) => {
        console.log('logout', res)
      })
    },
    check() {
      const user = firebase.auth().currentUser
      console.log('check user', user)
      if (user) {
        firebase.auth().currentUser.getIdToken().then((res) => {
          console.log('check res', res)
        })
      }
    },
    checkFunctions() {
      const user = firebase.auth().currentUser
      console.log('checkFunctions user', user)
      if (user) {
        firebase.auth().currentUser.getIdToken().then((token) => {
          console.log('currentUser token', token)
          this.$cookies.set('__session', token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          const headers = { 'Authorization': `Bearer ${token}` }
          this.$axios.get('https://us-central1-my-lunch-map.cloudfunctions.net/app', { headers }).then((res) => {
            console.log('res', res)
          })
        })
      }

    },
    createMap() {
      this.$store.dispatch('app/createMap', {
        name: 'agoagioagio',
        lat: 123,
        lng: 244
      })
    },
    hello() {
      console.log('this', this.$store.commit('app/isLoading', true))
    },
    getMapList() {
      this.$store.dispatch('app/getMap')
    },
    onCenterChanged (center) {
      this.mapInfo.center = {lat: center.lat(), lng: center.lng()}
    },
    onBoundsChanged (bounds) {
      console.log('bounds', bounds)
      if (bounds) {
        this.mapInfo.lat = {min: bounds.ga.j, max: bounds.ga.l}
        this.mapInfo.lng = {min: bounds.ma.j, max: bounds.ma.l}
      }
    },
    setPlace(place) {
      this.mapInfo.moveTo = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      console.log('lat', place.geometry.location.lat())
      console.log('lng', place.geometry.location.lng())
    },
    onClickMarker(marker, index) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.infoText
      if (this.currentMidx == index) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true
        this.currentMidx = index
      }
    },
    onCLickMap(obj) {
      const position = {
        lat: obj.latLng.lat(),
        lng: obj.latLng.lng()
      }
      this.markers.push({
        position,
        infoText: '新しいお店'
      })
      this.infoWinOpen = true
      this.currentMidx = this.markers.length - 1
      this.infoWindowPos = position
      this.infoContent = '新しいお店'
    },
    testMarker() {
      this.infoWinOpen = true
      this.currentMidx = 1
      this.infoWindowPos = this.markers[1].position
      this.infoContent = this.markers[1].infoText
    }
  }
}
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 60%;
}
</style>
