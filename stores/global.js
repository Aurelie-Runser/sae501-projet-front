import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: null, // pour la connection

    count: 0, // pour le panier
    cart: [],
  }),
  actions: {

    // vérifie et prend les données enregistées dans le panier stockés en local s'il y en a
    setToken(token){
      if (token){
        this.token = token
        localStorage.setItem('Token de Connection', JSON.stringify(this.token))
        }
    },

    clearToken() {
      this.token = null
      localStorage.setItem('Token de Connection', JSON.stringify(this.token))
    },

    increment() {
      this.count++
    },

    // vérifie et prend les données enregistées dans le panier stockés en local s'il y en a
    setCart(ids){
      if (ids || Array.isArray(ids)){
        this.cart = ids
        this.count = this.cart.length
      } else {
        this.cart = []
      }
    },

    // ajoute une valeur au panier
    addToCart(id) {
      if (!this.cart.includes(id)){
          this.cart.push(id)
          this.count = this.cart.length
          localStorage.setItem('monPanier', JSON.stringify(this.cart))
      }
    },

    // retire une valeur au panier
    removeFromCart(id){
      // vérifie que la recette à retirer est présente dans le tableau cart
      if (this.cart.includes(id)){
          const index = (i) => i === id
          const indexsup = this.cart.findIndex(index)
          this.cart.splice(indexsup, 1)
          this.count = this.cart.length

          if (this.count === 0){
            localStorage.removeItem("monPanier");
          } else {
            localStorage.setItem('monPanier', JSON.stringify(this.cart))
          }
      }
    },

    // vide le panier
    emptyCart(){
      this.cart = []
      this.count = 0
      localStorage.removeItem("monPanier")
    }
  },
});
