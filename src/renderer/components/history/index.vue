<template>
    <md-table>
        <md-table-header>
            <md-table-row>
                <md-table-head>任务</md-table-head>
                <md-table-head>处理时间</md-table-head>
                <md-table-head>完成/放弃</md-table-head>
            </md-table-row>
        </md-table-header>
        <md-table-body>
            <md-table-row v-for="(row, index) in list" :key="index">
                <md-table-cell>{{row.text}}</md-table-cell>
                <md-table-cell>{{row.end_time|timeFormat}}</md-table-cell>
                <md-table-cell>{{row.status|statusText}}</md-table-cell>
            </md-table-row>
        </md-table-body>
    </md-table>
</template>
<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                list: []
            }
        },
        created() {
            this.init()
        },
        filters:{
            statusText(val){
                if(val==1){
                    return '完成'
                }else{
                    return '放弃'
                }
            },
            timeFormat(val){
                return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        methods: {
            init() {
                this.$ajax({
                    url: 'http://localhost:3000/history/list',
                    success: data => {
                        if (data.code && data.code == 200) {
                            this.list = data.data
                        }
                        console.log(this.list)
                    }
                })
            }
        }
    }

</script>