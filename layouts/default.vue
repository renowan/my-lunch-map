<template>
  <div class="default-layout">
    <div class="navbar navbar-fixed-top">
      <div class="navbar-branding dark">
        <a class="navbar-brand"><b>ランチマップ</b></a>
      </div>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <a class="btn btn-create-map"><i class="fa fa-plus" /> マップ作成</a>
        </li>
        <li>
          <a class="btn"><i class="fa fa-google-plus" /> Google Sign in</a>
        </li>
        <li class="dropdown">
          <a class="dropdown-toggle fw600 p15"><img src="~/static/img/avatars/placeholder.png" alt="avatar" class="mw30 br64 mr15"> ユーザー名
          </a>
        </li>
      </ul>
    </div>
    <section>
      <nuxt />
    </section>
  </div>
</template>

<script>
// import auth from '~/plugins/auth'

export default {
  middleware: [
    'authenticate'
  ]
}
</script>

<style lang="scss">
section {
  padding-top: 60px;
  height: 100%;

  & > div {
    height: 100%;
  }
}

.default-layout {
  width: 100%;
  height: 100%;
}

.navbar .nav > li > a.btn-create-map {
  color: #4a89dc;
}
</style>
