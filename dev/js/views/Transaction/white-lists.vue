<template>
    <index :title="'异常白名单'"
           :ptitle="'交易管理'"
           :hname="'trade-info'"  
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <form class="form-inline manage-form">
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="addWhite" value="添加">
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.subCompanyID">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.type">
                                <option value="">请选择类型</option>
                                <option value="2">活动</option>
                                <option value="1">商户</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="defaultData.status">
                                <option value="">请选择状态</option>
                                <option value="true">正常</option>
                                <option value="false">已失效</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" v-model="defaultData.operationID" placeholder="商户/活动ID"  onKeyUp="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" >
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="defaultData.name" placeholder="商户/活动名">
                        </div>
                        <div class="form-group">
                            <input type="button" class="btn btn-info" @click="initList" value="查询">
                        </div>
                    </form>
                </div>
                <div v-if="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                            <tr role="row">
                                <th>商户/活动ID</th>
                                <th>商户/活动名称</th>
                                <th>分公司</th>
                                <th>有效期 </th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                                <th>申请人</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr role="row" v-for="(index,trlist) in zdlists">
                                <td>{{trlist.operationID }}</td>
                                <td>{{trlist.name }}</td>
                                <td>{{trlist.subCompanyName }}</td>
                                <td>
                                    <template v-if="trlist.validType==1">
                                        {{trlist.startDate | datetimes }}--{{trlist.endDate | datetimes  }}
                                    </template>
                                    <template v-if="trlist.validType==2">{{trlist.startDate | datetimes }}--∞</template>
                                </td>
                                <td>
                                    <template v-if="trlist.status==0">已失效</template>
                                    <template v-if="trlist.status==1">正常</template>
                                </td>
                                <td>{{trlist.remarks }}</td>
                                <td>
                                    <a v-if="trlist.status==1" @click="whiteexpired(trlist.id)" data-toggle="modal" data-target="#modal_waring">失效</a>
                                    <a href="{{origin}}/file/download/{{trlist.certificateID}}">下载</a>
                                </td>
                                <td>{{trlist.createUserName }}</td>
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
                    未找到数据
                </div>
                <validator name="vali">
                    <form novalidate>
                        <div data-backdrop="static"  id="add_white" class="modal fade" style="display: none;">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                        <h5 class="modal-title">添加白名单</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label class="control-label"><i>*</i>类型：</label>
                                            <select class="form-control"  v-model="redata.type"  v-validate:type="['required']">
                                                <option value="2">活动</option>
                                                <option value="1">商户</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label"><i>*</i>ID：</label>
                                            <input style="width: 66%;" v-validate:operationID="['required']" v-model="redata.operationID" class="form-control" type="text" placeholder="商户/活动ID">
                                            <input style="margin-left: 10px;margin-top: -4px;"  type="button" class="btn btn-info" @click="queryId" value="查询">
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">名称：</label>
                                            {{redata.listName}}
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">分公司：</label>
                                            {{redata.subCompanyName}}
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label"><i>*</i>有效期：</label>
                                            <input type="radio" id="one" value="2" v-model="redata.validType" v-validate:isCcb="['required']">
                                            <label style="text-align: left;" for="one">永久</label>
                                            <input type="radio" id="two" value="1" v-model="redata.validType" v-validate:isCcb="['required']">
                                            <label style="text-align: left;" for="two">自定义</label>
                                            <div v-show="redata.validType=='1'" style="padding-left: 75px;">
                                                <input type="text" v-model="redata.startDate" readonly="readonly" class="form-control" style="width: 215px;">至
                                                <datepicker :width="'215px'" :readonly="true" :value.sync="redata.endDate" format="YYYY-MM-DD"></datepicker>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="w28"><i>*</i>上传凭证：</label>
                                            <input style="display:none" type="file" @change="uploads($event)">
                                            <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                            <span v-text="uploadText" v-show="uploadText!=''"></span>
                                        </div>
                                        <div class="form-group">
                                            <label style="position: relative;top: -95px;" class="control-label"><i>*</i>备注：</label>
                                            <textarea rows="5" cols="5" class="form-control" v-model="redata.remarks" v-validate:val2="['required']"></textarea>
                                        </div>
                                        <div class="form-group tc">
                                            <button  type="button" @click="addTrue" class="btn btn-primary">添加</button>
                                        </div>
                                        <div class="form-group tc">
                                            <span v-show="saveerror!=''|| (!$vali.valid&&updataerror)" class="validation-error-label" v-text="saveerror"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </validator>

                <div id="modal_waring" data-backdrop="static" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">你确定失效该账户？</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group tc">
                                    <button type="button" @click="whiteexpiredTrue" class="btn btn-primary">确认</button>
                                    <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </index>
</template>
<style lang="sass" scoped>
    .form-group{
        text-align: left;
    }
    .form-group.tc{
        text-align: center;
    }
    .modal-body .form-control{
        text-align: left;
        width:85%;
        display: inline-block;
    }
    .modal-body label{
        width:13%;
        display: inline-block;
        text-align: right;
    }
    .modal-body label i{
        color:red;
    }
    .modal-body button{
        width:35%;
    }
    .validation-error-label{
        display: inline-block;
    }
