<template>
    <div class="login_container">
        <div class="login_span">
            <div class="avatar_box">
                <img src="../assets/logo.png">
            </div>
            <div class="login_box">
                <el-form :model="login_form" ref="login_form" status-icon label-width="0px" class="demo-ruleForm">
                    <el-form-item  prop="username">
                        <el-input prefix-icon="el-icon-s-custom" type="text" v-model="login_form.username" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item  prop="password">
                        <el-input prefix-icon="iconfont icon-password" type="password" v-model="login_form.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary" @click="LoginAccount('login_form')">提交</el-button>
                        <el-button @click="resetForm('login_form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                login_form: {
                    username: '',
                    password: ''
                },
            };
        },
        methods: {
            LoginAccount(formName) {
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                      const {data:result} = await this.$http.post("login",this.login_form);
                      if(result.meta.status=='200'){
                          this.$message.success("登陆成功");
                          window.sessionStorage.setItem('token',result.data.token);
                          this.$router.push('/Home');
                      }else {
                          this.$message.error("登陆失败");
                      }
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style lang="less" scoped>  /*加上scoped只对当前文件样式生效，防止冲突*/
.login_container{
    height: 100%;
    background-color: darkblue;
}
.login_span{
    height: 300px;
    width: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);   //元素居中显示
    background-color: aliceblue;
    border-radius: 3px;

}
.avatar_box{
    height: 130px;
    width: 130px;
    border: solid #eeeeee;
    border-radius: 50%;     //圆角
    padding: 10px;
    box-shadow: 0 0 10px #ddd;//加阴影，向外扩散10像素
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_box{
    position: absolute;
    padding: 0 20px;    //按照上、右、下、左的顺序分别设置各边的内边距
    width: 100%;
    bottom: 0;          //设置定位元素下外边距边界与其包含块下边界之间的偏移。
    box-sizing: border-box; //padding和border被包含在定义的width和height之内。对象的实际宽度就等于设置的width值，即使定义有border和padding也不会改变对象的实际宽度，即 ( Element width = width )
}
.btns{
    display: flex;  //将对象作为弹性伸缩盒显示
    justify-content: flex-end;//弹性盒子元素将向行结束位置对齐。该行的第一个子元素的主结束位置的边界将与该行的主结束位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐
}
</style>