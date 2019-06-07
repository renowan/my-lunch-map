<template>
  <div>

    <div class="header bg-gradient-primary pt-2 pt-md-6">
      <div class="container-fluid">
        <div class="header-body">
          {{ mapDetail.name }}
          <small>作成者: {{ mapDetail.creatorName }}</small>

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
      <!-- <div class="row mb-3" v-if="!isAddMarkerMode">
        <div class="col-12 text-right">
          <button type="button" class="btn btn-info btn-sm" @click="switchToAddMarkerMode" key="btn-switchToAddMarkerMode">ピン追加</button>
        </div>
      </div> -->
      <!-- <div class="row mb-3" v-else>
        <div class="col-12 text-right">
          <button type="button" class="btn btn-info btn-sm" @click="addMarkerExe" key="btn-addMarkerExe">ここに決定</button>
          <button type="button" class="btn btn-secondary btn-sm" @click="addMarkerCancel" key="btn-addMarkerCancel">キャンセル</button>
        </div>
      </div> -->
      <div class="row">
        <div class="col-4">
          <div class="card card-stats border-0 pin-list-wapper">
            <div class="card-header">
              {{ cardTitle }}

              <button 
              v-if="!isAddMarkerMode"
              class="btn btn-icon btn-3 btn-primary btn-sm btn-add-marker" 
              type="button" 
              @click="switchToAddMarkerMode">
                <span class="btn-inner--icon"><i class="ni ni-pin-3"></i></span>
                <span class="btn-inner--text">ピン追加</span>
              </button>

            </div>

            <div class="pin-list-box" v-if="!isAddMarkerMode">
              <ul>
                <pin-list />
                <pin-list />
                <pin-list />
              </ul>
            </div>

            <div class="card-body" v-else>
              <TextInput v-model="newMarkerObj.name" label="作成者名" placeholder="作成者名" required :max="30" :show-error="showError" />
              <TextInput v-model="newMarkerObj.description" label="コメント" placeholder="コメント" type="textarea" :max="200" />
              <!-- <div class="row">
                <div class="col-6">
                  <button type="button" class="btn btn-primary btn-block" @click="onCreateMarker">作成</button>
                </div>
              </div> -->
              <button type="button" class="btn btn-primary btn-block mb-2" @click="onCreateMarker">作成</button>
              <button type="button" class="btn btn-secondary btn-block mb-2" @click="addMarkerCancel">キャンセル</button>
            </div>

          </div>
        </div>
        <div class="col-8">
          <div class="card card-stats border-0">
            <div class="card shadow border-0">
              <ShareMap 
              v-model="mapDetail.center" 
              :markers="myMarkers"
              :draggable="draggable"
              height="600px" 
              @add-marker="addMarker" />
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
import PinList from '~/components/pages/map/PinList.vue'
import TextInput from '~/components/form/TextInput.vue'

export default {
  name: 'map-page',
  async asyncData({ store, app, params }) {
    const mapid = params.id
    if (!mapid) {
      return { error: true }
    }
    const mapDetail = await store.dispatch('map/getMapDetail', mapid)
    if (!mapDetail.name) {
      return { noFind: true }
    }
    return { mapDetail }
  },
  components: {
    ShareMap,
    PinList,
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
        if (mapDetail.user.user_id === user.user_id) {
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
      }
    },
  ),
  watch: {},
  data () {
    return {
      mapDetail: null,
      // マーカーがドラッグ移動できるか
      draggable: false,
      noFind: false,
      error: false,

      // 既存マーカー
      markers: [
        { position: { lat: 35.62538031935461, lng: 139.7222545873468 }, infoText: 'お店 1' },
        { position: { lat: 35.62387147595666, lng: 139.72152502649476 }, infoText: 'お店 2' }
      ],
      // 新規作成マーカー用
      newMarker: [],
      isAddMarkerMode: true,
      showCreateMarkerModal: false,

      showError: false,
      newMarkerObj: {
        name: '',
        description: ''
      }
    }
  },
  created () {},
  methods: {
    addMarker(obj) {
      if (!this.isAddMarkerMode || this.newMarker.length > 0) {
        console.log('return')
        return
      }
      // this.isCreateMarker = true
      console.log('addMarker', obj)
      this.newMarker.push(obj)
      // setTimeout(() => {
      //   this.showCreateMarkerModal = true
      // }, 1000);
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
    addMarkerExe() {

    },
    onCreateMarker() {

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