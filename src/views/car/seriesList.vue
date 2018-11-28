<template>
    <div class="model-container">
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <span><i class="iconfont icon-sousuo"></i>快捷搜索</span>
                <div class="btns-wrapper-right">
                    <el-button type="primary" plain @click="seachFun">确定</el-button>
                    <el-button type="warning" plain @click="resetFun" :disabled="isActiveReset">重置</el-button>
                </div>
            </div>
            <el-row :gutter="15">
                <el-col :xl="4" :lg="6" :md="6" :sm="8">
                    <el-col class="input-name" :span="7">车系名称</el-col>
                    <el-col :span="17"><el-input placeholder="请输入关键字" v-model="seacherParam.carSeriesName" @keyup.enter.native="seachFun"></el-input></el-col>
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

                   
                    <!-- <el-table-column prop="carSeriesName" label="车系名称"></el-table-column> -->


                    <el-table-column label="车系名称">
                        <template slot-scope="scope">
                            <el-popover
                                placement="right"
                                width="200"
                                trigger="hover"
                                @show="getCarBrand(scope.row.carBrandId)"
                                v-model="scope.row.delState">
                                <div class="apply-member-infro">
                                    <h2>车辆信息</h2>
                                    <div class="infro-content">
                                        <div class="infro-item">
                                            <label>品牌</label>
                                            <span>{{carBrand?carBrand.carBrandName:""}}</span>
                                        </div>
                                        <div class="infro-item">
                                            <label>车系</label>
                                            <span>{{scope.row.carSeriesName}}</span>
                                        </div>
                                    </div>
                                </div>
                                <span class="apply-member-name-tigger-btn" slot="reference">{{scope.row.carSeriesName}}</span>
                            </el-popover>
                            <!-- <span></span> -->
                        </template>
                    </el-table-column>


                    <el-table-column label="创建时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime?fattTime(scope.row.createTime):'暂无数据'}}</span>
                        </template>
                    </el-table-column>

                    <!-- <el-table-column prop="memo" label="备注"></el-table-column> -->
                    
                    <!-- <el-table-column label="启用状态">
                        <template slot-scope="scope">
                            <span>
                                <el-switch
                                v-model="scope.row.isVailable"
                                :active-value="1"
                                :inactive-value="0"
                                @change="handleIsVailable(scope.row)">
                                </el-switch>
                            </span>
                        </template>
                    </el-table-column> -->

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" circle class="table-icon" @click="check(scope.row)"><i class="iconfont icon-chakan"></i></el-button>
                            <el-button type="primary" icon="el-icon-edit" circle class="table-icon" @click="edit(scope.row)"></el-button>
                            <!-- <el-popover
                                placement="top"
                                width="160"
                                v-model="scope.row.delState">
                                <p style="margin-bottom:10px;font-weight:700;">确认删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="scope.row.delState = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="del(scope.row)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="warning" circle icon="el-icon-delete" class="table-icon popver-btn"></el-button>
                            </el-popover> -->
                            
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
                :total="rowCount">
              </el-pagination>

            </div>

        </el-card>

        <!-- 添加dialog -->

        <!-- 查看，编辑dialog -->
        <el-dialog
        v-el-drag-dialog
        :title="dialogTitle"
        :visible.sync="dialogState"
        width="30%"
        :before-close="handleClose">
        <div class="dialog-body-content">

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>选择品牌</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select v-if="dialogType===1 || dialogType===2" placeholder="请选择品牌" v-model="carBrandId">
                    <el-option
                    v-for="item in carBrands"
                    :key="item.carBrandId"
                    :label="item.carBrandName"
                    :value="item.carBrandId">
                    </el-option>
                </el-select>
              <span v-else>{{getCarBrand(carBrandId)}}</span>
            </el-col>
          </el-row>
          
          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>车系名称</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入车系名称" v-model="dialogBindData.carSeriesName"></el-input>
              <span v-else>{{dialogBindData.carSeriesName}}</span>
            </el-col>
          </el-row>
          
        </div>
        <div class="btns-wrapper">
              <el-button size="small" @click="handleClose" :disabled="dialogType===3"><i class="iconfont icon-quxiao"></i>取消</el-button>
              <el-button v-if="!submmitSuccess" type="primary" size="small" @click="submmitFun" :disabled="dialogType===3"><i class="iconfont icon-tijiao"></i>提交</el-button>
              <el-button v-else :loading="true" type="primary" size="small" :disabled="true">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as car from "../../api/car";
