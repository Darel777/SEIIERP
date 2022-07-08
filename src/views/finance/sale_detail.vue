<template>
  <Layout>
    <Title title="查看销售明细表"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">筛选日期</el-button>
    <el-button type="primary" size="medium" @click="dialogVisible2 = true">筛选商品名</el-button>
    <el-button type="primary" size="medium" @click="dialogVisible3 = true">筛选客户</el-button>
    <el-button type="primary" size="medium" @click="dialogVisible4 = true">筛选业务员</el-button>
    <el-button type="primary" size="medium" @click="filter5()">清空筛选</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="销售明细" name="001">
          <div v-if="sale_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salesheet :list="sale_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :customer="cus" :pid="p_name" :type="1" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售退货明细" name="002">
          <div v-if="sale_return_list_data_after_filtered.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salereturnsheet :list="sale_return_list_data_after_filtered" :area="date_filter_form" :person="ye_wu_yuan" :customer="cus" :pid="p_name" :type="2" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="筛选日期"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="date_filter_form" label-width="80px" >
          <el-form-item label="起始年份">
            <el-input type="textarea" v-model="date_filter_form.start_year"></el-input>
          </el-form-item>
          <el-form-item label="月份">
            <el-input type="textarea" v-model="date_filter_form.start_month"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input type="textarea" v-model="date_filter_form.start_date"></el-input>
          </el-form-item>
          <el-form-item label="截止年份">
            <el-input type="textarea" v-model="date_filter_form.end_year"></el-input>
          </el-form-item>
          <el-form-item label="月份">
            <el-input type="textarea" v-model="date_filter_form.end_month"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-input type="textarea" v-model="date_filter_form.end_date"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="filter1()">获取结果</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="筛选商品名"
      :visible.sync="dialogVisible2"
      width="40%"
      :before-close="handleClose2">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="p_name" label-width="80px" >
          <el-form-item label="商品名">
            <el-input type="textarea" v-model="p_name.p"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="filter2()">获取结果</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="筛选客户"
      :visible.sync="dialogVisible3"
      width="40%"
      :before-close="handleClose3">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="cus" label-width="80px" >
          <el-form-item label="客户名">
            <el-input type="textarea" v-model="cus.cu"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="filter3()">获取结果</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="筛选业务员"
      :visible.sync="dialogVisible4"
      width="40%"
      :before-close="handleClose4">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="ye_wu_yuan" label-width="80px" >
          <el-form-item label="业务员">
            <el-input type="textarea" v-model="ye_wu_yuan.ye_wu"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="filter4()">获取结果</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import salesheet from "@/views/finance/detail_attributes/salesheet";
import salereturnsheet from "@/views/finance/detail_attributes/salereturnsheet";
import{
  ming_xi,
  ming_xi_return
} from "@/network/purchase";



