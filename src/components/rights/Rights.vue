<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="rights_table">
            <el-table border
                    :data="rights_tableData"
                    style="width: 100%">
                <el-table-column
                        label="#"
                        type="index">
                </el-table-column>
                <el-table-column
                        prop="authName"
                        label="权限名称">
                </el-table-column>
                <el-table-column
                        prop="path"
                        label="路径">
                </el-table-column>
                <el-table-column
                        prop="level"
                        label="等级">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level=='0'" type="primary">
                        等级一
                    </el-tag>
                    <el-tag v-else-if="scope.row.level=='1'" type="success">
                        等级二
                    </el-tag>
                    <el-tag v-else type="danger">
                        等级三
                    </el-tag>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
    export default {
        created() {
            this.getRightsList();
        },
        data(){
            return{
                rights_tableData: []
            }
        },
        methods:{
            async getRightsList(){
               const {data:result} = await this.$http.get('rights/list');
               this.rights_tableData = result.data;
            }
        }
    }
</script>
<style>

</style>