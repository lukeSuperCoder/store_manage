<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
        <div class="user_table">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input v-model="user_queryInfo.query" placeholder="请输入内容" class="user_search_input">
                        <el-button slot="append" icon="el-icon-search" class="user_search_button"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" class="user_add_button">添加用户</el-button>
                </el-col>
            </el-row>
                <template>
                    <el-table
                            :data="user_tableDate"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                type="index">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                label="邮箱">
                        </el-table-column>
                        <el-table-column
                                prop="mobile"
                                label="电话">
                        </el-table-column>
                        <el-table-column
                                prop="role_name"
                                label="角色">
                        </el-table-column>
                        <el-table-column
                                prop="mg_state"
                                label="状态">
                            <template slot-scope="scope">  <!--作用域插槽：可获取当前列内容-->
                                <el-switch
                                        v-model="scope.row.mg_state">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="user_set"
                                label="操作">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="user_pageTotal">
                    </el-pagination>
                </template>
        </div>
        </el-card>
    </div>

</template>
<script>
export default {
    created() {
        this.getUserList();
    },
    data(){
        return{
            user_tableDate: [],
            user_queryInfo:{
                query: '',
                pagenum:'1',
                pagesize:'4'
            },
            user_pageTotal:0

        }
    },
    methods:{
        async getUserList() {
           const {data:result}=await this.$http.get("users",{
               params:this.user_queryInfo
           });
           if(result.meta.status!='200'){this.$message.error(result.meta.msg);}
           this.user_pageTotal=result.data.total;
           this.user_tableDate=result.data.users;
           console.log(result.data.users)
           this.$message.success(result.meta.msg);

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style lang="less" scoped>
    .user_table {
        .user_table_header{
            .user_search_input {
                width: 30%;
                float: left;
            }
            .user_search_button {
                background-color:#DCDFE6;
                box-shadow: 0 0 10px #ddd;//加阴影，向外扩散10像素
                float: left;
                width: 6%;
            }
            .user_add_button{
                width: 10%;
                padding-left: 20px;
                float: left;
            }
        }

    }
</style>