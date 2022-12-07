app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `
    <div class="container">
    <div class="product-display">
        
    <div class="product-container">
    <div class="product-image">
    <img :src="image" />
    </div>
    <div class="buttons">
          <div class="color-circle"
            v-for="(variant, index) in variants" 
            :key="variant.id"
            :style="{ backgroundColor: variant.color , border: variant.color}"
            @mouseover="updateProduct(index)"
            >
          </div> 
        </div>
        <div class="product-title">
        <h1>{{ productName }}</h1>
        </div>
        <div class="product-info">
          <div class="main_info_1">
          <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p> Price (free taxes): {{ price }}</p>
            <p>Shipping: {{ shipping }}</p>
          </div>
          <div class="main_info_2">
          <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
          </div>
          </div>
        <div class="product-tabs">
        <button class="button" v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
            <span>
              Add to cart
            </span>
            </button>
            </div>
            <div class="review">
            <review-form @review-submitted="addReview" ></review-form>
            </div>
            <review-list :reviews="reviews"></review-list>
            </div>
      </div>
      </div>
      
  `,
  data() {
    return {
      product: "Cars",
      brand: "Bugatti",
      selectedVariant: 0,
      price: "4 800 000",
      details: [
        "French quality product",
        "W16 8.0L of 1 479HP",
        "0-100 Km/h in 2.4s",
        "2 seats",
        "Mixt consommation: 16.6 - 26.8L/100Km",
      ],
      variants: [
        {
          id: 2234,
          color: "red",
          image: "../assets/images/bugatti_chiron_rouge.jpg",
          quantity: 10,
        },
        {
          id: 2235,
          color: "black",
          image: "../assets/images/bugatti_chiron_noir.jpg",
          quantity: 0,
        },
        {
          id: 2236,
          color: "#14509d",
          image: "../assets/images/bugatti_chiron_bleu.jpg",
          quantity: 2,
        },
      ],
      reviews: [],
      tabs: ["review-form", "review-list"],
      activeTab: "review-form",
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    productName() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
