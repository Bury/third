const rules = {
  setting:{
    illRules(len_min,len_max,text){
      return [
        { required: true, message: text, trigger: 'blur' },
        {
          validator:(rule,value,callback) =>{
            if(value.match(/^[0-9]{1,3}$/)){
              callback();
            }else{
              callback("请输入1-3位光照范围")
            }
          },
          trigger:'blur'
        }
      ]
    }
  }
}

export default {
  rules
}
