<template>
  <div class="cultivate">   
   <Row>
       <Col style="width: 250px;float: left">
            <RadioGroup v-model="selsectId" vertical @on-change='changeId'>
               <Radio v-for="(option, index) in data" :label="index" :key='index'>
                    <span>{{option.title}}</span>
                </Radio>
            </RadioGroup>
            <div @click='addCultivate' style="display: flex;;align-items:center;margin-top: 20px;cursor: pointer"> <Icon type="ios-plus-outline" size='60' @click='addCultivate'></Icon><span style="line-height:60px">增加栏目</span></div>
        </Col>
        <Col style="width: 450px;float: left">
            <h3 v-if='!formValidate.trainId' style="margin-left: 30px">新增</h3>
            <h3 v-if='formValidate.trainId' style="margin-left: 30px">修改</h3>
             <Form ref="formVali" :model="formValidate" :rules="ruleValidate" :label-width="90">
                <FormItem label="标题：" prop="title">
                    <Input v-model="formValidate.title" placeholder=""></Input>
                </FormItem>
                <FormItem label="内容：" prop="content">
                    <Input v-model="formValidate.content" type="textarea" :autosize="{minRows:8,maxRows:8}" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button  type="success" v-if='formValidate.trainId' style='margin-left:150px' @click="handleSubmit('formVali')">保存</Button>
                    <Button  type="error" v-if='formValidate.trainId' style='margin-left:30px' @click="remove(formValidate.trainId)">删除</Button>
                    <Button  type="success" v-if='!formValidate.trainId' style='margin-left:250px' @click="handleadd('formVali')">新增</Button>
                </FormItem>
            </Form>
        </Col>
   </Row>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                data: [],
                selsectId: '',
                formValidate: {
                    trainId: '',
                    title: '',
                    content: '',
                },
                ruleValidate: {
                    title: [{
                        required: true,
                        message: '标题不能为空',
                        trigger: 'blur'
                    }],
                    content: [{
                        required: true,
                        message: '内容不能为空',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            addCultivate() {
                this.$refs.formVali.resetFields();
                this.selsectId = ''
                this.formValidate = {
                    trainId: '',
                    title: '',
                    content: '',
                }
            },
            handleadd(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('http://eknowledge.jqweike.com/v1/academic/train/add',
                            this.token({
                            title:this.formValidate.title,
                            content:this.formValidate.content,
                        })
                        ).then((res) => {
                            if (res.data.status == 200) {
                                this.$refs[name].resetFields();
                                this.selsectId = ''
                                this.formValidate = {
                                        trainId: '',
                                        title: '',
                                        content: '',
                                    },
                                    this.getlist()
                                this.$Message.success('新增成功')
                            }
                        })
                    } else {
                        //                        this.$Message.error('Fail!');
                    }
                })
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post('http://eknowledge.jqweike.com/v1/academic/train/modify',
                            this.token(this.formValidate)
                        ).then((res) => {
                            if (res.data.status == 200) {
                               
                                    this.getlist()
                                this.$Message.success('修改成功')
                            }
                        })
                    } else {
                        //                        this.$Message.error('Fail!');
                    }
                })
            },
            remove(id) {
                this.$http.post('http://eknowledge.jqweike.com/v1/academic/train/del',
                    this.token({
                        trainId: id
                    })
                ).then((res) => {
                    if (res.data.status == 200) {
                        this.selsectId = ''
                        this.formValidate = {
                                trainId: '',
                                title: '',
                                content: '',
                            },
                            this.getlist()
                        this.$Message.success('删除成功')
                    }
                })
            },
            changeId(val) {
                console.log(val)
                this.formValidate.trainId = this.data[val].id
                this.formValidate.title = this.data[val].title
                this.formValidate.content = this.data[val].content
            },
            getlist() {
                this.$http.get('http://eknowledge.jqweike.com/v1/academic/train/list', {
                    params: this.token()
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.data = res.data.data
                    }
                })
            }
        },
        mounted() {
            this.getlist()
        }

    }

</script>
<style lang="less">
    .cultivate {}

</style>
