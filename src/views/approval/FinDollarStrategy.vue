<template>
  <Layout>
    <Title title="年终奖制定"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">添加条目</el-button>
    <div class="body">
    <div v-if="data_return.length === 0">
      <el-empty description="暂无数据"></el-empty>
    </div>
    <div v-else>
      <fin-dollar-strategy-appendix :list="data_return"  :type="1" />
    </div>
    </div>
    <el-dialog
      title="添加条目"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="strategy_form" label-width="80px" >
          <el-form-item label="员工账号">
            <el-input type="textarea" v-model="strategy_form.empId"></el-input>
          </el-form-item>
          <el-form-item label="账户">
            <el-input type="textarea" v-model="strategy_form.account"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="strategy_form.remark"></el-input>
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
import finDollarStrategyAppendix from "@/views/approval/appendix/finDollarStrategyAppendix";
import {
 find_year_end,update_year_end
} from "@/network/purchase";
export default {
  components: {
    Layout,
    Title,
    finDollarStrategyAppendix
  },
  data(){
    return{
      dialogVisible:false,
      strategy_form:{
        empId:'',
        account:'',
        remark:'',
      },
      data_return:[]
    }
  },
  async mounted(){
    this.get_all_strategy();
  },
  methods:{
    filters1(){
      update_year_end(this.strategy_form).then(_res => {
        alert("更新成功")
        window.location.reload()
      })
    },
    get_all_strategy(){
      find_year_end({}).then(_res => {
        // console.log(_res)
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