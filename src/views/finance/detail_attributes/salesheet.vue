<template>
  <div class="card">
    <el-button type="primary" size="medium" @click="getExcel()">生成表单</el-button>
    <el-card v-for="(item) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row >
          <el-col :span="18">
            <span><strong>Time: </strong>{{item.createTime}}</span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>客户ID: </strong>{{item.customer}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>商品ID: </strong>{{item.pid}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>商品名: </strong>{{item.pname}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>数量: </strong>{{item.quantity}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>单价: </strong>{{item.unitPrice}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>总价: </strong>{{item.totalPrice}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>销售员: </strong>{{item.salesman}}</span>
          </el-col>
        </el-row>

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "salesheet",
  props:{
    list: Array,
    area: Object,
    person: Object,
    type: Number,
  },
  methods:{
    getExcel(){
      let str='创建时间,商品名,商品ID,客户ID,销售员,数量,单价,总价\n'
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
      link.download =  "销售明细-销售单.csv";
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