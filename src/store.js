import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [],
    contact: {},
    contactIndex: null,
    showContactForm: false,
    isEditForm: false,
  },
  mutations: {
    ADD_CONTACT(state) {
      state.contacts.push(state.contact)
    },
    UPDATE_CONTACT(state) {
      Vue.set(state.contacts, state.contactIndex, state.contact)
    },
    REMOVE_CONTACT(state, index) {
      state.contacts.splice(index, 1)[0]
    },
    SET_CONTACT(state, contact) {
      state.contact = contact
    },
    SET_CONTACT_INDEX(state, index) {
      state.contactIndex = index
    },
    SET_SHOW_CONTACT_FORM(state, showContactForm) {
      state.showContactForm = showContactForm
    },
    SET_IS_EDIT_FORM(state, isEditForm) {
      state.isEditForm = isEditForm
    },
  },
  actions: {
    createContact({ commit }) {
      commit('ADD_CONTACT')
    },
    updateContact({ commit }) {
      commit('UPDATE_CONTACT')
    },
    deleteContact({ commit }, index) {
      commit('REMOVE_CONTACT', index)
    },
    openContactForm({ commit }, { contact, index }) {
      if (contact) {
        commit('SET_CONTACT', { ...contact })
        commit('SET_IS_EDIT_FORM', true)
        commit('SET_CONTACT_INDEX', index)
      } else {
        commit('SET_CONTACT', createFreshContactObject())
        commit('SET_IS_EDIT_FORM', false)
      }

      commit('SET_SHOW_CONTACT_FORM', true)
    },
    closeContactForm({ commit }) {
      commit('SET_SHOW_CONTACT_FORM', false)
    },
  },
})

function createFreshContactObject() {
  return {
    firstName: '',
    lastName: '',
    email: '',
  }
}
