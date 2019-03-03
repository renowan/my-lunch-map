import Vuex from 'vuex'
import app from './app/index'
import map from './map/index'

/* eslint-disable no-new */
new Vuex.Store({
  modules: {
    app,
    map
  }
})
