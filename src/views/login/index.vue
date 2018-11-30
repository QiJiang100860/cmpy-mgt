<template>
  <div class="login-container" :style="{backgroundImage:'url(' + bgImg + ')' }">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">翔天世纪集团官网管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="iconfont icon-dengluyonghuming"></i>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-mima"></i>
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd">
          <i class="iconfont" :class="passwordType==='password'?'icon-yanjing-bi':'icon-yanjing'"></i>
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;height:50px;margin-bottom:20px;font-size:16px;" :loading="loading" @click.native.prevent="handleLogin">登&nbsp;录</el-button> 
    </el-form>

    

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import bgImg from '../../../static/images/login-bg.png'
export default {
  components: {},
  name: 'login',
  data() {
    
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      bgImg:bgImg,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(res => {
            this.loading = false
            if(res.code==0){
              this.$message({
                message: res.msg,
                type: "warning"
              });
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      
    }
  },
  created() {
   
  },
  destroyed() {
   
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#fff;
$light_gray:#333;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: light_gray !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-size:100% 100%;
  background-position:center center;
  background-repeat:no-repeat;
  .login-form {
    position: absolute;
    left: 50%;
    top:50%;
    margin-left:-210px;
    margin-top:-240px;
    width: 420px;
    padding: 35px 35px 15px 35px;
    background:rgba(255,255,255,.5);
    border-radius:10px;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,.15);
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    .iconfont{
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: normal;
      color: #666;
      margin: 0px auto 40px auto;
      text-align: center;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    .iconfont{
      font-size:20px;
    }
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
