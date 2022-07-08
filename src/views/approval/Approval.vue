<template>
  <Layout>
    <Title title="薪酬规则制定"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">更新条目</el-button>
    <div v-if="data_return.length === 0">
      <el-empty description="暂无数据"></el-empty>
    </div>
    <div v-else>
      <approval-appendix :list="data_return"  :type="1" />
    </div>
    <el-dialog
      title="更新条目"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="strategy_form" label-width="80px" >
          <el-form-item label="角色">
            <el-input type="textarea" v-model="strategy_form.role"></el-input>
          </el-form-item>
          <el-form-item label="底薪">
            <el-input type="textarea" v-model="strategy_form.base"></el-input>
          </el-form-item>
          <el-form-item label="销售提成比例">
            <el-input type="textarea" v-model="strategy_form.rent"></el-input>
          </el-form-item>
          <el-form-item label="单次扣除">
            <el-input type="textarea" v-model="strategy_form.dis"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="filters1()">获取结果</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import approvalAppendix from "@/views/approval/appendix/approvalAppendix";
  import {
    find_all_salary_strategy,update_salary_strategy,
  } from "@/network/purchase";
  export default {
    components: {
        Layout,
        Title,
        approvalAppendix,
    },
    data(){
      return{
        dialogVisible:false,
        strategy_form:{
          role:'',
          base:'',
          rent:'',
          dis:'',
        },
        data_return:[]
      }
    },
    async mounted(){
      this.get_all_strategy();
    },
    methods:{
      filters1(){
        let params={
          role:this.strategy_form.role.toString(),
          base:parseInt(this.strategy_form.base),
          rent:parseFloat(this.strategy_form.rent),
          dis:parseFloat(this.strategy_form.dis),
        }
        update_salary_strategy(params).then(_res => {
          alert("获取成功")
          window.location.reload()
        })
      },
      get_all_strategy(){
        find_all_salary_strategy({}).then(_res => {
          this.data_return=_res.result;
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
    }
  };
</script>

<style scoped>
</style>