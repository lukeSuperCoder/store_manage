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
                    <el-input v-model="user_queryInfo.query" placeholder="请输入内容" class="user_search_input" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" class="user_search_button" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" class="user_add_button" @click="user_dialogVisible=true">添加用户</el-button>
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
                                        v-model="scope.row.mg_state" @change="setUserState(scope.row)">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="user_set"
                                label="操作">
                            <template slot-scope="scope">
                                {{scope.row.assign}}
                                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                                <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                                    <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="user_queryInfo.pagenum"
                            :page-sizes="[1,2,5,10]"
                            :page-size="user_queryInfo.pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="user_pageTotal" :enterable="false">
                    </el-pagination>
                </template>
            <el-dialog
                            title="提示"
                            :visible.sync="user_dialogVisible"
                            width="50%"
                            :before-close="handleClose">
                    <el-form :model="user_addForm" status-icon :rules="user_addFormRules" ref="user_addFormRef" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input  v-model="user_addForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="user_addForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="user_addForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="user_addForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="user_dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="user_dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
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
                pagenum: 1,
                pagesize: 1
            },
            user_pageTotal:0,
            user_dialogVisible:false,
            user_addForm:{
                username:'',
                password:'',
                email:'',
                phone:''
            },
            user_addFormRules:{
                username:[
                    {
                        required:true,message:"请输入用户名",trigger:"blur"
                    },
                    {
                        min:3,max:10,message: "用户名长度不符合要求",trigger: "blur"
                    }
                ],
                password:[
                    {
                        required:true,message:"请输入密码",trigger:"blur"
                    },
                    {
                        min:3,max:10,message: "密码长度不符合要求",trigger: "blur"
                    }
                ],
                email:[
                    {
                        required:true,message:"请输入邮箱",trigger:"blur"
                    },
                    {
                        type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
                    }
                ],
                phone:[
                    {
                        required:true,message:"请输入手机号",trigger:"blur"
                    },
                    {
                        type: 'number', message: '手机号必须为数字值'
                    }
                ],
            }
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
           this.$message.success(result.meta.msg);
        },
        async setUserState(userInfo){
           const {data:result} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
           if(result.meta.status!=200){
               this.$message.error(result.meta.msg);
           }
            this.$message.success(result.meta.msg);
        },
        handleSizeChange(val) {
            //切换每页显示多少条
            //console.log(`每页 ${val} 条`);
            this.user_queryInfo.pagesize=val;
            this.getUserList();
        },
        handleCurrentChange(val) {
            //切换当前页数
            //console.log(`当前页: ${val}`);
            this.user_queryInfo.pagenum=val;
            this.getUserList();
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