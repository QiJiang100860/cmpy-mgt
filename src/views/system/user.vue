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
                    <el-col class="input-name" :span="7">用户名称</el-col>
                    <el-col :span="17"><el-input placeholder="请输入关键字" v-model="seacherParam.userName" @keyup.enter.native="seachFun"></el-input></el-col>
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

                   
                    <el-table-column prop="userName" label="用户名称"></el-table-column>
                    <el-table-column prop="realName" label="真实姓名"></el-table-column>
                    <!-- <el-table-column label="所属科室">
                        <template slot-scope="scope">
                            <span>{{scope.row.sectionId || '暂无数据'}}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="性别">
                        <template slot-scope="scope">
                            <span>{{scope.row.sex==="1"?'男':'女'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否可用">
                        <template slot-scope="scope">
                            <span>{{scope.row.isAvailable===1?'是':'否'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobilePhone" label="手机号"></el-table-column>
                    

                    <el-table-column label="创建时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime?fattTime(scope.row.createTime):'暂无数据'}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="140px">
                        <template slot-scope="scope">
                            <el-button type="primary" circle class="table-icon" @click="check(scope.row)"><i class="iconfont icon-chakan"></i></el-button>
                            <el-button type="primary" icon="el-icon-edit" circle class="table-icon" @click="edit(scope.row)"></el-button>
                            <el-popover
                                v-if="scope.row.flag!=='1'"
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

          <el-row :gutter="15" v-if="this.dialogBindData.flag!=='1'">
            <el-col :span="8" class="content-left"><label>用户角色</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select size="small" v-if="dialogType===1 || dialogType===2" placeholder="请选择人员" v-model="dialogBindData.sysRole">
                  <el-option
                  v-for="item in chooseRole"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                  </el-option>
              </el-select>
              <span v-else>{{dialogBindData.sysRole}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>所属部门</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select size="small" v-if="dialogType===1 || dialogType===2" placeholder="请选择部门" v-model="dialogBindData.deptId" @change="getSectionsByDeptId">
                  <el-option
                  v-for="item in deptDatas"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId">
                  </el-option>
              </el-select>
              <span v-else>{{viewDeptName(dialogBindData.deptId)}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>所属科室</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select size="small" v-if="dialogType===1 || dialogType===2" placeholder="请选择部门" v-model="dialogBindData.sectionId">
                  <el-option
                  v-for="item in sectionDatas"
                  :key="item.sectionId"
                  :label="item.sectionName"
                  :value="item.sectionId">
                  </el-option>
              </el-select>
              <span v-else>{{viewSectionName(dialogBindData.sectionId)}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>用户名称</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入用户名称" v-model="dialogBindData.userName"></el-input>
              <span v-else>{{dialogBindData.userName}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>真实姓名</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入用户名" v-model="dialogBindData.realName"></el-input>
              <span v-else>{{dialogBindData.realName}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>手机号</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入用户名" v-model="dialogBindData.mobilePhone"></el-input>
              <span v-else>{{dialogBindData.mobilePhone || "暂时没有手机号"}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15" v-if="dialogType===1 || dialogType===2">
            <el-col :span="8" class="content-left"><label>密码</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input type="password" size="small" placeholder="请输入密码" v-model="dialogBindData.password"></el-input>
              <!-- <span v-else>{{dialogBindData.password}}</span> -->
            </el-col>
          </el-row>

          <el-row :gutter="15" v-if="dialogType===1 || dialogType===2">
            <el-col :span="8" class="content-left"><label>确认密码</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input type="password" size="small" placeholder="请再次输入密码" v-model="dialogBindData.password"></el-input>
              <!-- <span v-else>{{dialogBindData.password}}</span> -->
            </el-col>
          </el-row>

        <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>性别</label></el-col>
            <el-col :span="16" class="content-right">
              <el-radio-group v-if="dialogType===1 || dialogType===2" v-model="dialogBindData.sex">
                <el-radio size="small" label="1">男</el-radio>
                <el-radio size="small" label="0">女</el-radio>
              </el-radio-group>
              <span v-else>{{dialogBindData.sex==="1"?"男":"女"}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15" v-if="this.dialogBindData.flag!=='1'">
            <el-col :span="8" class="content-left"><label>是否可用</label></el-col>
            <el-col :span="16" class="content-right">
              <el-radio-group v-if="dialogType===1 || dialogType===2" v-model="dialogBindData.isAvailable">
                <el-radio size="small" :label="1">是</el-radio>
                <el-radio size="small" :label="0">否</el-radio>
              </el-radio-group>
              <span v-else>{{dialogBindData.isAvailable===1?"是":"否"}}</span>
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
import elDragDialog from "@/directive/el-dragDialog";
import * as system from "../../api/system";
import { fattCreateTime } from "../../utils/fattTime";
export default {
  directives: { elDragDialog },
  data() {
    return {
      seacherParam: {
        userName: ""
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
        userId: "",
        userName: "",
        password: "",
        realName: "",
        sex: "",
        mobilePhone: "",
        isAvailable: 1,
        sysRole: "",
        deptId: "",
        flag: "",
        sectionName: "",
        sectionId: ""
      },
      // 是否提交
      submmitSuccess: false,
      //  角色选择数据
      chooseRole: null,
      deptDatas: null,
      sectionDatas: null
    };
  },

  beforeMount() {
    //权限添加 permName，moduleName，permType，permResource，isAvailable，menuName，ranking
    this.getList();
    this.getDepts();
    // const respontData = [
    //   {
    //     permId: "1",
    //     permName: "权限名称1",
    //     moduleName: "模块名称",
    //     permType: "权限类型",
    //     permResource: "权限path",
    //     memo: "",
    //     isAvailable: 0, //是否可用
    //     isMeau: 0,
    //     isMeauShow: 0,
    //     menuName: "菜单名称", //菜单名称
    //     level: "",
    //     parentId: "1-1",
    //     ranking: 1 //菜单层级
    //   },
    //   {
    //     permId: "2",
    //     permName: "权限名称2",
    //     moduleName: "模块名称",
    //     permType: "权限类型",
    //     permResource: "权限path",
    //     memo: "",
    //     isAvailable: 0, //是否可用
    //     isMeau: 0,
    //     isMeauShow: 0,
    //     menuName: "菜单名称", //菜单名称
    //     level: "",
    //     parentId: "3",
    //     ranking: 1 //菜单层级
    //   }
    // ];
    // this.dataOption = this.$addDelState(respontData);
  },
  mounted() {},
  methods: {
    seachFun() {
      this.$seach
        .submmit(this, system.getSysUserList)
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
    //校验密码
    // vapwd() {
    //   debugger;
    //   var password = document.getElementById("pwd");
    //   if (password.value.length < 6) {
    //     alert("密码长度必须大于六位！");
    //   }
    // },
    add() {
      this.dialogType = 1;
      this.getRoleList(() => {
        this.dialogState = true;
      });
    },
    del(data) {
      system.deleteSysUser({ userId: data.userId }).then(res => {
        this.getList(() => {
          data.delState = false;
        });
      });
    },
    edit(data) {
      this.dialogType = 2;
      this.getRoleList(() => {
        this.getSectionsByDeptId(data.deptId, () => {
          this.reBindData(data);
          this.dialogState = true;
        });
      });
    },
    check(data) {
      this.dialogType = 3;
      this.getSectionsByDeptId(data.deptId, () => {
        this.reBindData(data);
        this.dialogState = true;
      });
    },
    //获取的列表数据重新绑定到对应模型上面
    reBindData(data) {
      for (const key in this.dialogBindData) {
        if (key === "sysRole") {
          if (this.dialogType === 3) {
            this.dialogBindData[key] = data[key][0].roleName;
          } else if (this.dialogType === 2) {
            this.dialogBindData[key] = data[key][0].roleId;
          }
        } else {
          this.dialogBindData[key] = data[key];
        }
      }
    },
    submmitFun() {
      let isSubmitActive;
      if (this.dialogType === 1) {
        // alert(`添加${JSON.stringify(this.dialogBindData)}`);
        isSubmitActive =
          this.dialogBindData.userName &&
          this.dialogBindData.password &&
          this.dialogBindData.realName &&
          this.dialogBindData.mobilePhone &&
          this.dialogBindData.sysRole &&
          this.dialogBindData.deptId &&
          this.dialogBindData.sectionId;
      } else {
        // alert(`编辑${JSON.stringify(this.dialogBindData)}`);
        isSubmitActive =
          this.dialogBindData.userId &&
          this.dialogBindData.userName &&
          this.dialogBindData.password &&
          this.dialogBindData.realName &&
          this.dialogBindData.mobilePhone &&
          this.dialogBindData.sysRole &&
          this.dialogBindData.deptId &&
          this.dialogBindData.sectionId;
      }
      // // 发送添加请求
      if (isSubmitActive) {
        if (this.dialogBindData.password.length < 6) {
          this.$message({
            message: "密码长度必须大于六位！",
            type: "warning"
          });
        } else {
          this.submmitSuccess = true;
          system.addOrEditSysUser(this.dialogBindData).then(res => {
            debugger
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
        }
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
          this.dialogBindData[key] = "1";
        } else if (key === "isAvailable") {
          this.dialogBindData[key] = 1;
        } else {
          this.dialogBindData[key] = "";
        }
      }
      this.sectionDatas = null;
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
      this.dialogBindData.parentId = data.id;
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
      system.getSysUserList(param).then(res => {
        // 初始话表格数据
        this.dataOption = res.data.data;
        console.log(this.dataOption);
        // 初始化分页数据
        this.rowCount = res.data.rowCount;
        this.pageSize = res.data.pageSize;
        cb ? cb() : "";
      });
    },
    // 获取角色选择数据
    getRoleList(cb) {
      system.queryAllSysRole().then(res => {
        this.chooseRole = res.data;
        cb ? cb() : "";
      });
    },
    // 格式化时间
    fattTime(time) {
      return fattCreateTime(time);
    },
    // 人员对用的部门
    getDepts() {
      system.getDepts().then(res => {
        if (res.data.code == "1") {
          this.deptDatas = res.data.data;
        }
      });
    },
    // 根据部门id获取科室数据
    getSectionsByDeptId(id, cb) {
      this.dialogBindData.sectionId = "";
      system.getSectionsByDeptId({ deptId: id }).then(res => {
        if (res.data.code == "1") {
          this.sectionDatas = res.data.data;
          cb ? cb() : "";
        }
      });
    },
    // 回显部门名称
    viewDeptName(id) {
      const data = this.deptDatas;
      for (const item of data) {
        if (item.deptId == id) {
          return item.deptName;
        }
      }
    },
    // 回显科室名称
    viewSectionName(id) {
      if (id) {
        const data = this.sectionDatas;
        console.log(this.sectionDatas);
        for (const item of data) {
          if (item.sectionId == id) {
            return item.sectionName;
          }
        }
      } else {
        return "暂无数据";
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