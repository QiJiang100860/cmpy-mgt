<template>
  <div class="upload-container"> 
      <el-upload 
        action=""
        :show-file-list="false"
        :before-upload="uploadFile">
        <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" type="primary">上传图片</el-button>
      </el-upload>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    resPath:{
      type:String,
      default:"proImg"
    }
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {

    uploadFile(file) {
      const upLoadUrl = process.env.BASE_API + "/upload/uploadFile";
      let formData = new FormData();
      formData.append("files", file);
      formData.append("resPath", this.resPath);
      console.log(this.resPath)
      const fileSize = file.size/1024/1024;
      if(fileSize>2){
          this.$message({
            message: "上传图片不能大于2M",
            type: "warning"
          });
      }else{
        axios.post(upLoadUrl, formData).then(res => {
          this.$emit('successCBK', res.data.data)
          this.$message({
            message: "上传成功",
            type: "success"
          });
        });
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>