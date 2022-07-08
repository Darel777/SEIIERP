<template>
  <div class="card">
    <el-button type="primary" size="medium" @click="getExcel()">生成表单</el-button>
    <el-card v-for="(item) in list" :index="item.index" :key="item.id" shadow="hover">
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>销售收入: </strong>{{item.saleIncome}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>商品类收入: </strong>{{item.productIncome}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>折让程度: </strong>{{item.discount}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>销售成本: </strong>{{item.saleOutcome}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>商品类支出: </strong>{{item.productOutcome}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>人力成本: </strong>{{item.hrOutcome}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>利润: </strong>{{item.profit}}</span>
          </el-col>
        </el-row>

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "processing_list",
  props:{
    list: Array,
    area: Object,
    person: Object,
    type: Number,
  },
  methods:{
    getExcel(){
      let str='销售收入,商品类收入,折让程度,销售成本,商品类支出,人力成本,利润\n'
      for(let i=0;i<this.list.length;i++){
        for(const key in this.list[i]){
          str+=`${this.list[i][key] + '\t'},`;
        }
        str+='\n'
      }
      // encodeURIComponent解决中文乱码
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      // 通过创建a标签实现
      const link = document.createElement("a");
      link.href = uri;
      // 对下载的文件命名
      link.download =  "经营情况表.csv";
      link.click();

    }
  }
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