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
                    <el-col class="input-name" :span="7">车牌号</el-col>
                    <el-col :span="17"><el-input placeholder="请输入关键字" v-model="seacherParam.carPlateNo" @keyup.enter.native="seachFun"></el-input></el-col>
                </el-col>
                <el-col :xl="4" :lg="6" :md="6" :sm="8">
                    <el-col class="input-name":span="7">上下线</el-col>
                    <el-col :span="17" style="line-height:40px">
                  
                      <el-select v-model="seacherParam.onOffLineStatus" placeholder="请选择">
                        <el-option
                          v-for="item in onOffLineStatuData"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select>

                    </el-col>
                </el-col>
                <el-col :xl="4" :lg="6" :md="6" :sm="8">
                    <el-col class="input-name" :span="7">使用状态</el-col>
                    <el-col :span="17" style="line-height:40px">
                      <el-select v-model="seacherParam.userageStatus" placeholder="请选择">
                        <el-option
                          v-for="item in userageStatuData"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
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

                   
                    <el-table-column prop="carPlateNo" label="车牌号"></el-table-column>
                    
                    <el-table-column prop="carBrandName" label="品牌"></el-table-column>
                    <el-table-column prop="carSeriesName" label="车系"></el-table-column>
                    <el-table-column prop="carPeriodName" label="年代"></el-table-column>

                     <el-table-column label="座位数">
                        <template slot-scope="scope">
                            <span>{{viewSeatNum(scope.row.seatNumber)}}</span>
                        </template>
                    </el-table-column>

                     <el-table-column label="排量">
                        <template slot-scope="scope">
                            <span>{{scope.row.displacement+"L"}}</span>
                        </template>
                    </el-table-column>

                     <el-table-column label="箱型">
                        <template slot-scope="scope">
                            <span>{{viewGearBox(scope.row.gearBox)}}</span>
                        </template>
                    </el-table-column>
                    

                    <el-table-column label="上下线状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.onOffLineStatus==1?'上线':'下线'}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="使用状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.userageStatus==1?'已预占':'空闲'}}</span>
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

                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" circle class="table-icon" @click="check(scope.row)"><i class="iconfont icon-chakan"></i></el-button>
                            <el-button type="primary" v-if="scope.row.onOffLineStatus==0" icon="el-icon-edit" circle class="table-icon" @click="edit(scope.row)"></el-button>
                            <el-popover
                                v-if="scope.row.onOffLineStatus==0"
                                placement="top"
                                width="160"
                                trigger="hover"
                                v-model="scope.row.delState1">
                                <p style="margin-bottom:10px;font-weight:700;">确认上线吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="scope.row.delState1 = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="carOnlineState(scope.row)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="success" icon="el-icon-circle-check-outline
