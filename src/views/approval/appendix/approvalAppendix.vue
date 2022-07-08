<template>
  <div class="card">
    <el-card v-for="(item) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row >
          <el-col :span="18">
            <span><strong>角色： </strong>{{item.role}}</span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>底薪: </strong>{{item.base}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>销售提成比例: </strong>{{item.rent}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>单次扣除: </strong>{{item.dis}}</span>
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