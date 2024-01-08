import axios from 'axios';
import { createStore } from 'vuex';

// Create a new store instance
const store = createStore({
    state() {
        return {
            isAuthenticated: false,
            adminInfo: null,
            postings: [], // This will hold all job postings
        };
    },
    getters: {
        isAdmin(state) {
            return state.isAuthenticated && state.adminInfo;
        },
        getAdminInfo(state) {
            return state.adminInfo;
        },
        getAllPostings(state) {
            return state.postings;
        },
    },
    mutations: {
        // Mutations for updating state synchronously
        SET_AUTHENTICATED(state, value) {
            state.isAuthenticated = value;
        },
        SET_ADMIN_INFO(state, adminInfo) {
            state.adminInfo = adminInfo;
        },
        SET_POSTINGS(state, postings) {
            state.postings = postings;
        },
        LOGOUT(state) {
            state.isAuthenticated = false;
            state.adminInfo = null;
            // Other logout related state updates
        },
    },
    actions: {
        // Actions for performing async operations and committing mutations
        authenticate({ commit }, { token, adminInfo }) {
            localStorage.setItem('token', token); // Store the token in localStorage
            commit('SET_AUTHENTICATED', true);
            commit('SET_ADMIN_INFO', adminInfo);
        },
        loadPostings({ commit }) {
            // Get job postings from the backend and commit to state
            axios.get('/api/postings').then((response) => {
                commit('SET_POSTINGS', response.data);
            });
        },
        logout({ commit }) {
            localStorage.removeItem('token'); // Remove the token from localStorage
            commit('LOGOUT');
        },
        // Other actions as needed for your application logic
    },
});

export default store;
