<template>
  <div class="model-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>配置企业文化图片</span>
        <!-- <el-button style="float: right;" size="mini" type="primary" @click="submit">提交</el-button> -->
      </div>

      <div class="img-item">
        <h1>企业理念及企业文化配图</h1>
        <up-load-img
          ref="imgComponent"
          width="1334"
          height="300"
          resPath="banner"
          :type="1"
          :viewUrl="pic1"
          @emitSuccess="handleImgLoad1"
        ></up-load-img>
      </div>

      <div class="img-item">
        <h1>公司发展历史配图</h1>
        <up-load-img
          ref="imgComponent"
          width="1334"
          height="300"
          resPath="banner"
          :type="1"
          :viewUrl="pic2"
          @emitSuccess="handleImgLoad2"
        ></up-load-img>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as cpyCulture from "../../api/cpyCulture";
import UpLoadImg from "@/components/UpLoadImg";
export default {
  components: {
    UpLoadImg
  },
  data() {
    return {
      id1: "",
      id2: "",

      pic1: "",
      pic2: ""
    };
  },
  beforeMount() {
    this.getPagePic();
  },
  methods: {
    getPagePic(cb) {
      cpyCulture.getCompanyPicList().then(res => {
        const data = res.data.data;
        debugger
        for(let idx in data){
          if(data[idx].companyType==1){
            this.id1 = data[idx].companyPicId;
            this.pic1 = data[idx].companyPic;
          }else if(data[idx].companyType==2){
            this.id2 = data[idx].companyPicId;
            this.pic2 = data[idx].companyPic;
          }
        }
      
        cb ? cb() : "";
      });
    },
    handleImgLoad1(url) {
      this.pic1 = url;
      const param = {
        companyPicId: this.id1,
        companyType: 1,
        companyPic: url
      };

      this.$confirm("文件上传成功, 确定提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.submitData(param, () => {
            this.$message({
              type: "success",
              message: "提交成功！"
            });
          });
        })
        .catch(() => {
          this.pic1 = "";
          this.$message({
            type: "info",
            message: "您取消了提交，请重新上传"
          });
        });
    },
    handleImgLoad2(url) {
      this.pic2 = url;
      const param = {
        companyPicId: this.id2,
        companyType: 2,
        companyPic: url
      };

      this.$confirm("文件上传成功, 确定提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.submitData(param, () => {
            this.$message({
              type: "success",
              message: "提交成功！"
            });
          });
        })
        .catch(() => {
          this.pic2 = "";
          this.$message({
            type: "info",
            message: "您取消了提交，请重新上传"
          });
        });
    },

    submitData(data, cb) {
      cpyCulture.addOrEditCompanyPic(data).then(res => {
        this.getPagePic(() => {
          cb ? cb() : "";
        });
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.img-item {
  h1 {
    font-size: 14px;
    color: #666;
    line-height: 32px;
  }
}
</style>

