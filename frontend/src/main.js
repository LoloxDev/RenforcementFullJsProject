import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';

Vue.use(Vuex);

new Vue({
    el: '#app',
    store,
    data: {
        message: 'Hello from Vue with Vuex!'
    }
});
