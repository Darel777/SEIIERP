<template>
  <div class="card">
    <el-card v-for="(item) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row >
          <el-col :span="18">
            <span><strong>单据编号： </strong>{{item.id}}</span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>员工编号: </strong>{{item.empId}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>员工姓名: </strong>{{item.name}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>银行账户: </strong>{{item.account}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>应发奖金: </strong>{{item.bon}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>扣除税款: </strong>{{item.tax}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>实发奖金: </strong>{{item.realbon}}</span>
          </el-col>
        </el-row>

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "approval_appendix",
  props:{
    list: Array,
    area: Object,
    person: Object,
    type: Number,
  },
  methods:{
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