export default {
  components: {
    Layout,
    Title,
    // eslint-disable-next-line vue/no-unused-components
    salesheet,
    // eslint-disable-next-line vue/no-unused-components
    salereturnsheet,
  },
  data(){
    return{
      activeName:"001",
      dialogVisible:false,//筛选日期 静态
      dialogVisible2:false,//筛选商品名 动态
      dialogVisible3:false,//筛选客户 动态
      dialogVisible4:false,//筛选业务员 动态
      date_filter_form:{
        start_year:'',
        start_month:'',
        start_date:'',
        end_year:'',
        end_month:'',
        end_date:'',
      },//筛选日期
      p_name:{
        p:'',
      },//筛选商品名
      cus:{
        cu:'',
      },//筛选客户
      ye_wu_yuan:{
        ye_wu:'',
      },//筛选业务员
      sale_list_data: [],
      sale_list_data_after_filtered: [],
      //
      sale_return_list_data: [],
      sale_return_list_data_after_filtered: [],
    }
  },
  async mounted(){
    ming_xi({}).then(_res => {
      this.sale_list_data=_res.result
      // console.log(this.sale_list_data)
      this.sale_list_data_after_filtered=this.sale_list_data
    })
    ming_xi_return({}).then(_res => {
      this.sale_return_list_data=_res.result
      // console.log(this.sale_return_list_data)
      this.sale_return_list_data_after_filtered=this.sale_return_list_data
    })
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.date_filter_form={
            start_year:'',
            start_month:'',
            start_date:'',
            end_year:'',
            end_month:'',
            end_date:'',
          }
          done();
        })
        .catch(_ => {});
    },//ok
    handleClose2(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.p_name={
            p:'',
          }
          done();
        })
        .catch(_ => {});
    },//ok
    handleClose3(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.cus={
            cu:'',
          }
          done();
        })
        .catch(_ => {});
    },//ok
    handleClose4(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.ye_wu_yuan={
            ye_wu:'',
          }
          done();
        })
        .catch(_ => {});
    },//ok
    filter6(sale_list_data){
      this.sale_list_data_after_filtered=[];
      for(let i=0;i<sale_list_data.length;i++){
        let j=0;
        if(this.p_name.p === ''){
          j=j+1;
        }else{
          if(sale_list_data[i].pname.toString() === this.p_name.p.toString() ){
            j=j+1;
          }
        }
        if(this.cus.cu === ''){
          j=j+1;
        }else{
          if(sale_list_data[i].customer.toString() === this.cus.cu.toString() ){
            j=j+1;
          }
        }
        if(this.ye_wu_yuan.ye_wu === ''){
          j=j+1;
        }else{
          if(sale_list_data[i].salesman.toString() === this.ye_wu_yuan.ye_wu.toString() ){
            j=j+1;
          }
        }
        if(this.date_filter_form.start_year=== ''){
          j=j+1;
        }else{
          let current_year=parseInt(this.sale_list_data[i].createTime.substring(0,4))
          let current_month=parseInt(this.sale_list_data[i].createTime.substring(5,7))
          let current_date=parseInt(this.sale_list_data[i].createTime.substring(8,10))
          let start_year=parseInt(this.date_filter_form.start_year)
          let start_month=parseInt(this.date_filter_form.start_month)
          let start_date=parseInt(this.date_filter_form.start_date)
          let end_year=parseInt(this.date_filter_form.end_year)
          let end_month=parseInt(this.date_filter_form.end_month)
          let end_date=parseInt(this.date_filter_form.end_date)
          if(current_year<end_year && current_year>start_year){
            // console.log(1)
            j=j+1
          }else if(current_year === end_year && current_year === start_year){
            if(current_month<end_month && current_month>start_month){
              // console.log(2)
              j=j+1
            }else if(current_month===start_month && current_month=== end_month){
              // console.log(3)
              // console.log(current_date,end_date,start_date)
              if(current_date<=end_date){
                if(current_date>=start_date){
                  j=j+1
                }

              }

            }else if(current_month === start_month){
              // console.log(4)
              if(current_date>=start_date){
                j=j+1
              }

            }else if(current_month=== end_month){
              // console.log(5)
              if(current_date<=end_date){
                j=j+1
              }

            }else {
              // console.log(6)

            }
          } else if(current_year === end_year){
            if(current_month<end_month){
              // console.log(7)
              j=j+1
            }else if(current_month === end_month){
              // console.log(8)
              if(current_date <= end_date){
                j=j+1
              }

            }else{
              // console.log(9)

            }
          }else if(current_year === start_year){
            if(current_month>start_month){
              // console.log(10)
              j=j+1
            }else if(current_month=== start_month){
              // console.log(11)
              if(current_date >= start_date){
               j=j+1
              }

            }else{
              // console.log(12)

            }
          }else{
            // console.log(13)

          }
          //
        }
        if(j >= 4){
          this.sale_list_data_after_filtered=this.sale_list_data_after_filtered.concat(sale_list_data[i])
        }
      }
    },
    filter7(sale_list_data){
      this.sale_return_list_data_after_filtered=[];
      for(let i=0;i<sale_list_data.length;i++){
        // console.log(i,"start")
        let j=0;
        if(this.p_name.p === ''){
          j=j+1;
        }else{
          if(sale_list_data[i].pname.toString() === this.p_name.p.toString() ){
            j=j+1;
          }
        }
        if(this.cus.cu === ''){
          j=j+1;
        }else{
          if(sale_list_data[i].customer.toString() === this.cus.cu.toString() ){
            // console.log("congratulations")
            j=j+1;
          }
        }
        if(this.ye_wu_yuan.ye_wu === ''){
          j=j+1;
        }else{
          if(sale_list_data[i].salesman.toString() === this.ye_wu_yuan.ye_wu.toString() ){
            j=j+1;
          }
        }
        if(this.date_filter_form.start_year=== ''){
          j=j+1;
        }else{
          let current_year=parseInt(this.sale_list_data[i].createTime.substring(0,4))
          let current_month=parseInt(this.sale_list_data[i].createTime.substring(5,7))
          let current_date=parseInt(this.sale_list_data[i].createTime.substring(8,10))
          let start_year=parseInt(this.date_filter_form.start_year)
          let start_month=parseInt(this.date_filter_form.start_month)
          let start_date=parseInt(this.date_filter_form.start_date)
          let end_year=parseInt(this.date_filter_form.end_year)
          let end_month=parseInt(this.date_filter_form.end_month)
          let end_date=parseInt(this.date_filter_form.end_date)
          if(current_year<end_year && current_year>start_year){
            // console.log(1)
            j=j+1
          }else if(current_year === end_year && current_year === start_year){
            if(current_month<end_month && current_month>start_month){
              // console.log(2)
              j=j+1
            }else if(current_month===start_month && current_month=== end_month){
              // console.log(3)

              if(current_date<=end_date){
                if(current_date>=start_date){
                  j=j+1
                }

              }

            }else if(current_month === start_month){
              // console.log(4)
              if(current_date>=start_date){
                j=j+1
              }

            }else if(current_month=== end_month){
              // console.log(5)
              if(current_date<=end_date){
                j=j+1
              }

            }else {
              // console.log(6)

            }
          } else if(current_year === end_year){
            if(current_month<end_month){
              // console.log(7)
              j=j+1
            }else if(current_month === end_month){
              // console.log(8)
              if(current_date <= end_date){
                j=j+1
              }

            }else{
              // console.log(9)

            }
          }else if(current_year === start_year){
            if(current_month>start_month){
              // console.log(10)
              j=j+1
            }else if(current_month=== start_month){
              // console.log(11)
              if(current_date >= start_date){
                j=j+1
              }

            }else{
              // console.log(12)

            }
          }else{
            // console.log(13)

          }
          //
        }
        // console.log(j,"check")
        if(j >= 4){
          this.sale_return_list_data_after_filtered=this.sale_return_list_data_after_filtered.concat(sale_list_data[i])
        }
      }
    },
    filter1(){
      this.dialogVisible=false;this.filter6(this.sale_list_data);
      this.filter7(this.sale_return_list_data);
    },
    filter2(){
    this.dialogVisible2=false;this.filter6(this.sale_list_data);
    this.filter7(this.sale_return_list_data);
    },
    filter3(){
    this.dialogVisible3=false;this.filter6(this.sale_list_data);
      this.filter7(this.sale_return_list_data);
    },
    filter4(){
    this.dialogVisible4=false;this.filter6(this.sale_list_data);
      this.filter7(this.sale_return_list_data);
    },
    filter5(){
      window.location.reload()
      // this.date_filter_form={
      //   start_year:'',
      //   start_month:'',
      //   start_date:'',
      //   end_year:'',
      //   end_month:'',
      //   end_date:'',
      // }
      // this.ye_wu_yuan={
      //   ye_wu:'',
      // }
      // this.cus={
      //   cu:'',
      // }
      // this.p_name={
      //   p:'',
      // }
      //
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