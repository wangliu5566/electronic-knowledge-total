<template>
  <div class="adddata">
   <div class="top">
       <Button type="primary" @click='$router.push("Press")'>返回列表</Button>
   </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="资源名称：" prop="name">
            <Input v-model="formValidate.name" style="width:520px" placeholder=""></Input>
        </FormItem>
        <FormItem label="数据库链接：" prop="link">
            <Input v-model="formValidate.link" style="width:520px" placeholder=""></Input>
        </FormItem>
        <FormItem label="出版方：" prop="pubName">
            <Input v-model="formValidate.pubName" style="width:520px" placeholder=""></Input>
        </FormItem>
        <FormItem label="资源封面：" prop="banner">
            <Row>
                <Col style='float: left'>
                    <FormItem prop="banner">
                        <Input v-model="formValidate.banner" style="width:300px" placeholder=""></Input>
                    </FormItem>
                    
                </Col>
                <Col >  
                    <Upload ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :data='photo'
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleUpload"
                        action="http://eknowledge.jqweike.com/v1/admin/file/coverImage">
                       <Button type="primary" style='margin-left: 10px'>上传</Button>
                    </Upload>
                </Col>
            </Row>
        </FormItem>
        <FormItem label=" " >
           <div class="cover">
                <span v-if='formValidate.banner' @click='handleRemove'>X</span>
                <img :src="banner" alt="">
           </div>
        </FormItem>
        <FormItem>
            <Button  type="success"  style='margin-left:300px' @click="handleSubmit('formValidate')">确认提交</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
    export default {
        data() {
            const validatename= (rule, value, callback) => {
                var reg =/[\u4e00-\u9fa5\w]+/;
                var reg1 = /[A-Za-z]/i;
                if (!value){
                    return callback(new Error('资源名称不能为空'));
                } else if (/[0-9]/.test(value[0])) {
                    return callback(new Error('资源名称开头只能为中文或英文'));
                }else if (!reg.test(value[0])) {
                    return callback(new Error('资源名称开头只能为中文或英文'));
                }  else {
                    callback();
                }
            };
            return {
                baseUrl: baseUrl,
                formValidate: {
                    name: '',
                    link: '',
                    pubName: '',
                    banner: ''
                },
                model1: '',
                banner: '',
                photo: {},
                ruleValidate: {
                    name: [{
                        validator: validatename,
                        trigger: 'blur'
                    }],
                    link: [{
                        required: true,
                        message: '数据库链接不能为空',
                        trigger: 'blur'
                    }],
                    pubName: [{
                        required: true,
                        message: '出版方不能为空',
                        trigger: 'blur'
                    }],
                    banner: [{
                        required: true,
                        message: '资源封面不能为空',
                        trigger: 'change'
                    }],
                }
            }
        },
        methods: {
            handleUpload(file) {
                this.photo = {
                    file: file.name
                }
                return true
            },
            handleRemove() {
                this.formValidate.banner = ''
                this.banner = ''
            },
            //图片上传成功
            handleSuccess(res, file) {
                this.formValidate.banner = res.data.path
                this.banner = res.data.url
            },
            handleFormatError(file) {
                this.$Message.warning('上传失败');
            },
            handleMaxSize(file) {
                this.$Message.warning('封面不能超过2M');
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('http://eknowledge.jqweike.com/v1/admin/publish-company/modify',
                            this.token(this.formValidate)
                        ).then((res) => {
                            if(res.status==200){
                                this.$router.push("Press")
                                this.$Message.success('修改成功')
                            }
                        })
                    } else {
                        //                        this.$Message.error('Fail!');
                    }
                })
            },
            getdetail(){
               this.$http.get('http://eknowledge.jqweike.com/v1/admin/publish-company/detail', {
                    params: this.token({
                        companyId:this.$route.query.id
                    })
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.banner=res.data.data.bannerUrl
                        this.formValidate=res.data.data
//                        this.formValidate.companyId=parseInt(res.data.data.companyId)
                    }
                }) 
            },
        },
        mounted() {
            this.getdetail()
        }

    }

</script>
<style lang="less">
    .adddata {
        .top {
            margin-bottom: 25px;
            .search {
                float: right
            }
        }
        .cover {
            width: 500px;
            height: 300px;
            background-color: #eee;
            position: relative;
            img {
                width: 500px;
                height: 300px;
            }
            span {
                width: 20px;
                position: absolute;
                color: #fff;
                text-align: center;
                left: 480px;
                cursor: pointer;
                z-index: 2
            }
        }
    }

</style>
