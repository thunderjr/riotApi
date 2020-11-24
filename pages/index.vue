<template>
  <div v-if="!loading">
    <CBox
      p="8"
      mt="16"
      mx="auto"
      max-W="960px"
      d="flex"
      flex-dir="column"
      align="center"
      rounded="md"
      bg="cyan.400"
    >
      <CAvatar size="2xl" :src="summoner_icon" mx="auto"/>
      <CText fontSize="20pt" fontWeight="bolder" color="white">{{ summoner_name }}</CText>
      <CFlex mt="5" justify="center">
        <CBox
          v-for="(champ, i) in limitedMasteryData"
          :key="`champMastery${i}`"
          p="5"
          m="5"
          rounded="md"
          border="1px solid black"
        >
          <CImage :src="championImage(mastery_data[i].championId)" />
        </CBox>
      </CFlex>
    </CBox>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    
  }),
  computed: {
    ...mapState(['mastery_data']),
    ...mapGetters(['summoner_icon', 'summoner_name', 'championImage', 'championById']),
    limitedMasteryData() {
      return [...this.mastery_data.filter((_, i) => i < 4)]
    },
    loading() {
      return !(Object.keys(this.$store.state.summoner_data).length > 0)
    },
  },
}
</script>