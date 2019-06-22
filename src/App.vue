<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    import Vue from 'vue'
    // import http from '@/utils/http-common'
    // import router from '@/router'
    import VueSweetalert2 from 'vue-sweetalert2';
    import Toasted from 'vue-toasted';
    // import { mapGetters } from "vuex";
    // import { watch } from 'fs';

    Vue.use(Toasted)
    Vue.use(VueSweetalert2);
    Vue.use(require('vue-moment'));

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>

</style>
