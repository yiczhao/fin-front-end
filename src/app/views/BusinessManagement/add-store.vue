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
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="submit()">添加门店</a>
                    </div>

                    <div class="heading-right">
                        <select class="form-control" v-model="defaultData.subCompanyID" @change="getCity(defaultData.subCompanyID)">
                            <option value="">请选择分公司</option>
                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                        </select>
                        <select class="form-control" v-model="defaultData.cityID">
                            <option value="">全部城市</option>
                            <option v-for="(index,n) in city" v-text="n.name" :value="n.cityID"></option>
                        </select>
                        <input type="text" class="form-control" v-model="defaultData.backendMerchantCode" placeholder="商户号">
                        <input type="text" class="form-control" v-model="defaultData.backendMerchantName" placeholder="商户简称">
                        <input type="text" class="form-control" v-model="defaultData.backendStoreCode" placeholder="门店号">
                        <input type="text" class="form-control" v-model="defaultData.backendStoreName" placeholder="门店名称">
                        <input type="text" class="form-control" v-model="defaultData.merchantOperationID" placeholder="商盟ID" v-limitnumber="defaultData.merchantOperationID">
                        <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商盟商户名称">
                    </div>
                    <div class="heading-middle">
                        <a class="btn btn-info add-top" v-on:click="checkNew">查询</a>
                    </div>
                </div>

                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
                                    <th><label><input type="checkbox"  v-model="checkAll" @click="chooseAll">全选</label></th>
                                    <th>分公司</th>
                                    <th>城市</th>
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
                                <td><label><input type="checkbox"  @click="checked(trlist.ischeck,trlist.id)" v-model="trlist.ischeck">{{trlist.id}}</label></td>
                                <td>{{trlist.subCompanyName}}</td>
                                <td>{{trlist.cityName}}</td>
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

                    <div class="datatable-bottom">
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
<script>
    import model from '../../ajax/BusinessManagement/store_model'
    export default{
        data(){
            this.model =model(this)
            return{
                pageall:1,
                city:[],
                companylists:[],
                id:'',
                defaultData:{
                    subCompanyID: '',
                    cityID: '',
                    merchantOperationID:"",
                    merchantName:"",
                    backendMerchantCode:"",
                    backendMerchantName:"",
                    backendStoreCode:"",
                    backendStoreName:"",
                    pageIndex: 1,
                    pageSize: 10
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
                        this.checkedLis.push(value.id);
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
                    this.model.prepayment_store(data)
                            .then((response)=>{
                                // *** 判断请求是否成功如若成功则填充数据到模型
                                (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                                (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                            });
            },
            getClist(){
                // *** 请求公司数据
                this.$common_model.getcompany()
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        });
            },
            //获取城市数据
            getCity(_id){
                this.defaultData.cityID='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('city', response.data.data) : null;
                        });
            },
            checkNew(){
                this.defaultData.pageIndex=1;
                this.initList();
            },
            initList(){
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
        },
        ready() {
            this.getClist();
            this.getCity();
            (this.$route.params.addStoreId==':addStoreId')?this.id='' :this.id=this.$route.params.addStoreId;
            (back_json.isback&&back_json.fetchArray(this.$route.path)!='')?this.defaultData=back_json.fetchArray(this.$route.path):null;
            this.initList();
        },
        watch:{
            'defaultData.pageSize+defaultData.pageIndex'(){
                this.initList();
            }
        }
    }
</script>