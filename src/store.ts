import Vue from 'vue';
import Vuex from 'vuex';
import Client from '@/api/client';
import Survey from '@/api/survey';

Vue.use(Vuex);

const state = {
  client: {},
  surveys: [],
  currentSurvey: {
    questions: [],
    votes: [],
  },
};

const getters = {
  getClient: (state) => state.client,
  getSurveys: (state) => state.surveys || [],
  getSurvey: (state) => state.currentSurvey,
  getQuestion: (state) => (questionID) => state.currentSurvey.questions.find( (question) => question.id === questionID),
 };

const mutations = {
  createClient(state, payload) {
    localStorage.setItem('currentClient', JSON.stringify(payload.client));
    if (payload.token) { localStorage.setItem('currentToken', payload.token); }
    state.client = payload;
  },
  currentSurvey(state, payload) {
    state.currentSurvey = payload;
  },
  setSurveys(state, payload) {
    state.surveys = payload;
  },
  currentQuestions(state, payload) {
    state.currentSurvey.questions = payload;
  },
};

const actions = {
  updateClient(context, payload) {
    Client.updateClient(payload.id, payload.domainId)
    .then((data) => {
      context.commit('createClient', data.data !== undefined ? data.data.updateClient : null);
    });
  },
  createClient(context, payload) {
    Client.createClient( payload.name)
    .then((data) => {
      context.commit('createClient', data.data !== undefined ? data.data.createClient : null);
    });
  },
  getSurveys(context) {
    Survey.getAllSurveys()
      .then((data) => {
        context.commit('setSurveys', data.data !== undefined ? data.data["domains"] : null);
      });
  },
  getSurvey(context, payload) {
    Survey.getSurvey(payload.domain)
      .then((data) => {
        context.commit('currentSurvey', data.data !== undefined ? data.data["domain"].activeSurvey : null);
        context.commit('currentQuestions', data.data !== undefined ? data.data["domain"].activeSurvey.questions : null);
      });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
