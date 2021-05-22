// initial state
const state = {
  isOpen: true,
  isCollapse: true,
  routerValue: true,
  offCanvas: false,
  activeFilter: ""
};

const getters = {
  getIsOpen: state => state.isOpen,
  getIsCollapse: state => state.isCollapse,
  getRouterValue: state => state.routerValue,
  getOffCanvas: state => state.offCanvas,
  getActiveFilter: state => state.activeFilter
};

const mutations = {
  setIsOpen(state, isOpen) {
    state.isOpen = isOpen;
  },
  setIsCollapse(state, isCollapse) {
    state.isCollapse = isCollapse;
  },
  setRouterValue(state, routerValue) {
    state.routerValue = routerValue;
  },
  setOffCanvas(state, offCanvas) {
    state.offCanvas = offCanvas;
  },

  resetIsOpen(state) {
    state.isOpen = false;
  },
  resetIsCollapse(state) {
    state.isCollapse = false;
  },
  resetRouterValue(state) {
    state.routerValue = false;
  },
  resetOffCanvas(state) {
    state.offCanvas = false;
  },
  setActiveFilter: (state, value) => {
    state.activeFilter = value
  }
};

const actions = {
  editNavigation: async (context, isOpen) => {
    try {
      context.commit("navigationOpen/setIsOpen", isOpen, {
        root: true
      });

    } catch (error) {
      // console.log(error)
    }
  },
  changeActiveFilter(context, value) {
    context.commit("data/setActiveFilter", value, {
      root: true
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};