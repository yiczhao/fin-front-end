<template>
    <index :title="'计算公式'"
           :ptitle="'活动列表'"
           :hname="'activity-lists'"
           :isshow="'isshow'">
        <div class="content activity-formulae" slot="content">
            <div class="panel panel-flat">

                <div class="panel-row">
                    <div class="col">公式状态</div>
                    <div class="col red">未提交</div>
                </div>

                <div class="panel-row">
                    <div class="col">
                        计算公式
                        
                    </div>
                </div>

                <div class="panel-row">
                    <div class="col red">
                        <span class="btn btn-primary" >使用默认公式</span>
                    </div>
                </div>

                <div class="panel-row">
                    

                    <div class="col">
                        <span v-for="n in chooseData" @click="choose($event)" class="btn btn-infos">{{n}}</span>
                        <span @click="choose($event)" class="btn btn-infos">三方应收</span>
                        <span @click="choose($event)" class="btn btn-infos">苏州卡说税率</span>
                    </div>
                </div>

                <div class="panel-row">
                    <div class="col">实际广告费=</div>
                    
                    <div class="col write-div">
                        <template v-for="m in thirdData">
                            <span  @click="choose($event)" class="btn btn-infos">{{m.val}}</span>
                            <input type="text" class="form-control" @focus="chooseInput($index)">
                        </template>
                        <input type="text" class="form-control" @focus="chooseInput($index)" v-show="!thirdData.length">
                    </div>
                </div>

                <!--<div class="panel-row" v-for="n in chooseData">-->
                    <!--<div>{{n}}=</div>-->
                    <!--<div class="write-div">-->
                        <!--<span v-for="m in writeData[$index]" @click="choose($event)" class="btn btn-info">{{m}}</span>-->
                        <!--<input type="text" class="form-control" @focus="chooseInput($index)">-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>
    </index>
</template>

<script>
    export default{
        data(){
            return{
                chooseData:[
                    '实际广告费',
                    '实际物料费',
                    '实际微信营销费',
                    '实际服务费',
                    '实际税费',
                    '实际结算金额',
                    '合同广告费',
                    '合同物料费',
                    '合同微信营销费',
                    '合同服务费',
                    '合同税费',
                    '合同结算金额'
                ],
                writeData:[],
                index:'',
                thirdData:[]
            }
        },
        methods:{
            chooseInput(index){
              this.index=index;
            },
            choose(e){
                let text=e.target.textContent;
                var ishas=false;
                this.thirdData.map((value)=>{
                    if(value.val==text){
                        ishas=true;
                    }
                })
                if(!ishas){
                    e.target.classList.toggle('checked')
                    this.thirdData.push({
                        'val':text,
                        'index':this.thirdData.length
                    })
                }
            }
        },
        ready() {
        },
        watch:{
        }
    }
</script>