<style>
    .markdown-body {
        height: 100%;
    }

    textarea {
        border: none;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
        width: 100%;
        min-height: 500px;
    }
</style>
<template>
    <div class="markdown-body">
        <div v-html="contentHtml" v-show="type==3&&verify" style="padding:10px;"></div>
        <textarea v-model="content" v-show="type==2&&verify" placeholder="请输入markdown格式的文字内容"></textarea>
    </div>
</template>
<script>
    import { markdown } from 'markdown'
    export default {
        data() {
            return {
                content: '',
                verify: false,
            }
        },
        computed: {
            type() {
                return this.$store.state.type
            },
            contentHtml() {
                return markdown.toHTML(this.content)
            }
        },
        watch: {
            type(newVal, oldVal) {
                if (newVal == 3 && this.verify) {
                    this.$ajax({
                        url: this.$api.backup_save,
                        data: {
                            content: this.content
                        },
                        success: data => {
                            if (data.code != 200) {
                                this.$alert('保存失败')
                            }
                        }
                    })
                }
            },
            verify(newVal, oldVal) {
                if (newVal) {
                    this.getData()
                    this.$store.commit('CHANGE_TYPE', 3)
                } else {
                    this.verifyDialog()
                }
            }
        },
        created() {
            this.$store.commit('CHANGE_TYPE', 3)
            this.verifyDialog()
            let timer
            document.addEventListener('visibilityChange', () => {
                if (document.hidden) {
                    timer = setTimeout(() => {
                        this.verify = false
                    }, 5 * 60 * 1000)
                } else {
                    clearTimeout(timer)
                }
            })
        },
        methods: {
            getData() {
                this.$ajax({
                    url: this.$api.backup_view,
                    data: {},
                    success: data => {
                        if (data.code && data.code == 200) {
                            this.content = data.data
                        } else {
                            this.$alert(data.message)
                        }
                    }
                })
            },
            verifyDialog() {
                this.$prompt('请输入你的登录密码', value => {
                    if (value) {
                        this.$ajax({
                            url: this.$api.verifypass,
                            data: {
                                password: value
                            },
                            success: data => {
                                if (data.code && data.code == 200) {
                                    this.verify = true
                                }
                            }
                        })
                    }
                })
            }
        }
    }

</script>