<template>
    <el-container class="home_container">
        <!-- 头部内容  -->
        <el-header>
            <div class="logo_span">
                <img src="../assets/picture/logo.png" width="18%" height="100%">
                <span>电商监控管理系统</span>
            </div>
            <el-button type="info" @click="outLogin">退出</el-button>
        </el-header>
        <el-container>
            <!-- 左侧边栏内容  -->
            <el-aside :width="menu_isCollapse?'64px':'200px'">
                <div class="toggle_button" @click="toggleCollapse">|||</div>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="dodgerblue"
                        :unique-opened="true"
                        :collapse="menu_isCollapse"
                        :collapse-transition="false"
                        router :defaultActive="menu_curActive"
                        >
                    <el-submenu :index="'/'+item.path" v-for="item in menu_list" :key="item.id">
                        <template slot="title">
                            <i :class="menu_icon[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                            <el-menu-item v-for="item_group in item.children" :key="item_group.id"
                                          :index="'/'+item_group.path" @click="activeState('/'+item_group.path)">
                                <i class="el-icon-menu"></i>
                                {{item_group.authName}}
                            </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>
            <!-- 主区域内容  -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created() {
        this.getMenus();
        this.menu_curActive=window.sessionStorage.getItem('activeState');
    },
    watch:{

    },
    data(){
        return{
            menu_curActive:'',
            menu_isCollapse:false,
            menu_list:[],
            menu_icon:{
                '125':'el-icon-s-custom',
                '103':'el-icon-s-tools',
                '101':'el-icon-s-platform',
                '102':'el-icon-s-help',
                '145':'el-icon-s-order'
            }
        }
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        outLogin:function () {
            window.sessionStorage.clear();
            this.$router.push('/Login')
        },
        async getMenus () {
            const {data: result} = await this.$http.get("menus");
            if (result.meta.status != '200') {
                this.$message.error(result.meta.msg)
            }
            this.menu_list = result.data;
            console.log(result.data)
        },
        toggleCollapse:function () {
            this.menu_isCollapse=!this.menu_isCollapse;

        },
        activeState:function (state) {
            this.menu_curActive=state;
            window.sessionStorage.setItem('activeState',state);
        }
    },

}
</script>

<style lang="less" scoped>
    .el-header {
        background-color: #545c64;
        display: flex;
        justify-content: space-between; //左右靠边
        align-items: center;            //上下居中
        color:#ffffff;
        padding-left: 0;
        > div{                          //修改里面包含的div样式
            display: flex;
            align-items: center;
            span{                       //修改里面包含的span样式
                font-size: 20px;
                margin-left: 10px;
            }
        }
    }

    .logo_span{
        height: 100%;

    }

    .el-aside {
        background-color: #42b983;
        border-bottom: 0   ;
        .el-menu{
            border-right: none;
            .el-submenu{
                text-align: left;
            }
        }
    }

    .home_container{
        height: 100%;
    }

    .el-main{
        background-color: #dddddd;
    }
    .toggle_button{
        background-color: #545c64;
        font-size: 10px;
        line-height: 24px;
        color: white;
        letter-spacing: 0.2em; //增加内容间距
        cursor: pointer;       //增加点击样式
    }

</style>