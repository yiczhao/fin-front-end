<template>
    <index :title="'额度采购'"
           :ptitle="'商户管理'"
           :hname="'business-lists'"
           :isshow="'isshow'">
        <div class="content" slot="content">
            <div class="panel panel-flat">
                <div class="heading">
                    <div class="heading-left">
                        <a class="btn btn-add add-top" @click="addUser" data-ksa="limit_purchase_merchant_manage.add">添加</a>
                    </div>

                    <div class="heading-right">
                        <form class="form-inline manage-form">
                            <input type="number" class="form-control" v-model="defaultData.merchantOperationID" placeholder="商户ID" v-limitnumber="defaultData.merchantOperationID">

                            <input type="text" class="form-control" v-model="defaultData.merchantName" placeholder="商户名">

                            <select class="form-control" v-model="defaultData.subCompanyID" @change="getCity(defaultData.subCompanyID)">
                                <option value="">全部分公司</option>
                                <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                            </select>

                            <select class="form-control" v-model="defaultData.cityID">
                                <option value="">全部城市</option>
                                <option v-for="(index,n) in city" v-text="n.name" :value="n.cityID"></option>
                            </select>

                            <select class="form-control" v-model="defaultData.isAutoPay">
                                <option value="">自动划付状态</option>
                                <option value="1">开启</option>
                                <option value="0">关闭</option>
                            </select>

                            <select class="form-control" v-model="defaultData.status">
                                <option value="">账户状态</option>
                                <option value="1">正常</option>
                                <option value="0">停用</option>
                            </select>

                            <input type="number" class="form-control" v-model="defaultData.cycleStart" placeholder="循环次数">
                            -
                            <input type="number" class="form-control" v-model="defaultData.cycleEnd" placeholder="循环次数">
                        </form>
                    </div>

                    <div class="heading-middle">
                        <a class="btn btn-info add-top" @click="initList" data-ksa="limit_purchase_merchant_manage.search">查询</a>
                    </div>
                </div>

                <div v-show="zdlists.length>0" id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                    <div class="datatable-scroll">
                        <table id="table1" class="table datatable-selection-single dataTable no-footer">
                            <thead>
                                <tr role="row">
                                    <th>商户ID</th>
                                    <th>商户名称</th>
                                    <th>分公司</th>
                                    <th>城市</th>
                                    <th>总额度</th>
                                    <th>总本金</th>
                                    <th>使用额度</th>
                                    <th>使用比(%) </th>
                                    <th>剩余额度</th>
                                    <th>循环次数</th>
                                    <th>首次充值时间</th>
                                    <th>抵扣方式</th>
                                    <th>自动划付</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                    <th>消化商户 </th>
                                    <th>联系人</th>
                                    <th>电话</th>
                                    <th>工作人员</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row" v-for="(index,trlist) in zdlists" v-bind:class="{'odd':(index%2==0)}">
                                    <td>{{trlist.merchantOperationID}}</td>
                                    <td>{{trlist.merchantName}}</td>
                                    <td>{{trlist.subCompanyName}}</td>
                                    <td>{{trlist.cityName}}</td>
                                    <td>{{trlist.totalLimit/100 | currency ''}}</td>
                                    <td>{{trlist.totalPrincipal/100 | currency '' }} </td>
                                    <td>{{trlist.usedLimit/100 | currency '' }} </td>
                                    <td>{{trlist.usedLimitPercentage}}</td>
                                    <td>{{trlist.balanceLimit/100 | currency ''}}</td>
                                    <td>{{trlist.cycleNumber}}</td>
                                    <td>{{trlist.firstRechargeTime | datetime}}</td>
                                    <td>
                                        <template v-if="trlist.discountType==1">全单</template>
                                        <template v-if="trlist.discountType==2">可打折</template>
                                    </td>
                                    <td>
                                        <template v-if="trlist.isAutoPay==0">关闭</template>
                                        <template v-if="trlist.isAutoPay==1">开启</template>
                                    </td>
                                    <td>
                                        <template v-if="trlist.status==0">停用</template>
                                        <template v-else>正常</template>
                                    </td>
                                    <td>
                                        <a @click="updateNew(trlist.id)" data-ksa="limit_purchase_merchant_manage.update">编辑</a>
                                        <a data-ksa="limit_purchase_account_manage.detail" v-link="{'name':'limitaccount-info',params:{'limitPurchaseMerchantInfoID':trlist.id,'accountName':trlist.merchantName}}">明细</a>
                                        <template v-if="trlist.status==0"><a data-toggle="modal" data-target="#modal_waring" @click="changeDiscount(trlist.id,1)" data-ksa="limit_purchase_merchant_manage.enable">启用</a></template>
                                        <a data-ksa="limit_purchase_account_manage.search" v-link="{'name':'limitaccount-management',params:{'limitPurchaseMerchantInfoID':trlist.id,'accountName':trlist.merchantName}}">账户</a>
                                    </td>
                                    <td><a @click="seexh(trlist.id,true)" data-ksa="limit_purchase_merchant_manage.search_digest">查看</a></td>
                                    <td>{{trlist.contactsPerson}}</td>
                                    <td>{{trlist.contactsPhone}}</td>
                                    <td>{{trlist.servicePerson}}</td>
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
                <div class="nums" v-show="zdlists.length>0">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <td rowspan="4">
                                <span>合计： </span>
                            </td>
                            <td>
                                <span>总额度:</span>
                                <span>{{nums.totalLimit/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>总本金:</span>
                                <span>{{nums.totalPrincipal/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>使用额度:</span>
                                <span>{{nums.usedLimit/100 | currency ''}}</span>
                            </td>
                            <td>
                                <span>剩余额度:</span>
                                <span>{{nums.balanceLimit/100 | currency ''}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <!--编辑账户dialog-->
                <validator name="vali">
                    <form novalidate>
                <div data-backdrop="static" id="modal_update" class="modal fade modal_update" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">编辑账户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="modal-body member_rules_modal-body">
                                    <div class="form-group">
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>抵扣方式：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <select class="form-control"  v-validate:discountType="['required']" v-model="updateList.discountType">
                                                <option value="1">全单</option>
                                                <option value="2">可打折</option>
                                            </select>
                                        </div>
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>自动划付：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="radio" id="one" name="fruit" v-validate:val2="['required']" value="1" v-model="updateList.isAutoPay">
                                            <label class="w28" for="one">开启</label>
                                            <input type="radio" id="two" name="fruit" v-validate:val2  value="0" v-model="updateList.isAutoPay">
                                            <label class="w28" for="two">关闭</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>单笔采购额度：</label>
                                        </div>
                                        <div class="col-md-3">
                                             <input v-validate:val3="['required']" class="form-control" type="text" v-model="updateList.singlePurchaseLimit">
                                        </div>
                                        <div class="col-md-1">
                                            元
                                        </div>
                                        <div class="pull-left">
                                            <label class="w28" ><i>*</i>单笔采购本金：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input v-validate:val4="['required']" class="form-control" type="text" v-model="updateList.singlePurchasePrincipal">
                                        </div>
                                        <div class="pull-left">
                                            元
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" @click="addUser2" class="btn">添加消化账户</button>
                                    </div>
                                    <table class="table" style="border: 1px solid #ccc;">
                                        <thead>
                                        <tr role="row">
                                            <th>商户ID</th>
                                            <th>商户名称</th>
                                            <th>分公司</th>
                                            <th>城市</th>
                                            <th>开始时间</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-if="seexhList.length>0" v-for="n in seexhList" role="row">
                                            <td class="merchantIds">{{n.merchantOperationID}}</td>
                                            <td>{{n.merchantName}}</td>
                                            <td>{{n.subCompanyName}}</td>
                                            <td>{{n.cityName}}</td>
                                            <td>{{n.startDate|datetime}}</td>
                                            <th><a href="javascript:void(0)" @click="delxh(2,$event)">删除</a></th>
                                        </tr>
                                        <tr v-if="!seexhList.length>0">
                                            <td colspan="7" valign="center">该账户没有消化商户</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="form-group" style="padding-top: 25px;">
                                        <div class="pull-left">
                                            <label class="w28"><i>*</i>上传凭证：</label>
                                        </div>
                                        <div class="pull-left" style="margin-right: 10px" >
                                            <input type="file" style="display: none" @change="uploads($event)" value="">
                                            <a href="javascript:void(0)" class="btn btn-primary" @click="uploadClick">上传凭证</a>
                                            <span v-text="uploadText" v-show="uploadText!=''"></span>
                                        </div>
                                        <div class="pull-left">
                                            <label for="tarea" class="w28"><i>*</i>备注：</label>
                                        </div>
                                        <div class="col-md-3">
                                            <textarea class="form-control" v-validate:val5="['required']" width="70%" v-model="updateList.remarks" value="updateList.remarks"></textarea>
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" @click="submitUpdate" class="btn btn-primary">保存</button>
                                        </div>
                                        <div class="pull-left">
                                            <span v-show="saveerror!=''|| $vali.invalid" class="validation-error-label" v-text="saveerror"></span>
                                        </div>
                                    </div>
                                    <div>历史记录：</div>
                                    <div style="max-height:200px;overflow: auto;border: 1px solid #ccc;">
                                         <table class="table"  v-if="historyList.length>0">
                                            <thead>
                                                <tr role="row">
                                                    <th>ID</th>
                                                    <th>账户信息</th>
                                                    <th>消化商户</th>
                                                    <th>生效时间</th>
                                                    <th>更新人</th>
                                                    <th>变更凭证</th>
                                                    <th>更新备注</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr role="row" v-for="n in historyList">
                                                        <td>{{$index+1}}</td>
                                                        <td>
                                                            <p>抵扣方式：
                                                                <template v-if="n.discountType==1">全单</template>
                                                                <template v-if="n.discountType==2">可打折</template>
                                                            </p>
                                                            <p>自动划付：
                                                                <template v-if="n.isAutoPay==0">关闭</template>
                                                                <template v-if="n.isAutoPay==1">开启</template>
                                                            </p>
                                                            <p>单笔采购额度：{{n.singlePurchaseLimit}}元</p>
                                                            <p>单笔采购额度：{{n.singlePurchasePrincipal}}元</p>
                                                        </td>
                                                        <td><a href="javascript:void(0)" @click="seehistoryxh(n.limitPurchaseMerchantConfigID)">查看</a></td>
                                                        <td>{{n.startDate | datetime}}--{{n.endDate | datetime}}</td>
                                                        <td>{{n.updateBy}}</td>
                                                        <td><a v-if="n.certificateID!=''" href="{{origin}}/file/download/{{n.certificateID}}" >下载</a></td>
                                                        <td>{{n.remarks}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div v-if="!historyList.length>0" style="padding: 15px;font-size: 15px">
                                            无历史记录
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                </div>
                    </form>
                </validator>
                <!--添加商户dialog-->
                <div data-backdrop="static"  id="modal_add" class="modal fade" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title" v-text="addTitle"></h5>
                            </div>
                            <div class="modal-body">
                                <div class="addtop">
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="shdata.companyId" @change="getxhCity(shdata.companyId)">
                                            <option value="">全部分公司</option>
                                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="shdata.cityId">
                                            <option value="">全部城市</option>
                                            <option v-for="(index,n) in xhcity" v-text="n.name" :value="n.cityId"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="shdata.merchantOperationID" placeholder="商户ID" v-limitnumber="shdata.merchantOperationID">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="shdata.merchantName" placeholder="商户名">
                                    </div>
                                    <div class="col-md-2">
                                        <a class="btn btn-info" @click="searchDigest">查询</a>
                                    </div>
                                </div>
                                <div class="addbottom">
                                    <div style="text-indent: 68%">已选择：</div>
                                    <div class="col-md-7">
                                        <table v-if="xhlist.length>0" class="table datatable-selection-single dataTable no-footer">
                                            <thead>
                                            <tr role="row">
                                                <th><label><input @click="allCkb($event)" type="checkbox">全选</label></th>
                                                <th>分公司</th>
                                                <th>城市</th>
                                                <th>商户名</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr role="row" v-for="n in xhlist">
                                                <td>
                                                    <label>
                                                        <input :value="n.merchantID"
                                                               :subCompanyName="n.subCompanyName"
                                                               :cityName="n.cityName"
                                                               :merchantName="n.merchantName"
                                                               :startDate="n.startDate"
                                                               type="checkbox">{{$index+1}}
                                                    </label>
                                                </td>
                                                <td>{{n.subCompanyName}}</td>
                                                <td>{{n.cityName}}</td>
                                                <td>{{n.merchantName}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span  v-if="firstAdd && !xhlist.length>0">
                                            无可添加数据
                                        </span>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="button" class="btn btn-info" @click="addTrue($event)" value="添加">
                                        <input type="button" class="btn btn-info" @click="delTrue($event)" value="删除">
                                        <input v-if="addTitle=='添加商户'" type="button" class="btn btn-info" @click="submitTrue($event)" value="确认">
                                        <input v-else type="button" class="btn btn-info" @click="submitTrue2($event)" value="确认">
                                    </div>
                                    <div class="col-md-4">
                                        <ul></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="modal_waring" data-backdrop="static" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 v-if="isEnable==1" class="modal-title">你确定启用该账户？</h5>
                                <h5 v-if="isEnable==0" class="modal-title">你确定停用该账户？</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group tc">
                                    <button v-if="isEnable==1" type="button" @click="changeTrue" class="btn btn-primary">确认</button>
                                    <button v-if="isEnable==0" type="button" @click="changeTrue" class="btn btn-primary">确认</button>
                                    <button type="button" class="btn btn-gray" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!--查看账户dialog-->
                <div data-backdrop="static"  id="modal_see" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">查看消化商户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="addtop">
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="xhdata.subCompanyID" @change="getxhCity(xhdata.subCompanyID)">
                                            <option value="">全部分公司</option>
                                            <option v-for="(index,n) in companylists" v-text="n.name" :value="n.subCompanyID"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <select class="form-control" v-model="xhdata.cityID">
                                            <option value="">全部城市</option>
                                            <option v-for="(index,n) in xhcity" v-text="n.name" :value="n.cityId"></option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="xhdata.merchantOperationID" placeholder="商户ID" v-limitnumber="xhdata.merchantOperationID">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" v-model="xhdata.merchantName" placeholder="商户名">
                                    </div>
                                    <div class="col-md-2">
                                        <a class="btn btn-info" @click="seaxh()">查询</a>
                                    </div>
                                </div>
                                <div class="addbottom">
                                    <div class="col-md-12">
                                        <table v-if="seexhList.length>0" class="table" style="border: 1px solid #ccc;">
                                            <thead>
                                            <tr role="row">
                                                <th>商户ID</th>
                                                <th>分公司</th>
                                                <th>城市</th>
                                                <th>商户名</th>
                                                <th>开始时间</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="n in seexhList" role="row">
                                                <td>{{n.merchantOperationID}}</td>
                                                <td>{{n.subCompanyName}}</td>
                                                <td>{{n.cityName}}</td>
                                                <td>{{n.merchantName}}</td>
                                                <td>{{n.startDate|datetime}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span v-else>
                                            该账户没有消化商户
                                        </span>
                                    </div>
                                    <div class="tc" style="float: left;width: 100%;margin-top: 20px;">
                                        <a class="btn btn-gray" data-dismiss="modal" >关闭</a>
                                        <a class="btn btn-gray" @click="updateXh()" data-dismiss="modal">调整消化商户</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-backdrop="static"  id="modal_seehistory" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h5 class="modal-title">查看消化商户</h5>
                            </div>
                            <div class="modal-body">
                                <div class="addbottom">
                                    <div class="col-md-12">
                                        <table v-if="seehistoryList.length>0" class="table" style="border: 1px solid #ccc;">
                                            <thead>
                                            <tr role="row">
                                                <th>商户ID</th>
                                                <th>分公司</th>
                                                <th>城市</th>
                                                <th>商户名</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="n in seehistoryList" role="row">
                                                <td>{{n.merchantOperationID}}</td>
                                                <td>{{n.subCompanyName}}</td>
                                                <td>{{n.cityName}}</td>
                                                <td>{{n.merchantName}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <span v-else>
                                            该账户没有消化商户
                                        </span>
                                    </div>
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
    .addtop,  .addbottom{
        overflow: hidden;
        .form-control{
              padding: 7px;
        }
    }
    .addbottom{
        margin-top: 15px;
        .col-md-2{
            text-align: center;
            input{
                margin-bottom: 10px;
            }
        }
        .col-md-7{
            height: 300px;
            overflow: auto;
            border: 1px solid #ccc;
        }
        .col-md-1{
            padding-top: 40px;
            text-align: center;
            width: 113px;
            input{
                margin:15px 0;
            }
        }
        .col-md-4{
            border: 1px solid #ccc;
            padding:10px;
            width: 243px;
        }
        ul{
            list-style: none;
            height: 278px;
            overflow: auto;
            li{
                margin:5px 0;
                cursor: pointer;
                padding-left:3px;
            }
        }
    }
    table tr{
        td,th{
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            span{
                cursor: pointer;
                color: #3c8dbc;
                &:hover{
                     opacity: 80;
                 }
            }
        }
        input[type="checkbox"]{
            position: relative;
            top: 2px;
            left: -2px;
        }
    }
    #modal_update{
        table tr td{
            padding: 10px 2px;
        }
        .form-group{
            overflow: hidden;
            line-height: 36px;
        }
    }
    .pull-left label i{
        color:red;
    }
    .pull-left{
        .validation-error-label{
            line-height: 20px;
            padding-left: 18px;
            margin-top: 10px;
        }
    }
</style>
<script>
    import model from '../../ajax/BusinessManagement/buslimit_model'
    export default{
        data(){
            this.model =model(this)
            return{
                origin:window.origin,
                pageall:1,
                loginList:{},
                defaultData:{
                    'merchantOperationID': '',
                    'merchantName': '',
                    'subCompanyID': '',
                    'cityID': '',
                    'isAutoPay': '',
                    'status': '',
                    'cycleStart': '',
                    'cycleEnd': '',
                    'pageIndex': 1,
                    'pageSize': 10
                },
                shdata:{
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isLimitPurchase':0,
                    'isDigest':0,
                },
                xhdata:{
                    limitPurchaseMerchantInfoID:'',
                    merchantOperationID:'',
                    merchantName:'',
                    subCompanyID:'',
                    cityID:''
                },
                isEnable:0,
                zdlists:[],
                companylists:[],
                addTitle:'',
                addId:[],
                city:[],
                xhcity:[],
                isTrue:false,
                seexhList:[],
                seehistoryList:[],
                xhlist:[],
                updateList:{
                    remarks: '',
                    isAutoPay: '1',
                    certificateID: '',
                    merchantId: '',
                    updateBy: '',
                    singlePurchaseLimit: '',
                    singlePurchasePrincipal: '',
                    updateAt: '',
                    discountType: '',
                    limitPurchaseMerchantInfoID:''
                },
                uploadText:'',
                historyList:[],
                accountId:'',
                nums:{
                    totalLimit:0,
                    totalPrincipal:0,
                    usedLimit:0,
                    balanceLimit:0
                },
                saveerror:'',
                firstAdd:false
            }
        },
        methods:{
            // *** 请求账户列表数据
            getZlists(data){
                if(sessionStorage.getItem('isHttpin')==1)return;
                if(data.endValue<data.startValue){
                    let a=data.endValue,b=data.startValue;
                    this.defaultData.startValue=a;
                    this.defaultData.endValue=b;
                    data.startValue=a;
                    data.endValue=b;
                }
                    this.model.limitPurchaseMerchant_lists(data)
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
            getxhCity(_id){
                this.shdata.cityId='';
                let data={
                    'subCompanyID':_id
                }
                this.$common_model.getcity(data)
                        .then((response)=>{
                            // *** 判断请求是否成功如若成功则填充数据到模型
                            (response.data.code==0) ? this.$set('xhcity', response.data.data) : null;
                        });
            },
            initList(){
                $('.modal').modal('hide');
                back_json.saveArray(this.$route.path,this.defaultData);
                this.getZlists(this.defaultData);
            },
            clearUl(){
                this.xhlist=[];
                $('.addbottom .col-md-4').children('ul').html('');
            },
            updateNew(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.accountId=_id;
                this.updateList={
                    remarks: '',
                    isAutoPay: '1',
                    certificateID: '',
                    merchantId: '',
                    updateBy: '',
                    singlePurchaseLimit: '',
                    singlePurchasePrincipal: '',
                    updateAt: '',
                    discountType: '',
                    limitPurchaseMerchantInfoID:''
                };
                this.seexh(_id,false);
                this.model.limitPurchaseMerchant_history(_id)
                        .then((response)=>{
                                if(response.data.code==0){
                                    $.extend(true, this.updateList,response.data.data[0]);
                                    this.$set('historyList', response.data.data)
                                    this.updateList.certificateID='';
                                    $('input[type="file"]')[0].value='';
                                    this.clearUl();
                                    $('#modal_update').modal('show');
                                }
                        })

            },
            seehistoryxh(_id){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.seehistoryList=[];
                this.model.seehistoryxh(_id)
                        .then((response)=>{
                            if(response.data.code==0) {
                                this.$set('seehistoryList', response.data.data)
                                $('#modal_seehistory').modal('show');
                            }
                        })
            },
            updateXh(){
                $('#modal_see').modal('hide');
                this.updateNew(this.accountId);
            },
            delxh(_isenb,e){
                this.isEnable=_isenb;
                $(e.target).closest('tr').hide().find('.merchantIds').removeClass('merchantIds');
            },
            submitUpdate(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.saveerror='';
                if(!this.$vali.valid){this.$set('saveerror', '您的信息未填写完整');return;}
                if(this.updateList.certificateID==''){this.$set('saveerror', '请上传凭证');return;}
                let datas = Array.from($(".merchantIds"), i => parseInt(i.innerHTML));
                this.updateList.digestMerchants=datas;
                this.updateList.limitPurchaseMerchantInfoID=this.accountId;
                this.model.limitPurchaseMerchant_editDigest(this.updateList)
                        .then((response)=>{
                            if(response.data.code == 0){
                                this.initList();
                                dialogs('success','已修改！');
                            }
                        })
            },
            changeDiscount(_id,_isenb){
                this.accountId=_id;
                this.isEnable=_isenb;
            },
            changeTrue(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.model.limitPurchaseMerchant_change(this.accountId)
                        .then((response)=>{
                            if(response.data.code == 0){
                                this.initList();
                                dialogs('success','已启用！');
                            }
                        })
            },
            seexh(_id,isTrue){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.seexhList=[];
                this.accountId=_id;
                this.isTrue=isTrue;
                this.xhdata.limitPurchaseMerchantInfoID=_id;
                this.model.limitPurchaseMerchant_viewDigest(this.xhdata)
                        .then((response)=>{
                            if(response.data.code == 0){
                                this.$set('seexhList', response.data.data)
                                if(this.isTrue){$('#modal_see').modal('show');}
                            }
                        })
            },
            searchDigest(){
                if(sessionStorage.getItem('isHttpin')==1)return;
                this.firstAdd=true;
                this.$common_model.getmerchant_list(this.shdata)
                        .then((response)=>{
                                (response.data.code==0) ? this.$set('xhlist', response.data.data) : null;
                            }
                        )
            },
            addUser(){
                this.addTitle='添加商户';
                this.shdata={
                    'companyId':'',
                    'cityId':'',
                    'merchantOperationID':'',
                    'merchantName':'',
                    'isLimitPurchase':0,
                    'isDigest':0,
                };
                this.getxhCity();
                this.clearUl();
                this.firstAdd=false;
                $('#modal_add').modal('show');
            },
            addUser2(){
                this.addTitle='添加消化商户';
                this.firstAdd=false;
                (this.shdata.companyId=='')?this.getxhCity():null;
                $('.addbottom .col-md-4').children('ul').html('');
                $('#modal_add').modal('show');
            },
            allCkb(e){
                if(e.target.checked){
                    $('.col-md-7 td input[type="checkbox"]').prop('checked',true);
                }else{
                    $('.col-md-7 td input[type="checkbox"]').prop('checked',false);
                    this.addId=[];
                }
            },
            appendLi(a){
                let _this=$("input[value='" + a + "']")
                let _tr=_this.closest('tr');
                let _ul=$('.addbottom .col-md-4').children('ul');
                let merchantName=_this.attr('merchantName');
                let subCompanyName=_this.attr('subCompanyName');
                let cityName=_this.attr('cityName');
                let startDate=_this.attr('startDate');
                _ul.append('<li value="'+a+'" merchantName="'+merchantName+'" subCompanyName="'+subCompanyName+'" cityName="'+cityName+'" startDate="">'+_tr.children('td:last').html()+'</li>');
                _tr.hide();
            },
            addTrue(e){
                this.addId = Array.from($(".col-md-7 td input[type='checkbox']:checked"), i => i.value);
                for(let i=0;i<this.addId.length;i++){
                    this.appendLi(this.addId[i]);
                }
                $('.col-md-7 td input[type="checkbox"]').prop('checked',false);
                this.addId=[];
            },
            delTrue(e){
                let _ul=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul'),
                    _table=$(e.target).parent('.col-md-1').prev('.col-md-7').children('table').find('tr:hidden'),
                    _li= _ul.find('.check-li');
                for(let i=0;i<_li.length;i++){
                    _table.eq(_li.eq(i).index()).show();
                }
                _li.remove();
            },
            submitTrue(e){
                if(sessionStorage.getItem('isHttpin')==1)return;
                let _li=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul').children('li');
                if(!_li.length>0)return;
                let data={'merchantIds':Array.from(_li, i => parseInt(i.getAttribute('value')))}
                this.model.limitPurchaseMerchant_add(data)
                        .then((response)=>{
                            if(response.data.code == 0){
                                this.initList();
                                dialogs('success','已添加！');
                            }
                        })
            },
            submitTrue2(e){
                let _li=$(e.target).parent('.col-md-1').next('.col-md-4').children('ul').children('li');
                if(!_li.length>0)return;
                _li.each((index)=>{
                    let data={
                        merchantOperationID: _li.eq(index).attr('value'),
                        merchantName:_li.eq(index).attr('merchantName'),
                        subCompanyName:_li.eq(index).attr('subCompanyName'),
                        cityName: _li.eq(index).attr('cityName'),
                        startDate: _li.eq(index).attr('startDate'),
                    }
                    this.seexhList.push(data);
                })
                $('#modal_add').modal('hide');
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
                                    vm.updateList.certificateID=response.data.data;
                                    vm.uploadText=files.name;
                                    vm.saveerror='';
                                    dialogs('success','上传成功！');
                                }
                            })
                }
            },
        },
        ready() {
            var vm=this;
            (!!sessionStorage.getItem('userData')) ? vm.$set('loginList',JSON.parse(sessionStorage.getItem('userData'))) : null;
            (this.$route.params.id != ':id') ? this.defaultData.merchantOperationID = this.$route.params.id : null;
            vm.getClist();
            vm.getCity();
            (back_json.isback&&back_json.fetchArray(vm.$route.path)!='')?vm.defaultData=back_json.fetchArray(vm.$route.path):null;
            vm.initList();
            $('#modal_add,#modal_see,#modal_seehistory').on('hidden.bs.modal',function(){
                if(!$('#modal_update').is(':hidden')){
                    $('#app').addClass('modal-open');
                }
            })
            $('#modal_update,#modal_add,#modal_waring,#modal_see,#modal_seehistory').on('hidden.bs.modal', function () {
                $('body').css('padding-right',0);
                if($(this).hasClass('modal_update')){
                    vm.uploadText='';
                    vm.updateList.certificateID='';
                }
            })
        },
        watch:{
            zdlists(){
                var a=0,b=0,c=0,d=0;
                this.zdlists.forEach(function(e){
                    a+=e.totalLimit;
                    b+=e.totalPrincipal;
                    c+=e.usedLimit;
                    d+=e.balanceLimit;
                });
                this.nums.totalLimit=(a/100).toFixed(2);
                this.nums.totalPrincipal=(b/100).toFixed(2);
                this.nums.usedLimit=(c/100).toFixed(2);
                this.nums.balanceLimit=(d/100).toFixed(2);
            },
            'defaultData.pageIndex+defaultData.pageSize'(){
                this.initList();
            }
        }
    }
</script>