<template>
  <div class="about">
    <main class="wrapper">
      <h1>Products</h1>

      <div class="card-container">
        <ProductCard
          v-for="product in inventory"
          :key="product.id"
          :product="product"
          :addToCart="addToCart"
          class="card"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "Products",
  props: ["inventory", "addToCart"],
  components: {
    ProductCard,
  },
};
</script>
