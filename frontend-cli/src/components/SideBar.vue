<template>
  <aside class="cart-container">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Cart
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button @click="toggle" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table" v-if="Object.keys(cart).length">
          <thead>
            <tr>
              <th><span class="sr-only">Product Image</span></th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quantity, key, i) in cart" :key="i">
              <td><i class="icofont-carrot icofont-3x"></i></td>
              <td>{{ key }}</td>
              <td>{{ getPrice(key) }}</td>
              <td class="center">{{ quantity }}</td>
              <td>${{ (quantity * getPrice(key)).toFixed(2) }}</td>
              <td class="center">
                <button @click="remove(key)" class="btn btn-light cart-remove">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-else><em>No items in cart</em></p>
        <div class="spread">
          <span><strong>Total:</strong>${{ calcTotal() }}</span>
          <button class="btn btn-light">Checkout</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["toggle", "cart", "inventory", "remove"],
  methods: {
    getPrice(name) {
      const product = this.inventory.find((p) => {
        return p.name === name;
      });

      return product.price.USD;
    },
    calcTotal() {
      const names = Object.keys(this.cart);
      if (names.length < 1) return 0;
      const total = Object.values(this.cart).reduce((sum, curr, i) => {
        return sum + curr * this.getPrice(names[i]);
      });
      return total;
    },
  },
};
</script>
