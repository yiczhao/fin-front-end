<template>
    <index :title="'预付款商户'"
           :ptitle="'商户管理'"
           :hname="'prepayment-lists'"
           :isshow="'isshow'">
        <div class="content blists" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="" placeholder="商户ID">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="" placeholder="商户名">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="subCompanID" >
                            <option value="">请选择分公司</option>
                                <option v-for="n in subcompanyList" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="cityID">
                            <option value="">请选择城市</option>
                                <option v-for="n in cityList" v-text="n.name" :value="n.cityID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="state">
                            <option value="">账户状态</option>
                            <option value="1">正常</option>
                            <option value="2">停用</option>
                                <option v-for="(index,n) in typelists" v-text="n.value" :value="n.accountType"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="" value="查询">
                        </div>
                    </form>
                </div>
                <div v-if="!prepaymentList.length" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>余额</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                    <th>开通时间</th>
                                    <th>联系人</th>
                                    <th>电话</th>
                                    <th>客情人员</th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr role="row">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="datatable-footer">
                        <page :all="pageall"
                              :cur.sync="pagecur"
                              :page_size.sync="page_size">
                        </page>
                    </div>
                </div>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                    未查询到预付款商户信息！
                </div>

            </div>
        </div>
    </index>
</template>
<style>
    
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import dialog from '../components/dialog.vue'
    export default{
        data(){
            return{
                pagecur:1,
                page_size:15,
                pageall:1,
                subCompanID:"",
                cityID:"",
                type:"",
                state:"",
                subcompanyList:[],
                cityList:[],
                prepaymentList:[]
            }
        },
        methods:{
            //获取预付款商户数据
             getPrepaymentList:function(data){
                this.$http.post('./prepayment/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('prepaymentList', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取分公司数据
            getSubcompany:function(data){
                 this.$http.post('./subcompany/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('subcompanyList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            //获取城市数据
            getCity:function(data){
                 this.$http.post('./city/list',data)
                    .then(function (response) {
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('cityList', response.data.data) : null;
                    }, function (response) {
                        console.log(response);
                    });
            },
            getTwo:function(num){
                if(num.toString().length>=2) return num;
                var str="";
                for(var i=num.toString().length;i<2;i++)
                    str +="0";
                return str + num.toString();
            },
            query: function () {
                // let data=this.data;
                let data={
                        subCompanID:this.subCompanID,
                        cityID:this.cityID,
                        type:this.type,
                        merchantID:this.merchantID,
                        merchantName:this.merchantName,
                        id:this.id,
                        seriesNumber:this.seriesNumber,        
                        phone:this.phone,      
                        activityID:this.activityID,
                        startDate:this.startDate,
                        endDate:this.endDate
                    };
                this.getPrepaymentList(data);
            },
        },
        ready: function () {
            this.getPrepaymentList({});
            this.getSubcompany({});
            this.getCity({});
        },
        components:{
            'datepicker': datepicker,
            'dialog': dialog,
        },
        watch:{
            pagecur:function(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size:function(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        }
    }
</script>