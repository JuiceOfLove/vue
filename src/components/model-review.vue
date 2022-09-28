<template>
  <div id="modal" class="modal" @click="events">
    <div class="content">
      <div class="modal__title">
        <h2 class="modal__name">Заказ #{{ order.id }}</h2>
        <button @click="closeModal" class="modal__close-button">
          &#10006;
        </button>
      </div>
      <div class="modal__cart cart">
        <h3 class="cart__title">Корзина</h3>
        <ul class="cart__list">
          <list-review
            v-for="product in order.basket_items"
            :key="product.id"
            :modal="true"
            :id="product.name"
            :price="product.price"
            :quantity="product.quantity"
          ></list-review>
        </ul>
        <div class="total">
          Итого: {{ order.total }}₽
        </div>
      </div>
      <div class="modal__buttons">
        <button
          @click="removeItem"
          class="modal__button modal__button--red"
        >
          Отменить
        </button>
        <button @click="ship" class="modal__button modal__button--green">
          К отгрузке
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import listReview from './list-review.vue'
export default {
  name: 'model-review',
  components: { listReview },
  props: {
    order: Object,
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    ship() {
      this.$emit("make-ship", this.order.id);
      this.closeModal();
    },
    removeItem() {
      if (this.delivery_date) {
        this.$emit("cancel-delivery", this.order.id);
      } else {
        this.$emit("cancel-order", this.order.id);
      }
      this.closeModal();
    },
    events(event) {
      if (event.target.className == "modal") {
        this.closeModal();
      }
    },
  },
}
</script>

<style>

</style>