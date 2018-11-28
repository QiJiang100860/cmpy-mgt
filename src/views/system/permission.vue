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
                    <el-col class="input-name" :span="7">权限名称</el-col>
                    <el-col :span="17"><el-input placeholder="请输入关键字" v-model="seacherParam.permName" @keyup.enter.native="seachFun"></el-input></el-col>
                </el-col>
                <el-col :xl="4" :lg="6" :md="6" :sm="8">
                    <el-col class="input-name" :span="7">模块名称</el-col>
                    <el-col :span="17"><el-input placeholder="请输入关键字" v-model="seacherParam.moduleName" @keyup.enter.native="seachFun"></el-input></el-col>
                </el-col>
                <!-- <el-col :span="4">
                    <el-col class="input-name" :span="7">菜单层级</el-col>
                    <el-col :span="17">
                      <el-input-number v-model="seacherParam.level" controls-position="right" :max="3"></el-input-number>
                    </el-col>
                </el-col> -->
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

                   
                    <el-table-column prop="permName" label="权限名称"></el-table-column>
                    <el-table-column prop="moduleName" label="模块名称"></el-table-column>
                    <el-table-column prop="permResource" label="权限path"></el-table-column>
                    <el-table-column prop="menuName" label="菜单名称"></el-table-column>
                    <el-table-column prop="level" label="菜单层级"></el-table-column>
                    <el-table-column prop="ranking" label="排序"></el-table-column>
                    <el-table-column label="是否可用">
                        <template slot-scope="scope">
                            <span>{{scope.row.isAvailable===1?'是':'否'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否为菜单">
                        <template slot-scope="scope">
                            <span>{{scope.row.isMeau===1?'是':'否'}}</span>
                        </template>
                    </el-table-column>

                     <el-table-column label="是否显示">
                        <template slot-scope="scope">
                            <span>{{scope.row.isMeauShow===1?'是':'否'}}</span>
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
            <el-col :span="8" class="content-left"><label>权限名称</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入权限名称" v-model="dialogBindData.permName"></el-input>
              <span v-else>{{dialogBindData.permName}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>模块名称</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入模块名称" v-model="dialogBindData.moduleName"></el-input>
              <span v-else>{{dialogBindData.moduleName}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>权限path</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入权限path" v-model="dialogBindData.permResource"></el-input>
              <span v-else>{{dialogBindData.permResource}}</span>
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
            <el-col :span="8" class="content-left"><label>是否是菜单</label></el-col>
            <el-col :span="16" class="content-right">
              <el-radio-group v-if="dialogType===1 || dialogType===2" v-model="dialogBindData.isMenu">
                <el-radio size="small" :label="1">是</el-radio>
                <el-radio size="small" :label="0">否</el-radio>
              </el-radio-group>
              <span v-else>{{dialogBindData.isMenu===1?"是":"否"}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>是否显示</label></el-col>
            <el-col :span="16" class="content-right">
              <el-radio-group v-if="dialogType===1 || dialogType===2" v-model="dialogBindData.isMenuShow">
                <el-radio size="small" :label="1">是</el-radio>
                <el-radio size="small" :label="0">否</el-radio>
              </el-radio-group>
              <span v-else>{{dialogBindData.isMenuShow===1?"是":"否"}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>菜单名称</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input  v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入备注" v-model="dialogBindData.menuName"></el-input>
              <span v-else>{{dialogBindData.menuName}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>菜单层级</label></el-col>
            <el-col :span="16" class="content-right">

              <template v-if="dialogType===1 || dialogType===2">
                <el-radio-group size="small" v-model="dialogBindData.level">
                  <el-radio :label="1">1</el-radio>
                  <el-radio :label="2">2</el-radio>
                  <el-radio :label="3">3</el-radio>
                </el-radio-group>
              </template>
              <!-- <el-input  v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入备注" v-model="dialogBindData.ranking"></el-input> -->
              <span v-else>{{dialogBindData.level}}</span>
            </el-col>
          </el-row>


          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>排序</label></el-col>
            <el-col :span="16" class="content-right">

              <el-input-number v-if="dialogType===1 || dialogType===2" class="visitor-num" controls-position="right" v-model="dialogBindData.ranking" :min="1" :max="20"></el-input-number>
              <!-- <el-input  v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入备注" v-model="dialogBindData.ranking"></el-input> -->
              <span v-else>{{dialogBindData.ranking}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15" v-if="dialogState && dialogBindData.level>1">
            <el-col :span="8" class="content-left"><label>父级节点</label></el-col>
            <el-col :span="16" class="content-right">
              <tree-meau ref="premissionTree" :treedata="treedata" :dafaultExtend="defalutExtentArr" @emitConfirm="treeConfirm" :onlyRead="dialogType===3"></tree-meau>
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
import * as system from "../../api/system";
import elDragDialog from "@/directive/el-dragDialog";
export default {
  components: { TreeMeau },
  directives: { elDragDialog },
  data() {
    return {
      seacherParam: {
        permName: "",
        moduleName: "",
        level: ""
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
        permId: "", //权限id
        permName: "", //权限名称
        moduleName: "", //模块名
        permType: 0,
        permResource: "", //权限资源
        memo: "", //备注
        isAvailable: 1, //是否可用
        isMenu: 1,
        isMenuShow: 1,
        menuName: "", //菜单名称
        level: 1,
        parentId: "0",
        ranking: 1
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
    this.getList();
  },
  mounted() {},
  methods: {
    seachFun() {
      this.$seach
        .submmit(this, system.getSysPermissionList)
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
      this.getTreeData(() => {
        this.dialogState = true;
      });
    },
    del(data) {
      // alert(JSON.stringify(data.permId));
      system.deleteSysPermission({ permissionId: data.permId }).then(res => {
        this.getList(() => {
          data.delState = false;
        });
      });
    },
    edit(data) {
      const _this = this;
      _this.dialogType = 2;
      const parentArr = [];
      parentArr.push(data.parentId);
      _this.defalutExtentArr = parentArr;
      _this.getTreeData(() => {
        _this.reBindData(data);
        _this.dialogState = true;
        setTimeout(() => {
          const premissionTree = _this.$refs.premissionTree;
          premissionTree ? premissionTree.viewParentTitle(data.parentId, _this.treedata) : "";
        }, 100);
      });
    },
    check(data) {
      const _this = this;
      _this.dialogType = 3;
      _this.getTreeData(() => {
        _this.reBindData(data);
        _this.dialogState = true;
        setTimeout(() => {
          _this.$refs.premissionTree.viewParentTitle(
            data.parentId,
            _this.treedata
          );
        }, 10);
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
          this.dialogBindData.permName &&
          this.dialogBindData.moduleName &&
          this.dialogBindData.permResource &&
          this.dialogBindData.menuName &&
          this.dialogBindData.level &&
          this.dialogBindData.parentId &&
          this.dialogBindData.ranking;
      } else {
        isSubmitActive =
          this.dialogBindData.permId &&
          this.dialogBindData.permName &&
          this.dialogBindData.moduleName &&
          this.dialogBindData.permResource &&
          this.dialogBindData.menuName &&
          this.dialogBindData.level &&
          this.dialogBindData.parentId &&
          this.dialogBindData.ranking;
      }
      // // 发送添加请求
      if (isSubmitActive) {
        this.submmitSuccess = true;
        system.addOrEditSysPermission(this.dialogBindData).then(res => {
          this.getList(() => {
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
      // const treeStatus = this.$refs.premissionTree.visibliy
      // this.dialogState = false;
      // for (const key in this.dialogBindData) {
      //   this.dialogBindData[key] = "";
      // }

      const closeFun = () => {
        this.dialogState = false;
        for (const key in this.dialogBindData) {
          if(key=='isAvailable'){
            this.dialogBindData[key] = 1;
          }else if(key=='isMenuShow'){
            this.dialogBindData[key] = 1;
          }else if(key=='level'){
            this.dialogBindData[key] = 1;
          }else if(key=='isMenu'){
            this.dialogBindData[key] = 1;
          }else{
            this.dialogBindData[key] = "";
          }
        }
      };

      if (this.dialogBindData.level > 1) {
        const treeStatus = this.$refs.premissionTree.visiblity;
        if (treeStatus) {
          this.$refs.premissionTree.hide();
          setTimeout(() => {
            closeFun();
          }, 300);
        } else {
          closeFun();
        }
      } else {
        closeFun();
      }
    },
    // 分页处理
    handleSizeChange(val) {
      this.pageSize = Number(val);
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNo = Number(val);
      this.getList();
    },
    // 选择父级节点数据
    treeConfirm(data) {
      this.dialogBindData.parentId = data ? data.id : "";
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
      system.getSysPermissionList(param).then(res => {
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
      system.getSysPermssionTree().then(res => {
        this.treedata = res.data;
        cb ? cb() : "";
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
      .visitor-num {
        width: 90px;
      }
    }
  }
}
</style>