<template>
<div class="card-footer py-4">
  <nav aria-label="...">
    <ul class="pagination justify-content-end mb-0">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">
          <i class="fas fa-angle-left"></i>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
      </li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">
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
</style>