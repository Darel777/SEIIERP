<template>
  <Layout>
    <Title title="客户管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">新增客户</el-button><el-button type="primary" size="medium" @click="dialogVisible2 = true">删除客户</el-button>

    <div style="margin-top: 10px">
      <el-table
        :data="customerList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="id"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100"
          :filters="[{ text: '供应商', value: '供应商' }, { text: '销售商', value: '销售商' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '供应商' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="150">
        </el-table-column>
        <el-table-column
          prop="zipcode"
          label="邮编"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="lineOfCredit"
          label="应收额度(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="receivable"
          label="应收(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="payable"
          label="应付(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editInfo(scope.row.id)"
              type="text"
              size="small">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>




    <el-dialog
      title="增加客户"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
      <el-form :model="newCustomerForm" label-width="100px" >

      <el-form-item label="ID: ">
            <el-input type="textarea" v-model="newCustomerForm.content.id"></el-input>
          </el-form-item>
      <el-form-item label="分类: ">
            <el-input type="textarea" v-model="newCustomerForm.content.type"></el-input>
          </el-form-item>
      <el-form-item label="级别: ">
            <el-input type="textarea" v-model="newCustomerForm.content.level"></el-input>
          </el-form-item>
      <el-form-item label="姓名: ">
            <el-input type="textarea" v-model="newCustomerForm.content.name"></el-input>
          </el-form-item>
      <el-form-item label="电话号码: ">
            <el-input type="textarea" v-model="newCustomerForm.content.phone"></el-input>
          </el-form-item>
      <el-form-item label="地址: ">
            <el-input type="textarea" v-model="newCustomerForm.content.address"></el-input>
          </el-form-item>
      <el-form-item label="邮编: ">
            <el-input type="textarea" v-model="newCustomerForm.content.zipcode"></el-input>
          </el-form-item>  
      <el-form-item label="电子邮箱: ">
            <el-input type="textarea" v-model="newCustomerForm.content.email"></el-input>
          </el-form-item>    
      <el-form-item label="应收额度: ">
            <el-input type="textarea" v-model="newCustomerForm.content.lineOfCredit"></el-input>
          </el-form-item>    
      <el-form-item label="应收: ">
            <el-input type="textarea" v-model="newCustomerForm.content.receivable"></el-input>
          </el-form-item>
      <el-form-item label="应付: ">
            <el-input type="textarea" v-model="newCustomerForm.content.payable"></el-input>
          </el-form-item>
      <el-form-item label="默认业务员: ">
            <el-input type="textarea" v-model="newCustomerForm.content.operator"></el-input>
          </el-form-item>  
      </el-form>
      </div>




      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCustomer()">立即创建</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除客户"
      :visible.sync="dialogVisible2"
      width="40%"
      :before-close="handleClose2">


      <div style="width: 90%; margin: 0 auto">
      <el-form :model="deleteCustomerForm" label-width="100px" >
      <el-form-item label="ID: ">
            <el-input type="textarea" v-model="deleteCustomerForm.content.id"></el-input>
          </el-form-item>
      </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="delCustomer()">立即删除</el-button>
      </span>
    </el-dialog>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getAllCustomer,
        addNewCustomer,
        deleteCustomer,
} from "../../network/purchase";
export default {
  name: 'CustomerView',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      dialogVisible:false,
      dialogVisible2:false,
      customerList: [],
      newCustomerForm: {
        content: {}
      },
      deleteCustomerForm:{
        content: {}
      },

    }
  },
  async mounted() {
    await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
  },

  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.newCustomerForm=[]
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },
    handleClose2(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.deleteCustomerForm=[]
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },

    addCustomer() {

      let params = {
          id: this.newCustomerForm.content.id,
          type: this.newCustomerForm.content.type,
          level: this.newCustomerForm.content.level,
          name: this.newCustomerForm.content.name,
          phone: this.newCustomerForm.content.phone,
          address: this.newCustomerForm.content.address,
          zipcode: this.newCustomerForm.content.zipcode,
          email: this.newCustomerForm.content.email,
          lineOfCredit: this.newCustomerForm.content.lineOfCredit,
          receivable: this.newCustomerForm.content.receivable,
          payable: this.newCustomerForm.content.payable,
          operator: this.newCustomerForm.content.operator
        };
      addNewCustomer(params).then(_res => {
        if (_res.msg == 'Success') {
              this.$message.success('创建成功!');
              this.dialogVisible = false;
              window.location.reload();
              
            }
      })
    },

    delCustomer() {

      let params = {
          id: this.deleteCustomerForm.content.id,
        };
      deleteCustomer(params).then(_res => {
        if (_res.msg == 'Success') {
              this.$message.success('删除成功!');
              this.dialogVisible2 = false;
              window.location.reload();
            }
      })
    },

    editInfo(id) {
      // TODO: 修改客户信息
      alert(`TODO: 修改${id}客户信息`)
    }
  }
}
</script>

<style>

</style>