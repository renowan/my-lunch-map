<template>
  <div>

    <div class="header bg-gradient-primary pt-2 pt-md-6" v-if="mapDetail">
      <div class="container-fluid">

        <div class="header-body mt-4">
          {{ mapDetail.title }}
          <small>作成者: {{ mapDetail.ownerName }}</small>

          <div class="float-right edit-icon mt-2" v-if="isLogin">
            <!-- <a v-if="showRequestBtn" href="javascript:void(0)" class="btn btn-secondary" @click="permissionRequest">編集権リクエスト</a> -->
            <button v-if="showRequestBtn" type="button" class="btn btn-secondary" @click="openRequestModal">編集権リクエスト</button>
            <button v-if="isMapOwner" type="button" class="btn btn-secondary" @click="openRequestApprovalModal">リクエスト承認</button>
            <button v-if="hasRequest && !hasAddMarkerPermission" type="button" class="btn btn-secondary" disabled>編集権リクエスト済み</button>
            <button v-if="hasAddMarkerPermission" type="button" class="btn btn-secondary" disabled>編集権承認済み</button>
          </div>

          <p class="mb-n" v-if="mapDetail.description">{{ mapDetail.description }}</p>
        </div>

      </div>
    </div>

    <div class="container-fluid mt--7">

      <!-- <div class="row mb-3">
        <div class="col-12 text-white">
          isMapOwner: {{ isMapOwner }}, hasRequest: {{ hasRequest }}, hasAddMarkerPermission: {{ hasAddMarkerPermission }}
        </div>
      </div> -->

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
                :user-id="userId"
                :is-login="isLogin"
                @on-click-mark-list="onClickMarkList"
                @on-click-comment="onClickComment"
                @remove-marker="removeMarker" />
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
              height="700px"
              @on-click-marker="onClickMarkList"
              @add-marker="addMarker"
              @update-new-marker-position="updateNewMarkerPosition"
              @close-info-win="closeInfoWin" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      title="リクエスト送信"
      ok-title="送る"
      v-model="showRequestModal"
      @ok="permissionRequest">
      <div class="form-group mb-0">
        <label class="form-control-label">リクエストコメント</label>
        <input type="text" class="form-control" v-model="requestComment" placeholder="リクエストコメント">
      </div>
    </modal>

    <modal
      title="リクエストリスト"
      size="lg"
      ok-title="閉じる"
      :ok-only="true"
      ok-variant="secondary"
      v-model="showRequestApprovalModal">
      <requestList 
      :list="requestList"
      @decree="requestDecree" />
    </modal>

    <modal
      title="コメント"
      size="lg"
      ok-title="閉じる"
      :ok-only="true"
      ok-variant="secondary"
      body-classes="p-0"
      v-model="showCommentModal">
        <comment-box :marker="commentTarget" :comment-list="commentList" :comment-index="commentIndex" @send-comment="sendComment" />
    </modal>

  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex'
import ShareMap from '~/components/pages/map/ShareMap.vue'
import MyMap from '~/components/MyMap.vue'
import MarkerList from '~/components/pages/map/MarkerList.vue'
import NewMarkerForm from '~/components/pages/map/NewMarkerForm.vue'
import TextInput from '~/components/form/TextInput.vue'
import Modal from '~/components/bootstrap/Modal.vue'
import RequestList from '~/components/pages/map/RequestList.vue'
import CommentBox from '~/components/pages/map/CommentBox.vue'

