<template>
  <div class="modal fade" :class="modalClasses" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

    <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">Type your modal title</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-link  ml-auto" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="js">
export default {
  name: 'Modal',
  props: {
    value: { type: Boolean, default: () => false },
    noFade: { type: Boolean, default: () => true },
    title: { type: String, default: () => 'Modal Title' },
    okTitle: { type: String, default: () => 'OK' },
    cancelTitle: { type: String, default: () => 'Cancel' },
    okVariant: { type: String, default: () => 'primary' },
    modalClass: { type: String, default: () => '' }
  },
  computed: {
    modalClasses() {
      return [
        {
          ['fade']: !this.noFade && this.value,
          ['show']: this.localValue,
          ['d-block']: this.value,
        },
        this.modalClass,
      ]
    }
  },
  watch: {},
  data () {
    return {
      localValue: false
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>