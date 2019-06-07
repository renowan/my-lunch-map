<template>
<div>
  <div class="modal-backdrop fade show" v-if="localValue"></div>
  <div class="modal" :class="modalClasses" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

    <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">Type your modal title</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-link  ml-auto" data-dismiss="modal" @click="close">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script lang="js">
const isElement = (el) => {
  return el && el.nodeType === Node.ELEMENT_NODE
}

const addClass = (el, className) => {
  if (className && isElement(el)) {
    el.classList.add(className)
  }
}
const removeClass = (el, className) => {
  if (className && isElement(el)) {
    el.classList.remove(className)
  }
}

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
  watch: {
    value(val) {
      if (val) {
        setTimeout(() => {
          this.localValue = true
        }, 100)
        addClass(document.body, 'modal-open')
      } else {
        this.localValue = false
        removeClass(document.body, 'modal-open')
        this.$emit('hidden')
      }
    }
  },
  data () {
    return {
      localValue: false
    }
  },
  created () {},
  methods: {
    close() {
      this.localValue = false
      this.$emit('input', false)
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>