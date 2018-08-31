import globalRules from '@/config/globalRules'
import dataCollectApi from '@/api/dataCollect'
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
        left_eye_st:'',
        left_eye_ed:'',
        right_eye_st:'',
        right_eye_ed:'',
        nose_st:'',
        nose_ed:'',
        mouth_st:'',
        mouth_ed:'',
        left_cheek_st:'',
        left_cheek_ed:'',
        right_cheek_st:'',
        right_cheek_ed:'',
        chin_contour_st:'',
        chin_contour_ed:''
      },
      rules:{
        // illA:globalRules.setting.illRules()
      },
      optionsA:[
        {value:0,name:0},
        {value:0.1,name:0.1},
        {value:0.2,name:0.2},
        {value:0.3,name:0.3},
        {value:0.4,name:0.4},
        {value:0.5,name:0.5},
        {value:0.6,name:0.6},
        {value:0.7,name:0.7},
        {value:0.8,name:0.8},
        {value:0.9,name:0.9},
      ],
      optionsB:[
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
      optionsFace:[
        {value:0,name:'溢出'},
        {value:1,name:'完整'},
      ],
      optionsKeep:[
        {value:0,name:'无遮挡'},

      ],
    }
  },
  created:function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''
    this.dataBack();
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
        if(this.$data.ruleForm.dimA >= this.$data.ruleForm.dimB){
          this.$message({
            message: '开始范围不能大于结束范围',
            type: 'error',
            center: true
          });
          this.$data.ruleForm.dimB = '';
        }
        // else{
        //   if(this.$data.ruleForm.dimA > 0.1 || this.$data.ruleForm.dimB > 0.1){
        //     this.$message({
        //       message: '填写范围不合法',
        //       type: 'error',
        //       center: true
        //     });
        //     this.$data.ruleForm.dimA = '';
        //     this.$data.ruleForm.dimB = '';
        //   }
        // }
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
      console.log(a);
      console.log(b);
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
      this.test(parseFloat(this.$data.ruleForm.pitchA),parseFloat(this.$data.ruleForm.pitchB),90,1);
    },
    //姿态角度roll判断
    rollBBtn(){
      this.test(parseFloat(this.$data.ruleForm.rollA),parseFloat(this.$data.ruleForm.rollB),180,2);
    },
    //姿态角度yaw判断
    yawBBtn(){
      this.test(parseFloat(this.$data.ruleForm.yawA),parseFloat(this.$data.ruleForm.yawB),90,3);
    },
  //  保存
    submitForm(val){
      console.log(val);
      if(this.$data.ruleForm.pitchA == '' || this.$data.ruleForm.pitchB == ''){
        this.$message({
          message: '填写Pitch范围',
          type: 'error',
          center: true
        });
      }else{
        if(this.$data.ruleForm.rollA == '' || this.$data.ruleForm.rollB == ''){
          this.$message({
            message: '填写Roll范围',
            type: 'error',
            center: true
          });
        }else{
          if(this.$data.ruleForm.yawA == '' || this.$data.ruleForm.yawB == ''){
            this.$message({
              message: '填写Yaw范围',
              type: 'error',
              center: true
            });
          }else{
            //this.$data.ruleForm.dimA == '' ||
            if( this.$data.ruleForm.dimB == ''){
              this.$message({
                message: '请选择模糊度范围',
                type: 'error',
                center: true
              });
            }else{
              if(this.$data.ruleForm.faceAll == '' ){
                this.$message({
                  message: '请选择脸完整度',
                  type: 'error',
                  center: true
                });
              }else{
                if(this.$data.ruleForm.illA == '' || this.$data.ruleForm.illB == ''){
                  this.$message({
                    message: '请填写光照范围范围',
                    type: 'error',
                    center: true
                  });
                }else{
                  let list = {
                    'pitch_st': this.$data.ruleForm.pitchA,
                    'pitch_ed': this.$data.ruleForm.pitchB,
                    'yaw_st': this.$data.ruleForm.yawA,
                    'yaw_ed': this.$data.ruleForm.yawB,
                    'roll_st': this.$data.ruleForm.rollA,
                    'roll_ed': this.$data.ruleForm.rollB,
                    'illumination_st': this.$data.ruleForm.illA,
                    'illumination_ed': this.$data.ruleForm.illB,
                    'blur_st': 0,
                    'blur_ed': this.$data.ruleForm.dimB,
                    'occlusion': this.$data.ruleForm.keepOut,
                    'completeness': this.$data.ruleForm.faceAll,

                  //遮挡
                    'left_eye_st':this.$data.ruleForm.left_eye_st,
                    'left_eye_ed':this.$data.ruleForm.left_eye_ed,
                    'right_eye_st':this.$data.ruleForm.right_eye_st,
                    'right_eye_ed':this.$data.ruleForm.right_eye_ed,
                    'nose_st':this.$data.ruleForm.nose_st,
                    'nose_ed':this.$data.ruleForm.nose_ed,
                    'mouth_st':this.$data.ruleForm.mouth_st,
                    'mouth_ed':this.$data.ruleForm.mouth_ed,
                    'left_cheek_st':this.$data.ruleForm.left_cheek_st,
                    'left_cheek_ed':this.$data.ruleForm.left_cheek_ed,
                    'right_cheek_st':this.$data.ruleForm.right_cheek_st,
                    'right_cheek_ed':this.$data.ruleForm.right_cheek_ed,
                    'chin_contour_st':this.$data.ruleForm.chin_contour_st,
                    'chin_contour_ed':this.$data.ruleForm.chin_contour_ed

                  }
                  let qs = require('querystring')
                  dataCollectApi.dataSettingSave(qs.stringify(list)).then((response) => {
                    if(response.data.errno == 0){
                      this.$message({
                        message: '设置成功',
                        type: 'success',
                        center: true
                      });
                      this.dataBack();
                    }
                  })
                }
              }
            }
          }
        }
      }
    },
    dataBack(){
      let list = {}
      let qs = require('querystring')
      dataCollectApi.dataSettingSaveBack(qs.stringify(list)).then((response) => {
        console.log(response.data.data);
        this.$data.ruleForm.pitchA = response.data.data.pitch_st;
        this.$data.ruleForm.pitchB = response.data.data.pitch_ed;
        this.$data.ruleForm.yawA = response.data.data.yaw_st;
        this.$data.ruleForm.yawB = response.data.data.yaw_ed;
        this.$data.ruleForm.rollA = response.data.data.roll_st;
        this.$data.ruleForm.rollB = response.data.data.roll_ed;
        this.$data.ruleForm.illA = response.data.data.illumination_st;
        this.$data.ruleForm.illB = response.data.data.illumination_ed;
        this.$data.ruleForm.dimA = response.data.data.blur_st;
        this.$data.ruleForm.dimB = response.data.data.blur_ed;
        this.$data.ruleForm.keepOut = response.data.data.occlusion;
        this.$data.ruleForm.faceAll = response.data.data.completeness;

        //遮挡
          this.$data.ruleForm.left_eye_st=response.data.data.left_eye_st;
          this.$data.ruleForm.left_eye_ed=response.data.data.left_eye_ed;
          this.$data.ruleForm.right_eye_st=response.data.data.right_eye_st;
          this.$data.ruleForm.right_eye_ed=response.data.data.right_eye_ed;
          this.$data.ruleForm.nose_st=response.data.data.nose_st;
          this.$data.ruleForm.nose_ed=response.data.data.nose_ed;
          this.$data.ruleForm.mouth_st=response.data.data.mouth_st;
          this.$data.ruleForm.mouth_ed=response.data.data.mouth_ed;
          this.$data.ruleForm.left_cheek_st=response.data.data.left_cheek_st;
          this.$data.ruleForm.left_cheek_ed=response.data.data.left_cheek_ed;
          this.$data.ruleForm.right_cheek_st=response.data.data.right_cheek_st;
          this.$data.ruleForm.right_cheek_ed=response.data.data.right_cheek_ed;
         this.$data.ruleForm.chin_contour_st=response.data.data.chin_contour_st;
          this.$data.ruleForm.chin_contour_ed=response.data.data.chin_contour_ed;
      })
    },
  }
}
