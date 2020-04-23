<template>
    <el-container class="home_container">
        <el-header>
            <div class="logo_span">
                <img src="../assets/picture/logo.png" width="20%" height="100%">
                <span>电商监控管理系统</span>
            </div>
            <el-button type="info">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px"></el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    },

}
</script>

<style lang="less" scoped>
    .el-header {
        background-color: #2c3e50;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#ffffff;
        padding-left: 0;
        > div{
            display: flex;
            align-items: center;
            span{
                font-size: 20px;
                margin-left: 15px;
            }
        }
    }

    .logo_span{
        height: 100%;

    }

    .el-aside {
        background-color: #42b983;
    }

    .home_container{
        height: 100%;
    }

    .el-main{
        background-color: #dddddd;
    }
</style>