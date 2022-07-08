<template>
  <Layout>
    <Title title="工资一级审批"></Title>

<!--    <el-button type="primary" size="medium" @click="dialogVisible = true">添加工资单</el-button>-->
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="userList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <employee_salary_service_list :list="userList" :type="1" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="userList2.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <employee_salary_service_list :list="userList2" :type="2" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="PENDING_LEVEL_3">
          <div v-if="userList3.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <employee_salary_service_list :list="userList3" :type="3" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="PENDING_LEVEL_4">
          <div v-if="userList4.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <employee_salary_service_list :list="userList4" :type="4" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="创建工资单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="new_collection_sheet_form" label-width="80px" >
          <el-form-item label="员工id">
            <el-input type="textarea" v-model="new_collection_sheet_form.empId"></el-input>
          </el-form-item>
          <el-form-item label="银行账户">
            <el-input type="textarea" v-model="new_collection_sheet_form.account"></el-input>
          </el-form-item>
          <el-form-item label="月份">
            <el-input type="textarea" v-model="new_collection_sheet_form.month"></el-input>
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
import employee_salary_service_list from "@/views/hr/employee_salary_service_list";
import { get_salary_sheet_by_state, make_salary_sheet,wages_first,wages_second } from "@/network/purchase";
export default {
  components: {
    Layout,
    Title,
    employee_salary_service_list
  },
  data(){
    return{
      activeName:'PENDING_LEVEL_1',
      dialogVisible:false,
      userList: [],//一级审批
      userList2: [],//二级审批
      userList3: [],//审批完成
      userList4: [],//审批失败
      new_collection_sheet_form:{

      }//employee account month state operator
    }
  },
  async mounted(){
    this.get_all_collection_sheet()
  },
  methods:{
    get_all_collection_sheet(){

      get_salary_sheet_by_state({state:'PENDING_LEVEL_1'}).then(_res => {
        // console.log(_res)
        this.userList5=_res.result
        // console.log(this.userList5)
        this.userList=this.userList5.filter(item => item.state === '待一级审批')
        this.userList2=this.userList5.filter(item => item.state === '待二级审批')
        this.userList3=this.userList5.filter(item => item.state === '审批完成')
        this.userList4=this.userList5.filter(item => item.state === '审批失败')


      })
    },//ok
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.new_collection_sheet_form=[];
          done();
          window.location.reload();
        })
        .catch(_ => {});
    },//ok
    func1(){
      make_salary_sheet(this.new_collection_sheet_form).then(_res => {

        this.new_collection_sheet_form = {

        }
        this.dialogVisible=false
        window.location.reload()
      })
    },//创建新的收款单据

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