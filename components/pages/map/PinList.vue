<template>
  <li class="pin-list">
    <h4>
      光山寿司 <small><i class="ni ni-single-02"></i> 近藤真彦</small>
      <a class="btn-link float-right"><i class="fas fa-comments"></i> コメント</a>
    </h4>
    <p>L字型のカウンターも備えた店内で、漁港直送の魚を使用した握り寿司を提供。刺身や焼き物、揚げ物など、多種類の和食メニューあり。</p>

  </li>
</template>

<script lang="js">
export default {
  name: 'pin-list',
  components: {},
  computed: {},
  watch: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.pin-list {
  list-style: none;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  min-height: 132px;

  p {
    font-size: .8rem;
    margin-bottom: 0;
  }

  small {
    color: #949db3;
  }

  .btn-link {
    font-size: 0.8rem;
    color: #5e72e4;
  }
}
</style>