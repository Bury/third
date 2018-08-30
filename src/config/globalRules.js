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
    },
    
    //标签名
    tagName(){
      return [
        { required: true, message: '请输入标签名！', trigger: 'blur' },
        {
          validator:(rule,value,callback) =>{
            if(/^[a-zA-Z0-9\u4E00-\u9FA5_]{2,15}$/.test(value)){
              callback();
            }else{
              callback("标签名由2-15位的数字、中文、英文、下划线组成")
            }
          },
          trigger:'blur'
        }
      ]
    },
    
    
    //排序
    tagSort(){
    	return [{required: true,message: '请输入排序！',trigger: 'blur'},
						{
							validator:(rule,value,callback) =>{
             if(/^\+?[0-9]\d*$/.test(value)){
              callback();
             }else{
              callback("只能输入整数！")
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