</style>
<script>
    import datepicker from '../components/datepicker.vue'
    import model from '../../ajax/Transaction/white_model'
    export default{
        data(){
            this.model =model(this)
            return{
                origin:window.origin,
                pagecur:1,
                page_size:10,
                pageall:1,
                companylists:[],
                defaultData:{
                    'subCompanyID': '',
                    'type': '',
                    'status': '',
                    'operationID': '',
                    'name': '',
                    'pageIndex': 1,
                    'pageSize': 10
                },
                zdlists:[],
                id:'',
                isEnable: 0,
                redata:{
                    id:'',
                    type:1,
                    remarks:'',
                    operationID:'',
                    listName:'',
                    subCompanyName:'',
                    certificateID:'',
                    startDate:'',
                    endDate:'',
                    validType:'2'
                },
                saveerror:'',
                updataerror:false,
                uploadText:'',
                total:0
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.whitedetail(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('zdlists', response.data.data) : null;
                            (response.data.code==0) ? this.$set('pageall', response.data.total) : null;
                        });
            },
            getClist(){
                // *** 请求公司数据
                let data={
                    'type':'ImportUser'
                }
                this.$common_model.getcompany(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('companylists', response.data.data) : null;
                        });
            },
            initList(){
                $('.modal').modal('hide');
                this.getZlists(this.defaultData);
            },
            addWhite(){
                this.redata={
                    id:'',
                    type:1,
                    remarks:'',
                    operationID:'',
                    listName:'',
                    subCompanyName:'',
                    certificateID:'',
                    startDate:'',
                    endDate:'',
                    validType:'2'
                };
                var time = new Date();
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                this.redata.startDate=y+'-'+this.add0(m)+'-'+this.add0(d);
                $('#add_white').modal('show');
            },
            add0(m){return m<10?'0'+m:m },
            startParty(_id, status){
                this._id = _id;
                this.isEnable = status;
            },
            change_status(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let data = {
                    'id': this._id,
                    'status': this.isEnable
                }
                this.model.thirdParty_status(data)
                        .then((res) => {
                                if(res.data.code == 0&&this.isEnable==1){
                                this.initList()
                                dialogs('success','已启用！')
                            }else if(res.data.code == 0&&this.isEnable==0){
                                this.initList()
                                dialogs('success','已停用！')
                            }
                        })
            },
            uploadClick(){
                $('input[type="file"]').val('');
                $('input[type="file"]').click();
            },
            uploads(e){
                if(e.target.value==''&&this.uploadText!=''){
                    return;
                }
                let files=e.target.files[0];
                let vm=this;
                var reader = new FileReader();
                if(!check_upload(files.name)){
                    return;
                }
                reader.readAsDataURL(files);
                reader.onload = function(e){
                    let datas={
                        name:files.name,
                        data:this.result.split(',')[1]
                    }
                    vm.$common_model.upload(datas)
                            .then((response)=>{
                                    if(response.data.code == 0){
                                    vm.redata.certificateID=response.data.data;
                                    vm.uploadText=files.name;
                                    this.updataerror=false;
                                    dialogs('success','上传成功！');
                                }
                            })
                }
            },
            addTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(!this.$vali.valid){
                    this.updataerror=true;
                    this.saveerror='您的信息未填写完整！';
                    return;}
                if(this.redata.listName==''){
                    this.updataerror=true;
                    this.saveerror='请查询是否存在此商户/活动！';
                    return;}
                if(this.redata.certificateID==''){
                    this.updataerror=true;
                    this.saveerror='请上传凭证！';
                    return;}
                if(this.redata.validType=='1'&&this.redata.endDate==''){
                    this.updataerror=true;
                    this.saveerror='请选择有效期！';
                    return;
                }
                if(this.redata.validType=='1'&&this.redata.endDate<this.redata.startDate){
                    this.updataerror=true;
                    this.saveerror='有效期结束日期不得小于开始日期！';
                    return;
                }
                this.updataerror=false;
                this.model.whitesave(this.redata)
                        .then((res) => {
                            if(res.data.code == 0){
                                this.initList()
                                dialogs('success','已添加！')
                            }
                        })
            },
            whiteexpired(_id){
                this.id=_id
            },
            whiteexpiredTrue(){
                this.model.whiteexpired(this.id)
                        .then((res) => {
                                if(res.data.code == 0){
                                this.initList()
                                dialogs('success','已失效！')
                            }
                        })
            },
            queryId(){
                if(this.redata.operationID=='')return;

                if(this.redata.type=='2'){
                    let data={
                        operationID:this.redata.operationID
                    }
                    this.model.queryA(data)
                            .then((res) => {
                                if(res.data.code == 0){
                                    this.redata.listName=res.data.data.name;
                                    this.redata.subCompanyName=res.data.data.subCompanyName ;
                                }
                            })
                }
                else{
                    let data={
                        merchantOperationID:this.redata.operationID
                    }
                    this.model.queryC(data)
                            .then((res) => {
                                if(res.data.code == 0){
                                    this.redata.listName=res.data.data.merchantName;
                                    this.redata.subCompanyName=res.data.data.subCompanyName ;
                                }
                            })
                }
            }
        },
        ready() {
            var vm=this;
            vm.initList();
            vm.getClist();
            $('#add_white').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
                vm.uploadText='';
                vm.redata.certificateID='';
            })
        },
        components:{
            'datepicker': datepicker
        },
        watch:{
            pagecur(){
                this.defaultData.pageIndex=this.pagecur;
                this.initList();
            },
            page_size(){
                this.defaultData.pageSize=this.page_size;
                this.initList();
            }
        }
    }
</script>