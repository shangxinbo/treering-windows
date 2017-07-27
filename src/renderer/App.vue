<template>
    <div style="height:100%">
        <router-view></router-view>
        <md-dialog-alert :md-content="alert.msg" md-ok-text="确定" @close="alertSure" ref="alert">
        </md-dialog-alert>
        <md-dialog-confirm :md-title="confirm.msg" :md-content="confirm.html" md-ok-text="是" md-cancel-text="否" @close="confirmClose"
            ref="confirm">
        </md-dialog-confirm>
        <md-dialog-prompt :md-title="prompt.title" md-input-maxlength="50" md-ok-text="确定" md-cancel-text="取消" @close="promptClose"
            v-model="prompt.value" ref="prompt">
        </md-dialog-prompt>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                alert: {
                    msg: 'alert message',
                    callback: ''
                },
                confirm: {
                    msg: 'confirm message',
                    html: 'confirm html',
                    callback: ''
                },
                prompt:{
                    title:'',
                    value:'',
                    callback:''
                }
            }
        },
        created() {
            Vue.prototype.$alert = (msg, callback) => {
                this.alert.msg = msg
                this.$refs.alert.open()
                if (callback) {
                    this.alert.callback = callback
                } else {
                    this.alert.callback = ''
                }
            }
            Vue.prototype.$confirm = (msg, html, callback) => {
                this.confirm.msg = msg
                this.confirm.html = html
                this.$refs.confirm.open()
                if (callback) {
                    this.confirm.callback = callback
                } else {
                    this.confirm.callback = ''
                }
            }
            Vue.prototype.$prompt = (title, callback) => {
                this.prompt.title = title
                this.$refs.prompt.open()
                if (callback) {
                    this.prompt.callback = callback
                } else {
                    this.prompt.callback = ''
                }
            }
        },
        methods: {
            alertSure() {
                if (this.alert.callback) this.alert.callback()
            },
            confirmClose(type) {
                if (type && this.confirm.callback) this.confirm.callback()
            },
            promptClose(type) {
                if (type=='ok' && this.prompt.callback) this.prompt.callback(this.prompt.value)
            }
        }
    }

</script>