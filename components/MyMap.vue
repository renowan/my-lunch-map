<template>
  <div class="map" id="map">
    <GmapMap
      :center="mapInfo.moveTo"
      :options="myOptions"
      :zoom="16"
      ref="map"
      map-type-id="roadmap"
      style="width: 100%; height: 600px"
      @center_changed="onCenterChanged"
    >
    </GmapMap>
  </div>
</template>

<script lang="js">
export default {
  name: 'vue-name',
  components: {},
  props: {
    value: { type: Object, default: { lat: 35.6261591, lng: 139.72360219999996 } }
  },
  computed: {},
  watch: {
    value(val) {
      console.log('was change', val)
      const center = this.mapInfo.center
      if (center.lat !== val.lat && center.lng !== val.lng) {
        this.mapInfo.moveTo = val
      }
    }
  },
  data () {
    return {
      myOptions: {
        mapTypeControl: false,
        fullscreenControl: false,
      },

      // search
      place: '五反田',

      // map
      mapInfo: {
        moveTo: {
          lat: 10,
          lng: 10
        },
        center: {
          lat: 10,
          lng: 10
        },
        lat: { min: 0, max: 1 },
        lng: { min: 0, max: 1 }
      },
      

      // pin info
      infoWinOpen: false,
      infoWindowPos: null,
      currentMidx: null,
      infoContent: '',
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },

      // markers
      markers: [
        { position: { lat: 35.62538031935461, lng: 139.7222545873468 }, infoText: 'お店 1' },
        { position: { lat: 35.62387147595666, lng: 139.72152502649476 }, infoText: 'お店 2' }
      ]
    }
  },
  created () {
    this.mapInfo.moveTo = this.value
  },
  methods: {
    setPlace(place) {
      this.mapInfo.moveTo = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      console.log('lat', place.geometry.location.lat())
      console.log('lng', place.geometry.location.lng())
    },
    onCenterChanged (centerVal) {
      const lat = centerVal.lat()
      const lng = centerVal.lng()
      const center = { lat, lng }
      this.mapInfo.center = center
      this.$emit('input', center)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>