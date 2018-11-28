<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div class="fixed-header-container" :class="isCollapse?'meau-opend':''">
        <navbar></navbar>
        <tags-view></tags-view>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    isCollapse() {
      return this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    // background: #f0f0f0;
    .main-container{
      box-sizing: border-box;
      padding-top:84px; 
      background: #f0f0f0;
      .fixed-header-container{
        position: fixed;
        z-index: 1000;
        box-sizing: border-box;
        width: 100%;
        top: 0;
        left: 0;
        padding-left:36px;
        transition: padding-left .5s;
        &.meau-opend{
          padding-left:180px; //回家调整vuex公共的状态
        }
      }
    }
  }
</style>
