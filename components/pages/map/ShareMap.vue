<template>
  <div class="map" id="map">
    <GmapMap
      :center="mapInfo.moveTo"
      :options="myOptions"
      :zoom="16"
      ref="map"
      map-type-id="roadmap"
      :style="myStyle"
      @center_changed="onCenterChanged"
      @click="onCLickMap"
    >
      <gmap-info-window 
      :options="infoOptions" 
      :position="infoWindowPos" 
      :opened="infoWinOpen" 
      @closeclick="infoWinOpen = false">
        {{infoContent}}
      </gmap-info-window>
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="draggable"
        @click="onClickMarker(m, index)"
        @mouseup="mouseup"
      />
    </GmapMap>
  </div>
</template>

<script lang="js">
export default {
  name: 'share-map',
  components: {},
  props: {
    value: { type: Object, default: { lat: 35.6261591, lng: 139.72360219999996 } },
    markers: { type: Array, default: () => [] },
    draggable: { type: Boolean, default: () => false },
    height: { type: String, default: () => '600px' }
  },
  computed: {
    myStyle () {
      return {
        width: '100%',
        height: this.height
      }
    }
  },
  watch: {
    value(val) {
      // console.log('was change', val)
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
      // markers: [

      // ]
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
    },
    onClickMarker(marker, index) {
      // this.infoWindowPos = marker.position
      // this.infoContent = marker.infoText
      // if (this.currentMidx == index) {
      //   this.infoWinOpen = !this.infoWinOpen;
      // } else {
      //   this.infoWinOpen = true
      //   this.currentMidx = index
      // }
    },
    onCLickMap(obj) {
      const position = {
        lat: obj.latLng.lat(),
        lng: obj.latLng.lng()
      }
      // this.markers.push({
      //   position,
      //   title: '新しいお店',
      //   description: ''
      // })
      this.$emit('add-marker', {
        position,
        title: '新しいお店',
        description: ''
      })
      // this.infoWinOpen = true
      // this.currentMidx = this.markers.length - 1
      // this.infoWindowPos = position
      // this.infoContent = '新しいお店'
    },
    mouseup() {
      console.log('mouseup')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>