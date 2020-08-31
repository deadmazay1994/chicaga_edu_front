export default {
  state: {
    lightboxOpen: false,
    ligntboxImg: ""
  },
  mutations: {
    toggleLightbox(state, openState) {
      if (!localStorage.getItem("user zooming lightbox")) {
        setTimeout(() => {
          alert("Для увеличения изображения покрутите колесиком мыши");
        }, 200);
        localStorage.setItem("user zooming lightbox", true);
      }
      state.lightboxOpen = openState;
    },
    setLightboxImg(state, url) {
      state.ligntboxImg = url;
    }
  },
  getters: {
    lightboxOpen: state => state.lightboxOpen,
    lightboxImg: state => state.ligntboxImg
  },
  actions: {}
};
