/**
 * Created by zhangran on 16/3/21.
 */

/**
 * 充值返现100:20 => 冲100返20
  */

export default function(value){
  if(!value && value !== 0){
    return '';
  }
  return '冲' + value.replace(/:/,'返');
}