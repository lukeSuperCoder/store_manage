<template>
    <div class="login_container">
        <div class="login_span">
            <div class="avatar_box">
                <img src="../assets/logo.png">
            </div>
            <div class="login_box">
                <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
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
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
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
    width: 80%;
    position: absolute;
    transform: translate(0,-35%);
    top: 50%;
}
</style>