<template>
  <div class="dataconfig">
   <Row class="top">
<!--      <span  http://eknowledge.jqweike.com/template/配置数据库模板.xlsx>配置文件模板下载</span>-->
      <a href="http://eknowledge.jqweike.com/template/配置数据库模板.xlsx">配置文件模板下载</a>
       <Row class="search">
            <Input v-model="searchvalue" placeholder="搜索图书馆" style="width: 300px" @on-enter="getlist()"></Input>
            <Button type="primary" @click="getlist()" >搜索</Button>
       </Row>
   </Row>
   <Table border :loading="loadingData" ref="selection" :columns="columns4" :data="data1"></Table>
   
    <Row class='page'>
      <Page :total="tp" :current='cp' :page-size="ep" size="small" show-total show-sizer show-elevator :page-size-opts='[10,20,30]' @on-change="currentPageChange" @on-page-size-change="eachPageChange"></Page>
    </Row>
    
    <Modal
        v-model="modal7"
        :closable="false">
        <Table border :loading="loadingData" ref="selection1" :columns="columns" :data="data"></Table>
        <p slot="footer" style="text-align:center">
            <Button type="primary" @click="modal7=false" >关闭</Button>
        </p>
    </Modal>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                tp: 0,
                cp: 1,
                ep: 10,
                loadingData: false,
                modal7: false,
                searchvalue: '',
                photo: '',
                data: [],
                columns:[{
                        title: '日期',
                        key: 'date'
                    },{
                        title: '操作人',
                        key: 'userName'
                    },{
                        title: '操作',
                        key: 'databaseNum',
                        render: (h, params) => {
                            return h('div', [
                                h("span", {
                                    style: {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }
                                }, "配置"+params.row.databaseNum+"个数据库")
                            ])
                        }
                    },{
                        title: '状态',
                        key: 'mark'
                    }],
                columns4: [{
                        title: '图书馆',
                        key: 'name',
                        sortable: true
                    },
                    {
                        title: '状态',
                        key: 'num',
                        sortable: true,
                        render: (h, params) => {
                            return h('div', [
                                h("span", {
                                    style: {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }
                                }, params.row.status == 1 ? '已配置' : "未配置")
                            ])
                        }
                    },
                    {
                        title: '配置数量',
                        key: 'num',
                    },
                    {
                        title: '最后配置人',
                        key: 'userName',
                        render: (h, params) => {
                            return h('div', [
                                h("span", {
                                    style: {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }
                                }, params.row.userName ? params.row.userName : "-")
                            ])
                        }
                    },
                    {
                        title: '操作选项',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Upload', {
                                    props: {
                                        ref: "upload",
                                        showUploadList: false,
                                        data: {
                                            agencyId: params.row.id,
                                            token: JSON.parse(window.sessionStorage.getItem('bg_user_info')).access_token
                                        },
                                        beforeUpload: this.handleUpload,
                                        onSuccess:this.handleSuccess,
                                        action: "http://eknowledge.jqweike.com/v1/admin/file/config"
                                    },
                                    style: {
//                                        color: '#fff',
//                                        backgroundColor: '#2d8cf0',
//                                        borderColor: '#2d8cf0',
//                                        display: 'inline-block',
//                                        padding: ' 6px 16px 8px',
//                                        borderRadius: '4px',
//                                        fontSize: ' 12px',
//                                        cursor: 'pointer',
                                        marginRight: '10px',
                                        float:'left'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, [h('Button', {
                                    props: {
                                        type: 'primary',
                                    },
                                }, '配置')]),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                    },
                                    on: {
                                        click: () => {
                                            this.journal(params.row.id)
                                        }
                                    }
                                }, '日志')
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            journal(id){
                 this.data=[]
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/database/log', {
                    params: this.token({
                        agencyId:id,
                        pageSize:99999,
                        page:1,
                    })
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.data=res.data.data.rows
                        this.modal7=true
                    }
                })
            },
            handleSuccess(res, file) {
                this.getlist(1);
            },
            handleUpload(file) {
                this.photo = {
                    token: JSON.parse(window.sessionStorage.getItem('bg_user_info')).access_token
                }
                return true
            },
            currentPageChange(value) {
                this.cp = value;
                this.getlist(1);
            },
            eachPageChange(value) {
                this.cp = 1
                this.ep = value;
                this.getlist(1);
            },
            getlist() {
                this.loadingData = true;
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/database/agencyList', {
                    params: this.token({
                        keyword: this.searchvalue,
                        pageSize: this.ep,
                        page: this.cp,
                    })
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.tp = parseInt(res.data.data.total);
                        this.data1 = []
                        this.data1 = res.data.data.rows
                        this.loadingData = false
                    }
                })
            },
        },
        mounted() {
            this.getlist()
        }

    }

</script>
<style lang="less">
    .dataconfig {
        .top {
            margin-bottom: 25px;
            &>a {
                color: deepskyblue;
            }
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
