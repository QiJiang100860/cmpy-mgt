<template>
  <div class="index-model-container">
    <img class="main-img" :class="cityBg?'active':''" :src="require('../../../static/images/index-main-img.png')" alt="">
    <img class="city-bg" :class="cityBg?'active':''" :src="require('../../../static/images/index-bg-index.png')" alt="">
    <img class="ewm-item" :class="cityBg?'active':''" :src="require('../../../static/images/index-ewm.png')" alt="">
    <img class="ewm-item ewm-item1" :class="cityBg?'active':''" :src="require('../../../static/images/index-ewm.png')" alt="">
  </div>
</template>

<script>
export default {
  data(){
    return {
      cityBg:false
    }
  },
  mounted(){
    this.cityBg = true
  },
  destroyed(){
    this.cityBg = false
  }
}
</script>
<style lang="scss" scoped>
.index-model-container{
  min-height: 100%;
  background: #ffffff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .city-bg{
    position: absolute;
    bottom: -240px;
    width: 100%;
    opacity: 0;
    transition: all 1.2s;
    transition-delay: 1s;
    &.active{
      bottom: 0px;
      opacity: 1;
    }
  }
  .main-img{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -300px;
    transform: scale(0);
    opacity: 0;
    transition: all 1s;
    &.active{
      transform: scale(1);
      opacity: 1;
    }
  }
  .ewm-item{
    position: absolute;
    right: -140px;
    opacity: 0;
    bottom: 180px;
    transition: all .8s;
    transition-delay: 2.2s;
    &.active{
      right: 100px;
      opacity: 1;
    }
  }
  .ewm-item1{
    // transition-delay: 3s;
    &.active{
      right: 300px;
      opacity: 1;
    }
  }
}

</style>
