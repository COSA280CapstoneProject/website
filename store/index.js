import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

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
        async loadPostings({commit}) {
            // Fetch job postings from the backend and commit to state
            // Example: axios.get('/api/postings').then(...)
            try {
                // Assuming your backend API endpoint for job postings is /api/postings
                const response = await axios.get('/api/postings');

                // Commit the fetched postings to the state
                commit('SET_POSTINGS', response.data);

            } catch (error) {
                console.error('Error loading job postings:', error);
                // Handle error, you might want to commit an error state or show a notification
            }
        },
        logout({ commit }) {
            localStorage.removeItem('token'); // Remove the token from localStorage
            commit('LOGOUT');
        },
        // Other actions as needed for your application logic
    },
    plugins: [createPersistedState()],
});

export default store;
