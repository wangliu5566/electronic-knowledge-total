<template>
  <div class="adddata">
   <div class="top">
       <Button type="primary" @click='$router.push("Database")'>返回列表</Button>
   </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="数据库名称：" prop="name">
            <Input v-model="formValidate.name" style="width:520px" placeholder=""></Input>
        </FormItem>
        <FormItem label="数据库链接：" prop="link">
            <Input v-model="formValidate.link" style="width:520px" placeholder=""></Input>
        </FormItem>
        <FormItem label="出版方：" prop="publish">
            <Input v-model="formValidate.publish" style="width:520px" placeholder=""></Input>
        </FormItem>
        <FormItem label="资源类型：">
            <Row style="width:600px">
                <Col span='8'>
                    <FormItem  prop="resourceTypeId">
                        <Select v-model="formValidate.resourceTypeId" style="width:200px">
                            <Option v-for="item in dataClass" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col  span='13' class='selectHint'>
                    <FormItem label="学科：" prop="subjectId">
                        <Select v-model="formValidate.subjectId" multiple  style="width:200px">
                            <Option v-for="item in subjectClass" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem> 
                </Col>
            </Row>
        </FormItem>
        <FormItem label="语种：">
            <Row style="width:600px">
                <Col span='8'>
                    <FormItem  prop="languageId">
                        <Select v-model="formValidate.languageId" style="width:200px">
                            <Option v-for="item in languageClass" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span='13' class='selectHint'>
                    <FormItem label="内容：" prop="contentTypeId">
                        <Select v-model="formValidate.contentTypeId" style="width:200px">
                            <Option v-for="item in contentClass" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem> 
                </Col>
            </Row>
        </FormItem>
        <FormItem label="简介：" prop="intro">
            <Input v-model="formValidate.intro" type='textarea' :autosize="{minRows:6,maxRows: 6}" style="width:520px" placeholder=""></Input>
        </FormItem>
        <FormItem label="选择教程：" >
            <Row>
                <Col >  
                    <Upload ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccessdata"
                        :data='photo'
                        :on-format-error="handleFormatError"
                        :before-upload="handleUpload"
                        action="http://eknowledge.jqweike.com/v1/admin/file/upload">
                       <Button type="primary" style='margin-left: 10px'>上传</Button>
                    </Upload>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Row>
                <div v-for='item in resourceArr' class="list" :style="{backgroundImage:'url('+'/static/img/'+formatClass(item.ext)+'.jpg)',backgroundSize:' 100% 100%'}">
                    <span>{{item.name}}</span><span @click='removedata(item.id)'>删除</span>
                </div>
            </Row>
        </FormItem>
        <FormItem label="资源封面：" prop="coverImage">
            <Row>
                <Col style='float: left'>
                    <FormItem prop="coverImage">
                        <Input v-model="formValidate.coverImage" style="width:300px" placeholder=""></Input>
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
                <span v-if='formValidate.coverImage' @click='handleRemove'>X</span>
                <img :src="coverImage" alt="">
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
            const validatesubjectId = (rule, value, callback) => {
                if (value.length==0) {
                    return callback(new Error('学科不能为空'));
                } else {
                    callback();
                }
            };
            return {
                baseUrl: baseUrl,
                formValidate: {
                    name: '',
                    link: '',
                    publish: '',
                    coverImage: '',
                    resourceTypeId: '',
                    subjectId: [],
                    languageId: '',
                    contentTypeId: '',
                    intro: '',
                    resource: [],
                },
                resourceArr: [],
                contentClass: [],
                languageClass: [],
                subjectClass: [],
                dataClass: [],
                coverImage: '',
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
                    publish: [{
                        required: true,
                        message: '出版方不能为空',
                        trigger: 'blur'
                    }],
                    coverImage: [{
                        required: true,
                        message: '资源封面不能为空',
                        trigger: 'change'
                    }],
                    resourceTypeId: [{
                        required: true,
                        message: '资源类型不能为空',
                        trigger: 'change'
                    }],
                    subjectId: [{
                        validator: validatesubjectId,
                        trigger: 'change'
                    }],
                    languageId: [{
                        required: true,
                        message: '语种不能为空',
                        trigger: 'change'
                    }],
                    contentTypeId: [{
                        required: true,
                        message: '内容不能为空',
                        trigger: 'change'
                    }],
                    intro: [{
                        required: true,
                        message: '简介不能为空',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            //            删除教程
            removedata(id) {
                for (var i = 0; i < this.resourceArr.length; i++) {
                    if (this.resourceArr[i].id == id) {
                        this.resourceArr.splice(i, 1);
                        break;
                    }
                }
            },
            //            获取内容分类列表
            getContent() {
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/content-type/list', {
                    params: this.token()
                }).then((res) => {
                    res.data.data.map((item) => {
                        this.contentClass.push({
                            value: item.contentTypeId,
                            label: item.name
                        })
                    })
                })
            },
            //            获取语种列表
            getLanguage() {
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/language/list', {
                    params: this.token()
                }).then((res) => {
                    res.data.data.map((item) => {
                        this.languageClass.push({
                            value: item.id,
                            label: item.name
                        })
                    })
                })
            },
            //            获取学科列表
            getSubject() {
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/subject/list', {
                    params: this.token()
                }).then((res) => {
                    res.data.data.map((item) => {
                        this.subjectClass.push({
                            value: item.subjectId,
                            label: item.name
                        })
                    })
                })
            },
            //            获取资源类型列表
            getDataType() {
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/resource-type/list', {
                    params: this.token()
                }).then((res) => {
                    res.data.data.map((item) => {
                        this.dataClass.push({
                            value: item.typeId,
                            label: item.name
                        })
                    })
                })
            },
            handleUpload(file) {
                this.photo = {
                    file: file.name
                }
                return true
            },
            handleRemove() {
                this.formValidate.coverImage = ''
            },
            //图片上传成功
            handleSuccess(res, file) {
                this.formValidate.coverImage = res.data.path
                this.coverImage = res.data.url
            },
            //教程上传成功
            handleSuccessdata(res, file) {
                this.resourceArr.push(res.data)
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
                        this.formValidate.resource=[]
                        this.resourceArr.map((item) => {
                            this.formValidate.resource.push(item.id)
                        })
                        this.$http.post('http://eknowledge.jqweike.com/v1/admin/database/modify',
                            this.token(this.formValidate)
                        ).then((res) => {
                            if(res.status==200){
                                this.$router.push("Database")
                                this.$Message.success('修改成功')
                            }
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            getdetail(){
               this.$http.get('http://eknowledge.jqweike.com/v1/admin/database/detail', {
                    params: this.token({
                        databaseId:this.$route.query.id
                    })
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.coverImage=res.data.data.imagePath
                        this.formValidate=res.data.data
                        this.formValidate.databaseId=parseInt(res.data.data.id)
                        this.resourceArr=res.data.data.file
                    }
                }) 
            },
        },
        mounted() {
            this.getDataType()
            this.getSubject()
            this.getLanguage()
            this.getContent()
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
        .list {
            float: left;
            margin-right: 20px;
            width: 176px;
            height: 175px;
            overflow: hidden;
            span:first-child {
                display: inline-block;
                width: 176px;
                margin-top: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 24px;
                float: left;
            }
            span:last-child {
                color: red;
                float: right;
                cursor: pointer;
                margin-right: 10px;
            }
        }
        .selectHint {
            .ivu-form-item-error-tip {
                margin-left: 120px
            }
        }
        .page {
            margin-top: 15px;
            & {
                float: right
            }
        }
    }

</style>
