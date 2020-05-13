<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="role_table">
            <div class="role_table_header">
                <el-button type="primary" @click="role_add_dialogVisible=true">添加角色</el-button>
            </div>
            <template>
                <el-table border stripe
                        :data="role_tableDate"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-row :class="['bdbottom',i1===0?'bdtop':'','v-center']" v-for="(item1,i1) in props.row.children" :key="item1.id">
                                <el-col :span="5">
                                       <el-tag closable  @close="deleteTag(item1.id,props.row)">{{item1.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="19">
                                    <!--通过for循环嵌套二级菜单-->
                                    <el-row :class="[i2===0?'':'bdtop','v-center']" v-for="(item2,i2) in item1.children" :key="item2.id">
                                        <el-col :span="6">
                                            <el-tag type="success" closable  @close="deleteTag(item2.id,props.row)">{{item2.authName}}</el-tag>
                                            <i class="el-icon-caret-right"></i>
                                        </el-col>
                                        <el-col :span="18">
                                            <el-tag type="warning" closable  @close="deleteTag(item3.id,props.row)" v-for="(item3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="#"
                            type="index">
                    </el-table-column>
                    <el-table-column
                            label="角色名称"
                            prop="roleName">
                    </el-table-column>
                    <el-table-column
                            label="角色描述"
                            prop="roleDesc">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditMessage(scope.row.id)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="showDeleteMessage(scope.row)"></el-button>
                            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showAllotMessage(scope.row)"></el-button>
                        </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
        <el-dialog
                title="提示"
                :visible.sync="role_add_dialogVisible"
                width="50%" @close="closeAddDialog">
            <el-form :model="role_addForm" status-icon  ref="role_addFormRef"
                     label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="角色ID" prop="roleId">
                    <el-input v-model="role_addForm.roleId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="role_addForm.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="role_addForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="role_add_dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddForm">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="role_update_dialogVisible"
                width="50%" @close="closeUpdateDialog" :close-on-click-modal="false">
            <el-form :model="role_updateForm" status-icon ref="role_updateFormRef"
                     label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="角色ID" prop="roleId">
                    <el-input v-model="role_updateForm.roleId" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="role_updateForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="role_updateForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="role_update_dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitUpdateForm">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="role_delete_dialogVisible"
                width="30%">
            <span>你确定要删除用户{{this.role_updateForm.roleName}}吗？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="role_delete_dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteRole">确 定</el-button>
                  </span>
        </el-dialog>
        <el-dialog fullscreen
                title="提示"
                :visible.sync="role_allot_dialogVisible"
                width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        created() {
            this.getRolesList();
        },
        data(){
            return{
                role_tableDate: [],
                role_add_dialogVisible:false,
                role_update_dialogVisible:false,
                role_addForm:{
                    roleId:'',
                    roleName:'',
                    roleDesc:''
                },
                role_updateForm:{
                    roleId:'',
                    roleName:'',
                    roleDesc:''
                },
                role_delete_dialogVisible:false,
                role_allot_dialogVisible:false
            }
        },
        methods:{
            async getRolesList(){
                const {data:result}  = await this.$http.get('roles');
                this.role_tableDate = result.data;
                console.log(result);
            },
            async deleteTag(rightId,role){
              const confirm = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err=>err);
              if(confirm!='confirm'){
                  this.$message.warning('已取消请求');
              }else{
                  const {data:result} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
                  role.children = result.data;
              }
            },
            //为修改栏提供默认角色信息
            async showEditMessage(id){
                const {data:result} = await this.$http.get(`roles/${id}`);
                if(result.meta.status==200){
                    this.$message.success(result.meta.msg);
                    this.role_updateForm=result.data;
                }else {
                    this.$message.error(result.meta.msg);
                }
                this.role_update_dialogVisible=true;
            },
            //添加角色
            submitAddForm() {
                this.$refs['role_addFormRef'].validate(async valid => {
                    if (valid) {
                        const {data: result} = await this.$http.post("roles", this.role_addForm);
                        if (result.meta.status == 201) {
                            this.$message.success(result.meta.msg);
                            this.closeAddDialog();
                            this.getRolesList();
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
                this.role_add_dialogVisible = false;
                this.$refs['role_addFormRef'].resetFields();
            },
            //重置修改表单
            closeUpdateDialog(){
                this.role_update_dialogVisible = false;
                this.$refs['role_updateFormRef'].resetFields();
            },
            //删除角色信息
            showDeleteMessage(userInfo){
                this.role_delete_dialogVisible=true;
                this.role_updateForm=userInfo;
            },
            async submitUpdateForm(){
                const {data:result} = await this.$http.put(`roles/${this.role_updateForm.roleId}`, this.role_updateForm);
                if (result.meta.status == 200) {
                    this.$message.success(result.meta.msg);
                    this.closeUpdateDialog();
                    this.getRolesList();
                } else {
                    this.$message.error(result.meta.msg);
                }
            },
            async deleteRole(){
                const {data: result} = await this.$http.delete(`roles/${this.role_updateForm.id}`);
                if (result.meta.status == 200) {
                    this.$message.success(result.meta.msg);
                    this.role_delete_dialogVisible=false;
                    this.getRolesList();
                } else {
                    this.$message.error(result.meta.msg);
                }
            },
             showAllotMessage(){
                this.role_allot_dialogVisible=true;
            }
        }
    }
</script>
<style lang="less" scoped>
    .role_table{

        .role_table_header{
            display: flex;
        }
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-tag{
        margin: 7px;
    }
    .bdtop{
        border-top: 1px solid #eee;
    }
    .bdbottom{
        border-bottom: 1px solid #eee;
    }
    .v-center{
        display: flex;
        align-items: center;//纵向居中
    }
</style>