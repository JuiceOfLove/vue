<template>
  <li class="list__item item" :id="id" draggable="true" @dragstart="dragUp">
    <div v-if="price" class="item__name">
      <span v-if="!modals">Заказ #</span>
      {{ id }}
    </div>
    <div v-if="delivery_date" class="item__name">Отгрузка #{{ id }}</div>
    <div v-if="delivery_date" class="item__subname">Заказ #{{ order_id }}</div>
    <div v-if="modals" class="item__subname">{{ quantity }}шт.</div>
    <div class="item__other">
      <div v-if="price" class="item__price">{{ price }}₽</div>
      <div v-if="delivery_date" class="item__price">{{ delivery_date }}</div>
      <button v-if="!modals" class="item__button" @click="menuClick">...</button>
    </div>
    <div v-if="menuOpened" class="list__item-menu menu">
      <button v-if="price" @click="openModal" class="menu__item">
        Подробнее
      </button>
      <button
        v-if="price"
        @click="ship"
        class="menu__item menu__item--type_success"
      >
        К отгрузке
      </button>
      <button @click="removeItem" class="menu__item menu__item--type_danger">
        Отменить
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'list-review',
  props: {
    id: Number,
    order_id: Number,
    price: Number,
    shippped: Boolean,
    delivery_date: String,
    modals: {
        type: Boolean,
        required: false,
        default: false
    },
    quantity: Number,
  },
  data() {
    return {
      menuOpened: false,
    };
  },

  methods: {
    menuClick() {
      this.menuOpened = !this.menuOpened;
    },

    closeMenu() {
      this.menuOpened = false;
    },

    ship() {
      this.$emit("make-ship", this.id);
    },

    removeItem() {
      if (this.delivery_date) {
        this.$emit("cancel-delivery", this.id);
      } else {
        this.$emit("cancel-order", this.id);
      }
    },
    openModal() {
      this.$emit("open-modal", this.id);
    },
    dragUp() {
      this.$emit("drag-item", this.id);
    },
  },
}
</script>

<style>

</style>
