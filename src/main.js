import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store/store';
import './styles/main.scss';

Vue.config.productionTip = false;

function getIndex(el, vnode, initIndex) {
  const index = initIndex + 1;

  // skip readonly
  if (vnode.elm[index].getAttribute('readonly') === 'readonly') {
    return getIndex(el, vnode, index);
  }

  // skip disabled
  if (vnode.elm[index].getAttribute('disabled') === 'disabled') {
    return getIndex(el, vnode, index);
  }

  return index;
}

Vue.directive('formFocusFirstOnLoad', {
  inserted(el, binding, vnode) {
    vnode.elm[0].focus();
  },
});

Vue.directive('formFocusNextOnEnter', {
  inserted(el, binding, vnode) {
    el.addEventListener('keyup', (ev) => {
      let index = [...vnode.elm.elements].indexOf(ev.target);

      if (ev.keyCode === 13 && vnode.elm[index].type !== 'textarea' /* && index < vnode.elm.length - 1 */) {
        index = getIndex(el, vnode, index);

        if (index > 0) {
          vnode.elm[index].focus();
        }
      }
    });
  },
});

sync(store, router);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
