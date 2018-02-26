<template>
  <div class="database">
   <div class="top">
       <Button type="primary" @click='$router.push("AddDatabase")' size="large">新增</Button>
       <Button type="primary" size="large">批量新增</Button>
       <Button type="error"  @click='remove(selectIds)' size="large">批量删除</Button>
       <Row class="search">
        <Select v-model="model1" style="width:150px" @on-change='classListchange'>
         <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model2" v-if='model1=="类型"||model1=="学科"' style="width:150px">
         <Option v-for="item in selectlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
            <Input v-model="searchvalue" placeholder="搜索数据库" style="width: 300px" @on-enter="getlist()"></Input>
            <Button type="primary" @click="getlist()"  >搜索</Button>
       </Row>
   </div>
   <Table border :loading="loadingData" ref="selection" :columns="columns4" :data="data1" @on-selection-change='allselect' @on-select="selectItem" @on-select-cancel='delselectItem'></Table>
   
    <Row class='page'>
      <Page :total="tp" :current='cp' :page-size="ep" size="small" show-total show-sizer show-elevator :page-size-opts='[10,20,30]' @on-change="currentPageChange" @on-page-size-change="eachPageChange"></Page>
    </Row>
  </div>
</template>
<script>
    import hex_sha1 from 'crypto-js/sha1';
    export default {
        data() {
            return {
                tp: 20,
                cp: 1,
                ep: 10,
                loadingData: false,
                model1: '数据库',
                model2: '',
                searchvalue: '',
                oldkeyWord: '',
                subjectClass: [],
                dataClass: [],
                selectIds: [],
                selectlist: [],
                classList: [{
                        value: '数据库',
                        label: '数据库'
                    }, {
                        value: '类型',
                        label: '类型'
                    },
                    {
                        value: '学科',
                        label: '学科'
                    }
                ],
                columns4: [{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '数据库',
                        key: 'name',
                    },
                    {
                        title: '类型',
                        key: 'resourceTypeId',
                        render: (h, params) => {
                            return h('div', [
                                h("span", params.row.typeName ? params.row.typeName : "-")
                            ])
                        }
                    },
                    {
                        title: '学科',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h("span", params.row.subjectName ? params.row.subjectName : "-")
                            ])
                        }
                    },
                    {
                        title: '出版社',
                        key: 'publish',
                    },
                    {
                        title: '使用指南',
                         render: (h, params) => {
                             var arr=[]
                             params.row.fileExt.map((item)=>{
                                 arr.push(h('img', {
                                    attrs: {
                                        src:'/static/img/'+this.formatClass(item)+'.jpg'
                                    },
                                        style:{
                                            width:'30px',
                                            height:'30px',
                                            marginRight:'5px',
                                            cursor:'auto'
                                        }
                                }),)
                             })
                            return h('div', [...arr]);
                        }
                    },
                    {
                        title: '数据库',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                path: '/wrap/resource/EditDatabase',
                                                query: {
                                                    id: params.row.id
                                                }
                                            })
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                    },
                                    on: {
                                        click: () => {
                                            this.remove([params.row.id])
                                        }
                                    }
                                }, '删除'),
                                h(params.row.adminRecommend == 0 ? 'Button' : '', {
                                    props: {

                                    },
                                    on: {
                                        click: () => {
                                            this.recommend(params.row.id)
                                        }
                                    }
                                }, params.row.adminRecommend == 0 ? '未推荐' : '已推荐'),
                                h(params.row.adminRecommend == 1 ? 'Button' : '', {
                                    props: {
                                        type: "success"
                                    },
                                    on: {
                                        click: () => {
                                            this.recommend(params.row.id)
                                        }
                                    }
                                }, params.row.adminRecommend == 0 ? '未推荐' : '已推荐'),
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            //            第一个下拉框
            classListchange() {
                if (this.model1 == "类型") {
                    this.selectlist = this.dataClass
                    this.model2 = this.selectlist[0].value
                } else if (this.model1 == "学科") {
                    this.selectlist = this.subjectClass
                    this.model2 = this.selectlist[0].value
                } else {
                    this.selectlist = []
                    this.model2 = ''
                }
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
            //            推荐
            recommend(id) {
                this.$http.post('http://eknowledge.jqweike.com/v1/admin/database/recommend',
                    this.token({
                        databaseId: id,
                        type: 2
                    })
                ).then((res) => {
                    if (res.data.status == 200) {
                        this.getlist()
                    }
                })
            },
            //全部选择
            allselect(status) {
                if (status.length == this.data1.length) {
                    status.forEach((i) => {
                        if (this.selectIds.indexOf(i.id) == -1) {
                            this.selectIds.push(i.id)
                        }
                    })
                } else if (status.length == 0) {
                    this.data1.forEach((i) => {
                        if (this.selectIds.indexOf(i.id) > -1) {
                            this.selectIds.splice(this.selectIds.indexOf(i.id), 1)
                        }
                    })
                }
            },
            //批量操作先选ids
            selectItem(status, row) {
                if (this.selectIds.indexOf(row.id) == -1) {
                    this.selectIds.push(row.id)
                }
            },
            //批量操作先选ids
            delselectItem(status, row) {
                if (this.selectIds.indexOf(row.id) > -1) {
                    this.selectIds.splice(this.selectIds.indexOf(row.id), 1)
                }
            },
            remove(id) {
                this.$http.post('http://eknowledge.jqweike.com/v1/admin/database/del',
                    this.token({
                        databaseId: id
                    })
                ).then((res) => {
                    if (res.data.status == 200) {
                        this.getlist()
                    }
                })
            },
            currentPageChange(value) {
                this.cp = value;
                this.getlist(1);
            },
            eachPageChange(value) {
                this.selectIds = []
                this.cp = 1
                this.ep = value;
                this.getlist(1);
            },
            getlist() {
                this.loadingData = true;
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/database/list', {
                    params: this.token({
                        keyword: this.searchvalue,
                        pageSize: this.ep,
                        page: this.cp,
                        contentType: this.model1 == "类型" ? this.model2 : '',
                        subject: this.model1 == "学科" ? this.model2 : '',
                    })
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.tp = parseInt(res.data.data.total);
                        this.data1 = []
                        res.data.data.rows.forEach((item) => {
                            item = Object.assign({}, item, {
                                _checked: false
                            })
                            if (this.selectIds.indexOf(item.Id) > -1) {
                                item._checked = true;
                            }
                            this.data1.push(item)
                        })
                        this.loadingData = false
                    }
                })
            },
            //            searchInfo() {
            //                if (this.oldkeyWord != this.searchvalue || this.searchvalue) {
            //                    this.oldkeyWord = this.searchvalue
            //                    this.cp = 1
            //                    this.loadingData = true
            //                    this.$http.get('http://eknowledge.jqweike.com/v1/admin/database/list', {
            //                            params: this.token({
            //                                keyword: this.searchvalue,
            //                                pageSize: this.ep,
            //                                page: this.cp,
            //                                contentType: this.model1 == "类型" ? this.model2 : '',
            //                                subject: this.model1 == "学科" ? this.model2 : '',
            //                            })
            //                        })
            //                        .then((res) => {
            //                            if (res.data.status == 200) {
            //                                this.oldkeyWord = this.searchvalue
            //                                this.tp = parseInt(res.data.data.total);
            //                                this.data1 = []
            //                                res.data.data.rows.forEach((item) => {
            //                                    item = Object.assign({}, item, {
            //                                        _checked: false
            //                                    })
            //                                    if (this.selectIds.indexOf(item.Id) > -1) {
            //                                        item._checked = true;
            //                                    }
            //                                    this.data1.push(item)
            //                                })
            //                                this.loadingData = false
            //                            }
            //                        })
            //                } else {
            //                    this.$Message.warning('请输入昵称、电话');
            //                }
            //            },
        },
        mounted() {
            this.getlist()
            this.getSubject()
            this.getDataType()
        }

    }

</script>
<style lang="less">
    .database {
        .top {
            margin-bottom: 25px;
            .search {
                float: right
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
