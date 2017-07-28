<template>
    <md-layout md-align="center" style="height:100%;background:#2196f3" md-vertical-align="center">
        <md-layout md-flex="70">
            <md-card md-with-hover style="width:100%;height:100%;">
                <md-card-header>
                    <div class="md-title">{{text}}</div>
                </md-card-header>
                <md-card-actions>
                    <md-button @click="done(-1)">放弃</md-button>
                    <md-button @click="done(1)">完成</md-button>
                </md-card-actions>
            </md-card>
        </md-layout>
        <router-link tag="md-button" to="/todo/list" class="md-fab md-fab-bottom-right"><md-icon>format_list_bulleted</md-icon></router-link>
    </md-layout>
</template>
<script>
    export default {
        data() {
            return {
                text: ''
            }
        },
        created() {
            this.init()
        },
        mounted() {
            document.body.style.height = '100%'
        },
        methods: {
            init() {
                this.$ajax({
                    url: this.$api.current,
                    data: {},
                    success: data => {
                        if (data.code && data.code == 200) {
                            this.text = data.data
                        } else if (data.code && data.code == 303) {
                            //TODO 没有了
                            console.log('meiyoule')
                        }
                    }
                })
            },
            done(status) {
                this.$ajax({
                    url: this.$api.history_add,
                    data: {
                        text: this.text,
                        status: status
                    },
                    success: data => {
                        if (data.code && data.code == 200) {
                            this.init()
                        }
                    }
                })
            }
        }
    }

</script>