<template>
  <Layout>
    <Title title="员工管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">更改职务</el-button>
    <div style="margin-top: 10px">
    <el-table
    :data="userList"
    stripe
    style="width: 100%"
    :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}"
    >
      <el-table-column
        prop="name"
        label="员工姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="role"
        label="当前职务"
        width="200">
      </el-table-column>
      <el-table-column
        label="是否签到">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="func1(scope.row.name,scope.row.role)">查看</el-button>
        </template>
<!--        func1 -> VO -> CHECK_SIGN_IN   -->
      </el-table-column>
      <el-table-column
        label="解雇">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="func2(scope.row.name,scope.row.role)">解雇</el-button>
        </template>
<!--        func2 -> VO -> FIRE  -->
      </el-table-column>
    </el-table>

      <el-dialog
        title="修改用户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <div style="width: 90%; margin: 0 auto">
          <el-form :model="adjust_form" label-width="100px" >
            <el-form-item label="ID: ">
              <el-input type="textarea" v-model="adjust_form.content.id"></el-input>
            </el-form-item>
            <el-form-item label="ROLE: ">
              <el-input type="textarea" v-model="adjust_form.content.role"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="func3()">立即创建</el-button>
      </span>
      </el-dialog>

    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  get_all_user,
  check_sign_in,
  fire,
  adjust,
}from "../../network/purchase";
export default {
  components: {
    Layout,
    Title
  },
  data(){
    return{
      dialogVisible:false,
      userList: [],
      adjust_form:{
        content: {}
      }
    }
  },
  async mounted(){
    await get_all_user().then(_res => {

      this.userList=this.userList.concat(_res.result);
    })
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.adjust_form=[];
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },
    func1(id,role){
      let params = {
        name:id,
        role:role
      };
      check_sign_in(params).then(_res => {

        if(_res.result === "此员工本月没有签到"){
          alert("该员工本月还没有签到过")
        }else{
          alert("该员工本月已签到"+_res.result.times+"次！")
        }
      })
    },//通过这里转向是否签到
    func2(id,role){
      let params = {
        name:id,
        role:role
      };
      fire(params).then(_res => {
        alert("已经成功解雇！")
        window.location.reload();
      })
    },//通过这里转向解雇
    func3(){
      let params = {
        name:this.adjust_form.content.id,
        role:this.adjust_form.content.role
      };
      adjust(params).then(_res => {
        if (_res.msg == 'Success') {
          this.$message.success('创建成功!');
          this.dialogVisible = false;
          window.location.reload();
        }else{
          alert("此员工不存在");
          this.dialogVisible = false;
          window.location.reload();
        }
      })
    },//通过这里转向调整
  }

};
</script>

<style scoped>
</style>