export default {
  name: 'map-page',
  components: {
    ShareMap,
    MarkerList,
    NewMarkerForm,
    TextInput,
    Modal,
    RequestList,
    CommentBox
  },
  async asyncData({ store, app, params }) {
    const mapid = params.id
    if (!mapid) {
      return { error: true }
    }
    const user = store.getters['app/user']
    const user_id = user ? user.user_id : undefined

    return Promise.all([
      store.dispatch('map/getMapDetail', mapid),
      store.dispatch('map/getMapMarkers', mapid),
      store.dispatch('map/getUserHasRequest', { mapid, user_id }),
      store.dispatch('map/getUserHasAddMarkerPermission', { mapid, user_id })
    ]).then(response => {
      // マップ詳細
      const mapDetail = response[0]
      // マーカーリスト
      const markers = response[1]
      if (!mapDetail.title) {
        return { noFind: true }
      }

      // オーナーか
      const isOwner = user_id === mapDetail.user_id

      // マップ中心点
      const center = mapDetail.center
      // リクエスト済みか
      const hasRequest = response[2]
      // // 承認されたリクエストも持っているか
      const hasAddMarkerPermission = response[3]

      return { mapDetail, center, mapid, markers, hasRequest, hasAddMarkerPermission }
    })
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      user: 'app/user',
      isLoading: 'app/isLoading',
      isLogin: 'app/isLogin'
    }), {
      // マップを作ったオーナーであること
      isMapOwner() {
        if (!this.mapDetail || !this.user || !this.isLogin) {
          return false
        }
        const mapDetail = this.mapDetail
        const user = this.user
        return mapDetail.user_id === user.user_id
      },
      // マーカーを追加できる人
      canAddMarker() {
        return this.isMapOwner || this.hasAddMarkerPermission
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
      // マーカー追加のボタン表示・非表示
      showAddMarkerBtn() {
        return this.canAddMarker && !this.isAddMarkerMode
      },
      // 編集リクエストボタン
      showRequestBtn() {
        return !this.hasRequest && !this.isMapOwner && this.mapDetail.permission === 1
      },
      userId() {
        return this.user ? this.user.user_id : undefined
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

      // リクエストを送るModal
      showRequestModal: false,
      requestComment: '',

      // リクエストを送ってるか
      hasRequest: false,
      // リクエスト承認モーダル
      showRequestApprovalModal: false,
      // 送られてきたリクエスト
      requestList: [],
      // ユーザーの承認されたリクエストを持っているか
      hasAddMarkerPermission: false,

      // コメントリスト
      commentTarget: null,
      // newComment: '',
      showCommentModal: false,
      commentIndex: 0,
      commentList: []
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
    updateNewMarkerPosition(position) {
      if (!this.newMarker.length) {
        return
      }
      this.newMarker[0].position = position
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
        mapid: this.mapid,
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
    },
    permissionRequest() {
      this.$store.commit('app/isLoading', true)
      this.$store.dispatch('map/permissionRequest', {
        mapid: this.mapid,
        name: this.user.name,
        picture: this.user.picture,
        user_id: this.user.user_id,
        title: this.mapDetail.title,
        requestComment: this.requestComment
      }).then(response => {
        this.hasRequest = true
        this.$store.commit('app/isLoading', false)
      })
    },
    openRequestModal() {
      this.requestComment = ''
      this.showRequestModal = true
    },
    requestDecree(order) {
      this.$store.commit('app/isLoading', true)
      this.$store.dispatch('map/requestDecree', order).then(response => {
        const requestList = this.requestList.map(elm => {
          if (order.requestId === elm.requestId) {
            elm.check = true
            elm.approve = order.approve
          }
          return elm
        })
        this.requestList = requestList
        this.$store.commit('app/isLoading', false)
      })
    },
    openRequestApprovalModal() {
      this.showRequestApprovalModal = true
      this.$store.commit('app/isLoading', true)
      this.$store.dispatch('map/getPermissionRequest', this.mapid).then(response => {
        this.requestList = response
        this.$store.commit('app/isLoading', false)
      })
    },
    onClickComment(marker) {
      this.commentTarget = marker
      this.showCommentModal = true
      const order = {
        mapid: this.mapid,
        markerId: marker.id,
      }
      this.$store.commit('app/isLoading', true)
      this.$store.dispatch('map/getComment', order).then(response => {
        this.commentList = response
        this.$store.commit('app/isLoading', false)
      })
    },
    removeMarker(marker) {
      this.$store.commit('app/isLoading', true)
      this.$store.dispatch('map/removeMarker', order).then(response => {
        this.$store.commit('app/isLoading', false)
      })
    },
    sendComment(comment) {
      const order = {
        comment,
        mapid: this.mapid,
        markerId: this.commentTarget.id,
        user: this.user
      }
      this.$store.commit('app/isLoading', true)
      this.$store.dispatch('map/sendComment', order).then(response => {
        this.commentList.push(response)
        this.commentIndex ++
        this.$store.commit('app/isLoading', false)
      })
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
  min-height: 700px;
}
.map-wapper {
  min-height: 700px;
}

.pin-list-box {
  height: 636px;
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