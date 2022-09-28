<template>
  <div class="app" :class="mode">
    <header-block :mode="mode" @toggle="toggle"></header-block>
    <body-block></body-block>
    <model-review v-if="modal" :order="modalOrder" @close-modal="closeModal" @make-ship="ship" @cancel-order="cancelOrder"></model-review>
    <footer-block></footer-block>
  </div>
</template>

<script>
import BodyBlock from './components/body-block.vue'
import FooterBlock from './components/footer-block.vue'
import HeaderBlock from './components/header-block.vue'
import ModelReview from './components/model-review.vue'

export default {
  name: 'App',
  components: {
    HeaderBlock,
    BodyBlock,
    FooterBlock,
    ModelReview
  },
  data () {
    return {
      mode: 'light',
      modal: false
    }
  },
  methods: {
    toggle () {
      if (this.mode === "dark"){
        this.mode = "light"
      } else {
        this.mode = "dark"
      }
    }
  }
}
</script>

<style>
/* .app {
  width: min(100% - 2rem, 800px);
  margin-inline: auto;
  padding-top: 75px;
} */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  color: black;
  border-color: #fff;
  transition: background .35s ease-in-out;
}

.dark {
  background: #0d0020;
  color: #fff;
}

.dark header {
  border: 2px solid white;
}

.dark .body__block {
  border: 2px solid white;
}

.dark footer {
  border: 2px solid white;
}
</style>
