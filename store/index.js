export const state = () => ({
  API_KEY: process.env.API_KEY,
  
  championsData: [],
  patch: '',
  regions: [
    { display_name: 'BR', url: 'br1.api.riotgames.com' },
    { display_name: 'EUN', url: 'eun1.api.riotgames.com' },
    { display_name: 'EUW', url: 'euw1.api.riotgames.com' },
    { display_name: 'JP', url: 'jp1.api.riotgames.com' },
    { display_name: 'KR', url: 'kr.api.riotgames.com' },
    { display_name: 'LAN', url: 'la1.api.riotgames.com' },
    { display_name: 'LAS', url: 'la2.api.riotgames.com' },
    { display_name: 'NA', url: 'na1.api.riotgames.com' },
    { display_name: 'OCE', url: 'oc1.api.riotgames.com' },
    { display_name: 'TR', url: 'tr1.api.riotgames.com' },
    { display_name: 'RU', url: '	ru.api.riotgames.com' },
  ],
  
  query: {
    nickname: 'Mono JavaScript',
    region: 'BR'
  },

  summoner_data: {},
  mastery_data: [],
})

export const getters = {
  // api_url: state => endpoint => `https://cors-anywhere.herokuapp.com/https://${state.regions.find(x => x.display_name === state.query.region).url}${endpoint}?api_key=${state.API_KEY}`,
  api_url: state => endpoint => `https://${state.regions.find(x => x.display_name === state.query.region).url}${endpoint}?api_key=${state.API_KEY}`,
  summoner_icon: state => `http://ddragon.leagueoflegends.com/cdn/${state.patch}/img/profileicon/${state.summoner_data.profileIconId}.png`,
  summoner_name: state => state.summoner_data.name,
  championById: state => id => state.championsData.find(x => x.key == id),
  championByName: state => name => state.championsData.find(x => x.id === name),
  championImage: state => id => `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${state.championsData.find(x => x.key == id).id}.png`,
}

export const mutations = {
  SET_PATCH(state, patch) { state.patch = patch },
  SET_QUERY(state, data) { state.query = data },
  SET_CAMPION_DATA(state, data) { state.championsData = data },
  SET_SUMMONER_DATA(state, data) { state.summoner_data = data },
  SET_MASTERY_DATA(state, data) { state.mastery_data = data },
}

export const actions = {
  async initialData({ commit, dispatch }) {
    const patchRes = await this.$axios.$get('https://ddragon.leagueoflegends.com/api/versions.json')
    commit('SET_PATCH', patchRes[0])

    await dispatch('getChampionsData')
    await dispatch('getSummonerData')
    await dispatch('getMasteryData')
  },

  async getSummonerData({ state, commit, getters }) {
    const url = getters.api_url(`/lol/summoner/v4/summoners/by-name/${state.query.nickname.split(' ').join('%20')}`)
    const response = await this.$axios.$get(url)
    commit('SET_SUMMONER_DATA', response)
  },

  async getMasteryData({ state, commit, getters }) {
    const url = getters.api_url(`/lol/champion-mastery/v4/champion-masteries/by-summoner/${state.summoner_data.id}`)
    const response = await this.$axios.$get(url)
    commit('SET_MASTERY_DATA', response)
  },

  async getChampionsData({ state, commit }) {
    const response = await this.$axios.$get(`http://ddragon.leagueoflegends.com/cdn/${state.patch}/data/en_US/champion.json`)
    commit('SET_CAMPION_DATA', Object.keys(response.data).map(champName => response.data[champName]))
  }
}
