<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" href="#" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link
        to="/products"
        href="views/products.html"
        class="top-bar-link"
      >
        <span>Products</span>
      </router-link>
      <router-link
        to="/orders"
        href="views/past-orders.html"
        class="top-bar-link"
      >
        <span>Past Orders</span>
      </router-link>
    </nav>
    <div class="top-bar-cart-link" @click="toggleSidebar">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart {{ totalQuantity }}</span>
    </div>
  </header>
  <router-view :inventory="inventory" :cart="cart" :addToCart="addToCart" />
  <SideBar
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :inventory="inventory"
    :remove="removeItem"
  />
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import food from "./food.json";
//
export default {
  components: {
    SideBar,
  },
  data() {
    return {
      showSidebar: false,
      inventory: food,
      cart: {},
    };
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    },
  },
  methods: {
    addToCart(name, quantity) {
      if (!this.cart[name]) this.cart[name] = 0;
      this.cart[name] += quantity;
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    removeItem(key) {
      delete this.cart[key];
    },
  },
};
</script>
