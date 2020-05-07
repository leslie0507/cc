<template>
    <div :style="{width:widthStatus?'100%;':''}" >
        <el-upload
            ref="uploadFile"
            class="upload-demo"
            action="/data/uploadExcel"
            :http-request="uploadImg" 
            :limit="limit"
            multiple
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :show-file-list="false" >
            <slot>

            </slot>
        </el-upload>
    </div>
</template>

<script>
import { uploadFile,checkStatus } from '@/api/index';
let timer;
export default {
    props:{
        type:{
            default:1, //1 销售数据 2 物流数据 3 专卖户数据 4 案件数据 5 市管员数据
        },
        widthStatus:{
            default:true
        }
    },
    data(){
        return {
            limit:5
        }
    },
    methods:{
       uploadImg(val){
            const loading = this.$loading({
                lock: true,
                text: '文件上传中。。。',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            
            let formData = new FormData();
            formData.append('importUploader', val.file)
            formData.append('type', this.type)
            uploadFile(formData).then(res => {
                console.log(res)
                if(!this.respSuccess(res)){
                    loading.close();
                    this.resNotice.warning(res.msg,this.respMessage(res))
                    return
                }
                timer && clearInterval(timer);
                timer = setInterval(()=>{
                    checkStatus({
                        token:res.data
                    }).then(res =>{
                        console.log(res,res.code == 1000)
                        if(res.code == 1000){
                            loading.close();
                            timer && clearInterval(timer);
                            this.$emit('uploadSuccess',true)
                        }
                    })
                },2000)
                
            }).catch((err) => {
                loading.close();
                console.log(err, 'error');
            });
        },
        chengeArea(){
            this.$emit('chooseArea',this.form)
        },
    }
}

</script>


<style>
.el-upload {
    width:100%;
}
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

</style>