import * as common from "../../api/common";
import { fattCreateTime } from "../../utils/fattTime";
import elDragDialog from "@/directive/el-dragDialog";
export default {
  directives:{elDragDialog},
  data() {
    return {
      seacherParam: {
        carSeriesName: ""
      },
      // 表格数据
      dataOption: null,
      // 分页数据
      rowCount: new Number(), //总条数
      pageSize: 10, //每页几条
      pageNo: 1,
      //   ---------------------------------------查看和编辑dialog--------------------------------
      dialogState: false,
      dialogType: 1, // 1--增加  2--编辑  3--查看
      //dialog弹框绑定数据

      // createTime:1527314737000
      // createTimeEnd:null
      // createTimeStart:null
      // isVailable:
      // memo:"日常拜访"
      // operatorId:null
      // operatorType:null
      // pk:"1001"
      // updateTime:null
      // updateTimeEnd:null
      // updateTimeStart:null
      // visitReason:"日常拜访"
      // visitReasonId:"1001"

      dialogBindData: {
        carSeriesId: "",
        carSeriesName: ""
      },
      // 是否提交
      submmitSuccess: false,

      // 品牌信息
      carBrands: null,
      carBrand: null,
      carBrandId:""
    };
  },

  beforeMount() {
    this.getList();
    this.getCarBrands();
  },
  mounted() {},
  methods: {
    seachFun() {
      this.$seach
        .submmit(this, car.getCarSeriesList)
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
    // del(data) {
    //   visitor
    //     .deleteVisitReason({
    //       visitReasonId: data.visitReasonId
    //     })
    //     .then(res => {
    //       if (res.data.code === "1") {
    //         this.getList(() => {
    //           data.delState = false;
    //         });
    //       }
    //       this.$message({
    //         message: res.data.msg,
    //         type: "warning"
    //       });
    //       data.delState = false;
    //     });
    // },
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
      this.carBrandId = data.carBrandId
    },
    submmitFun() {
      // if (this.dialogType === 1) {
      //   alert(`添加${JSON.stringify(this.dialogBindData)}`);
      // } else {
      //   alert(`编辑${JSON.stringify(this.dialogBindData)}`);
      // }
      // 发送添加请求
      const param = {
            carSeriesId:this.dialogBindData.carSeriesId,
            carBrandId:this.carBrandId,
            carSeriesName:this.dialogBindData.carSeriesName
        }
      const isSubmitActive = param.carBrandId&&param.carSeriesName;
      if (isSubmitActive) {
        this.submmitSuccess = true;
        
        car.addOrEditCarSeries(param).then(res => {
          this.getList(() => {
            this.$message({
              message: this.dialogType === 1 ? "添加成功" : "编辑成功",
              type: "success"
            });
            this.submmitSuccess = false;
            this.handleClose();
          });
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
        if (key === "sex") {
          this.dialogBindData[key] = 1;
        } else {
          this.dialogBindData[key] = "";
        }
      }
      this.carBrandId = ""
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
        if (this.seacherParam[key]===0 || this.seacherParam[key]) {
          param[key] = this.seacherParam[key]
        }
      }
      car
        .getCarSeriesList(param)
        .then(res => {
          // 初始话表格数据
          this.dataOption = res.data.data;
          // 初始化分页数据
          this.rowCount = res.data.rowCount;
          this.pageSize = res.data.pageSize;
          cb ? cb() : "";
        });
    },

    // 格式化时间
    fattTime(time) {
      return fattCreateTime(time);
    },
    // 获取车辆品牌集合
    getCarBrands() {
      car.getCarBrands().then(res => {
        this.carBrands = res.data.data;
      });
    },
    getCarBrand(id) {
      const carBrands = this.carBrands;
      for (const item of carBrands) {
        if (item.carBrandId === id) {
          this.carBrand = item;
          return item.carBrandName;
        }
      }
    }
  },
  computed: {
    // 激活重置按钮
    isActiveReset() {
      for (const key in this.seacherParam) {
        if (this.seacherParam[key]) {
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
.apply-member-name-tigger-btn {
  text-decoration: underline;
  color: #409eff;
  cursor: pointer;
}
.apply-member-infro {
  h2 {
    font-size: 14px;
    &::before {
      content: "1";
      background: #3a8ee6;
      color: transparent;
      margin-right: 10px;
    }
  }
  .infro-content {
    .infro-item {
      border-bottom: solid 1px #dedede;
      label,
      span {
        display: inline-block;
        line-height: 36px;
      }
      label {
        font-weight: normal;
        margin-right: 10px;
        color: #666;
        width: 48px;
        text-align: right;
      }
      span {
        color: #666;
      }
    }
  }
}
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
