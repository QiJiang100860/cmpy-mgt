<template>
  <div class="model-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>设置集团信息</span>
        <el-button style="float: right;" size="mini" type="primary" @click="submit">提交</el-button>
      </div>

      <div class="setting-item">
        <el-form label-width="80px">
          <el-form-item label="主图">
            <up-load-img ref="imgComponent" width="192" height="108" resPath="banner"  :type="1" :viewUrl="mainPic" @emitSuccess="handleImgLoad"></up-load-img>
          </el-form-item>
          <el-form-item label="背景图片">
            <up-load-img ref="imgComponent" width="244" height="162" resPath="banner"  :type="1" :viewUrl="bgPic" @emitSuccess="handleImgLoad1"></up-load-img>
          </el-form-item>
          <el-form-item label="中文标题">
            <el-input placeholder="请输入中文标题" v-model="cNTitle"></el-input>
          </el-form-item>
          <el-form-item label="英文标题">
            <el-input placeholder="请输入英文标题" v-model="eGTitle"></el-input>
          </el-form-item>
          <el-form-item label="集团简介">
            <el-input type="textarea" placeholder="请输入集团简介" resize='none' rows="6" v-model="brief"></el-input>
          </el-form-item>
        </el-form>

        <div class="tip-text">
          <h1>操作提示</h1>
          <p>
            修改完信息之后，一定要点击<span>【提交】</span>按钮，否则信息配置不成功！
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>
import * as common from "../../api/common";
import viewImg from "@/directive/viewImg";
import UpLoadImg from "@/components/UpLoadImg";
export default {
  directives: {
    viewImg:'',
   
  },
  components: {
    UpLoadImg
  },
  data () {
    return {
      briefId:'',

      mainPic:'',
      bgPic:'',
      cNTitle:'',
      eGTitle:'',
      brief:'',
    }
  },
  beforeMount () {
    this.getPageData();
  },
  methods: {
    getPageData(cb){
      const param = {
        advertType:3
      }
      common.getAdvertList(param).then(res=>{
        const data = res.data.data[0]
        this.briefId = data.advertId
        this.mainPic = data.advertPicUrl
        this.bgPic = data.linkUrl
        this.cNTitle = data.advertTitle
        this.eGTitle = data.advertSubtitle
        this.brief = data.advertContent

        cb?cb():''
      })
    },
    submit() {
      const param = {
        advertId:this.briefId,
        advertPicUrl:this.mainPic,
        linkUrl:this.bgPic,
        advertTitle:this.cNTitle,
        advertSubtitle:this.eGTitle,
        advertContent:this.brief,

        advertType:3,
        isAvailable:1
      }

      common.addOrEditAdvert(param).then(res=>{
        this.getPageData(() => {
          this.$message({
            message: '设置成功！',
            type: "success"
          });
        });
      })
    },
    handleImgLoad(url){
      this.mainPic = url
    },
    handleImgLoad1(url){
      this.bgPic = url
    }
  }
};
</script>

<style lang="scss" scoped>
.setting-item{
    width: 400px;
    margin-left: 100px;
    position: relative;
   .tip-text{
     position: absolute;
     right: -400px;
     top: 0;
     border:dashed 1px #dedede;
     width: 300px;
     min-height:200px;
     border-radius:10px;
     h1{
       text-align: center;
       font-size: 14px;
       line-height: 36px;
       background: #409EFF;
       color: #fff;
       border-top-left-radius: 10px;
       border-top-right-radius: 10px;
     }
     p{
       font-size: 14px;
       color: #666;
       box-sizing: border-box;
       padding: 10px 15px;
       line-height: 20px;
       span{
         font-weight: 700;
       }
     }
   }
}
</style>


