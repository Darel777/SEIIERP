<template>
  <div class="card">
    <el-button type="primary" size="medium" @click="getExcel()">生成表单</el-button>
    <el-card v-for="(item, index) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header v-if="isLegal(item) === 1 && isLegal2(item) === 1">
        <el-row >

          <el-col :span="18">
            <span><strong>id: </strong>{{item.id}}</span>
            <el-button class="z" type="primary" size="medium" @click="red(item)">红冲</el-button>
          </el-col>
        </el-row>
      </template>
      <div v-if="isLegal(item) === 1 && isLegal2(item) === 1">
        <el-row>
          <el-col :span="3">
            <span><strong>雇员姓名: </strong>{{item.name}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>账户: </strong>{{item.account}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>工资: </strong>{{item.salary}}(元)</span>
          </el-col>
          <el-col :span="3">
            <span><strong>税款: </strong>{{item.tax}}(元)</span>
          </el-col>
          <el-col :span="3">
            <span><strong>实发: </strong>{{item.realSalary}}(元)</span>
          </el-col>
        </el-row>
        <div v-if="showAll[index]" style="margin-top: 15px">
          <div style="margin-bottom: 15px"><strong>详细清单:</strong></div>
          <el-table
            :data="item.receiptContent"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
            <el-table-column
              prop="account"
              label="银行账户"
              width="200">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="转账金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  red_wages_sheet,
} from "@/network/purchase";//红冲函数
export default {
  name: "collection_sheet_list",
  props:{
    list: Array,
    area: Object,
    person: Object,
    type: Number,
  },
  data(){
    return{
      showAll:[],
      res:[],
    }
  },
  methods:{
    getExcel(){
      for(let i=0;i<this.list.length;i++){
        if(this.isLegal(this.list[i])&&this.isLegal2(this.list[i])){
          this.res=this.res.concat(this.list[i])
        }
      }
      // console.log(this.res)
      let str='单号,userid,username,账户,原工资,税款,总工资,状态\n'
      for(let i=0;i<this.res.length;i++){
        for(const key in this.res[i]){
          if(key.toString() !== 'month')
            str+=`${this.res[i][key] + '\t'},`;
        }
        str+='\n'
      }
      // encodeURIComponent解决中文乱码
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      // 通过创建a标签实现
      const link = document.createElement("a");
      link.href = uri;
      // 对下载的文件命名
      link.download =  "工资单.csv";
      link.click();
    },
    isLegal2(item){

      if(this.person.ye_wu === ""){
        return 1
      }else{
        if(typeof item.operator === "object"){
          return 0
        }else if(typeof this.person.ye_wu === "object"){
          return 1
        }else{
          // console.log(typeof this.person.ye_wu,typeof item.operator,this.person.ye_wu,item.operator)
          return  encodeURIComponent(this.person.ye_wu)==encodeURIComponent(item.operator)?1:0
        }
      }

    },
    isLegal(item){
      if(this.area.start_year === ''){
        return 1//没有填写 则所有的都可以查看
      }else{
        //
        let current_year=parseInt(item.id.substring(4,8))
        let current_month=parseInt(item.id.substring(8,10))
        let current_date=parseInt(item.id.substring(10,12))
        let start_year=parseInt(this.area.start_year)
        let start_month=parseInt(this.area.start_month)
        let start_date=parseInt(this.area.start_date)
        let end_year=parseInt(this.area.end_year)
        let end_month=parseInt(this.area.end_month)
        let end_date=parseInt(this.area.end_date)

        if(current_year<end_year && current_year>start_year){
          // console.log(1)
          return 1
        }else if(current_year === end_year && current_year === start_year){
          if(current_month<end_month && current_month>start_month){
            // console.log(2)
            return 1
          }else if(current_month===start_month && current_month=== end_month){
            // console.log(3)
            // console.log(current_date,end_date,start_date)
            if(current_date<=end_date){
              if(current_date>=start_date){
                return 1
              }
              return 0
            }
            return 0
          }else if(current_month === start_month){
            // console.log(4)
            if(current_date>=start_date){
              return 1
            }
            return 0
          }else if(current_month=== end_month){
            // console.log(5)
            if(current_date<=end_date){
              return 1
            }
            return 0
          }else {
            // console.log(6)
            return 0
          }
        } else if(current_year === end_year){
          if(current_month<end_month){
            // console.log(7)
            return 1
          }else if(current_month === end_month){
            // console.log(8)
            if(current_date <= end_date){
              return 1
            }
            return 0
          }else{
            // console.log(9)
            return 0
          }
        }else if(current_year === start_year){
          if(current_month>start_month){
            // console.log(10)
            return  1
          }else if(current_month=== start_month){
            // console.log(11)
            if(current_date >= start_date){
              return 1
            }
            return 0
          }else{
            // console.log(12)
            return 0
          }
        }else{
          // console.log(13)
          return 0
        }
        //
      }
    },
    red(item){
      red_wages_sheet(item)
      alert("创建成功")
      window.location.reload()
    },
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index])
    },
    authorization() {
      if (this.type === 1 && sessionStorage.getItem('role') === 'SALE_MANAGER') {
        return 1
      } else if (this.type === 2 && sessionStorage.getItem('role') === 'GM') {
        return 2
      }else if(sessionStorage.getItem('role') === 'FINANCIAL_STAFF'||sessionStorage.getItem('role') === 'ADMIN'){
        // console.log(sessionStorage)
        return 3
      }
    },
  },
};
</script>

<style scoped>

</style>
<style lang="scss" scoped>
.z{
  margin-left: 100px;
}
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