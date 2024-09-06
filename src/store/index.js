import { createStore } from "vuex";

export default createStore({
  state: {
    label: "",
  },
  mutations: {
    setLabel(state, value) {
      state.label = value;
    },
  },
  actions: {},
  modules: {},
});
