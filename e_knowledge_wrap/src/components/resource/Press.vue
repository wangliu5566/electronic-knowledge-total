<template>
  <div class="press">
   <div class="top">
       <Button type="primary" @click='$router.push("AddPress")' size="large">新增</Button>
       <Button type="error"  @click='remove(selectIds)' >批量删除</Button>
   </div>
   <Table border :loading="loadingData" ref="selection" :columns="columns4" :data="data1" @on-selection-change='allselect' @on-select="selectItem" @on-select-cancel='delselectItem'></Table>
    <Row class='page'>
      <Page :total="tp" :current='cp' :page-size="ep" size="small" show-total show-sizer show-elevator :page-size-opts='[10,20,30]' @on-change="currentPageChange" @on-page-size-change="eachPageChange"></Page>
    </Row>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                tp: 20,
                cp: 1,
                ep: 10,
                value2: ['2016-01-01', '2016-02-15'],
                loadingData: false,
                columns4: [{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '资源名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h("span", {
                                    style: {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }
                                }, params.row.name ? params.row.name : "-")
                            ])
                        }
                    },
                    {
                        title: '出版社',
                        key: 'pubName',
                    },

                    {
                        title: '操作选项',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                path: '/wrap/resource/editPress',
                                                query: {
                                                    id: params.row.companyId
                                                }
                                            })
                                        }
                                    }
                                }, '查看/编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                    },
                                    on: {
                                        click: () => {
                                            this.remove([params.row.companyId])
                                        }
                                    }
                                }, '删除'),
                            ])
                        }
                    }
                ],
                data1: [],
                selectIds: [],
            }
        },
        methods: {
            getlist() {
                this.loadingData = true;
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/publish-company/list', {
                    params: this.token({
                        keyword: this.searchvalue,
                        pageSize: this.ep,
                        page: this.cp
                    })
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.tp = parseInt(res.data.data.count);
                        this.data1 = []
                        res.data.data.rows.forEach((item) => {
                            item = Object.assign({}, item, {
                                _checked: false
                            })
                            if (this.selectIds.indexOf(item.companyId) > -1) {
                                item._checked = true;
                            }
                            this.data1.push(item)
                        })
                        this.loadingData = false
                    }
                    
                    
                    
                })
            },//全部选择
            allselect(status) {
                if (status.length == this.data1.length) {
                    status.forEach((i) => {
                        if (this.selectIds.indexOf(i.companyId) == -1) {
                            this.selectIds.push(i.companyId)
                        }
                    })
                } else if (status.length == 0) {
                    this.data1.forEach((i) => {
                        if (this.selectIds.indexOf(i.companyId) > -1) {
                            this.selectIds.splice(this.selectIds.indexOf(i.companyId), 1)
                        }
                    })
                }
            },
            //批量操作先选ids
            selectItem(status, row) {
                if (this.selectIds.indexOf(row.companyId) == -1) {
                    this.selectIds.push(row.companyId)
                }
            },
            //批量操作先选ids
            delselectItem(status, row) {
                if (this.selectIds.indexOf(row.companyId) > -1) {
                    this.selectIds.splice(this.selectIds.indexOf(row.companyId), 1)
                }
            },
            remove(id) {
                this.$http.post('http://eknowledge.jqweike.com/v1/admin/publish-company/del',
                    this.token({
                        companyId: id
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
        },
        mounted() {
            this.getlist()
        }

    }

</script>
<style lang="less">
    .press {
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
