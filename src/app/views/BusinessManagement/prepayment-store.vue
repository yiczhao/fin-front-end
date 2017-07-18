<template>
    <index :title="'门店管理'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :p2title="'预付款商户'"
           :h2name="'prepayment-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add addd-top" @click="addUser" data-ksa="advance_payment_merchant_store_manage.add">添加</a>
                    </div>
                </div>

                <div style="margin-bottom: 20px;padding-left: 20px;font-size: 16px;">
                    <span>预付款账户名：{{merchantName}}</span>
                </div>

                <div v-show="zdlists.length>0" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
                                    <th>商户号</th>
                                    <th>商户简称</th>
                                    <th>门店号</th>
                                    <th>门店名称</th>
                                    <th>商盟ID</th>
                                    <th>商盟商户名称</th>
                                    <th>操作</th>
                                    <th>更新时间 </th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                <td>{{trlist.backendMerchantCode}}</td>
                                <td>{{trlist.backendMerchantName}}</td>
                                <td>{{trlist.backendStoreCode}}</td>
                                <td>{{trlist.backendName}}</td>
                                <td>{{trlist.merchantOperationID}}</td>
                                <td>{{trlist.merchantName}}</td>
                                <td><a @click="delstore(trlist.id)" data-ksa="advance_payment_merchant_store_manage.delete">删除</a></td>
                                <td>{{trlist.updateAt | datetime}}</td>
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

                <!--添加商户dialog-->
                <content-dialog
                        :show.sync="modal_add" :is-button="false" :type.sync="'infos'"
                        :title.sync="'添加商户'" 
                        >
                        <div class="addDialogs">
                            <div class="addtop">
                                <div class="col-md-3">
                                    <select class="form-control" v-model="shdata.companyId" @change="getCity(shdata.companyId)">
                                        <option value="">全部分公司</option>
                                        <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-control" v-model="shdata.cityId">
                                        <option value="">全部城市</option>
                                        <option v-for="(index,n) in city" v-text="n.name" :value="n.cityID"></option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" v-model="shdata.merchantOperationID" placeholder="商户ID" v-limitnumber="shdata.merchantOperationID">
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" v-model="shdata.merchantName" placeholder="商户名">
                                </div>
                                <div class="col-md-2">
                                    <input type="button" class="btn btn-info" @click="searchDigest" value="查询">
                                </div>
                            </div>
                            <div class="addbottom clearfix">
                                <div style="text-indent: 76%">已选择：</div>
                                <div class="left">
                                    <table v-if="merchantList.length>0"
                                           class="table">
                                        <thead>
                                        <tr role="row">
                                            <th><input type="checkbox" v-model="checkAll" @click="chooseAll"/>全选</th>
                                            <th>分公司</th>
                                            <th>城市</th>
                                            <th>商户名</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(index,merchant) in merchantList" v-show="merchant.isAdd">
                                            <td>
                                                <input type="checkbox" @click="checked(merchant)" v-model="merchant.ischeck"/>
                                                {{index+1}}
                                            </td>
                                            <td>{{merchant.subCompanyName}}</td>
                                            <td>{{merchant.cityName}}</td>
                                            <td>{{merchant.merchantName}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <span v-if="!merchantList.length>0 && firstAdd">
                                        未查询到商户数据！
                                    </span>
                                </div>
                                <div class="center">
                                    <input type="button" class="btn btn-info" @click="addTrue" value="添加">
                                    <input type="button" class="btn btn-info" @click="delTrue" value="删除">
                                    <input type="button" class="btn btn-info" @click="submit" value="确认">
                                </div>
                                <div class="right">
                                    <ul>
                                        <li v-for="n in checkedLis" @click="checkLi($event,n)">{{n.merchantName}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </content-dialog>

                <!-- 删除 -->
                <content-dialog
                        :show.sync="modal_waring" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'你确定删除该商户？'" @kok="del_true" @kcancel="modal_waring = false"
                        >
                </content-dialog>

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
                modal_add: false,
                modal_waring: false,
                pageall:1,
                merchantName:'',
                city:[],
                companylists:[],
                defaultData:{
                    'id': '',
                    'merchantOperationID': '',
                    'merchantName': '',
                    'pageIndex': 1,
                    'pageSize': 10
                },
                shdata:{
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isStore':'0'
                },
                zdlists:[],
                merchantList:[],
                checkedIds: [],
                checkedLis: [],
                removeIds: [],
                id:'',
                firstAdd:false
            }
        },
        computed:{
            checkAll(){
                let clength=0;
                this.merchantList.map((value)=>{
                    (!value.ischeck)?clength++:null;
                })
                return !clength
            }
        },
        methods: {
            checkLi(e,n){
                if(!e.target.classList.length){
                    this.removeIds.push(n.merchantID);
                    e.target.classList.add('check-li');
                }
                else{
                    _.remove(this.removeIds, function(e) {
                        return e==n.merchantID;
                    })
                    e.target.classList.remove('check-li');
                }
            },
            addTrue() {
                if(this.checkedIds==''){
                    dialogs('info','请勾选要添加的商户！');
                    return;
                }
                this.$set('checkedLis',this.checkedIds);
                let data=_.cloneDeep(this.merchantList);
                _.map(data,(val)=>{
                    this.checkedLis.map((value)=>{
                        if(val.merchantID==value.merchantID){
                            val.isAdd=false;
                        }
                    })
                })
                this.$set('merchantList',data);
                this.checkedIds=[];
            },
            delTrue() {
                if(this.removeIds==''){
                    dialogs('info','请选择要删除的商户！');
                    return;
                }
                let dataLi=_.cloneDeep(this.checkedLis);
                _.map(this.removeIds,(val)=>{
                    _.remove(dataLi, function(e) {
                        return e.merchantID==val;
                    })
                })
                this.$set('checkedLis',dataLi);
                let data=_.cloneDeep(this.merchantList);
                _.map(data,(val)=>{
                    this.removeIds.map((value)=>{
                        if(val.merchantID==value){
                            val.isAdd=true;
                            val.ischeck=false;
                        }
                    })
                })
                this.$set('merchantList',data);
                this.removeIds=[];
            },
            submit() {
                if(this.checkedLis==''){
                    return;
                }
                let data = {
                    'id':this.defaultData.id,
                    'merchantIDs':[]
                }
                _.map(this.checkedLis,(val)=>{
                    data.merchantIDs.push(val.merchantID+"");
                })
                this.model.store_add(data).then((response)=>{
                    if(response.data.code == 0){
                        this.initList();
                        dialogs('success','已添加！');
                        this.modal_add = false;
                    }
                });
            },
            chooseAll(){
                this.checkedIds=[];
                let cloneData=_.cloneDeep(this.merchantList);
                cloneData.map((value)=>{
                    if(this.checkAll){
                        value.ischeck=false;
                    }else{
                        this.checkedIds.push(value);
                        value.ischeck=true;
                    }
                })
                this.merchantList=cloneData;
            },
            checked(n){
                if(!n.ischeck){
                    this.checkedIds.push(n);
                }else{
                    _.remove(this.checkedIds, function(e) {
                        return e.merchantID==n.merchantID;
                    })
                }
            },
            // *** 请求账户列表数据
            getZlists(data){
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
                this.shdata.cityId='';
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
            clearUl(){
                this.merchantList=[];
                this.firstAdd=true;
                this.merchantList=[];
                this.checkedIds=[];
                this.checkedLis=[];
            },
            addUser(){
                this.shdata={
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isStore':'0'
                };
                this.clearUl();
                this.getCity();
                this.firstAdd=false;
                this.modal_add = true;
            },
            searchDigest(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.clearUl();
                this.$common_model.getmerchant_list(this.shdata)
                        .then((response)=>{
                            (response.data.code==0) ? this.$set('merchantList', response.data.data) : null;
                            _.map(this.merchantList, function(value) {
                                value.isAdd=true;
                            })
                        })
            },
            delstore(_id){
                this.id=_id;
                this.modal_waring = true;
            },
            del_true(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.delstore(this.id)
                        .then((res)=> {
                            if(res.data.code==0){
                                dialogs('success','已删除');
                                this.initList();
                                this.modal_waring = false;
                            }
                        })
            }
        },
        ready() {
            var vm=this;
            (vm.$route.params.id!=':id')?vm.defaultData.id=vm.$route.params.id:null;
            (vm.$route.params.storeMerchantName!=':storeMerchantName')?vm.merchantName=vm.$route.params.storeMerchantName:null;
            vm.getClist();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
        },
        watch:{
            'defaultData.pageSize+defaultData.pageIndex'(){
                this.initList();
            }
        }
    }
</script>