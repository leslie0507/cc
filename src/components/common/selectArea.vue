<template>
    <div>
        <el-row  type="flex" justify="space-between">
            <el-col :span="24">
                <el-form-item :label="areaText+'地址'">
                    <el-col :span="8">
                        <el-form-item prop="date1">
                            <el-select v-model="form.province" placeholder="省" @change="chengeProvince">
                                <el-option :label="item.name" :value="item.name" v-for="(item,index) in listData" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="margin:0;">
                        <el-form-item prop="date1" class="middle-item">
                            <el-select v-model="form.city" placeholder="市" :disabled="!form.province" @change="chengeCity">
                                <el-option :label="item.name" :value="item.name" v-for="(item,index) in cityData" :key="index" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="date1">
                            <el-select v-model="form.area" placeholder="区县" :disabled="!form.city || !form.province" @change="chengeArea">
                                <el-option :label="item.name" :value="item.name" v-for="(item,index) in areaData" :key="index" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { site_address } from '@/components/common/address';
export default {
    props:{
        areaText:{
            default:'收件'
        },
        areaObj:{},
        defaultArea:{
            default:''
        }
    },
    data() {
        return {
            listData: site_address,
            cityData: [],
            areaData:[],
            form:{
                province:'',
                city:'',
                area:'',
            }
        }
    },
    created(){
        console.log(site_address)
        if(this.defaultArea==1) {
            const role = JSON.parse(sessionStorage.getItem('ms_user'));
            this.form.province = role.yancao_provinces;
            this.chengeProvince(this.form.province)
            this.form.city = role.yancao_city;
            this.chengeCity(this.form.city)
            this.form.area = role.yancao_area;
            this.$emit('chooseArea',this.form)
        }
    },
    watch:{
        areaObj:{
            handler: function (val, oldVal) {
                console.log(val, oldVal)
                if(val) {
                    this.form.area = val.area
                    this.form.city = val.city
                    this.form.province = val.provinces
                    
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods:{
        chengeProvince(val){
            site_address.map(item =>{
                if(item.name == val) {
                    this.cityData = item.children
                }
            })
            this.form.city = '';
            this.form.area = '';
            console.log('++++++++++++________',val,'000')
            this.$emit('chooseArea',this.form)
        },
        chengeCity(val){
            this.cityData.map(item =>{
                if(item.name == val) {
                    this.areaData = item.children
                }
            })
            this.form.area = '';
            console.log(val)
            this.$emit('chooseArea',this.form)
        },
        chengeArea(){
            this.$emit('chooseArea',this.form)
        },
    }
}

</script>


<style lang="scss" scoped>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        box-shadow: 0 5px 10px #ddd;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
/deep/ .el-form-item__content {
    // &:nth-child(2) {
    //     background: red;
    // }
    .el-select {
        width: 100%;
    }
}
.middle-item {
    .el-form-item__content { 
        .el-select {
            width: 94%;
            margin-left: 3%;
        }
    }
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 22px;
}
</style>
