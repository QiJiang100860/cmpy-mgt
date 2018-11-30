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
                    <el-col class="input-name" :span="7">参数键</el-col>
                    <el-col :span="17"><el-input placeholder="请输入关键字" v-model="seacherParam.paramKey" @keyup.enter.native="seachFun"></el-input></el-col>
                </el-col>

                <el-col :xl="4" :lg="6" :md="6" :sm="8">
                    <el-col class="input-name" :span="7">参数名</el-col>
                    <el-col :span="17"><el-input placeholder="请输入关键字" v-model="seacherParam.paramName" @keyup.enter.native="seachFun"></el-input></el-col>
                </el-col>
            </el-row> 
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <!-- <span><i class="iconfont icon-sousuo"></i>表格数据</span> -->
                <div class="btns-wrapper-left">
                    <el-button type="primary" plain @click="add">新增</el-button>
                    <el-popover
                        placement="top"
                        width="160"
                        v-model="alldelState">
                        <p style="margin-bottom:10px;font-weight:700;">确认删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="alldelState = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="allDel">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" plain  :disabled="!sysParamIds.length">删除</el-button>
                    </el-popover>
                    
                </div>
            </div>
            <div class="table-wrapper">
                <el-table empty-text="暂无数据" 
                :stripe="true" 
                :data="dataOption" 
                @selection-change="handleSelectionChange"
                v-loading="!dataOption">

                    <el-table-column type="selection" width="55"></el-table-column>
                   
                    <el-table-column prop="paramKey" label="参数键"></el-table-column>
                    
                    <el-table-column prop="paramName" label="参数名"></el-table-column>
                    <el-table-column prop="paramValue" label="参数值"></el-table-column>
                    <el-table-column label="创建时间">
                        <template slot-scope="scope">
                            <span>{{fattTime(scope.row.createTime)}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="备注">
                        <template slot-scope="scope">
                            <span>{{scope.row.memo || '暂无数据'}}</span>
                        </template>
                    </el-table-column>
                    
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

                    <el-table-column label="操作" width="140px">
                        <template slot-scope="scope">
                            <el-button type="primary" circle class="table-icon" @click="check(scope.row)"><i class="iconfont icon-chakan"></i></el-button>
                            <el-button type="primary" icon="el-icon-edit" circle class="table-icon" @click="edit(scope.row)"></el-button>
                            <el-popover
                                placement="top"
                                width="160"
                                v-model="scope.row.delState">
                                <p style="margin-bottom:10px;font-weight:700;">确认删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="scope.row.delState = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="del(scope.row)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="warning" circle icon="el-icon-delete" class="table-icon popver-btn"></el-button>
                            </el-popover>
                            
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
            <el-col :span="8" class="content-left"><label>参数键</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入参数键" v-model="dialogBindData.paramKey"></el-input>
              <span v-else>{{dialogBindData.paramKey}}</span>
            </el-col>
          </el-row>


        


          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>参数名</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入参数名" v-model="dialogBindData.paramName"></el-input>
              <span v-else>{{dialogBindData.paramName}}</span>
            </el-col>
          </el-row>


          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>参数值</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入参数值" v-model="dialogBindData.paramValue"></el-input>
              <span v-else>{{dialogBindData.paramValue}}</span>
            </el-col>
          </el-row>

          

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>备注</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" type="textarea" rows="3" placeholder="请输入备注" resize="none" v-model="dialogBindData.memo"></el-input>
              <span v-else>{{dialogBindData.memo || "暂无备注"}}</span>
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
import * as system from "../../api/system";
import * as common from "../../api/common";
import { fattCreateTime } from "../../utils/fattTime";
import elDragDialog from "@/directive/el-dragDialog";
export default {
    directives:{elDragDialog},
  data() {
    return {
      seacherParam: {
        paramKey: "",
        paramName: ""
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
        paramId: "",
        paramKey: "",
        paramName: "",
        paramValue: "",
        memo: ""
      },
      // 是否提交
      submmitSuccess: false,
      // 多个删除的参数
      sysParamIds: [],
      alldelState:false
    };
  },

  beforeMount() {
    this.getList();
  },
  mounted() {},
  methods: {
    seachFun() {
      this.$seach
        .submmit(this, system.getSysParamList)
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
    del(data) {
      system
        .deleteSysParam({
          sysParamId: data.paramId
        })
        .then(res => {
          if (res.data.code === "1") {
            this.getList(() => {
              data.delState = false;
            });
          }
          this.$message({
            message: "删除成功",
            type: "success"
          });
          data.delState = false;
        });
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
      // if (this.dialogType === 1) {
      //   alert(`添加${JSON.stringify(this.dialogBindData)}`);
      // } else {
      //   alert(`编辑${JSON.stringify(this.dialogBindData)}`);
      // }
      // 发送添加请求
      const isSubmitActive =
        this.dialogBindData.paramKey &&
        this.dialogBindData.paramName &&
        this.dialogBindData.paramValue;
      if (isSubmitActive) {
        this.submmitSuccess = true;
        system.addOrEditSysParam(this.dialogBindData).then(res => {
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
        pageSize: this.pageSize,
      };
      // 组装搜索参数
      for (const key in this.seacherParam) {
        if (this.seacherParam[key]===0 || this.seacherParam[key]) {
          param[key] = this.seacherParam[key]
        }
      }
      system
        .getSysParamList(param)
        .then(res => {
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
    // 改变启用状态
    handleIsVailable(data) {
      console.log(data.isVailable);
      const param = {
        visitReasonId: data.visitReasonId,
        isVailable: data.isVailable ? 0 : 1
      };
      visitor.addOrEditVisitReason(param).then(res => {
        if (res.data.code === "1") {
          this.$message({
            message: "设置成功",
            type: "success"
          });
        }
      });
    },
    // 全选组装参数
    handleSelectionChange(val) {
      const filterId = val => {
        let arr = [];
        if (val.length) {
          for (const item of val) {
            arr.push(item.paramId);
          }
          return arr;
        } else {
          return [];
        }
      };
      this.sysParamIds = filterId(val).join(",");
      console.log(this.sysParamIds)
    },
    allDel() {
      system.batchDelete({ sysParamIds: this.sysParamIds }).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.alldelState = false;
        this.getList(() => {});
      });
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
