<template>
  <div class="uploadimg-container" :style="{width:width+'px'}">
    <el-upload
        class="uploader-component"
        :style="styleObj"
        action=""
        :show-file-list="false"
        :before-upload="uploadFile">
        <img :style="styleObj" v-if="type||imageUrl" :src="viewUrl || imageUrl" class="avatar">
        <i v-else :style="styleObj" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="tip">宽/高:{{`${width}*${height}`}}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["width", "height", "resPath", "type", "viewUrl","imageType"],
  data() {
    return {
      imageUrl: "",
      param: { resPath: this.resPath },
      styleObj: {
        width: this.width + "px",
        height: this.height + "px",
        lineHeight: this.height + "px"
      }
    };
  },
  mounted() {},
  updated() {},
  methods: {
    uploadFile(file) {
      const upLoadUrl = process.env.BASE_API + "/upload/uploadFile";
      let formData = new FormData();
      formData.append("files", file);
      formData.append("resPath", this.resPath);

      // 限制图片上传比例
      if(this.imageType==="banner"){
        console.log(this.imageType)
        formData.append("imageType", this.imageType);
      }


      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 6) {
        this.$message({
          message: "上传图片不能大于6M",
          type: "warning"
        });
      } else {
        axios.post(upLoadUrl, formData).then(res => {
          if (res.data.code == 1) {
            this.imageUrl = res.data.data;
            this.$emit("emitSuccess", res.data.data);
            this.$message({
              message: "上传成功",
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      }
    },
    clearImg() {
      this.imageUrl = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.uploadimg-container{
  position: relative;
  overflow: hidden;
  display: inline-block;
  .uploader-component {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
    transition: all 0.3s;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      transition: all 0.3s;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    &:hover {
      border-color: #409eff;
      .avatar-uploader-icon {
        font-size: 28px;
        color: #409eff;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      &+.tip{
        left: 10px;
        opacity: 1;
      }
    }
  }
  .tip{
    position: absolute;
    left: -140px;
    opacity: 0;
    top: 0;
    width: 131px;
    color: #fff;
    text-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 1);
    font-weight: 700;
    cursor: pointer;
    transition: all .3s;
    &:hover{
      left: 10px;
      opacity: 1;
    }
  }
}

</style>

