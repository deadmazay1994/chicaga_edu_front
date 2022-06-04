import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async requestBasketItems({ commit }) {
      console.log("request");
      let result = await api.methods.getBasketItems();
      commit("setBasketItems", result);
    },
    // Запросы являются фейковыми.
    // В случае необходимости - поменять payload.data на нужный объект
    async requestDeleteBasketItem({ commit }, payload) {
      let result = await api.methods.deleteitemFromBasket(payload.data);
      console.log("requestDeleteBasketItem:", result);
      commit("deleteBasketItem", payload.index);
    },
    async requestDecreaseBasketItemsCount({ commit }, payload) {
      console.log("requestDecreaseBasketItemsCount");
      let result = await api.methods.decreaseBasketItemsCount(payload.data);
      console.log("requestDecreaseBasketItemsCount:", result);
      commit("decreaseBasketItemsCount", payload.index);
    },
    async requestIncreaseBasketItemsCount({ commit }, payload) {
      let result = await api.methods.increaseBasketItemsCount(payload.data);
      console.log("requestIncreaseBasketItemsCount:", result);
      commit("increaseBasketItemsCount", payload.index);
    },
    async requestPushItemToBasket({ commit }, payload) {
      let result = await api.methods.pushItemToBasket();
      console.log("requestPushItemToBasket", result);
      commit("pushItemToBasket", payload);
    }
  },
  mutations: {
    setBasketItems(state, payload) {
      state.basketItems = payload;
      console.log(state.basketItems);
    },
    deleteBasketItem(state, index) {
      state.basketItems.splice(index, 1);
    },
    decreaseBasketItemsCount(state, index) {
      if (state.basketItems[index].count <= 1) return;
      state.basketItems[index].count -= 1;
    },
    increaseBasketItemsCount(state, index) {
      state.basketItems[index].count += 1;
    },
    pushItemToBasket(state, item) {
      state.basketItems.push(item);
    }
  },
  state: {
    basketItems: []
  },
  getters: {
    getBasketItems(state) {
      return state.basketItems;
    },
    getBasketItemsTotal(state) {
      return state.basketItems.reduce((acc, item) => {
        let price = item.price * item.count;
        console.log("item.count:", item.count);
        return acc + price;
      }, 0);
    }
  }
};
