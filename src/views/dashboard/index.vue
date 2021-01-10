<template>
  <div>
    仪表页面
    <el-button @click="saveOut">退出登陆</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    saveOut(){
      sessionStorage.clear()
      this.$router.push('/login')
    }
  },
};
</script>
<style lang='scss' scoped>
</style>