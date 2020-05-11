<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="role_table">
            <div class="role_table_header">
                <el-button type="primary">添加角色</el-button>
            </div>
            <template>
                <el-table border stripe
                        :data="role_tableDate"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-row :class="['bdbottom',i1===0?'bdtop':'','v-center']" v-for="(item1,i1) in props.row.children" :key="item1.id">
                                <el-col :span="5">
                                       <el-tag closable  @close="deleteTag()">{{item1.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="19">
                                    <!--通过for循环嵌套二级菜单-->
                                    <el-row :class="[i2===0?'':'bdtop','v-center']" v-for="(item2,i2) in item1.children" :key="item2.id">
                                        <el-col :span="6">
                                            <el-tag type="success" closable  @close="deleteTag()">{{item2.authName}}</el-tag>
                                            <i class="el-icon-caret-right"></i>
                                        </el-col>
                                        <el-col :span="18">
                                            <el-tag type="warning" closable  @close="deleteTag()" v-for="(item3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
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
                                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
    </div>
</template>
<script>
    export default {
        created() {
            this.getRolesList();
        },
        data(){
            return{
                role_tableDate: []
            }
        },
        methods:{
            async getRolesList(){
                const {data:result}  = await this.$http.get('roles');
                this.role_tableDate = result.data;
                console.log(result);
            },
            deleteTag(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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