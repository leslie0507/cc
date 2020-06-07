<template>
    <div class="container">
        <div class="top">

        </div>
        <div class="middle">
            <div class="item">
                <div class="img"></div>
                <div class="btn">监 护</div>
            </div>
            <div class="item">
                <div class="img"></div>
                <div class="btn">查 询</div>
            </div>
            <div class="item">
                <div class="img"></div>
                <div class="btn">档 案</div>
            </div>
            <div class="item">
                <div class="item-child">
                    <img src="" alt="">
                    <span>设 置</span>
                </div>
                <div class="item-child">
                    <img src="" alt="">
                    <span>帮 助</span>
                </div>
                <div class="item-child">
                    <img src="" alt="">
                    <span>关闭系统</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <span>© 2019 All Rights Reserved. 重庆博恩富克医疗设备有限公司</span>
            <img src="" alt="">
        </div>
    </div>
</template>

<script>
import { Login } from '@/api/user';
import { queryPostList } from '@/api/data';
let passwordRule = (rule, value, callback)=>{
    if(value.length>=6) {
        callback();
    }else {
        callback(new Error('密码长度不能少于6位'));
    }
}
export default {
    data: function() {
        return {
            elName:'',
            curStartTime: '2019-07-31 08:00:00',
            day: '0',
            hour: '00',
            min: '00',
            second: '00',

            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: passwordRule, trigger: 'blur' }
                ],
            },
        };
    },
    created(){
    },
    mounted(){
    },
    methods: {
    },
};
</script>

<style lang="scss" scoped>

</style>