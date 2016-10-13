<template>
    <index :title="'税率管理'"
           :ptitle="'活动管理'"
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
                                <td>{{trList.subCompanyID}}</td>
                                <td>{{trList.subCompanyName}}</td>
                                <td>
                                    <template v-if="trList.payTaxType==1">{{'小规模纳税人（/1.03）'}}</template>
                                    <template v-if="trList.payTaxType==2">{{'一般纳税人（/1.06）'}}</template>
                                </td>
                                <td>{{trList.taxRate}}</td>
                                <td><a @click="editDetail(trList.subCompanyID, trList.subCompanyName)" data-ksa="">编辑</a></td>
                                <td>{{trList.remarks}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <page :all="pageall"
                          :cur.sync="defaultData.pageIndex"
                          :page_size.sync="defaultData.pageSize">
                    </page>
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
                <content-dialog
                        :show.sync="show" :is-cancel="true" :type.sync="'infos'"
                        :title.sync="'编辑税率'" @kok="save" @kcancel="show = false"
                >
                    <div class="dialog-row">
                        <label class="control-label">分公司</label>
                        <label>{{editDialog.subCompany.subCompanyName}}</label>
                    </div>
                    <div class="dialog-row">
                        <label class="control-label"><i>*</i>税率月份</label>
                        <select class="form-control" v-model="currentYM">
                            <option v-for="n in currentList" :value="n">{{n}}</option>
                        </select>
                    </div>
                    <div class="dialog-row">
                        <label class="control-label"><i>*</i>纳税类型</label>
                        <input type="radio" id="tinyTaxPayer" value="1" v-model="payTaxType">
                        <label for="tinyTaxPayer">小规模纳税人（/1.03）</label>
                        <input type="radio" id="normalTaxPayer" value="2" v-model="payTaxType">
                        <label for="normalTaxPayer"> 一般纳税人（/1.06）</label>
                    </div>
                    <div class="dialog-row">
                        <label class="control-label"><i>*</i>税率</label>
                        <input class="form-control w350" type="text" placeholder="主税率和附加税" v-model="editDialog.editData.taxRate" v-limitprice="editDialog.editData.taxRate"><span>%</span>
                    </div>
                    <div class="dialog-row">
                        <label class="control-label posre"><i>*</i>备注：</label>
                        <textarea rows="5" cols="5" class="form-control" v-model="editDialog.editData.remarks"></textarea>
                    </div>
                </content-dialog>
            </div>
        </div>

    </index>
</template>
<style lang="sass" scope>
    .dialog-row{
        margin-bottom: 10px;
        padding-left: 10px;
        input,textarea,select {
            display: inline-block;
        }
        .w350{
            width: 350px;
        }
        label{
            display: inline-block;
            text-align: right;
            i{
                color:red;
            }
        }
        .posre{
            position: relative;
            top: -95px;
        }
        .control-label{
            width: 60px;
            margin-right: 10px;
        }
        textarea,select{
            width: 350px;
        }
        .error-input{
            border-color: #F44336;
        }
    }
    .kdialog__btnwrap{
        padding-top: 0
    }
</style>
<script>
    import model from '../../ajax/Activity/taxRate_model'
    export default{
        data(){
            this.model = model(this)
            return{
                pageall:1,
                first:1,
                currentYM:'',
                taxRateList:[],
                currentList:[],
                defaultData:{
                    'id':'',
                    'subCompanyName':'',
                    'payTaxType':'',
                    'taxRate':'',
                    'remarks':'',
                    'effectiveYear':'',
                    'effectiveMonth':'',
                    'rateDate':'',
                    'pageIndex': 1,
                    'pageSize': 10

                },
                editDialog: {
                    subCompany: {
                        subCompanyID: '',
                        subCompanyName: ''
                    },
                    editData: {
                        effectiveYear: '',
                        effectiveMonth: '',
                        taxRate: '',
                        remarks: ''
                    },
                },
                payTaxType:'1',
                show:false
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
                        this.$set('taxRateList', response.data.data);
                        this.$set('pageall', response.data.total);
                        this.defaultData.rateDate = this.defaultData.effectiveYear+'-'+this.defaultData.effectiveMonth;
                    }
                });
            },
            formateDate(date){
                if(date instanceof Date){
                    return date.getFullYear() + "-" + (date.getMonth() + 1);
                } else {
                    return "Error Date";
                }
            },
            getcurrentList(){
                let data=[];
                let date = new Date();
                for(var i = 0;i < 6; i++){
                    data[i]=this.formateDate(date);
                    date.setMonth(date.getMonth() - 1);
                }
                this.currentList=data;
            },
            editDetail(_subcompanyID, _subCompanyName){
                this.getcurrentList();
                this.model.editDetail(_subcompanyID).then((response) => {
                // *** 判断请求是否成功如若成功则填充数据到模型
                    this.editDialog.subCompany.subCompanyID = _subcompanyID;
                    this.editDialog.subCompany.subCompanyName = _subCompanyName;
                    if(response.data.code == 0){
                        let responseData = response.data.data;
                        if(responseData.effectiveMonth != null && responseData.effectiveYear != null){
                            this.$set('editDialog.editData', response.data.data);
                            this.currentYM = this.editDialog.editData.effectiveYear+'-'+this.editDialog.editData.effectiveMonth;
                        }else{
                            this.$set('editDialog.editData', "");
                        }
                    this.show=true;
                }
            })},
            editInfo(){
                let data = {
                    'subCompanyID':this.editDialog.subCompany.subCompanyID,
                    'effectiveYear':this.currentYM.split('-')[0],
                    'effectiveMonth':this.currentYM.split('-')[1]
                }
                this.model.editInfo(data).then((response) => {
                    if(response.data.code == 0){
                    let responseData = response.data.data;
                        if(typeof(responseData) != "undefined"){
                            this.$set('editDialog.editData', responseData);
                            this.currentYM = this.editDialog.editData.effectiveYear+'-'+this.editDialog.editData.effectiveMonth;
                        }else{
                            this.$set('editDialog.editData', "");
                        }

                }
                });

            },
            save(){
                let data = {
                    'subCompanyID':this.editDialog.subCompany.subCompanyID,
                    'effectiveYear':this.currentYM.split('-')[0],
                    'effectiveMonth':this.currentYM.split('-')[1],
                    'payTaxType':this.payTaxType,
                    'taxRate':this.editDialog.editData.taxRate,
                    'remarks':this.editDialog.editData.remarks
                }
                let num=0;
                _.map(data,(value)=>{
                    (typeof value=='undefined'||value=='')?num++:null;
                })
                if(num>0){
                    dialogs('info','请填写所有必填项!');
                    return
                }
                this.model.editSave(data).then((response) => {
                    if(response.data.code == 0){
                        dialogs();
                        this.initList();
                    }
                });
            },
            initList(){
                this.show=false;
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getTaxRateList(this.defaultData);
            }

        },
        ready() {
            var vm=this;
            (vm.$route.params.id!=':id')?vm.defaultData.id=vm.$route.params.id:null;
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            this.initList();
        },
        watch:{
            'currentYM'(){
                this.first==1?this.first++:this.editInfo();
            },
            'defaultData.pageIndex + defaultData.pageSize'(){
                this.initList();
            }
        }

    }
</script>