" circle class="table-icon popver-btn"></el-button>
                            </el-popover>

                            <el-popover
                                v-if="scope.row.onOffLineStatus==1"
                                placement="top"
                                width="160"
                                trigger="hover"
                                v-model="scope.row.delState2">
                                <p style="margin-bottom:10px;font-weight:700;">确认下线吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="scope.row.delState2 = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="carOnlineState(scope.row)">确定</el-button>
                                </div>
                                <el-button slot="reference" type="warning" icon="el-icon-circle-close-outline" circle class="table-icon popver-btn"></el-button>
                            </el-popover>

                            <el-popover
                                v-if="scope.row.onOffLineStatus==0&&scope.row.userageStatus==0"
                                placement="top"
                                width="160"
                                v-model="scope.row.delState3">
                                <p style="margin-bottom:10px;font-weight:700;">确认删除吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="scope.row.delState3 = false">取消</el-button>
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
            <el-col :span="8" class="content-left"><label>上传图片</label></el-col>
            <el-col :span="16" class="content-right">
              <up-load-img
              ref="imgComponent"
              v-if="dialogType===1 || dialogType===2" 
              width="260" 
              height="186" 
              resPath="carList" 
              :type="dialogType===2" 
              :viewUrl="this.dialogBindData.carModelUrl"  
              @emitSuccess="handleImgLoad">
              </up-load-img>
              <img v-else :src="this.dialogBindData.carModelUrl" width="260" height="186">
            </el-col>
          </el-row>
          
          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>选择品牌</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select v-if="dialogType===1 || dialogType===2" size="small" placeholder="请选择品牌" v-model="carBrandId" @change="handleCarBrand">
                    <el-option
                    v-for="item in carBrands"
                    :key="item.carBrandId"
                    :label="item.carBrandName"
                    :value="item.carBrandId">
                    </el-option>
                </el-select>
              <span v-else>{{viewCarBrand(carBrandId)}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>选择车系</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select v-if="dialogType===1 || dialogType===2" size="small" placeholder="请选择车系" :disabled="!carSeriezes" v-model="carSeriesId" @change="handleCarSeries">
                    <el-option
                    v-for="item in carSeriezes"
                    :key="item.carSeriesId"
                    :label="item.carSeriesName"
                    :value="item.carSeriesId">
                    </el-option>
                </el-select>
              <span v-else>{{viewCarSeries(carSeriesId)}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>选择年代</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select v-if="dialogType===1 || dialogType===2" size="small" placeholder="请选择年代" :disabled="!carPeriods" v-model="carPeriodId">
                    <el-option
                    v-for="item in carPeriods"
                    :key="item.carPeriodId"
                    :label="item.carPeriodName"
                    :value="item.carPeriodId">
                    </el-option>
                </el-select>
              <span v-else>{{viewCarPeriods(carPeriodId)}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>车牌号</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入车牌号" v-model="dialogBindData.carPlateNo"></el-input>
              <span v-else>{{dialogBindData.carPlateNo}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>座位数</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select v-if="dialogType===1 || dialogType===2" size="small" placeholder="请选择" v-model="dialogBindData.seatNumber">
                    <el-option
                    v-for="item in seatNumberData"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
              <span v-else>{{viewSeatNum(dialogBindData.seatNumber)}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>排量(L)</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" placeholder="请输入备注" v-model="dialogBindData.displacement"></el-input>
              <span v-else>{{dialogBindData.displacement}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>箱型</label></el-col>
            <el-col :span="16" class="content-right">
              <el-select v-if="dialogType===1 || dialogType===2" size="small" placeholder="请选择" v-model="dialogBindData.gearBox">
                    <el-option
                    v-for="item in gearBoxData"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
              <span v-else>{{viewGearBox(dialogBindData.gearBox)}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>年审到期时间</label></el-col>
            <el-col :span="16" class="content-right">
              <el-date-picker 
              v-if="dialogType===1 || dialogType===2"
               size="small"  
               v-model="dialogBindData.carAnnualInfo" 
               type="date" 
               placeholder="选择日期"
               :picker-options="pickerOptions">
              </el-date-picker>
              <span v-else>{{dialogBindData.carAnnualInfo?fattTime(dialogBindData.carAnnualInfo,'d'):'暂无数据'}}</span>
            </el-col>
          </el-row>


          <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>保险到期时间</label></el-col>
            <el-col :span="16" class="content-right">
              <el-date-picker 
              v-if="dialogType===1 || dialogType===2" 
              size="small"  
              v-model="dialogBindData.carInsuranceInfo" 
              type="date" 
              placeholder="选择日期"
              :picker-options="pickerOptions">
              </el-date-picker>
              <span v-else>{{dialogBindData.carInsuranceInfo?fattTime(dialogBindData.carInsuranceInfo,'d'):'暂无数据'}}</span>
            </el-col>
          </el-row>

          <!-- <el-row :gutter="15">
            <el-col :span="8" class="content-left"><label>备注</label></el-col>
            <el-col :span="16" class="content-right">
              <el-input v-if="dialogType===1 || dialogType===2" size="small" type="textarea" rows="3" placeholder="请输入备注" resize="none" v-model="dialogBindData.memo"></el-input>
              <span v-else>{{dialogBindData.memo || "暂无备注"}}</span>
            </el-col>
          </el-row> -->

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
import UpLoadImg from "@/components/UpLoadImg";
import * as car from "../../api/car";
import * as common from "../../api/common";
import { fattCreateTime } from "../../utils/fattTime";
import elDragDialog from "@/directive/el-dragDialog";
export default {
  directives: { elDragDialog },
  data() {
    return {
      seacherParam: {
        carPlateNo: "",
        onOffLineStatus: null,
        userageStatus: null
      },

      // 搜索下拉数据
      seatNumberData: [
        { code: 1, name: "2座" },
        { code: 2, name: "4座" },
        { code: 3, name: "5座" },
        { code: 4, name: "6座" }
      ],
      gearBoxData: [
        { code: 1, name: "手动" },
        { code: 2, name: "自动" },
        { code: 3, name: "手自一体" }
      ],
      onOffLineStatuData: [
        { code: 1, name: "上线" },
        { code: 0, name: "下线" }
      ],
      userageStatuData: [
        { code: 1, name: "已预占" },
        { code: 0, name: "空闲" }
      ],

      // 时间控件条件限制

      pickerOptions: {
          disabledDate(time) {
            return time.getTime() <= Date.now();
          }
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
        carId: "",
        carPlateNo: "",
        carModelName: "",
        carBrandName: "",
        carSeriesName: "",
        carPeriodName: "",
        carModelUrl: "",
        seatNumber: null,
        displacement: "",
        gearBox: null,
        carAnnualInfo:"",
        carInsuranceInfo:"",
        userageStatuData: null
      },
      // 是否提交
      submmitSuccess: false,
      carBrands: null,
      carBrandId: "",
      carSeriezes: null,
      carSeriesId: "",
      carPeriods: null,
      carPeriodId: ""
    };
  },
  components: { UpLoadImg },
  beforeMount() {
    this.getList();
    this.getCarBrands();
  },
  mounted() {},
  methods: {
    seachFun() {
      this.$seach
        .submmit(this, car.getCarList)
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
      car
        .delCarByCarId({
          carId: data.carId
        })
        .then(res => {
          if (res.data.code === "1") {
            this.getList(() => {
              data.delState = false;
            });
          }
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
          data.delState = false;
        });
    },
    edit(data) {
      this.dialogType = 2;
      this.reBindData(data);

      if (!this.carSeriezes) {
        car.getCarSeries({ carBrandId: data.carBrandId }).then(res => {
          this.carSeriezes = res.data.data;
        });
      }
      if (!this.carPeriods) {
        car
          .getCarPreiodList({
            carBrandId: data.carBrandId,
            carSeriesId: data.carSeriesId
          })
          .then(res => {
            this.carPeriods = res.data.data;
            this.dialogState = true;
          });
      }
    },
    check(data) {
      debugger
      this.dialogType = 3;
      this.reBindData(data);

      if (!this.carSeriezes) {
        car.getCarSeries({ carBrandId: data.carBrandId }).then(res => {
          this.carSeriezes = res.data.data;
        });
      }
      if (!this.carPeriods) {
        car
          .getCarPreiodList({
            carBrandId: data.carBrandId,
            carSeriesId: data.carSeriesId
          })
          .then(res => {
            this.carPeriods = res.data.data;
            this.dialogState = true;
          });
      }
    },
    //获取的列表数据重新绑定到对应模型上面
    reBindData(data) {
      for (const key in this.dialogBindData) {
        this.dialogBindData[key] = data[key];
      }
      this.carBrandId = data.carBrandId;
      this.carSeriesId = data.carSeriesId;
      this.carPeriodId = data.carPeriodId;
    },
    submmitFun() {
      // if (this.dialogType === 1) {
      //   alert(`添加${JSON.stringify(this.dialogBindData)}`);
      // } else {
      //   alert(`编辑${JSON.stringify(this.dialogBindData)}`);
      // }
      // 发送添加请求
      const param = {
        carId: this.dialogBindData.carId,
        carBrandId: this.carBrandId,
        carSeriesId: this.carSeriesId,
        carPeriodId: this.carPeriodId,
        carPlateNo: this.dialogBindData.carPlateNo,
        carModelUrl: this.dialogBindData.carModelUrl,
        seatNumber: this.dialogBindData.seatNumber,
        displacement: this.dialogBindData.displacement,
        gearBox: this.dialogBindData.gearBox,
        carAnnualInfo: this.fattTime(this.dialogBindData.carAnnualInfo,'d'),
        carInsuranceInfo:this.fattTime(this.dialogBindData.carInsuranceInfo,'d'),
        userageStatus:
          this.dialogType === 1 ? 0 : this.dialogBindData.userageStatus
      };
      debugger
      const isSubmitActive =
        param.carBrandId &&
        param.carSeriesId &&
        param.carPeriodId &&
        param.carModelUrl &&
        param.seatNumber &&
        param.displacement &&
        param.gearBox &&
        param.carAnnualInfo&&
        param.carInsuranceInfo&&
        param.carPlateNo;
      if (isSubmitActive) {
        this.submmitSuccess = true;
        car.addOrEditCar(param).then(res => {
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
        if (key === "sex") {
          this.dialogBindData[key] = 1;
        } else {
          this.dialogBindData[key] = "";
        }
      }
      this.carBrandId = "";
      this.carSeriesId = "";
      this.carSeriezes = null;
      this.carPeriodId = "";
      this.carPeriods = null;
      this.$refs.imgComponent.clearImg();
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
      car.getCarList(param).then(res => {
        // 初始话表格数据
        this.dataOption = res.data.data;
        // 初始化分页数据
        this.rowCount = res.data.rowCount;
        this.pageSize = res.data.pageSize;
        cb ? cb() : "";
      });
    },

    // 格式化时间
    fattTime(time,str) {
      return fattCreateTime(time,"d");
    },
    // 获取品牌数据
    getCarBrands() {
      car.getCarBrands().then(res => {
        this.carBrands = res.data.data;
      });
    },
    // 选择品牌
    handleCarBrand(id) {
      this.carSeriesId = "";
      this.carPeriods = null;
      this.carPeriodId = "";
      this.dialogBindData.carPlateNo = "";
      car.getCarSeries({ carBrandId: id }).then(res => {
        this.carSeriezes = res.data.data;
      });
    },
    handleCarSeries(id) {
      car
        .getCarPreiodList({
          carBrandId: this.carBrandId,
          carSeriesId: this.carSeriesId
        })
        .then(res => {
          this.carPeriods = res.data.data;
        });
    },
    viewCarBrand(id) {
      const data = this.carBrands;
      if (data) {
        for (const item of data) {
          if (item.carBrandId === id) {
            return item.carBrandName;
          }
        }
      }
    },
    viewCarSeries(id) {
      const data = this.carSeriezes;
      if (data) {
        for (const item of data) {
          if (item.carSeriesId === id) {
            return item.carSeriesName;
          }
        }
      }
    },
    viewCarPeriods(id) {
      const data = this.carPeriods;
      if (data) {
        for (const item of data) {
          if (item.carPeriodId === id) {
            return item.carPeriodName;
          }
        }
      }
    },
    viewSeatNum(code) {
      switch (code) {
        case 1:
          return "2座";
          break;
        case 2:
          return "4座";
          break;
        case 3:
          return "5座";
          break;
        default:
          return "7座";
      }
    },
    viewGearBox(code) {
      switch (code) {
        case 1:
          return "手动";
          break;
        case 2:
          return "自动";
          break;
        default:
          return "手自一体";
      }
    },
    handleImgLoad(url) {
      debugger;
      this.dialogBindData.carModelUrl = url;
    },
    carOnlineState(data) {
      const param = {
        carId: data.carId,
        onOffLineStatus: data.onOffLineStatus == 1 ? 0 : 1
      };
      car.addOrEditCar(param).then(res => {
        if (res.data.code === "1") {
          this.getList(() => {
            this.$message({
              message: "设置成功",
              type: "success"
            });
            this.submmitSuccess = false;
          });
        }
      });
    }
  },
  computed: {
    // 激活重置按钮
    isActiveReset() {
      for (const key in this.seacherParam) {
        if (this.seacherParam[key] == 0 || this.seacherParam[key]) {
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
