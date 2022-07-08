<template>
  <div class="card">
    <el-card v-for="(item, index) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row>

          <el-col :span="18">
            <span><strong>id: </strong>{{item.id}}</span>
            <el-button v-if="authorization() === 2" style="margin-left: 10px"
                       type="success" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 2"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.id)"></el-button>
          </el-col>

          <el-col :span="6">
            <el-button class="button" type="text"
                       v-if="!showAll[index]"
                       @click="changeState(index)">
              展开
            </el-button>
            <el-button class="button" type="text"
                       v-if="showAll[index]"
                       @click="changeState(index)">
              收起</el-button>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>客户编号: </strong>{{item.customer}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>总额: </strong>{{item.total}}(元)</span>
          </el-col>
        </el-row>
        <div v-if="showAll[index]" style="margin-top: 15px">
          <div style="margin-bottom: 15px"><strong>详细清单:</strong></div>
          <el-table
            :data="item.paymentSheetContent"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
            <el-table-column
              prop="account"
              label="银行账户"
              width="200">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="转账金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  approval_purchase_sheet,
} from "../../network/purchase";
export default {
  name: "collection_sheet_list",
  props:{
    list: Array,
    type: Number,
  },
  data(){
    return{
      showAll:[],
    }
  },
  methods:{
    approval(id){
      let config = {
        params: {
          paymentSheetId: id,
          state: 'SUCCESS'
        }
      }
      approval_purchase_sheet(config).then(_res => {
        this.$emit("refresh")
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        window.location.reload()
      })
    },
    deny(id){
      let config = {
        params: {
          paymentSheetId: id,
          state: 'FAILURE'
        }
      }
      approval_purchase_sheet(config).then(_res => {
        this.$emit("refresh")
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        window.location.reload()
      })
    },
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index])
    },
    authorization() {
      if (this.type === 1 && sessionStorage.getItem('role') === 'SALE_MANAGER') {
        return 1
      } else if ((this.type === 1 || this.type===3 )&& (sessionStorage.getItem('role') === 'GM'|| sessionStorage.getItem('role') === 'ADMIN')) {
        return 2
      }else if(sessionStorage.getItem('role') === 'FINANCIAL_STAFF'||sessionStorage.getItem('role') === 'ADMIN'){

        return 3
      }
    },
  },
};
</script>

<style scoped>

</style>
<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;
  .button {
    float: right;
    padding: 3px 0
  }
}
.el-card {
  margin-bottom: 20px;
  background: #EEF7F2;
}
</style>