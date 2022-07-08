<template>
  <Layout>
    <Title title="账户管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">新增账户</el-button>
    <el-button type="primary" size="medium" @click="dialogVisible2 = true">修改账户</el-button>
    <el-table
      :data="userList"
      stripe
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
    >
      <el-table-column
        prop="id"
        label="账户名"
        width="300">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="存款"
        width="300">
      </el-table-column>
      <el-table-column
        label="删除该账户">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="func3(scope.row.id,scope.row.balance)">删除</el-button>
        </template>
        <!--        func1 -> VO -> CHECK_SIGN_IN   -->
      </el-table-column>
     </el-table>
      <el-dialog
        title="新建账户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <div style="width: 90%; margin: 0 auto">
          <el-form :model="adjust_form" label-width="100px" >
            <el-form-item label="账户名: ">
              <el-input type="textarea" v-model="adjust_form.content.id"></el-input>
            </el-form-item>
            <el-form-item label="存款: ">
              <el-input type="textarea" v-model="adjust_form.content.balance"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="func1()">立即创建</el-button>
      </span>
      </el-dialog>
      <el-dialog
        title="修改"
        :visible.sync="dialogVisible2"
        width="40%"
        :before-close="handleClose">
        <div style="width: 90%; margin: 0 auto">
          <el-form :model="adjust_form" label-width="100px" >
            <el-form-item label="修改的账户为: ">
              <el-input type="textarea" v-model="adjust_form.content.id"></el-input>
            </el-form-item>
            <el-form-item label="钱数修改为: ">
              <el-input type="textarea" v-model="adjust_form.content.balance"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="func2()">确认</el-button>
      </span>
      </el-dialog>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  get_all_account,
  add_account,
  adjust_account,
  del_account,

} from "../../network/purchase";
export default {
  components: {
    Layout,
    Title
  },
  data(){
    return{
      dialogVisible:false,
      dialogVisible2:false,
      userList: [],
      adjust_form:{
        content: {}
      }
    }
  },
  async mounted(){
    await get_all_account().then(_res => {
      // console.log(_res);
      this.userList=this.userList.concat(_res.result);
    })
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.adjust_form=[];
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },
    handleClose2(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.adjust_form=[];
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },
    func1(){
      let params = {
        id:this.adjust_form.content.id,
        balance:this.adjust_form.content.balance,
      }
      add_account(params).then(_res => {
        alert("创建成功！")
        window.location.reload()
      })
    },//增
    func2(){
      let params = {
        id:this.adjust_form.content.id,
        balance:this.adjust_form.content.balance,
      }
      adjust_account(params).then(_res => {
        alert("修改成功！")
        window.location.reload()
      })
    },//改
    func3(id,balance){
      let params = {
        id:id,
        balance:balance,
      }
      del_account(params).then(_res => {
        alert("删除成功！")
        window.location.reload()
      })
    }//删除
  }
};
</script>

<style scoped>
</style>
