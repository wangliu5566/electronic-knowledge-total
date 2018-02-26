<template>
  <div class="selsectData">   
       <Input class='input' v-model="keyword" style="width:320px" @on-enter="getlist()" placeholder=""></Input><Button type="primary" @click="ser">搜索</Button>
         <CheckboxGroup v-model="onlines" class='content'>
            <Checkbox v-for='item in data' :label="item.id" :key='item.id' class='title'>
                <span class="name">{{item.name}}</span>
                <img :src="'/static/img/'+formatClass(item.ext)+'.jpg'" alt="">
            </Checkbox>
        </CheckboxGroup>
        <Row class='page'>
          <Page :total="tp" :current='cp' :page-size="ep" size="small" show-total   @on-change="currentPageChange" ></Page>
        </Row>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                tp: 0,
                cp: 1,
                ep: 10,
                keyword: '',
                data: [],
                onlines: [],
                father: []
            }
        },
        props: ['refresh'],
        methods: {
            ser() {
                this.cp = 1
                this.getlist()
            },
            currentPageChange(value) {
                this.cp = value;
                this.getlist(1);
            },
            //            获取列表
            getlist() {
                this.$http.get('http://eknowledge.jqweike.com/v1/admin/database/publicFile', {
                    params: this.token({
                        page: this.cp,
                        pageSize: this.ep,
                        keyword: this.keyword,
                    })
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.data = res.data.data.rows
                    }
                })
            },
            select() {
                this.father = []
                this.onlines.map((item) => {
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].id == item) {
                            this.father.push(this.data[i])
                        }
                    }
                })
                this.$emit('transmit', this.father);
            }
        },
        mounted() {
            this.getlist()
        },
        watch: {
            'onlines': {
                handler: function() {
                    this.select()
                },
                deep: true
            },
            'refresh': {
                handler: function() {
                    this.data = []
                    this.onlines = []
                    this.father = []
                    this.tp = 0
                    this.cp = 1
                    this.ep = 10
                    this.getlist()
                }
            },
        }

    }

</script>
<style lang="less">
    .selsectData {
        .ivu-checkbox {
            margin-top: -10px
        }
        .content {
            margin-top: 20px;
            height: 350px;
            .title {
                position: relative;
                .name {
                    position: absolute;
                    display: inline-block;
                    width: 160px;
                    margin-top: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: 24px;
                }
                img{
                    width: 160px;
                    height: 150px;
                }
            }
        }
        .input{
            margin-left: 250px;
            margin-right: 20px;
        }
        .page {
            margin: 15px;
            & {
                float: right
            }
        }
    }

</style>
