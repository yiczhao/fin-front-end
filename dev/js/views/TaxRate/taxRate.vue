<template>
    <index :title="'税率管理'"
           :ptitle="'税率列表'"
           :hname="'taxRate'"
           :isshow="'isshow'">

        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div v-if="taxRateList.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"> <!--v-if taxRateList.length>0-->
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>编号</th>
                                <th>分公司</th>
                                <th>纳税类型</th>
                                <th>当前税率</th>
                                <th>操作</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trList) in taxRateList">
                                <td>{{trList.id}}</td>
                                <td>{{trList.subCompanyName}}</td>
                                <td>
                                    <template v-if="trList.payTaxType==1">小规模纳税人</template>
                                    <template v-if="trList.payTaxType==2">一般纳税人</template>
                                </td>
                                <td>{{trList.taxRate}}</td>
                                <td><a data-ksa="" v-link="">操作</a></td>
                                <td>{{trList.remarks}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-footer">
                        <page :all="pageall"
                              :cur.sync="defaultData.pageIndex"
                              :page_size.sync="defaultData.pageSize">
                        </page>
                    </div>
                </div>
                <div style="padding: 30px;font-size: 16px;text-align: center" v-else>
                    <table id="table2" class="table datatable-selection-single dataTable no-footer">
                        <thead>
                        <tr role="row">
                            <th>编号</th>
                            <th>分公司</th>
                            <th>纳税类型</th>
                            <th>当前税率</th>
                            <th>操作</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>未找到数据</tr>
                        </tbody>
                    </table>
                </div>

                <!--编辑税率dialog-->
                <!--<div data-backdrop="static"  id="modal_taxRate" class="modal fade" style="display: none;">-->
                    <!--<div class="modal-dialog">-->
                        <!--<div class="modal-content">-->
                            <!--<div class="modal-header">-->
                                <!--<button type="button" class="close" data-dismiss="modal">×</button>-->
                                <!--<h5 class="modal-title">编辑税率</h5>-->
                            <!--</div>-->
                            <!--<div class="modal-body">-->
                                <!--<div class="addtop">-->
                                    <!--<div class="col-md-3">-->
                                        <!--<select class="form-control" v-model="shdata.subCompanyID" @change="getshCity(shdata.subCompanyID)">-->
                                            <!--<option value="">全部分公司</option>-->
                                            <!--<option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                    <!--<div class="col-md-3">-->
                                        <!--<select class="form-control" v-model="shdata.cityID">-->
                                            <!--<option value="">全部城市</option>-->
                                            <!--<option v-for="(index,n) in shcity" v-text="n.name" :value="n.cityID"></option>-->
                                        <!--</select>-->
                                    <!--</div>-->
                                    <!--<div class="col-md-3">-->
                                        <!--<input type="text" class="form-control" v-model="shdata.accountName" placeholder="名称">-->
                                    <!--</div>-->
                                    <!--<div class="col-md-3">-->
                                        <!--<input type="button" class="btn btn-info" @click="searchDigest" value="查询">-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="addbottom">-->
                                    <!--<div class="col-md-12">-->
                                        <!--<table v-if="xhlist.length>0" class="table datatable-selection-single dataTable no-footer">-->
                                            <!--<thead>-->
                                            <!--<tr role="row">-->
                                                <!--<th></th>-->
                                                <!--<th>分公司</th>-->
                                                <!--<th>城市</th>-->
                                                <!--<th>第三方名称</th>-->
                                                <!--<th>操作</th>-->
                                            <!--</tr>-->
                                            <!--</thead>-->
                                            <!--<tbody>-->
                                            <!--<tr role="row" v-for="n in xhlist">-->
                                                <!--<td>{{$index+1}}</td>-->
                                                <!--<td>{{n.subCompanyName}}</td>-->
                                                <!--<td>{{n.cityName}}</td>-->
                                                <!--<td>{{n.accountName}}</td>-->
                                                <!--<td><a @click="checkTrue(n.id)">选择</a></td>-->
                                            <!--</tr>-->
                                            <!--</tbody>-->
                                        <!--</table>-->
                                        <!--<span v-if="firstAdd && !xhlist.length>0">-->
                                            <!--无可添加数据-->
                                        <!--</span>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>

    </index>
</template>

<script>
    import model from '../../ajax/Activity/taxRate_model'
    export default{
        data(){
            this.model = model(this)
            return{
                pageall:1,
                defaultData:{
                    'id':'',
                    'subCompanyName':'',
                    'payTaxType':'',
                    'taxRate':'',
                    'remarks':'',
                    'pageIndex': 1,
                    'pageSize': 10

                },
                taxRateList:[]
            }

        },
        methods:{
            /*请求税率管理列表*/
            getTaxRateList(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.taxRate_list(data)
                        .then((response) => {
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code == 0){
                        this.$set('taxRateList', response.data.data)
                    }
                });
            },
            initList(){
                $('.modal').modal('hide');
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getTaxRateList(this.defaultData);
            }

        },
        ready() {
            var vm=this;
            (vm.$route.params.id!=':id')?vm.defaultData.id=vm.$route.params.id:null;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        },
        watch:{
            'defaultData.pageIndex + defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>
