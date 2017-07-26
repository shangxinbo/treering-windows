<template>
    <div class="dialog tips-succ" :style="{display:msg?'block':'none','margin-left':offsetLeft,'margin-top':offsetTop}">
        <div class="dialog-body">
            <div class="pop-default">
                <p class="title">
                    <span>
                        <i class="icon succ"></i>{{msg}}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                offsetLeft: '0px',
                offsetTop: '0px',
                msg: ''
            }
        },
        methods: {
            show(msg, callback, timer) {

                let _this = this
                let t = timer ? timer : 2000
                this.msg = msg

                this.$nextTick(() => {
                    let dialog = _this.$el
                    let dh = dialog.offsetHeight, dw = dialog.offsetWidth
                    _this.offsetLeft = -dw / 2 + 'px'
                    _this.offsetTop = -dh / 2 + 'px'

                    setTimeout(() => {
                        _this.close()
                        if (callback) callback()
                    }, t)
                })

                this.$store.commit('SHOW_LAYER')
            },
            close() {
                this.msg = ''
                this.$store.commit('HIDE_LAYER')
            }
        }
    }

</script>