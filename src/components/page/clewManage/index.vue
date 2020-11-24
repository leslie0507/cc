/**
 * 线索管理
*/
<template>
    <div style="height:100%;">
        <div class="static" style="position: relative;">
            <div class="search-input" style="position: absolute;z-index: 9;top: 7px; right: 24px;display: flex;justify-content: space-around;align-items: center;">
                <ownInput  clearable @change="search" v-model="searchInput" placeholder="请输入各种证号或姓名"></ownInput>
                <ownInput class="icon-search" style="padding: 0 !important;border-radius: 0px 4px 4px 0px;width:47px;height:40px;box-sizing: border-box;color:#DCDFE6;border:1px solid #DCDFE6;font-size:16px;" plain @click="search"></ownInput>
                <!-- <ownInput clearable placeholder="请输入各种证号或姓名" style="width:320px;height:40px;" v-model="searchInput" @change="search">
                    <i
                        class="icon-search el-input__icon"
                        slot="suffix">
                    </i>
                </ownInput> -->
            </div>
        </div>
        
        <el-tabs style="height:100%" v-model="activeName">
            
            <el-tab-pane label="专卖户" name="first">
                <div class="first-wrapepr-content">
                   <div class="first-wrapper">
                        <el-table
                            :data="pageOneData"
                            v-loading="pageOne.loading"
                            style="width: 100%">
                            <el-table-column
                            label="许可证号"
                            width="120"
                            show-overflow-tooltip
                            prop="license_code">
                            </el-table-column>
                            <el-table-column
                            label="客户名称"
                            width="230"
                            show-overflow-tooltip
                            prop="shop_name">
                            </el-table-column>
                            <el-table-column
                            label="负责人"
                            prop="shop_head_user"
                            show-overflow-tooltip
                            width="70">
                            </el-table-column>
                            <el-table-column
                            label="负责人身份证号"
                            width="170"
                            show-overflow-tooltip
                            prop="lingshou_user_card_number">
                            </el-table-column>
                            <el-table-column
                            label="联系人"
                            width="70"
                            prop="contact_user">
                            </el-table-column>
                            <el-table-column
                            label="联系人电话"
                            width="120"
                            show-overflow-tooltip
                            prop="contact_user_phone">
                            </el-table-column>
                            <el-table-column
                            label="监管等级"
                            width="120"
                            prop="desc">
                            <template slot-scope="scope">
                                <div class="gradeImg-wrapper">
                                    <div class="gradeImg" v-for="i in scope.row.jianguan" :key="i">
                                        <img src="../../../assets/img/grade.png" alt="">
                                    </div>
                                    <img v-if="scope.row.jianguan<=3" class="refresh" @click="refreshGrade(scope.row)" src="../../../assets/img/change_grade.png" alt="">
                                    <!-- <div class="refresh" @click="refreshGrade(scope.row)"></div> -->
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="案底数"
                            prop="caseNum">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                
                <div class="footer">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="pageOne.total"
                        @current-change="currentChangeOne">
                    </el-pagination>
                </div>
            </el-tab-pane>
             <el-tab-pane label="非法经营户" name="second">
                <div class="first-wrapepr-content">
                    <div class="first-wrapper">
                         <el-table
                            :data="pageTwoData"
                            v-loading="pageTwo.loading"
                            style="width: 100%">
                            <el-table-column
                            label="姓名（企业名称）"
                            prop="shop_name">
                            </el-table-column>
                            <el-table-column
                            label="曾用名"
                            prop="cengyongming">
                            </el-table-column>
                            <el-table-column
                            label="身份证号"
                            prop="anjian_number">
                            </el-table-column>
                            <el-table-column
                            label="联系电话"
                            prop="anjian_phone">
                            </el-table-column>
                            <el-table-column
                            label="监管等级"
                            prop="desc">
                            <template slot-scope="scope">
                                <div class="gradeImg-wrapper">
                                    <div class="gradeImg" v-for="i in 5">
                                        <img src="../../../assets/img/grade.png" alt="">
                                    </div>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="案底数"
                            prop="caseNum">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                
                <div class="footer">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="pageTwo.total"
                        @current-change="currentChangeTwo">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        
        <el-dialog
            title="监管等级调整"
            width="400px"
            :visible.sync="deleteVisible"
            >
            <div class="dialog-content">
                <div v-if="cancleStar<3" style="display:flex;align-item:center;">
                    是否将{{setShopData.shop_head_user}}标记为
                    <div class="gradeImg-wrapper" style="margin:0 4px;">
                        <div class="gradeImg" v-for="i in 3" :key="i">
                            <img src="../../../assets/img/grade.png" alt="">
                        </div>
                    </div>？
                </div>
                <div v-if="cancleStar<3" style="color:rgba(180, 180, 184, 1);font-size:12px;margin-top:10px;">提示：有线索指向的专卖户可人工调升其监管等级</div>

                <div v-if="cancleStar==3" style="display:flex;align-item:center;">是否取消{{setShopData.shop_head_user}}
                    <div class="gradeImg-wrapper" style="margin:0 4px;">
                        <div class="gradeImg" v-for="i in setShopData.jianguan" :key="i">
                            <img src="../../../assets/img/grade.png" alt="">
                        </div>
                    </div>标记？
                </div>
                <div v-if="cancleStar==3" style="color:rgba(180, 180, 184, 1);font-size:12px;margin-top:10px;">提示：取消后将还原为系统设定的监管等级</div>
            </div>
            <div slot="footer" class="dialog-footer" style="padding-right: 43px;">
                <el-button @click="deleteVisible = false">取消</el-button>
                <el-button type="primary" @click="setShopStart">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { setShopStart,queryZhuanMaiHuList,queryFeifaShop } from '@/api/data';
