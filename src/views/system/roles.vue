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
                    <el-col class="input-name" :span="7">角色名称</el-col>
                    <el-col :span="17"><el-input placeholder="请输入关键字" v-model="seacherParam.roleName" @keyup.enter.native="seachFun"></el-input></el-col>
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

                   
                    <el-table-column prop="roleName" label="角色名称"></el-table-column>
                    
                    
                    <el-table-column label="是否可用">
                        <template slot-scope="scope">
                            <span>{{scope.row.isAvailabel===1?'是':'否'}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="是否可删除">
                        <template slot-scope="scope">
                            <span>{{scope.row.isDeleted===1?'是':'否'}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="创建时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime?fattTime(scope.row.createTime):'暂无数据'}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="备注">
                        <template slot-scope="scope">
                            <span>{{scope.row.memo || "暂无数据"}}</span>
                        </template>
                    </el-table-column>

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
            <el-col :span="8" class="content-left"><label>角色名称</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入角色名称" v-model="dialogBindData.roleName"></el-input>
              <span v-else>{{dialogBindData.roleName}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>是否可用</label></el-col>
            <el-col :span="16" class="content-right">
              <el-radio-group v-if="dialogType===1 || dialogType===2" v-model="dialogBindData.isAvailable">
                <el-radio size="small" :label="1">是</el-radio>
                <el-radio size="small" :label="0">否</el-radio>
              </el-radio-group>
              <span v-else>{{dialogBindData.isAvailable===1?"是":"否"}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>是否可删除</label></el-col>
            <el-col :span="16" class="content-right">
              <el-radio-group v-if="dialogType===1 || dialogType===2" v-model="dialogBindData.isDeleted">
                <el-radio size="small" :label="1">是</el-radio>
                <el-radio size="small" :label="0">否</el-radio>
              </el-radio-group>
              <span v-else>{{dialogBindData.isDeleted===1?"是":"否"}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15" v-if="dialogState">
            <el-col :span="8" class="content-left"><label>角色权限</label></el-col>
            <el-col :span="16" class="content-right">
              <tree-meau ref="rolesTree" :treedata="treedata" type="checkBox" :dafaultExtend="defalutExtentArr" @emitConfirm="treeConfirm" :onlyRead="dialogType===3"></tree-meau>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>备注</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input  v-if="dialogType===1 || dialogType===2" size="small" type="textarea" rows="3" placeholder="请输入备注" resize="none" v-model="dialogBindData.memo"></el-input>
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
import TreeMeau from "./components/TreeMeau";
import elDragDialog from "@/directive/el-dragDialog";
import * as system from "../../api/system";
import axios from "axios";
import { fattCreateTime } from "../../utils/fattTime";
export default {
  components: { TreeMeau },
  directives: { elDragDialog },
  data() {
    return {
      seacherParam: {
        roleName: ""
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
      dialogBindData: {
        roleId: "",
        roleName: "",
        isAvailable: 1,
        isDeleted: 0,
        memo: "",
        permissionIds: ""
      },
      // 是否提交
      submmitSuccess: false,
      // 树状图数据
      treedata: null,
      defalutExtentArr: []
    };
  },

  beforeMount() {
    //权限添加 permName，moduleName，permType，permResource，isAvailable，menuName，ranking
    // const respontData = [
    //   {
    //     roleId: "1",
    //     roleName: "超级管理员",
    //     isAvailable: 1,
    //     isDeleted: 1,
    //     createTime: "2018-02-08",
    //     memo: "11"
    //   }
    // ];
    // this.dataOption = this.$addDelState(respontData);
    this.getList();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    seachFun() {
      this.$seach
        .submmit(this, system.getSysRoleList)
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
      // this.dialogState = !this.dialogState;
      this.defalutExtentArr = [];
      this.getTreeData(() => {
        this.dialogState = true;
      });
    },
    del(data) {
      system.deleteSysRole({ roleId: data.roleId }).then(res => {
        this.getList(() => {
          data.delState = false;
        });
      });
    },
    edit(data) {
      const _this = this;
      _this.dialogType = 2;
      system.getSysPermissionByRoleId({ roleIds: data.roleId }).then(res => {
        _this.defalutExtentArr = data.permissionIds = res.data;
        _this.getTreeData(() => {
          _this.reBindData(data);
          _this.dialogState = true;
          setTimeout(() => {
            _this.$refs.rolesTree.viewTreeActiveData(
              _this.defalutExtentArr,
              _this.treedata
            );
          }, 10);
        });
      });
    },
    check(data) {
      // this.dialogType = 3;
      // this.reBindData(data);
      // this.dialogState = true;
      const _this = this;
      _this.dialogType = 3;
      system.getSysPermissionByRoleId({ roleIds: data.roleId }).then(res => {
        _this.defalutExtentArr = res.data;
        _this.getTreeData(() => {
          _this.reBindData(data);
          _this.dialogState = true;
          setTimeout(() => {
            _this.$refs.rolesTree.viewTreeActiveData(
              _this.defalutExtentArr,
              _this.treedata
            );
          }, 10);
        });
      });
    },
    //获取的列表数据重新绑定到对应模型上面
    reBindData(data) {
      for (const key in this.dialogBindData) {
        this.dialogBindData[key] = data[key];
      }
    },
    submmitFun() {
      let isSubmitActive;
      if (this.dialogType === 1) {
        // alert(`添加${JSON.stringify(this.dialogBindData)}`);
        isSubmitActive =
          this.dialogBindData.roleName &&
          (this.dialogBindData.permissionIds
            ? this.dialogBindData.permissionIds.length
            : this.dialogBindData.permissionIds);
      } else {
        // alert(`编辑${JSON.stringify(this.dialogBindData)}`);
        isSubmitActive =
          this.dialogBindData.roleId &&
          this.dialogBindData.roleName &&
          this.defalutExtentArr;
        // (this.dialogBindData.permissionIds
        //   ? this.dialogBindData.permissionIds.length
        //   : this.dialogBindData.permissionIds);
      }
      if (isSubmitActive) {
        this.submmitSuccess = true;
        system.addOrEditSysRole(this.dialogBindData).then(res => {
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
      const treeStatus = this.$refs.rolesTree.visiblity;
      const closeFun = () => {
        this.$refs.rolesTree.clearInitData();
        this.dialogState = false;
        for (const key in this.dialogBindData) {
          if (key === "isAvailable") {
            this.dialogBindData[key] = 1;
          } else if (key === "isDeleted") {
            this.dialogBindData[key] = 0;
          } else {
            this.dialogBindData[key] = "";
          }
        }
      };
      if (treeStatus) {
        this.$refs.rolesTree.hide();
        setTimeout(() => {
          closeFun();
        }, 300);
      } else {
        closeFun();
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
    // 选择父级节点数据
    treeConfirm(data) {
      this.dialogBindData.permissionIds = data;
      console.log(data);
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
      system.getSysRoleList(param).then(res => {
        // 初始话表格数据
        this.dataOption = res.data.data;
        // 初始化分页数据
        this.rowCount = res.data.rowCount;
        this.pageSize = res.data.pageSize;
        cb ? cb() : "";
      });
    },
    // 获取权限treeData
    getTreeData(cb) {
      // system.getTreeData().then(res=>{
      //   debugger
      //   this.treedata = res.data
      //   cb?cb():''
      // })

      system.getSysPermssionTree().then(res => {
        this.treedata = res.data;
        cb ? cb() : "";
      });
    },
    // 格式化时间
    fattTime(time) {
      return fattCreateTime(time);
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