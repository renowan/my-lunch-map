<template>
<div>
  <div class="modal-backdrop fade show" v-if="localValue"></div>
  <div class="modal" :class="modalClasses" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" :class="dialogClass" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">{{ title }}</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body" :class="bodyClasses">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button v-if="!okOnly" type="button" class="btn btn-link  ml-auto" data-dismiss="modal" @click="close">{{ cancelTitle }}</button>
          <button type="button" :class="okBtnClasses" @click="onEvent">{{ okTitle }}</button>
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
    okToClose: { type: Boolean, default: () => true },
    okOnly: { type: Boolean, default: () => false },
    size: { type: String, default: () => 'md' },
    title: { type: String, default: () => 'Modal Title' },
    bodyClasses: { type: String, default: () => '' },
    okTitle: { type: String, default: () => 'OK' },
    cancelTitle: { type: String, default: () => 'キャンセル' },
    okVariant: { type: String, default: () => 'primary' },
    cancelVariant: { type: String, default: () => 'secondary' },
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
    },
    dialogClass() {
      const size = this.size
      const arr = []
      if (size) {
        arr.push(`modal-${size}`)
      }
      return arr
    },
    okBtnClasses() {
      return ['btn', 'btn-' + this.okVariant]
    },
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
    },
    onEvent() {
      this.$emit('ok')
      if (this.okToClose) {
        this.$emit('input', false)
        this.localValue = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-backdrop.show {
  opacity: .5;
}
</style>