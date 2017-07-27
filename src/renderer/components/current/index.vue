<template>
    <md-layout md-align="center" style="height:100%;background:#2196f3" md-vertical-align="center">
        <md-layout md-flex="70">
            <md-card md-with-hover style="width:100%;height:100%;">
                <md-card-header>
                    <div class="md-title">{{text}}</div>
                </md-card-header>
                <md-card-actions>
                    <md-button @click="fail">放弃</md-button>
                    <md-button @click="done">完成</md-button>
                </md-card-actions>
            </md-card>
        </md-layout>
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
                    url: 'http://localhost:3000/current',
                    data: {},
                    success: data => {
                        if (data.code && data.code == 200) {
                            this.text = data.data
                        }
                    }
                })
            },
            fail() {
                this.$ajax({
                    url: 'http://localhost:3000/history/fail',
                    success: data => {
                        if (data.code && data.code == 200) {
                            this.init()
                        }
                    }
                })
            },
            done() {
                this.$ajax({
                    url: 'http://localhost:3000/history/success',
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