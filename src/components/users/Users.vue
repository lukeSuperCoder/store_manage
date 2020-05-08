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
                    <el-button type="primary" class="user_add_button" @click="user_add_dialogVisible=true">添加用户</el-button>
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
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditMessage(scope.row.id)"></el-button>
                                <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDeleteMessage(scope.row)"></el-button>
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
                    :visible.sync="user_add_dialogVisible"
                    width="50%" @close="closeAddDialog">
                <el-form :model="user_addForm" status-icon :rules="user_addFormRules" ref="user_addFormRef"
                         label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="user_addForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="user_addForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="user_addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="user_addForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="user_add_dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddForm">确 定</el-button>
          </span>
            </el-dialog>
            <el-dialog
                    title="提示"
                    :visible.sync="user_update_dialogVisible"
                    width="50%" @close="closeUpdateDialog" :close-on-click-modal="false">
                <el-form :model="user_updateForm" status-icon :rules="user_updateFormRules" ref="user_updateFormRef"
                         label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="user_updateForm.username" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="user_updateForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="user_updateForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="user_update_dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitUpdateForm">确 定</el-button>
          </span>
            </el-dialog>
            <el-dialog
                    title="提示"
                    :visible.sync="user_delete_dialogVisible"
                    width="30%">
                    <span>你确定要删除用户{{this.user_updateForm.username}}吗？</span>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="user_delete_dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteUser">确 定</el-button>
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
        //验证手机号规则
        const checkMobile = (rule, value, cb) => {
                let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (reg.test(value)) {
                    cb()
                } else {
                    cb(new Error('手机号码格式不正确'))
                }
            }
        return{
            user_tableDate: [],
            user_queryInfo:{
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            user_pageTotal:0,
            user_add_dialogVisible:false,   //添加用户对话框
            user_update_dialogVisible:false,//修改用户信息对话框
            user_delete_dialogVisible:false,//删除用户对话框
            user_addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            user_updateForm:{
                username:'',
                email:'',
                mobile:''
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
                        required:true,message:"请输入用户名",trigger:"blur"
                    },
                    {
                        type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
                    }
                ],
                mobile: [
                    {
                        required:true,message:"请输入用户名",trigger:"blur"
                    },
                    {
                        validator: checkMobile, trigger: 'blur'
                    }
                ]
            },
            user_updateFormRules:{
                email:[
                    {
                        required:true,message:"请输入用户名",trigger:"blur"
                    },
                    {
                        type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
                    }
                ],
                mobile: [
                    {
                        required:true,message:"请输入用户名",trigger:"blur"
                    },
                    {
                        validator: checkMobile, trigger: 'blur'
                    }
                ]
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
        },
        //添加用户
        submitAddForm() {
            this.$refs['user_addFormRef'].validate(async valid => {
                if (valid) {
                    const {data: result} = await this.$http.post("users", this.user_addForm);
                    if (result.meta.status == 201) {
                        this.$message.success(result.meta.msg);
                        this.closeAddDialog();
                    } else {
                        this.$message.error(result.meta.msg);
                    }
                } else {
                    return false;
                }
            });
        },
        //重置添加用户表单
        closeAddDialog(){
            this.user_add_dialogVisible = false;
            this.$refs['user_addFormRef'].resetFields();
        },
        //为修改栏提供默认用户信息
        async showEditMessage(id){
           const {data:result} = await this.$http.get(`users/${id}`);
           if(result.meta.status==200){
               this.$message.success(result.meta.msg);
               this.user_updateForm=result.data;
           }else {
               this.$message.error(result.meta.msg);
           }
            this.user_update_dialogVisible=true;
        },
        //提交更新用户信息
        submitUpdateForm(){
            this.$refs['user_updateFormRef'].validate(async valid => {
                if (valid) {
                    const {data: result} = await this.$http.put(`users/${this.user_updateForm.id}`, this.user_updateForm);
                    if (result.meta.status == 200) {
                        this.$message.success(result.meta.msg);
                        this.closeUpdateDialog();
                        this.getUserList();
                    } else {
                        this.$message.error(result.meta.msg);
                    }
                } else {
                    return false;
                }
            });
        },
        //重置修改用户表单
        closeUpdateDialog(){
            this.user_update_dialogVisible = false;
            this.$refs['user_updateFormRef'].resetFields();
        },
        //删除用户信息
        showDeleteMessage(userInfo){
            this.user_delete_dialogVisible=true;
            this.user_updateForm=userInfo;
        },
        async deleteUser(){
            const {data: result} = await this.$http.delete(`users/${this.user_updateForm.id}`);
            if (result.meta.status == 200) {
                this.$message.success(result.meta.msg);
                this.user_delete_dialogVisible=false;
                this.getUserList();
            } else {
                this.$message.error(result.meta.msg);
            }
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