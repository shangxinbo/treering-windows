<template>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="ss">
        <md-dialog-title>提示</md-dialog-title>
        <md-dialog-content>{{msg}}</md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="sure">确定</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
<script>
    export default {
        data() {
            return {
                msg: '',
                callback: ''
            }
        },
        methods: {
            sure() {
                this.style = 'none'
                this.$store.commit('HIDE_LAYER')
                if (this.callback) this.callback()
            },
            show(msg, callback) {
                let _this = this
                this.msg = msg
                this.$refs.ss.open()
                if (callback) {
                    this.callback = callback
                } else {
                    this.callback = ''
                }
            }
        }
    }

</script>