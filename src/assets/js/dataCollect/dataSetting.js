import globalRules from '@/config/globalRules'
export default {
  name: "data-setting",
  data(){
    return{
      ruleForm:{
        pitchA:'',
        pitchB:'',
        rollA:'',
        rollB:'',
        yawA:'',
        yawB:'',
        dimA:'',
        dimB:'',
        faceAll:'',
        keepOut:'',
        illA:'',
        illB:'',
      },
      rules:{
        // illA:globalRules.setting.illRules()
      },
      options:[
        {value:0.1,name:0.1},
        {value:0.2,name:0.2},
        {value:0.3,name:0.3},
        {value:0.4,name:0.4},
        {value:0.5,name:0.5},
        {value:0.6,name:0.6},
        {value:0.7,name:0.7},
        {value:0.8,name:0.8},
        {value:0.9,name:0.9},
        {value:1,name:1},
      ],
    }
  },
  methods:{
    dimBtnB(){
      console.log(this.$data.ruleForm.dimA);
      console.log(this.$data.ruleForm.dimB);
      if(this.$data.ruleForm.dimA == ''){
        this.$message({
          message: '请先选取开始数据',
          type: 'error',
          center: true
        });
        this.$data.ruleForm.dimB = '';
      }else {
        if(this.$data.ruleForm.dimA > this.$data.ruleForm.dimB){
          this.$message({
            message: '开始范围不能大于结束范围',
            type: 'error',
            center: true
          });
          this.$data.ruleForm.dimB = '';
        }
      }
    },
    //光照范围判断
    illBBtn(){
      console.log(this.$data.ruleForm.illA)
      console.log(this.$data.ruleForm.illB)
      if(this.$data.ruleForm.illA == ''){
        this.$message({
          message: '请先填写开始范围',
          type: 'error',
          center: true
        });
        this.$data.ruleForm.illB = '';
      }else{
        if(this.$data.ruleForm.illA > this.$data.ruleForm.illB){
          this.$message({
            message: '开始范围必须小于结束范围',
            type: 'error',
            center: true
          });
          this.$data.ruleForm.illA = '';
          this.$data.ruleForm.illB = '';
        }else{
          if(this.$data.ruleForm.illA > 255 || this.$data.ruleForm.illA > 255){
            this.$message({
              message: '填写范围不合法',
              type: 'error',
              center: true
            });
            this.$data.ruleForm.illA = '';
            this.$data.ruleForm.illB = '';
          }
        }
      }
    },
    test(a,b,num,type){
      // console.log(a);
      // console.log(b);
      if(a == ''){
        this.$message({
          message: '请先填写开始范围',
          type: 'error',
          center: true
        });
        if(type == 1){
          this.$data.ruleForm.pitchB = '';
        }else if(type == 2){
          this.$data.ruleForm.rollB = '';
        }else if(type == 3){
          this.$data.ruleForm.yawB = '';
        }
      }else{
        if(a > b){
          this.$message({
            message: '开始范围必须小于结束范围',
            type: 'error',
            center: true
          });

          if(type == 1){
            this.$data.ruleForm.pitchA = '';
            this.$data.ruleForm.pitchB = '';
          }else if(type == 2){
            this.$data.ruleForm.rollA = '';
            this.$data.ruleForm.rollB = '';
          }else if(type == 3){
            this.$data.ruleForm.yawA = '';
            this.$data.ruleForm.yawB = '';
          }
        }else{
          if(a > num || a < -num){
            this.$message({
              message: '填写开始范围不合法',
              type: 'error',
              center: true
            });
            if(type == 1){
              this.$data.ruleForm.pitchA = '';
            }else if(type == 2){
              this.$data.ruleForm.rollA = '';
            }else if(type == 3){
              this.$data.ruleForm.yawA = '';
            }
          }else if(b > num || b < -num){
            this.$message({
              message: '填写结束范围不合法',
              type: 'error',
              center: true
            });
            if(type == 1){
              this.$data.ruleForm.pitchB = '';
            }else if(type == 2){
              this.$data.ruleForm.rollB = '';
            }else if(type == 3){
              this.$data.ruleForm.yawB = '';
            }
          }
        }
      }
    },
    //姿态角度pitch判断
    pitchBBtn(){
      this.test(this.$data.ruleForm.pitchA,this.$data.ruleForm.pitchB,90,1);
    },
    //姿态角度roll判断
    rollBBtn(){
      this.test(this.$data.ruleForm.rollA,this.$data.ruleForm.rollB,180,2);
    },
    //姿态角度yaw判断
    yawBBtn(){
      this.test(this.$data.ruleForm.yawA,this.$data.ruleForm.yawB,90,3);
    },
  }
}
