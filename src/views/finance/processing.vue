<template>
  <Layout>
    <Title title="查看经营情况表"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">筛选时间区间</el-button>
    <div class="body">
    <div v-if="data.length === 0">
      <el-empty description="暂无数据,请填写时间区间获取结果"></el-empty>
    </div>
    <div v-else>
      <processing_list :list="data"  :type="1" />
    </div>
    </div>
    <el-dialog
      title="筛选日期（xxxx-xx-xx xx:xx:xx格式）"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="date_filter_form" label-width="80px" >
          <el-form-item label="开始日期">
            <el-input type="textarea" v-model="date_filter_form.start"></el-input>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-input type="textarea" v-model="date_filter_form.end"></el-input>
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
import processing_list from "@/views/finance/processing_attributes/processing_list";
import {
  get_all_processing
} from "@/network/purchase";
export default {
  components: {
    Layout,
    Title,
    processing_list,
  },
  data(){
    return{
      dialogVisible:false,
      date_filter_form:{
        start:'',
        end:'',
      },
      data:[]
    }
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
    filters1(){
      console.log(this.date_filter_form.start)
      console.log(this.date_filter_form.end)
      let request=this.date_filter_form.start.toString()+this.date_filter_form.end.toString()
      get_all_processing(request).then(_res => {
        console.log(_res)
        this.data=this.data.concat(_res.result)
        this.dialogVisible=false
      })
    },
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