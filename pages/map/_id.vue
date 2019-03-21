<template>
  <div>

    <div class="header bg-gradient-primary pt-2 pt-md-6">
      <div class="container-fluid">
        <div class="header-body">

           {{ mapDetail.name }}
          <small>作成者: {{ mapDetail.creatorName }}</small>
          <p class="mb-n" v-if="mapDetail.description">{{ mapDetail.description }}</p>

        </div>
      </div>
    </div>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-4">
          <div class="card card-stats border-0 pin-list-wapper">
            <div class="card-header">
              ピン一覧
            </div>
            <div class="pin-list">
              <ul>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
                <li>hohoogo</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="card card-stats border-0">
            <div class="card shadow border-0">
              <ShareMap v-model="center" :markers="markers" height="600px" @add-marker="addMarker" />
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
    console.log('mapDetail', mapDetail)
    return { mapDetail }
  },
  components: {
    ShareMap
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
      }
    }
  ),
  watch: {},
  data () {
    return {
      mapDetail: null,
      noFind: false,
      error: false,
      center: {
        lat: 35.6261591,
        lng: 139.72360219999996
      },
      markers: [],
      isCreateMarker: false,
      showCreateMarkerModal: false
    }
  },
  created () {},
  methods: {
    addMarker(obj) {
      if (this.isCreateMarker) {
        return
      }
      this.isCreateMarker = true
      this.markers.push(obj)
      setTimeout(() => {
        this.showCreateMarkerModal = true
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.header-body {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  // text-align: center;
  padding-bottom: 8rem;
}

.pin-list-wapper {
  min-height: 600px;
}
.map-wapper {
  min-height: 600px;
}

.pin-list {
  height: 536px;
  overflow-y: scroll;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    padding: .5rem 1.5rem;
  }
}
</style>