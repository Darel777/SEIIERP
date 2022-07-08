<template>
  <Layout>
    <Title title="查看经营历程表"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">筛选日期</el-button>
    <el-button type="primary" size="medium" @click="dialogVisible2 = true">筛选业务员</el-button>
    <el-button type="primary" size="medium" @click="filter3()">清空筛选</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="销售单" name="001">
          <div v-if="sale_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="sale_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :type="1" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售退货单" name="002">
          <div v-if="sale_return_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sales-return-list :list="sale_return_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :type="2" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="进货单" name="003">
          <div v-if="purchase_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="purchase_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="进货退货单" name="004">
          <div v-if="purchase_return_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="purchase_return_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :type="4"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收款单" name="005">
          <div v-if="collection_sheet_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <collection_sheet_list :list="collection_sheet_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :type="5"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="付款单" name="006">
          <div v-if="purchase_sheet_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase_sheet_list :list="purchase_sheet_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :type="6"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工资单" name="007">
          <div v-if="wages_sheet_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <wages-sheet-list :list="wages_sheet_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :type="6"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="筛选日期"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="date_filter_form" label-width="80px" >
          <el-form-item label="起始年份">
            <el-input type="textarea" v-model="date_filter_form.start_year"></el-input>
          </el-form-item>
          <el-form-item label="月份">
            <el-input type="textarea" v-model="date_filter_form.start_month"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input type="textarea" v-model="date_filter_form.start_date"></el-input>
          </el-form-item>
          <el-form-item label="截止年份">
            <el-input type="textarea" v-model="date_filter_form.end_year"></el-input>
          </el-form-item>
          <el-form-item label="月份">
            <el-input type="textarea" v-model="date_filter_form.end_month"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input type="textarea" v-model="date_filter_form.end_date"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="filters1()">获取结果</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="筛选业务员"
      :visible.sync="dialogVisible2"
      width="40%"
      :before-close="handleClose2">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="ye_wu_yuan" label-width="80px" >
          <el-form-item label="业务员名">
            <el-input type="textarea" v-model="ye_wu_yuan.ye_wu"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="filters2()">获取结果</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SaleList from "@/views/finance/history_attributes/SaleList";
//销售单
import SalesReturnList from "@/views/finance/history_attributes/SalesReturnList";
//销售退货单
import PurchaseList from "@/views/finance/history_attributes/PurchaseList";
//进货单
import PurchaseReturnList from "@/views/finance/history_attributes/PurchaseReturnList";
//进货退货单
import collection_sheet_list from "@/views/finance/history_attributes/collection_sheet";
//收款单
import purchase_sheet_list from "@/views/finance/history_attributes/purchase_sheet";
//付款单
import wagesSheetList from "@/views/finance/history_attributes/wagesSheetList";
//工资单
import {
  getAllPurchase,
  getAllPurchaseReturn,
} from "@/network/purchase";//获取进货单子
import {
  getAllSale,
  getAllSalesReturn
} from "@/network/sale";//获取销售单子
import {
  get_collection_sheet_by_state,
  get_purchase_sheet_by_state,
  get_wages_sheet_by_state,
} from "@/network/purchase";
import WagesSheetList from "@/views/finance/history_attributes/wagesSheetList";
//获取收款单子 付款单子
//筛选其实是前端生成的 by state只是为了和助教写好的页面长得一样而已
export default {

  components: {
    WagesSheetList,
    // eslint-disable-next-line vue/no-unused-components
    SaleList,
    // eslint-disable-next-line vue/no-unused-components
    SalesReturnList,
    // eslint-disable-next-line vue/no-unused-components
    PurchaseList,
    // eslint-disable-next-line vue/no-unused-components
    PurchaseReturnList,
    // eslint-disable-next-line vue/no-unused-components
    collection_sheet_list,
    // eslint-disable-next-line vue/no-unused-components
    purchase_sheet_list,
    Layout,
    Title
  },

  data(){
    return{
      activeName:"001",
      dialogVisible:false,
      dialogVisible2:false,
      date_filter_form:{
        start_year:'',
        start_month:'',
        start_date:'',
        end_year:'',
        end_month:'',
        end_date:'',
      },
      ye_wu_yuan:{
        ye_wu:'',
      },

      sale_list_data: [],
      sale_list_data_after_filtered: [],
      //
      sale_return_list_data: [],
      sale_return_list_data_after_filtered: [],


      purchase_list_data: [],
      purchase_list_data_after_filtered: [],
      //
      purchase_return_list_data :[],
      purchase_return_list_data_after_filtered:[],

      collection_sheet_list_data :[],
      collection_sheet_list_data_after_filtered: [],
      //
      purchase_sheet_list_data:[],
      purchase_sheet_list_data_after_filtered:[],

      wages_sheet_list_data:[],
      wages_sheet_list_data_after_filtered:[]

    }
  },

  async mounted(){
    this.get_all_possible_lists()
  },

  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.new_collection_sheet_form=[];
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },
    handleClose2(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.new_collection_sheet_form=[];
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },

    get_all_possible_lists(){
      getAllSale({}).then(_res => {

        this.sale_list_data=_res.result
        // console.log(this.sale_list_data)
        this.sale_list_data=this.sale_list_data.filter(item => item.state === '审批完成')

        this.sale_list_data_after_filtered=this.sale_list_data

      })
      getAllSalesReturn({}).then(_res => {

        this.sale_return_list_data=_res.result
        this.sale_return_list_data=this.sale_return_list_data.filter(item => item.state === '审批完成')
        this.sale_return_list_data_after_filtered=this.sale_return_list_data
      })
      getAllPurchase({}).then(_res => {

        this.purchase_list_data=_res.result
        this.purchase_list_data=this.purchase_list_data.filter(item => item.state === '审批完成')
        this.purchase_list_data_after_filtered=this.purchase_list_data
      })
      getAllPurchaseReturn({}).then(_res => {

        this.purchase_return_list_data=_res.result
        this.purchase_return_list_data=this.purchase_return_list_data.filter(item => item.state === "审批完成")
        this.purchase_return_list_data_after_filtered=this.purchase_return_list_data
      })
      get_collection_sheet_by_state({}).then(_res => {

        this.collection_sheet_list_data=_res.result
        this.collection_sheet_list_data=this.collection_sheet_list_data.filter(item => item.state === "审批完成")
        this.collection_sheet_list_data_after_filtered=this.collection_sheet_list_data
      })
      get_purchase_sheet_by_state(({})).then(_res => {

        this.purchase_sheet_list_data=_res.result
        this.purchase_sheet_list_data=this.purchase_sheet_list_data.filter(item => item.state === "审批完成")
        this.purchase_sheet_list_data_after_filtered=this.purchase_sheet_list_data
      })
      get_wages_sheet_by_state(({})).then(_res => {

        this.wages_sheet_list_data=_res.result
        // console.log(this.wages_sheet_list_data)
        this.wages_sheet_list_data=this.wages_sheet_list_data.filter(item => item.state === "审批完成")
        this.wages_sheet_list_data_after_filtered=this.wages_sheet_list_data
        // console.log(this.wages_sheet_list_data_after_filtered)
      })
    },

    filters1(){
      this.dialogVisible=false
    },
    filters2(){
      this.dialogVisible2=false
    },
    filter3(){
      this.date_filter_form={
        start_year:'',
        start_month:'',
        start_date:'',
        end_year:'',
        end_month:'',
        end_date:'',
      }
      this.ye_wu_yuan={
        ye_wu: '',
      }
    }
  },

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