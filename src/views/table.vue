<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column
                    prop="date"
                    label="日期">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="状态">
                <template slot-scope="scope">
                    <i class="el-icon-warning"></i>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleEditRow(scope.row)">编辑</el-button>
                </template >
            </el-table-column>
        </el-table>
        <el-dialog
                :visible.sync="editDialogVisible"
                title="编辑"
                :before-close="handleDialogClose">
            <el-form ref="editForm" :model="editRow" label-width="80px" style="width: 100%">
                <el-form-item label="date">
                    <el-date-picker
                            v-model="editRow.date"
                            type="date"
                            placeholder="请选择日期"
                            value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSave">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
/**
 * Created by fuzl on 2017-10-31.
 */
export default {
	data(){
		return {
			tableData: [{date: "2017-11-7"}],
			selectedRow: {},
			editRow: {},
			editDialogVisible: false
		}
	},
	methods: {
		handleEditRow(row){
			this.selectedRow = row
			this.editRow = Object.assign({}, row)
			this.editDialogVisible = true
		},
		handleSave(){
			this.editDialogVisible = false
			this.selectedRow.date = this.editRow.date.toLocaleString()
		},
		handleDialogClose(close){
			this.$confirm("确认关闭？").then(() => {
				close()
			}).catch(() => {})
		}
	}
}
</script>
<style></style>