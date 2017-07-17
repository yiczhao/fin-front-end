<template>
    <index :title="'开票回款明细'"
           :ptitle="'银行管理'"
           :p2title="'合同管理'"
           :hname="'third-party'"
           :h2name="'contract-management-info'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <select class="form-control" v-model="defaultData.subCompanyID" @change="getcontractNumber(defaultData.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                            <input type="text" class="form-control" v-model="defaultData.thirdPartyAccountName" placeholder="三方名称">
                            <select class="form-control" v-model="defaultData.contractNumber">
                                <option value="">合同编号</option>
                                <option v-for="(index,n) in contractlists" v-text="n.contractNumber" :value="n.contractNumber"></option>
                            </select>
                            <select class="form-control" v-model="defaultData.detailType">
                                <option value="">全部类型</option>
                                <option value="0">开票</option>
                                <option value="1">回款</option>
                            </select>
                        </form>
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="initList" data-ksa="invoiceCollection.search" style="margin-left: -21px;">查询</a>
                    </div>
                </div>
                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table class="table">
                            <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>分公司</th>
                                <th>三方名称</th>
                                <th>时间</th>
                                <th>开票/回款</th>
                                <th>收入</th>
                                <th>支出</th>
                                <th>备注</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{index+1}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.thirdPartyAccountName}}</td>
                                    <td>{{trlist.createTime | datetime}}</td>
                                    <td>
                                        <template v-if="!trlist.detailType">开票</template>
                                        <template v-else>回款</template>
                                    </td>
                                    <td>{{trlist.collectionAmount/100 | currency ''}}</td>
                                    <td>{{trlist.billingAmount/100 | currency ''}}</td>
                                    <td>{{trlist.remarks}}</td>
                                </tr>
                                <tr role="row">
                                    <td></td>
                                    <td>合计：</td><td></td><td></td><td></td>
                                    <td>{{total.collectionAmount/100 | currency ''}}</td>
                                    <td>{{total.billingAmount/100 | currency ''}}</td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="datatable-bottom">
                        <div class="left">
                            <a class="icon-file-excel" style="line-height: 30px;" >Excel导出</a>
                        </div>

                        <div class="right">
                            <page :all="pageall"
                                  :cur.sync="defaultData.pageIndex"
                                  :page_size.sync="defaultData.pageSize">
                            </page>
                        </div>
                    </div>
                </div>
                <div class="no-list" v-else>
                    未找到数据
                </div>
            </div>

        </div>
    </index>
</template>
<style lang="sass" scoped>
    .heading{
        span{
            font-size:16px; display: inline-block; padding: 23px 20px 0;
        }
    }
    .kdialog{
        .form-group{
            label,input,textarea{
                display: inline-block
            }
            label{
                width: 23%;
                text-align: right;
                i{color:red}
            }
            .tlabel{
                position: relative;
                top:-40px
            }
            input,textarea{
                width: 75%;
            }
        }
    }
</style>
<script>
    import model from '../../ajax/ThreeParty/contract_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                origin:window.origin,
                companylists:[],
                contractlists:[],
                defaultData:{
                    detailType:'',
                    contractID:'',
                    thirdPartyAccountName:'',
                    contractNumber:'',
                    subCompanyID:'',
                    pageIndex: 1,
                    pageSize: 10
                },
                zdlists:[],
                total:{},
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                this.model.invoiceCollection(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            if(response.data.code==0){
                                this.$set('zdlists', response.data.data);
                                this.$set('pageall', response.data.total);
                            }
                        })
                this.model.invoiceCollectionSum(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('total', response.data.data) : null;
                    });
            },
            getClist(){
                // *** 请求公司数据
                this.$common_model.getcompany().then((response)=>{
                    // *** 判断请求是否成功如若成功则填充数据到模型
                    if(response.data.code==0){
                        this.$set('companylists', response.data.data)
                    }
                });
            },
            getcontractNumber(_subCompanyID){
                let data={
                    subCompanyID:_subCompanyID
                }
                this.model.getContractNumber(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('contractlists', response.data.data) : null;
                    });
            },
            initList(){
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            }
        },
        ready() {
            var vm=this;
            if(this.$route.params.invoiceCollectionId==':invoiceCollectionId'){
                this.defaultData.contractID='';
                this.defaultData.contractNumber='';
                this.defaultData.thirdPartyAccountName='';
                this.defaultData.subCompanyID='';
            }else{
                this.defaultData.contractID=this.$route.params.invoiceCollectionId;
                this.defaultData.contractNumber=this.$route.params.invoiceCollectionContract;
                this.defaultData.thirdPartyAccountName=this.$route.params.invoiceCollectionName;
                this.defaultData.subCompanyID=this.$route.params.invoiceCollectionsubCompanyID;
                this.getcontractNumber(this.defaultData.subCompanyID);
            }
            this.getClist();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        },
        watch:{
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>