export default {
    name: 'basetable',
    data() {
        return {
            cancleStar:0,
            setShopData:[],
            pageOne:{
                loading:false,
                total:0,
                pageIndex:1,
                pageSize:10
            },
            pageOneData:[],
            pageTwoData:[],
            pageTwo:{
                loading:false,
                total:0,
                pageIndex:1,
                pageSize:10
            },
            type:1,  // 1 设置部门   2 添加市管理 
            deleteVisible:false,
            activeName:'first',
            formInline: {
                user: '',
                region: '',
                desc:''
            },
            searchInput:'',
            settingForm:{
                name:'',
                phopne:''
            },
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.init();
    },
    methods: {
        currentChangeOne(val){
            this.pageOne.pageIndex = val;
            this.queryZhuanMaiHuList();
        },
        currentChangeTwo(val){
            this.pageTwo.pageIndex = val;
            this.queryFeifaShop();
        },
        setShopStart(){
            setShopStart({
                license_code:this.setShopData && this.setShopData.license_code
            }).then(res=>{
                if(!this.respSuccess(res)){
                    this.resNotice.warning('重置监管等级失败',this.respMessage(res))
                    return
                }
                this.deleteVisible =false;
                this.queryZhuanMaiHuList();
            })
        },
        init(){
            this.queryFeifaShop();
            this.queryZhuanMaiHuList();
        },
        queryFeifaShop(){
            this.pageTwo.loading = true;
            queryFeifaShop({
                keyword:this.pageTwo.keyword,
                pageIndex:this.pageTwo.pageIndex,
                pageSize:this.pageTwo.pageSize
            }).then(res=>{
                console.log(res)
                if(!this.respSuccess(res)){
                    this.resNotice.warning('非专卖户获取失败',this.respMessage(res))
                    return
                }
                this.pageTwoData = res.data.list;
                console.log(this.pageTwoData)
                this.pageTwo.total = res.data.count;
                this.pageTwo.loading = false;
            })
        },
        queryZhuanMaiHuList(){
            this.pageOne.loading = true;
            queryZhuanMaiHuList({
                keyword:this.pageOne.keyword,
                pageIndex:this.pageOne.pageIndex,
                pageSize:this.pageOne.pageSize
            }).then(res=>{
                
                if(!this.respSuccess(res)){
                    this.resNotice.warning('专卖户获取失败',this.respMessage(res))
                    return
                }
                this.pageOneData = res.data.list;
                console.log(this.pageOneData)
                this.pageOne.total = res.data.count;
                this.pageOne.loading = false;
            })
        },
        search(){
            console.log(this.searchInput)
            console.log(this.activeName)
            console.log('12')
            if(this.activeName=='first') {
                this.pageOne.keyword = this.searchInput;
                this.queryZhuanMaiHuList();
            } else {
                this.pageTwo.keyword = this.searchInput;
                this.queryFeifaShop();
            }
        },
        refreshGrade(item){
            this.cancleStar = item.jianguan;
            this.setShopData = item;
            this.deleteVisible = true;
        },
        setSection(){
            this.outerVisible = true;
            this.type = 1;
        },
        addManage(){
            this.outerVisible = true;
            this.type = 2;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style lang="scss" scoped>
/deep/.el-button--default:hover,/deep/.el-button--default:active, /deep/.el-button--default:focus {
    background:#fff !important;
    border: 1px solid rgb(220, 223, 230) !important;
    color:#1f5dea;
}
/deep/.el-input__inner:hover,/deep/.el-input__inner:focus {
    
}
/deep/.el-button--primary:hover, /deep/.el-button--primary:active, /deep/.el-button--primary:focus {
    border: 1px solid rgb(220, 223, 230) !important;
}
/deep/ .el-input .el-input__suffix {
    top: 3px;
    right: 10px;
    .icon-search {
        &::before {
            font-size: 14px;
        }
    }
}
/deep/ .search-input{
    .el-input .el-input__inner {
        &:hover,&:focus {
            border-color: rgb(220, 223, 230) !important;
        }
        height: 40px;
        border-radius: 5px;
        border-right:none;
        border-radius: 4px 0 0 4px;
        
        font-size: 14px;
    }
}
.gradeImg-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .gradeImg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & + .gradeImg {
            margin-left: 3px;
        }
        img {
            width: 17px;
            
        }
    }
    .refresh {
        cursor: pointer;
        margin-left: 10px;
        width: 17px;
        height: 17px;
    }
}
/deep/ .el-table .cell {
    font-size: 14px;
}
/deep/ .el-table tr:hover {
    background: #ffffff !important;
}
/deep/ .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
}
/deep/ .el-table__body {
    background-color: rgba(255, 255, 255, 0);
    border-collapse:separate; 
    border-spacing:0px 9px;
}
/deep/.el-table{
    background-color: rgba(255, 255, 255, 0.56);
    .el-table__header-wrapper {
        background:rgba(255,255,255,1) !important;
        .el-table__header thead tr th div{
            background:rgba(255,255,255,1) !important;
            opacity:1;
            border-radius:4px;
            font-size:14px;
            font-weight:400;
            word-break: keep-all;
            color:rgba(180,180,184,1) !important;
        }
    }
} 

.dialog-content {
    font-size:14px;
    font-weight:400;
    line-height:24px;
    color:rgba(26,28,41,1);
    opacity:1;
    span {
        color: rgba(31, 93, 234, 1);
    }
}
/deep/ .has-gutter{
    background:rgba(235, 236, 240, 1);

    tr>th>div {
        font-size:14px;
        font-weight:bold;
        color:rgba(26,28,41,1);
        // text-align: center;
    }
    
}
.first-wrapper {
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:72px;
        background:rgba(255,255,255,1);
        opacity:1;
        border-radius:4px;
        padding:0 14px;
        box-sizing: border-box;
        margin-bottom: 8px;
        .left {
            span{
                &:nth-child(2) {
                    color: rgba(31, 93, 234, 1);
                    font-weight: bold;
                }
            }
        }
        .right {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                letter-spacing: .5px;
                width:190px;
                height:34px;
                font-size: 12px;
                line-height:18px;
                color: rgba(180, 180, 184, 1);
                text-align: center;
                a {
                    color: rgba(31, 93, 234, 1);
                }
                margin-right: 14px;
            }
        }
    }
    
}
.setting-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    .label {
        color: rgba(26, 28, 41, 1);
    }
}
.first-wrapepr-content {
    padding: 14px 24px 39px;
    border-radius: 8px;
    background:rgba(255,255,255,.56);
}
.footer {
    width: 100%;
    margin-top: 19px;
    text-align: center;
}
// /deep/ .el-tabs__header {
//     height: 60px;
// }
/deep/ .el-tabs__nav {
    .is-active {
        color: rgba(26, 28, 41, 1) !important;
    }
    .el-tabs__item {
        height: 55px;
        line-height: 55px;
        font-size:20px;
        font-weight:400;
        color:rgba(140, 140, 143, 1);
    }
}
/deep/ .el-tabs {
    
    .el-tabs__header {
        margin: 0;
        background-color: #f6f7fb;
    }
}
/deep/ .el-tabs__nav-scroll {
    padding-left: 20px;
    .el-tabs__active-bar {
        height:3px;
        background:rgba(31,93,234,1);
        border-radius:10px;
    }
}
// /deep/ .el-form-item__content {
//     width: 200px;
// }
/deep/ .el-textarea__inner {
    height: 100px;
}
/deep/ .el-tabs__content {
    height: 94%;
    #pane-first,#pane-second {
        height: 100%;
    }
    
    .first-wrapepr-content {
        height: 84%;
    }
}
</style>
