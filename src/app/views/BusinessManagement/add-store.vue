<template>
    <index :title="'添加门店'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :p2title="'预付款商户'"
           :h2name="'prepayment-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">

                    <div class="heading-right">
                        <input type="text" class="form-control" v-model="defaultData.backendMerchantCode" placeholder="商户号">
                        <input type="text" class="form-control" v-model="defaultData.backendMerchantName" placeholder="商户简称">
                        <input type="text" class="form-control" v-model="defaultData.backendStoreCode" placeholder="门店号">
                        <input type="text" class="form-control" v-model="defaultData.backendName" placeholder="门店名称">
                        <input type="text" class="form-control" v-model="defaultData.merchantOperationID" placeholder="商盟ID" v-limitnumber="defaultData.merchantOperationID">
                        <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商盟商户名称">
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew">查询</a>
                    </div>
                </div>

                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <div style="max-height:1200px;    overflow: auto;">
                            <table id="table1" class="table datatable-selection-single dataTable no-footer">
                                <thead>
                                <tr role="row">
                                    <th><label><input type="checkbox"  v-model="checkAll" @click="chooseAll">全选</label></th>
                                    <th>商户号</th>
                                    <th>商户简称</th>
                                    <th>门店号</th>
                                    <th>门店名称</th>
                                    <th>商盟ID</th>
                                    <th>商盟商户名称</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td><label><input type="checkbox"  @click="checked(trlist.ischeck,trlist.merchantID)" v-model="trlist.ischeck">{{trlist.merchantID}}</label></td>
                                    <td>{{trlist.backendMerchantCode}}</td>
                                    <td>{{trlist.backendMerchantName}}</td>
                                    <td>{{trlist.backendStoreCode}}</td>
                                    <td>{{trlist.backendName}}</td>
                                    <td>{{trlist.merchantOperationID}}</td>
                                    <td>
                                        <span v-if="!trlist.existInBackend">{{trlist.merchantName}}</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="margin:20px;overflow:hidden">
                            <a style="float:right;margin-left:20px" class="btn btn-info add-top" @click="submit()">确认</a>
                            <a style="float:right" class="btn btn-default"
                               v-link="{'name':'prepayment-store',params:{'id':id,'storeMerchantName':storeName,addStoreCompany:defaultData.companyId}}">取消</a>
                        </div>
                    </div>
                </div>

                <div class="no-list" v-if="!zdlists.length&&firstSearch">
                    未找到数据
                </div>
                <div class="no-list" v-if="!zdlists.length&&!firstSearch">
                    请输入查询条件并查询
                </div>
            </div>
        </div>
    </index>
</template>
<script>
    import model from '../../ajax/BusinessManagement/store_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                firstSearch:false,
                city:[],
                companylists:[],
                id:'',
                storeName:'',
                defaultData:{
                    merchantOperationID:"",
                    companyId:"",
                    merchantName:"",
                    backendMerchantCode:"",
                    backendMerchantName:"",
                    backendStoreCode:"",
                    backendName:"",
                    isStore:0
                },
                zdlists:[],
                merchantList:[],
                checkedLis:[]
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                this.zdlists.map((value)=>{
                    (!value.ischeck)?clength++:null;
                })
                return !clength
            }
        },
        methods: {
            chooseAll(){
                this.checkedLis=[];
                let cloneData=_.cloneDeep(this.zdlists);
                cloneData.map((value)=>{
                    if(this.checkAll){
                        value.ischeck=false;
                    }else {
                        this.checkedLis.push(value.merchantID);
                        value.ischeck = true;
                    }
                })
                this.zdlists=cloneData;
            },
            checked(bool,_id){
                if(!bool){
                    this.checkedLis.push(_id);
                }else{
                    _.remove(this.checkedLis, function(n) {
                        return n==_id;
                    })
                }
            },
            submit() {
                if(this.checkedLis==''){
                    dialogs('info','请选择要添加的门店！')
                    return;
                }
                let data = {
                    'id':this.id,
                    'merchantIDs':[]
                }
                _.map(this.checkedLis,(val)=>{
                    data.merchantIDs.push(val+"");
                })
                this.model.store_add(data).then((response)=>{
                    if(response.data.code == 0){
                        this.initList();
                        dialogs('success','已添加！');
                        this.modal_add = false;
                    }
                });
            },
            // *** 请求账户列表数据
            getZlists(data){
                this.checkedLis=[];
                if(sessionStorage.getItem('isHttpin')==1)return;
                if( !data.merchantOperationID
                    &&!data.merchantName
                    &&!data.backendMerchantCode
                    &&!data.backendMerchantName
                    &&!data.backendStoreCode
                    &&!data.backendName){
                    dialogs('info','至少输入一个查询条件！')
                    return;
                }
                this.$common_model.getmerchant_list(data)
                    .then((response)=>{
                        // *** 判断请求是否成功如若成功则填充数据到模型
                        (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                        (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        this.firstSearch=true;
                    });
            },
            checkNew(){
                this.initList();
            },
            initList(){
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
        },
        ready() {
            (this.$route.params.addStoreId==':addStoreId')?this.id='' :this.id=this.$route.params.addStoreId;
            (this.$route.params.addStoreName==':addStoreName')?this.storeName='' :this.storeName=this.$route.params.addStoreName;
            (this.$route.params.addStoreCompany==':addStoreCompany')?this.defaultData.companyId='' :this.defaultData.companyId=this.$route.params.addStoreCompany;
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.defaultData=back_json.fetchArray(this.$route.path):null;
        }
    }
</script>