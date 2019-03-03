<template>
  <div class="container">
    <div class="row">

      <div class="col-xs-12 pt20 mb30">
        <div class="content-header mb20">
          <h2> 誰でも編集できる <b class="text-primary">シェアマップ</b></h2>
          <p class="lead" v-if="!isLogin">マップ作成するにはGoogleアカウントでのログインが必要です。</p>
          <p class="lead" v-if="isLogin">マップを作成してシェアしましょう。</p>
        </div>

        <div class="login-btn-box" v-if="!isLogin">
          <a class="btn-login-big" @click="login">ログイン</a>
        </div>

        <div class="login-btn-box" v-if="isLogin">
          <nuxt-link to="/create" class="btn-login-big"><i class="fa fa-plus" /> マップ作成</nuxt-link>
        </div>
      </div>

      <div class="col-md-6 col-md-offset-3">
        <h2 class="mb20 text-center">
          マップ一覧
        </h2>
        <ul class="icon-list">
          <li>
            <a class="btn-link">aaaaa</a>
            <p>oaoibohbah</p>
          </li>
          <li>
            <a class="btn-link">aaaaa</a>
            <p>oaoibohbah</p>
          </li>
          <li>
            <a class="btn-link">aaaaa</a>
            <p>oaoibohbah</p>
          </li>
          <li>
            <a class="btn-link">aaaaa</a>
            <p>oaoibohbah</p>
          </li>
          <li>
            <a class="btn-link">aaaaa</a>
            <p>oaoibohbah</p>
          </li>
          <li>
            <a class="btn-link">aaaaa</a>
            <p>oaoibohbah</p>
          </li>
          <li>
            <a class="btn-link">aaaaa</a>
            <p>oaoibohbah</p>
          </li>
        </ul>

        <div class="page-navi text-center">
          <a><i class="fa fa-angle-left" /> 前へ</a> 1
          <a>次へ <i class="fa fa-angle-right" /></a>
        </div>

        <!-- <nav aria-label="Page navigation">
          <ul class="pagination">
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav> -->

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import authMixin from '~/mixins/auth'

export default {
  components: {
  },
  mixins: [authMixin],
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      user: 'app/user',
      isLoading: 'app/isLoading',
      isLogin: 'app/isLogin'
    }), {}
  )
}
</script>

<style lang="scss">
.login-btn-box {
  text-align: center;
}
.btn-login-big {
  background-color: #4a89dc;
  border-radius: 5px;
  color: #ffffff;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 45px;
  text-align: center;
  text-decoration: none;
  width: 155px;
  -webkit-text-size-adjust: none;
}


</style>
