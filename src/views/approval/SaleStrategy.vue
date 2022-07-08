<template>
  <Layout>
    <Title title="促销策略"></Title>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-strategy-appendix :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import saleStrategyAppendix from "@/views/approval/appendix/saleStrategyAppendix";
import { getAllSale } from '../../network/sale'
import { getAllCustomer } from '../../network/purchase'
import { getAllCommodity } from '../../network/commodity'
export default {
  name: 'SaleView',
  components: {
    Layout,
    Title,
    saleStrategyAppendix
  },
  data() {
    return {
      activeName: 'SUCCESS',
      saleList: [],
      successList: [],
      dialogVisible: false,
      saleForm: {
        saleSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      },
      sellers: [],
      rules: {
        supplier: [
          { required: true, message: '请选择一个销售商', trigger: 'change' }
        ],
        discount: [
          { required: true, message: '请输入折扣', trigger: 'change' }
        ],
        voucherAmount: [
          { required: true, message: '请输入代金券总额', trigger: 'change' }
        ]
      },
      commodityList: []
    }
  },
  mounted() {
    this.getSale();
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({ id: item.id }))
    })
    getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.sellers = _res.result
    })
  },
  methods: {
    getSale() {
      getAllSale({}).then(_res => {
        this.saleList = _res.result
        console.log(_res.result)
        this.successList = this.saleList.filter(item => item.state === '审批完成')
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm()
          done();
        })
        .catch(_ => {});
    },
  }
}
</script>

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