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
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="所属店铺">
                                    <span>{{ props.row.shop }}</span>
                                </el-form-item>
                                <el-form-item label="商品 ID">
                                    <span>{{ props.row.id }}</span>
                                </el-form-item>
                                <el-form-item label="店铺 ID">
                                    <span>{{ props.row.shopId }}</span>
                                </el-form-item>
                                <el-form-item label="商品分类">
                                    <span>{{ props.row.category }}</span>
                                </el-form-item>
                                <el-form-item label="店铺地址">
                                    <span>{{ props.row.address }}</span>
                                </el-form-item>
                                <el-form-item label="商品描述">
                                    <span>{{ props.row.desc }}</span>
                                </el-form-item>
                            </el-form>
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
</style>