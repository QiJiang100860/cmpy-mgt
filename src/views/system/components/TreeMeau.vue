<template>
    <div>
        <span v-if="!onlyRead">
          <span class="tree-btn" v-if="type==='checkBox'" @click="show"><i class="el-icon-edit"></i>{{checkboxInfro}}</span>
          <span class="tree-btn" v-else @click="show"><i class="el-icon-edit"></i>{{parentTitle}}</span>
        </span>
        <span v-if="onlyRead">
          <span class="tree-btn-only-read" v-if="type==='checkBox'">{{checkboxInfro}}</span>
          <span class="tree-btn-only-read" v-else>{{parentTitle}}</span>
        </span>
        <div class="tree-meau" v-if="visiblity">
          <div class="meau-content">
            <div class="tree-meau-btns clearfix">
              <div class="fl setting">操作</div>
              <div class="fr">
                <i class="iconfont icon-cuohao03" @click="cancle"></i>
              </div>
            </div>
            <el-tree

            ref="tree"
            :data="treedata"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            show-checkbox
            :default-checked-keys="dafaultExtendArr"
            :check-strictly="type!=='checkBox'"
            @check-change="handleCheckChange"></el-tree>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["treedata", "type", "dafaultExtend", "onlyRead", "checkedData"],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      visiblity: false,
      // 单选数据
      chooseParentData: null,
      // 多选数据
      checkBoxId: this.dafaultExtend ? this.dafaultExtend : [],
      checkBoxName: [],
      i: 0,
      watchItemIdArr: [] //监控变化的ID
    };
  },
  mounted() {
    debugger
    if (!this.type && this.dafaultExtend.length) {
      // 单选处理默认值
      this.watchItemIdArr.push(this.dafaultExtend[0]);
    }
  },
  methods: {
    show() {
      this.visiblity = true;
    },
    hide() {
      this.visiblity = false;
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(this.$refs.tree);
      if (this.type === "checkBox") {
        // 多选
        this.treeCheckBox(data, checked, () => {
          console.log("多选父级节点id集合" + this.checkBoxId);
          this.$emit("emitConfirm", this.checkBoxId);
          console.log(this.checkBoxId);
        });
      } else {
        // 单选
        // this.chooseParentData = dataRadio;
        // this.$emit("emitConfirm", this.chooseParentData);
        this.treeRadio(data, checked, res => {
          this.chooseParentData = res;
          this.$emit("emitConfirm", this.chooseParentData);
        });
      }
    },
    cancle() {
      this.visiblity = false;
    },
    // 处理单选
    treeRadio(data, checked, callback) {
     
      // 过滤选择的数据，单选只需要 lable和id，不需要children
      const filterchooseArr = data => {
        let arr = {};
        for (const key in data) {
          if (key !== "children") {
            arr[key] = data[key];
          }
        }
        console.log(arr);
        return arr;
      };

     
      const index = this.watchItemIdArr.length
        ? this.watchItemIdArr[0].indexOf(data.id)
        : -1;
     

      if (index <= 0 && this.watchItemIdArr.length === 1 && checked) {
        
        this.$message({
          message: "只能选择一个父节点",
          type: "error",
          showClose: true
        });
        this.$refs.tree.setChecked(data, false);
      } else if (this.watchItemIdArr.length === 0 && checked) {
     
        this.watchItemIdArr = [];
        this.watchItemIdArr.push(data.id);
        callback(filterchooseArr(data));
      } else if (index >= 0 && this.watchItemIdArr.length === 1 && !checked) {
   
        this.watchItemIdArr = [];
        callback(null);
      }
    },
    // 处理多选
    treeCheckBox(data, checked, cb) {
      const delItem = (key, arr) => {
        let rArr = [];
        for (const index in arr) {
          if (arr[index] !== key) {
            rArr.push(arr[index]);
          }
        }
        return rArr;
      };
      if (checked) {
        this.checkBoxId.push(data.id);
        this.checkBoxName.push(data.name);
      } else {
        this.checkBoxId = delItem(data.id, this.checkBoxId);
        this.checkBoxName = delItem(data.name, this.checkBoxName);
      }
      cb();
    },

    //遍历树形控件
    parseTreeWapper(treeNodes) {
      const parseTreeData = [];
      const parseTree = treeNodes => {
        if (!treeNodes || !treeNodes.length) return;
        for (let i = 0, len = treeNodes.length; i < len; i++) {
          let childs = treeNodes[i].children;
          parseTreeData.push(treeNodes[i]);
          if (childs && childs.length > 0) {
            parseTree(childs);
          }
        }
      };
      parseTree(treeNodes);
      return parseTreeData;
    },
    //获得checkBoxName
    viewTreeActiveData(arr, data) {
      console.log(arr);
      const list = this.parseTreeWapper(data);
      this.checkBoxName = list
        .filter(item => arr.indexOf(item.id) > -1)
        .map(item => item.name);
    },

    // clearData
    clearInitData(){
      // this.checkBoxId = [];
      // this.checkBoxName = [];
    },

    //获得父级结点
    viewParentTitle(id, data) {
      const list = this.parseTreeWapper(data);
      const parentIndex = list.map(item => item.id).indexOf(id);
      this.chooseParentData = list.slice(parentIndex, parentIndex + 1)[0];
      console.log(this.chooseParentData);
    }
  },
  computed: {
    parentTitle() {
      // this.setCheckedKeys(this.chooseParentData)
      return this.chooseParentData ? this.chooseParentData.name : "请点击选择";
    },
    checkboxInfro() {
      return this.checkBoxName.length
        ? this.checkBoxName.join(",")
        : "请点击选择";
    },
    dafaultExtendArr() {
      if (!!this.dafaultExtend) {
        return this.dafaultExtend.length ? this.dafaultExtend : [];
      } else {
        return [];
      }
      // if(this.$refs.tree.defaultCheckedKeys==null){
      //   this.$refs.tree.defaultCheckedKeys=this.dafaultExtend
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.tree-btn {
  cursor: pointer;
  border-bottom: solid 1px #3a8ee6;
  color: #3a8ee6;
}
.tree-btn-only-read {
  display: block;
  padding-left: 15px;
  line-height: 32px;
  border-bottom: solid 1px #dedede;
}
.tree-meau {
  position: fixed;
  top: 0;
  left: 0px;
  // opacity:0;
  // display: block;
  width: 180px;
  height: 100%;
  overflow: hidden;
  transition: all 0.3s;
  .meau-content {
    width: 200px;
    height: 100%;
    overflow-y: auto;
    background: #fff;
  }
  .btn-container {
    border-bottom: solid 1px #dedede;
  }
  .el-tree {
    background: #ffffff;
    height: 100%;
  }
  .tree-meau-btns {
    // border-bottom: solid 1px #dedede;
    background: #dedede;
    box-sizing: border-box;
    padding: 0 15px;
    padding-right: 10px;
    .setting {
      color: #333;
      font-weight: 700;
    }
    i {
      line-height: 32px;
      padding: 0 5px;
      cursor: pointer;
      &.icon-duihao {
        color: #67c23a;
      }
      &.icon-cuohao03 {
        color: #f56c6c;
      }
    }
  }
}
</style>


