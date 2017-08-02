<template>
  <div class="get-month">
    <input class="get-month_click"
           type="text"
           :value="value"
           @click="showDatePicker"
           readonly/>
    <div class="get-month_table" v-show="showgetmonth">
      <div class="get-month_row get-month_title">
        <span class="get-month_leftbtn icon-backward2" @click="preyear"></span>
        <input type="text" class="get-month_text" @click="changeyear" v-model="yText" readonly/>
        <span class="get-month_rightbtn icon-forward3" @click="nextyear"></span>
      </div>
      <div class="get-month_row get-month_ybody" v-show="showyear">
        <span v-for="i in ydata" track-by="$index" @click="chooseyear(i)">
          {{i}}
        </span>
      </div>
      <div class="get-month_row get-month_mbody" v-show="!showyear">
        <span v-for="i in 12" track-by="$index" @click="choosemonth(i+1)">
          {{i+1}}月
        </span>
      </div>
      <div class="get-month_row get-month_title" v-show="clear">
        <span @click="value=''">
          清空
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
        value: { type: String, default: '' },
        clear: { type: Boolean, default: false },
    },
    data(){
      return{
        yText:'',
        ydata:[],
        showgetmonth:false,
        showyear:false,
      }
    },
    methods:{
      showDatePicker(){
        if(!this.value.trim()){
            this.resetDate();
        }
        this.showgetmonth? this.resetDate() : this.showgetmonth=true;
      },
      resetDate(){
        this.showgetmonth=false;
        this.showyear=false;
        this.yText=getNow().split('-')[0];
      },
      changeyear(){
        if(this.showyear){
          this.showyear=false;
          (!!this.ydata.length)?this.yText=_.head(this.ydata):null;
        }else{
          let data=[];
          for(let i=0;i<12;i++){
            data[i]=parseInt(this.yText)+i
          }
          this.ydata=data;
          this.yText=this.yText+'年--'+_.last(this.ydata)+'年';
          this.showyear=true
        }
      },
      preyear(){
        this.yText=parseInt(this.yText)-12;
        let data=[];
        for(let i=0;i<12;i++){
          data[i]=parseInt(this.yText)+i
        }
        this.ydata=data;
        this.yText=this.yText+'年--'+_.last(this.ydata)+'年';
        this.showyear=true
      },
      nextyear(){
        this.yText=parseInt(this.yText)+12;
        let data=[];
        for(let i=0;i<12;i++){
          data[i]=parseInt(this.yText)+i
        }
        this.ydata=data;
        this.yText=this.yText+'年--'+_.last(this.ydata)+'年';
        this.showyear=true
      },
      chooseyear(val){
        this.yText=val;
        this.showyear=false;
      },
      choosemonth(val){
        this.value=this.yText+'-'+val;
        this.showgetmonth=false;
      }
    },
    ready() {
      !this.value?this.value=getNow():null;
      this.yText=this.value.split('-')[0];
      document.addEventListener('click', (e) => {
        if (this.$el && !this.$el.contains(e.target)) {
          this.resetDate();
        }
      }, false);
    },
    beforeDestroy () {
      document.removeEventListener('click', this.resetDate, false);
    },
    watch:{
    }
  }
</script>