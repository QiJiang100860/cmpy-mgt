import viewImg from './viewImg'

const install = function(Vue) {
  Vue.directive('viewImg', viewImg)
}

if (window.Vue) {
  window.viewImg = viewImg
  Vue.use(install); // eslint-disable-line
}

viewImg.install = install
export default viewImg
