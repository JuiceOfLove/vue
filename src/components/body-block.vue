<template>
  <div>
    <div class="body__block">
        <div class="section__heading">
          <h2 class="section__title">Заказы</h2>
          <button @click="refreshOrders" class="section__button">
            Обновить
          </button>
        </div>
        <ul class="section__list">
          <list-review
              v-for="item in orders" :key="item.id" :id="item.id" :price="item.total" @open-modal="modelOpening" @make-ship="ship" @cancel-order="cancelOrder" @drag-item="dragItem"></list-review>
        </ul>
    </div>
    <div class="body__block">
        <section
          class="section"
          @drop="onDrop"
          @dragover.prevent
          @dragenter.prevent
      >
        <div class="section__heading">
          <h2 class="section__title">Отгрузки</h2>
          <button @click="refreshDeliveries" class="section__button">
            Обновить
          </button>
        </div>
        <ul class="section__list">
          <list-review
              v-for="item in deliveries"
              :key="item.id"
              :id="item.id"
              :order_id="item.order_id"
              :delivery_date="item.delivery_date"
              @make-ship="ship"
              @cancel-delivery="cancelDelivery"
          ></list-review>
        </ul>
      </section>
    </div>
    <model-review
        v-if="modal"
        :order="modalOrder"
        @close-modal="closeModal"
        @make-ship="ship"
        @cancel-order="cancelOrder"
    ></model-review>
  </div>
</template>

<script>
import Requests from '@/request/request.js';
import listReview from './list-review.vue';
import modelReview from './model-review.vue';

const body = document.querySelector("body");

export default {
  name: 'body-block',
  components: {
    listReview,
    modelReview,
  },
  data() {
    return {
        request: Requests,
        orders: [],
        deliveries: [],
        modal: false,
        modalOrder: {},
        draggedItemId: "",
    };
  },
  created() {
    this.refresh();
    document.addEventListener("keydown", (e) => {
      let key = e.key;
      if (key === "Escape") {
        this.modal = false;
        body.style.overflow = "auto";
      }
    });
  },
  methods: {
    changeOrders(data) {
      this.orders.length = 0;
      this.orders.push(...data)
    },
    changeDeliveries(data) {
      this.deliveries.length = 0
      this.deliveries.push(...data)
    },

    refresh() {

      this.request.getOrders().then(r => this.changeOrders(r));
      this.request.getDeliveries().then(r => this.changeDeliveries(r));

    },

    refreshOrders() {
      this.request.getOrders().then(r => this.changeOrders(r));
    },

    refreshDeliveries() {
      this.request.getDeliveries().then(r => this.changeDeliveries(r));
    },

    ship(id) {
      this.request.addDelivery(id)
          .then(() => this.request.deleteOrder(id))
          .then(() => this.refresh())
    },
    cancelDelivery(id) {
      this.request.deleteDelivery(id)
          .then(() => this.refresh())
    },

    cancelOrder(id) {
      this.request.deleteOrder(id)
          .then(() => this.refresh());
    },

    modelOpening(id) {
      this.request.getOrder(id)
          .then(r => {
            this.modalOrder = r;
            this.modal = true;
            body.style.overflow = "hidden";
          })
    },

    closeModal() {
      this.modal = false;
      body.style.overflow = "auto";
    },

    dragItem(id) {
      this.draggedItemId = id;
    },

    onDrop() {
      if (this.orders.find((order) => order.id === this.draggedItemId)) {
        this.ship(this.draggedItemId);
      }
    },
  },
}
</script>

<style scoped>
body {
  display: flex;
  justify-content: space-between;
  width: min(100% - 2rem, 800px);
  margin-inline: auto;
  min-height: 500px;
  align-items: center;
  text-align: center;
  /* border: 2px solid black; */
  margin: 0 auto;
  margin-top: 10px;
}

/* .block {
    border: 2px solid black;
}
. */

.body__block {
  border: 2px solid black;
  /* width: 100%; */
  min-height: 500px;
  min-width: 375px;
}
</style>
