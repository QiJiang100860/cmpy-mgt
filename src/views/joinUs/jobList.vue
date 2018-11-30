<template>
  <div class="model-container">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>
          <i class="iconfont icon-sousuo"></i>快捷搜索
        </span>
        <div class="btns-wrapper-right">
          <el-button type="primary" plain @click="seachFun">确定</el-button>
          <el-button type="warning" plain @click="resetFun" :disabled="isActiveReset">重置</el-button>
        </div>
      </div>
      <el-row :gutter="15">
        <el-col :xl="4" :lg="6" :md="6" :sm="8">
          <el-col class="input-name" :span="7">职位名称</el-col>
          <el-col :span="17">
            <el-input
              placeholder="请输入关键字"
              v-model="seacherParam.stationName"
              @keyup.enter.native="seachFun"
            ></el-input>
          </el-col>
        </el-col>

        <el-col :xl="4" :lg="6" :md="6" :sm="8">
          <el-col class="input-name" :span="7">启用状态</el-col>
          <el-col :span="17">
            <el-select v-model="seacherParam.isAvailable" placeholder="请选择">
              <el-option
                v-for="item in isAvailableData"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
    </el-card>
    <el-card>


      <div slot="header" class="clearfix">
        <!-- <span><i class="iconfont icon-sousuo"></i>表格数据</span> -->
        <div class="btns-wrapper-left">
          <el-button type="primary" plain @click="add">新增</el-button>
        </div>
      </div>


      <div class="table-wrapper">
        <el-table empty-text="暂无数据" :stripe="true" :data="dataOption" v-loading="!dataOption">

         


          <el-table-column prop="stationName" label="职位名称"></el-table-column>

          <el-table-column prop="stationDetaile" label="职位详情"></el-table-column>

          <el-table-column label="启用状态">
            <template slot-scope="scope">
              <span>
                <el-switch
                  v-model="scope.row.isAvailable"
                  :active-value="1"
                  :inactive-value="0"
                  @change="handleIsVailable(scope.row)"
                ></el-switch>
              </span>
            </template>
          </el-table-column>

          

          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime?fattTime(scope.row.createTime):"暂无数据"}}</span>
            </template>
          </el-table-column>


          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" circle class="table-icon" @click="check(scope.row)">
                <i class="iconfont icon-chakan"></i>
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                class="table-icon"
                @click="edit(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页处理 -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rowCount"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 添加dialog -->
    <!-- 查看，编辑dialog -->
    <el-dialog
      v-el-drag-dialog
      :title="dialogTitle"
      :visible.sync="dialogState"
      width="30%"
      :before-close="handleClose"
    >
      <div class="dialog-body-content">

        
       

        
        <el-row :gutter="15">
          <el-col :span="8" class="content-left">
            <label>职位名称</label>
          </el-col>
          <el-col :span="16" class="content-right">
            <el-input
              v-if="dialogType===1 || dialogType===2"
              size="small"
              placeholder="请输入职位名称"
              v-model="dialogBindData.stationName"
            ></el-input>
            <span v-else>{{dialogBindData.stationName}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="8" class="content-left">
            <label>职位详情</label>
          </el-col>
          <el-col :span="16" class="content-right">
            <el-input
              v-if="dialogType===1 || dialogType===2"
              size="small"
              type="textarea"
              rows="3"
              placeholder="请输入职位详情"
              resize="none"
              v-model="dialogBindData.stationDetaile"
            ></el-input>
            <span v-else>{{dialogBindData.stationDetaile}}</span>
          </el-col>
        </el-row>


      </div>


      <div class="btns-wrapper">
        <el-button size="small" @click="handleClose" :disabled="dialogType===3">
          <i class="iconfont icon-quxiao"></i>取消
        </el-button>
        <el-button
          v-if="!submmitSuccess"
          type="primary"
          size="small"
          @click="submmitFun"
          :disabled="dialogType===3"
        >
          <i class="iconfont icon-tijiao"></i>提交
        </el-button>
        <el-button v-else :loading="true" type="primary" size="small" :disabled="true">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as joinUs from "../../api/joinUs";
import { fattCreateTime } from "../../utils/fattTime";
import elDragDialog from "@/directive/el-dragDialog";

import viewImg from "@/directive/viewImg";
import UpLoadImg from "@/components/UpLoadImg";
export default {
  directives: { elDragDialog,viewImg },
  components:{UpLoadImg},
  data() {
    return {
      seacherParam: {
        stationName:'',
        isAvailable:''
      },
      isAvailableData: [{ code: 1, name: "启用" }, { code: 0, name: "未启用" }],
      // 表格数据
      dataOption: null,
      // 分页数据
      rowCount: new Number(), //总条数
      pageSize: 10, //每页几条
      pageNo: 1,
      //   ---------------------------------------查看和编辑dialog--------------------------------
      dialogState: false,
      dialogType: 1, // 1--增加  2--编辑  3--查看
      
      dialogBindData: {

        //加入我们id
        joinUsId:'',
        stationName:'',
        stationDetaile:'',
        isAvailable:'',
        createTime:''
      },
      // 是否提交
      submmitSuccess: false,
      //   dataDictItems: null,
      dataDicts: null
    };
  },

  beforeMount() {
    this.getList();
  },
  mounted() {},
  methods: {
    seachFun() {
      this.$seach
        .submmit(this, joinUs.getJionUsList)
        .then(res => {
          this.dataOption = res.data.data;
          // 初始化分页数据
          this.rowCount = res.data.rowCount;
          this.pageSize = res.data.pageSize;
          this.$message({
            message: "搜索成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message({
            message: "搜索失败",
            type: "warning"
          });
        });
    },
    // 重置搜索条件
    resetFun() {
      this.$seach.reset(this);
      this.getList();
    },
    add() {
      this.dialogType = 1;
      this.dialogState = true;
    },
    edit(data) {
      this.dialogType = 2;
      this.reBindData(data);
      this.dialogState = true;
    },
    check(data) {
      this.dialogType = 3;
      this.reBindData(data);
      this.dialogState = true;
    },
    //获取的列表数据重新绑定到对应模型上面
    reBindData(data) {
      for (const key in this.dialogBindData) {
        this.dialogBindData[key] = data[key];
      }
    },
    submmitFun() {
     
      let param = {
          joinUsId:this.dialogBindData.joinUsId,
          stationName:this.dialogBindData.stationName,
          stationDetaile:this.dialogBindData.stationDetaile,
      };
      let isSubmitActive;
      isSubmitActive = param.stationName && param.stationDetaile;
      if (isSubmitActive) {
        this.submmitSuccess = true;
        joinUs.addOrEditJoinUs(param).then(res => {
          if (res.data.code == 1) {
            this.getList(() => {
              this.$message({
                message: this.dialogType === 1 ? "添加成功" : "编辑成功",
                type: "success"
              });
              this.submmitSuccess = false;
              this.handleClose();
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
            this.submmitSuccess = false;
          }
        });
      } else {
        this.$message({
          message: "请完善提交信息",
          type: "warning"
        });
      }
    },
    //关闭弹框
    handleClose() {
      this.dialogState = false;
      for (const key in this.dialogBindData) {
        if (key === "isAvailable") {
          this.dialogBindData[key] = 0;
        } else {
          this.dialogBindData[key] = "";
        }
      }

      
    },
    // 分页处理
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = Number(val);
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = Number(val);
      this.getList();
    },
    // 获取表格数据
    getList(cb) {
      let param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      // 组装搜索参数
      for (const key in this.seacherParam) {
        if (this.seacherParam[key] === 0 || this.seacherParam[key]) {
          param[key] = this.seacherParam[key];
        }
      }

      joinUs.getJionUsList(param).then(res => {
        // 初始话表格数据
        this.dataOption = res.data.data;
        // 初始化分页数据
        this.rowCount = res.data.rowCount;
        this.pageSize = res.data.pageSize;
        cb ? cb() : "";
      });
    },

    // getDataDictItems(cb) {
    //   system.getDataDictItems().then(res => {
    //     this.dataDictItems = res.data.data;
    //     cb ? cb() : "";
    //   });
    // },

   

    // 格式化时间
    fattTime(time) {
      return fattCreateTime(time);
    },
    // 改变启用状态
    handleIsVailable(data) {
      const param = {
        joinUsId: data.joinUsId,
        isAvailable: data.isAvailable ? 1 : 0,
      };
      joinUs.addOrEditJoinUs(param).then(res => {
        if (res.data.code === "1") {
          this.$message({
            message: "设置成功",
            type: "success"
          });
          this.getList();
        }
      });
    }
  },
  computed: {
    // 激活重置按钮
    isActiveReset() {
      for (const key in this.seacherParam) {
        if (this.seacherParam[key] === 0 || this.seacherParam[key]) {
          return false;
        }
      }
      return true;
    },
    //弹框的title
    dialogTitle() {
      if (this.dialogType === 1) {
        return "添加";
      }
      if (this.dialogType === 2) {
        return "编辑";
      } else {
        return "查看";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-body-content {
  .el-row {
    margin-top: 14px;
    line-height: 32px;
    &:first-child {
      margin-top: 0;
    }

    .content-left {
      text-align: right;
      label {
        font-weight: normal;
        color: #666;
      }
    }
    .content-right {
      width: 215px;
      span {
        display: block;
        border-bottom: solid 1px #dedede;
        box-sizing: border-box;
        padding-left: 15px;
      }
    }
  }
}
</style>
