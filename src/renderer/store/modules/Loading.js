const state = {
  isBusy: false
};

const getters = {
  isLoading: state => {
    return state.isBusy;
  }
};
const mutations = {
  SET_LOADING_STATE(state, isBusy) {
    state.isBusy = isBusy;
  }
};

const actions = {
  setLoadingState(context, isBusy) {
    // do something async
    context.commit("SET_LOADING_STATE", isBusy);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
