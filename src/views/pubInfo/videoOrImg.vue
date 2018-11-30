<template>
  <div class="model-container">
    <div class="computer-wrapper">
      <img :src="require('../../../static/images/screem.png')" alt>
      <div class="content-wrapper" v-loading="loading">
        <el-upload
          v-if="contentType==2"
          class="upload-demo"
          drag
          action="action"
          :show-file-list="false"
          :before-upload="uploadFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>

        <el-button
          v-if="contentType==2"
          class="view-btn"
          size="mini"
          type="primary"
          icon="el-icon-caret-right"
          circle
          @click="toggleFun"
        ></el-button>

        <video
          v-if="contentType==1"
          class="video"
          :src="videoUrl"
          autoplay="autoplay"
          controls="controls"
        ></video>

        <el-button
          v-if="contentType==1"
          class="view-btn"
          size="mini"
          type="warning"
          icon="el-icon-upload"
          circle
          @click="toggleFun"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as common from "../../api/common";
export default {
  data() {
    return {
      id: "",
      videoUrl: "",
      contentType: "",

      loading:true
    };
  },

  beforeMount() {
    this.getVideo(() => {
        this.loading = false;
      this.contentType = this.videoUrl ? 1 : 2;
    });
  },
  methods: {
    getVideo(cb) {
      common.getAdvertList({ advertType: 8 }).then(res => {
        if (res.data.data.length) {
          const data = res.data.data[0];
          this.id = data.advertId;
          this.videoUrl = data.advertPicUrl;
        }
        cb ? cb() : "";
      });
    },
    uploadFile(file) {
        this.loading = true;

      const upLoadUrl = process.env.BASE_API + "/upload/uploadFile";
      let formData = new FormData();
      formData.append("files", file);
      formData.append("resPath", "video");

      const fileSize = file.size / 1024 / 1024;

      if (fileSize <= 20) {
        axios.post(upLoadUrl, formData).then(res => {
          const url = res.data.data;
          if (res.data.code == 1) {
            common
              .addOrEditAdvert({
                advertType: 8,
                advertId: this.id,
                advertPicUrl: url
              })
              .then(res => {
                this.getVideo(() => {
                  this.$message({
                    message: "上传并提交成功！",
                    type: "success"
                  });
                    this.loading = false;
                    this.contentType = 1;
                });
              });
          }
        });
      } else {
        this.$message({
          message: "上传视频不能大于20M",
          type: "warning"
        });
      }
    },
    toggleFun() {
      if (this.contentType == 2) {
        if (this.videoUrl) {
          this.contentType = 1;
        } else {
          this.$message({
            message: "暂无播放资源，请上传",
            type: "warning"
          });
        }
      } else {
        this.contentType = 2;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.computer-wrapper {
  width: 900px;
  margin: 0 auto;
  position: relative;
  img {
    width: 100%;
  }

  .content-wrapper {
    position: absolute;
    left: 48px;
    top: 82px;
    background: #fff;
    width: 810px;
    height: 456px;
    overflow: hidden;

    .upload-demo {
      text-align: center;
      box-sizing: border-box;
      padding-top: 130px;
    }

    .view-btn {
      position: absolute;
      top: 20px;
      right: -40px;
      transition: all 0.3s;
      opacity: 0;
    }
    &:hover {
      .view-btn {
        right: 20px;
        opacity: 1;
      }
    }

    .video {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
}
</style>


