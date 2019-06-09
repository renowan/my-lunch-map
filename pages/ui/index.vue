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

        <div class="col-12">
          <div class="card card-stats border-0">
            <div class="card-header">
              dsdd1
            </div>
            <div class="card-body">
              <button type="button" class="btn btn-primary" @click="loading">loading</button>
              <button type="button" class="btn btn-primary" @click="showModal = true">Modal</button>
            </div>
          </div>
        </div>

        <div class="col-12">
          <!-- <UserDropDown></UserDropDown> -->
        </div>


      </div>
    </div>

    <s-modal v-model="showModal">kk</s-modal>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
import auth from '~/plugins/auth'
import authMixin from '~/mixins/auth'
import Modal from '~/components/bootstrap/Modal.vue'
import UserDropDown from '~/components/layout/UserDropdown.vue'

export default {
  name: 'ui',
  components: {
    's-modal': Modal,
    UserDropDown
  },
  data() {
    return {
      showModal: false,
      foo: 'efff'
    }
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
  mixins: [authMixin],
  methods: {
    loading() {
      this.$store.commit('app/isLoading', true)
    },
  }
}
</script>

<style lang="scss">
.header-body {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  padding-bottom: 8rem;
}
</style>
