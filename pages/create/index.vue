<template>
  <div>
    <div class="header bg-gradient-primary pt-5 pt-md-7">
      <div class="container-fluid">
        <div class="header-body">
          マップ作成<br>
          <small>マップの中心点を決めてください。</small>
        </div>
      </div>
    </div>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-4">
          <div class="card card-stats border-0">

            <div class="card-body">

              <div class="form-group">
                <label class="form-control-label">中心地検索</label>
                <div class="gmap-place-input-wrapper">
                  <gmap-place-input class="gmap-place-input" :default-place="place" @place_changed="setPlace" />
                </div>
              </div>

              <TextInput v-model="creatorName" label="作成者名" placeholder="作成者名" required :max="30" :show-error="showError" />
              <TextInput v-model="name" label="マップ名" placeholder="マップ名" required :max="100" :show-error="showError" />
              <TextInput v-model="address" label="住所" placeholder="住所" :max="100" :show-error="showError" />
              <TextInput v-model="description" label="コメント" placeholder="コメント" type="textarea" :max="200" :show-error="showError" />

              <div class="form-group">

                <label class="form-control-label">編集権限</label>
                <div>
                  <label class="radio-inline mr10">
                    <input type="radio" name="permission" id="permission" :value="0" v-model="permission"> 自分のみ編集できる
                  </label>
                </div>
                <div>
                  <label class="radio-inline mr10">
                    <input type="radio" name="permission" id="permission" :value="1" v-model="permission"> 誰でも編集できる
                  </label>
                </div>
              </div>

              <button id="quick-compose" type="button" class="btn btn-primary btn-block mb-20" @click="onCreate">作成</button>

            </div>

          </div>
        </div>
        <div class="col-8">
          <div class="card shadow border-0">
            <MyMap v-model="center" height="760px" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import MyMap from '~/components/MyMap.vue'
import { mapGetters } from 'vuex'
import TextInput from '~/components/form/TextInput.vue'

export default {
  components: {
    MyMap,
    TextInput
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      user: 'app/user',
      isLoading: 'app/isLoading',
      isLogin: 'app/isLogin'
    }), {
      canCreate() {
        if (this.creatorName.length > 100 || this.creatorName.length < 1) {
          return false
        }
        if (this.name.length > 100 || this.name.length < 1) {
          return false
        }
        if (this.address.length > 100) {
          return false
        }
        if (this.description.length > 200) {
          return false
        }
        return true
      }
    }
  ),
  created() {
    this.creatorName = this.user ? this.user.name : 'タイヤーセールスマン'
  },
  data () {
    return {
      creatorName: '',
      place: '五反田',
      center: {
        lat: 35.6261591,
        lng: 139.72360219999996
      },
      name: '',
      address: '',
      description: '',
      showError: false,
      permission: 0
    }
  },
  methods: {
    setPlace(place) {
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      console.log('lat', place.geometry.location.lat())
      console.log('lng', place.geometry.location.lng())
    },
    onCreate() {
      this.showError = true
      if (!this.canCreate) {
        return
      }
      const postObj = {
        creatorName: this.creatorName,
        user: {
          user_id: this.user.user_id,
          name: this.user.name
        },
        center: this.center,
        name: this.name,
        address: this.address,
        description: this.description,
        permission: this.permission
      }

      this.$store.commit('app/isLoading', true)
      this.$store.dispatch('map/createMap', postObj).then((id) => {
        this.$store.commit('app/isLoading', false)
        // console.log('id', id)
        this.$router.push(`/map/${id}`)
      }).catch(() => {
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
  text-align: center;
  padding-bottom: 8rem;
}

.card-body {
  height: 760px;
}
// .input-area {
//   width: 100%;
//   height: 600px;
//   background-color: #f2f2f2;

//   .left-side {
//     padding: 30px 0;
//     flex: 1;
//   }
//   .right-side {
//     flex: 2;
//   }

//   .gmap-input {
//     padding: 0 20px;
//   }
// }
</style>
