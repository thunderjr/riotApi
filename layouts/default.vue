<template>
  <CThemeProvider>
    <CColorModeProvider>
      <CBox 
        p="5"
        w="100%"
        h="100vh"
        as="main"
        font-family="body"
        bg="gray.700"
      >
        <CReset />
        <CFlex direction="row" justify="center" align="center">
          <CText fontSize="18pt" color="whiteAlpha.900">JG DIFF APENAS =/ ❌</CText>
          
          <CInput placeholder="Digite o nome do criminoso..." w="40%" ml="auto" v-model="nicknameModel" />            
         
          <CBox w="90px" mx="3">
            <CSelect v-model="regionModel">
              <option selected hidden disabled>REG</option>
              <option v-for="reg in regionsOptions" :key="`regOpt-${reg}`">{{ reg }}</option>
            </CSelect>
          </CBox>

          <CButton variant-color="vue" pb="1" @click="setQueryData()">Pesquisar</CButton>
        </CFlex>
        
        <Nuxt />
        
      </CBox>
    </CColorModeProvider>
  </CThemeProvider>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    nicknameModel: '',
    regionModel: ''
  }),
  computed: {
    ...mapState([
      'regions'
    ]),
    regionsOptions() {
      return this.regions.map(x => x.display_name)
    }
  },
  methods: {
    setQueryData() {
      const query = { nickname: this.nicknameModel, region: this.regionModel }
      this.$store.commit('SET_QUERY', query)
      this.$store.dispatch('getSummonerData')
    }
  },
  fetch() {
    const query = { ...this.$store.state.query }
    this.nicknameModel = query.nickname
    this.regionModel = query.region
  },
  created() {
    this.$store.dispatch('initialData')
  }
}
</script>
