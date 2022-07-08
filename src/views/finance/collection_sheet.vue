<template>
  <Layout>
  <!-- 制定收款单界面 -->
    <Title title="制定收款单"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">添加收款单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING_LEVEL_1">
          <div v-if="userList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <Collection_sheet_list :list="userList" :type="1" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审批" name="PENDING_LEVEL_2">
          <div v-if="userList2.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <Collection_sheet_list :list="userList2" :type="2" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="PENDING_LEVEL_3">
          <div v-if="userList3.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <Collection_sheet_list :list="userList3" :type="3" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="创建收款单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="new_collection_sheet_form" label-width="80px" >
<!--          <el-form-item label="收据编号">-->
<!--            <el-input type="textarea" v-model="new_collection_sheet_form.id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="客户编号">
            <el-input type="textarea" v-model="new_collection_sheet_form.customer"></el-input>
          </el-form-item>
          <el-form-item
            v-for="(item, index) in new_collection_sheet_form.receiptContent"
            :key="index"
            :label="'转账列表' + index">
            <div>
              <el-input v-model="item.account" style="width: 25%; margin-right: 5%" placeholder="请输入银行账户"></el-input>
              <el-input v-model="item.amount" style="width: 25%;" placeholder="请输入转账金额"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-input v-model="item.remark" style="width: 70%; margin-right: 10%" placeholder="请填写备注"></el-input>
              <el-button type="text" size="small" @click="func2()" v-if="index === new_collection_sheet_form.receiptContent.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="func3(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
<!--总额经过计算 审批状态自动生成为“一级审批 操作员在session”-->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="func1()">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  make_collection_sheet,
  //制定收款单
  get_collection_sheet_by_state,
  //筛选收款单
} from "../../network/purchase";
import Collection_sheet_list from "@/views/finance/collection_sheet_list";
export default {
  components: {
    Collection_sheet_list,
    Layout,
    Title
  },
  data(){
    return{
      activeName:'PENDING_LEVEL_1',
      dialogVisible:false,
      userList: [],//一级审批
      userList2: [],//完成审批
      userList3: [],//审批失败
      userList4: [],
      new_collection_sheet_form:{
        receiptContent:[
          {
            account: '',
            amount: '',
            remark: '',
          }
        ]//ReceiptContentVO
        //收据单编号，客户编号，操作员，（转账列表），总额，状态
      }

    }
  },
  async mounted(){
    this.get_all_collection_sheet()

  },
  methods:{
    get_all_collection_sheet(){

      get_collection_sheet_by_state({}).then(_res => {
        this.userList4=_res.result

        this.userList=this.userList4.filter(item => item.state === "待审批")
        this.userList2=this.userList4.filter(item => item.state === "审批完成")
        this.userList3=this.userList4.filter(item => item.state === "审批失败")
      })

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.new_collection_sheet_form=[];
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },
    func1(){
      this.new_collection_sheet_form.state="待审批"
      this.new_collection_sheet_form.total=0
      this.new_collection_sheet_form.receiptContent.forEach((item) => {
        this.new_collection_sheet_form.total+=parseFloat(item.amount)
      })
      this.new_collection_sheet_form.operator= sessionStorage.getItem("name")

      make_collection_sheet(this.new_collection_sheet_form).then(_res => {

        this.new_collection_sheet_form = {
          receiptContent:[
            {
              account: '',
              amount: '',
              remark: '',
            }
          ]
        }
        this.dialogVisible=false
        alert("创建成功")
        window.location.reload()
      })
    },//创建新的收款单据
    func2(){
      this.new_collection_sheet_form.receiptContent.push({});
    },//添加新的ReceiptContent
    func3(item){
      var index = this.new_collection_sheet_form.receiptContent.indexOf(item)
      if(index!==-1){
        this.new_collection_sheet_form.receiptContent.splice(index,1)
      }
    },//删除已经存在的ReceiptContent
  }
};
</script>

<style scoped>
</style>
<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>