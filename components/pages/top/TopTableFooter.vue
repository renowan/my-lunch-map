<template>
<div class="card-footer py-4">
  <nav aria-label="...">
    <ul class="pagination justify-content-end mb-0">
      <li class="page-info text-sm">{{ page + 1 }} ページ</li>
      <li class="page-item" :class="{ disabled: prevDisabled }">
        <a class="page-link" tabindex="-1" @click="goPrev">
          <i class="fas fa-angle-left"></i>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <!-- <li class="page-item active">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
      </li>
      <li class="page-item"><a class="page-link" href="#">3</a></li> -->
      <li class="page-item" :class="{ disabled: nextDisabled }">
        <a class="page-link" @click="goNext">
          <i class="fas fa-angle-right"></i>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script lang="js">
export default {
  name: 'TopTableFooter',
  props: {
    page: { type: Number, default: () => 0 },
    prevDisabled: { type: Boolean, default: () => false },
    nextDisabled: { type: Boolean, default: () => false }
  },
  components: {},
  computed: {},
  watch: {},
  data () {
    return {}
  },
  created () {},
  methods: {
    goPrev() {
      this.$emit('go-prev')
    },
    goNext() {
      this.$emit('go-next')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-info{
  padding-top: 8px;
  margin-right: 10px;
}
</style>