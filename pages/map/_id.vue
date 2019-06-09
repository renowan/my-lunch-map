<template>
  <div>

    <div class="header bg-gradient-primary pt-2 pt-md-6" v-if="mapDetail">
      <div class="container-fluid">
        <div class="header-body">
          {{ mapDetail.title }}
          <small>作成者: {{ mapDetail.ownerName }}</small>

          <!-- <div class="float-right edit-icon mt-4">
            <div class="icon icon-shape bg-info text-white rounded-circle shadow">
              <i class="ni ni-pin-3"></i>
            </div> <span class="edit-icon-text">ピン追加</span>
          </div> -->

          <p class="mb-n" v-if="mapDetail.description">{{ mapDetail.description }}</p>

        </div>
      </div>
    </div>

    <div class="container-fluid mt--7">

      <div class="row">
        <div class="col-4">
          <div class="card card-stats border-0 pin-list-wapper">
            <div class="card-header">
              {{ cardTitle }}

              <button 
              v-if="showAddMarkerBtn"
              class="btn btn-icon btn-3 btn-primary btn-sm btn-add-marker" 
              type="button" 
              @click="switchToAddMarkerMode">
                <span class="btn-inner--icon"><i class="ni ni-pin-3"></i></span>
                <span class="btn-inner--text">ピン追加</span>
              </button>

            </div>

            <div class="pin-list-box" v-if="!isAddMarkerMode">
              <ul>
                <marker-list 
                v-for="(marker, index) in myMarkers" 
                :key="index" 
                :marker="marker"
                :index="index"
                :current-marker-index="currentMarkerIndex"
                @on-click-mark-list="onClickMarkList" />
              </ul>
            </div>

            <new-marker-form
            v-else
            :user-name="userName"
            :new-marker="newMarker"
            :isLogin="isLogin"
            @push-marker="pushMarker"
            @add-marker-cancel="addMarkerCancel" />

          </div>
        </div>
        <div class="col-8">
          <div class="card card-stats border-0">
            <div class="card shadow border-0">
              <ShareMap 
              v-model="center" 
              :markers="myMarkers"
              :draggable="draggable"
              :info-win-open="infoWinOpen"
              :info-window-pos="infoWindowPos"
              :info-content="infoContent"
              height="600px"
              @on-click-marker="onClickMarkList"
              @add-marker="addMarker"
              @close-info-win="closeInfoWin" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex'
import ShareMap from '~/components/pages/map/ShareMap.vue'
import MyMap from '~/components/MyMap.vue'
import MarkerList from '~/components/pages/map/MarkerList.vue'
import NewMarkerForm from '~/components/pages/map/NewMarkerForm.vue'
import TextInput from '~/components/form/TextInput.vue'

export default {
  name: 'map-page',
  async asyncData({ store, app, params }) {
    const mapid = params.id
    if (!mapid) {
      return { error: true }
    }

    return Promise.all([
      store.dispatch('map/getMapDetail', mapid),
      store.dispatch('map/getMapMarkers', mapid)
    ]).then(response => {
      const mapDetail = response[0]
      console.log('mapDetail', mapDetail)
      const markers = response[1]
      if (!mapDetail.title) {
        return { noFind: true }
      }
      const center = mapDetail.center
      return { mapDetail, center, mapid, markers }
    })
  },
  components: {
    ShareMap,
    MarkerList,
    NewMarkerForm,
    TextInput
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      user: 'app/user',
      isLoading: 'app/isLoading',
      isLogin: 'app/isLogin'
    }), {
      permissionLabel() {
        const mapDetail = this.mapDetail
        const user = this.user
        if (!mapDetail) {
          return 0
        }

        if (!user) {
          return 2
        }

        // Owner
        if (mapDetail.user_id === user.user_id) {
          return 1
        }

        // 2 = 編集不可, 3 = 誰でも
        return mapDetail.permission === 0 ? 2 : 3
      },
      // 編集モードで出し分ける
      myMarkers() {
        if (this.isAddMarkerMode) {
          return this.newMarker
        }
        return this.markers
      },
      cardTitle() {
        return this.isAddMarkerMode ? '新規ピン' : 'ピン一覧'
      },
      userName() {
        return this.user ? this.user.name : 'タイヤーセールスマン'
      },
      // マップを作成された本人
      isOnwer() {
        if (!this.mapDetail || !this.user || !this.isLogin) {
          return false
        }
        return this.mapDetail.user_id === this.user.user_id
      },
      // マーカー追加のボタン表示・非表示
      showAddMarkerBtn() {
        return this.isOnwer && !this.isAddMarkerMode
      }
    },
  ),
  watch: {},
  data () {
    return {
      mapid: '',
      mapDetail: null,
      // マーカーがドラッグ移動できるか
      draggable: false,
      noFind: false,
      error: false,

      // 既存マーカー
      markers: [],
      // 新規作成マーカー用
      newMarker: [],
      isAddMarkerMode: false,
      showCreateMarkerModal: false,
      // どのマーカーを選択してるか
      currentMarkerIndex: -1,

      // markerのinfo表示
      infoWinOpen: false,
      infoWindowPos: null,
      infoContent: '',

      // マップの中心点
      center: {
        lat: 10,
        lng: 10
      },
    }
  },
  created () {
  },
  methods: {
    resetCenter() {
      this.center = this.mapDetail.center
    },
    addMarker(obj) {
      if (!this.isAddMarkerMode || this.newMarker.length > 0) {
        console.log('return')
        return
      }
      console.log('addMarker', obj)
      this.newMarker.push(obj)
    },
    switchToAddMarkerMode() {
      this.newMarker = []
      this.isAddMarkerMode = true
      this.draggable = true
    },
    addMarkerCancel() {
      this.newMarker = []
      this.isAddMarkerMode = false
      this.draggable = false
    },
    // 新しいマーカーをサーバーに送信
    pushMarker(order) {
      const data = {
        mapId: this.mapid,
        marker: {
          user: this.user,
          description: order.description,
          position: this.newMarker[0].position,
          title: order.title
        }
      }
      this.$store.dispatch('map/pushMarker', data).then(() => {
        this.isAddMarkerMode = false
        this.$store.dispatch('map/getMapMarkers', this.mapid).then(markers => {
          this.markers = markers
        })
      })
    },
    onClickMarkList(index) {
      console.log('onClickMarkList', index)
      // this.markers[index]. = 
      const markers = this.markers.slice(0)
      markers.forEach((elm, i) => {
        if (index === i) {
          markers[i].animation = 1
          this.infoWindowPos = markers[i].position
          this.infoContent = markers[i].title
        } else {
          markers[i].animation = -1
        }
      })
      this.markers = markers
      this.currentMarkerIndex = index
      this.infoWinOpen = true
    },
    closeInfoWin() {
      this.infoWinOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-body {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  padding-bottom: 8rem;
}

.pin-list-wapper {
  min-height: 600px;
}
.map-wapper {
  min-height: 600px;
}

.pin-list-box {
  height: 536px;
  overflow-y: scroll;

  ul {
    margin: 0;
    padding: 0;
  }

  // li {
  //   list-style: none;
  //   padding: .5rem 1.5rem;
  // }
}

.edit-icon-text {
  font-size: 1.4rem;
}

.btn-add-marker {
  position: absolute;
  top: 16px;
  right: 20px;
}
</style>