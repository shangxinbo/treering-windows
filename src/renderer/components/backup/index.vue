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

    .passframe {
        align-items: center;
        justify-content: center;
        min-height: 600px;
    }

    .whiteframe {
        width: 300px;
        height: 150px;
        align-items: center;
        justify-content: center;
    }
</style>
<template>
    <div class="markdown-body">
        <div v-html="contentHtml" v-show="type==3&&verify" style="padding:10px;"></div>
        <textarea v-model="content" v-show="type==2&&verify" placeholder="请输入markdown格式的文字内容"></textarea>
        <div @keyup.enter="verifyPass">
            <md-layout v-show="!verify" md-column class="passframe">
                <md-whiteframe class="whiteframe" md-elevation="4">
                    <md-input-container style="width:80%;margin:20px auto;" :class="{'md-input-invalid':pass_error}">
                        <label>请输入登录密码查看</label>
                        <md-input v-model="password" type="password"></md-input>
                        <span class="md-error">{{pass_error}}</span>
                    </md-input-container>
                    <md-layout md-align="center">
                        <md-button class="md-raised md-primary" @click="verifyPass">查看</md-button>
                    </md-layout>
                </md-whiteframe>
            </md-layout>
        </div>
    </div>
</template>
<script>
    import { markdown } from 'markdown'
    export default {
        data() {
            return {
                content: '',
                verify: false,
                password: '',
                pass_error: ''
            }
        },
        computed: {
            type() {
                return this.$store.state.type
            },
            contentHtml() {
                return markdown.toHTML(this.content, 'Maruku')
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
                }
            }
        },
        created() {
            this.$store.commit('CHANGE_TYPE', 3)
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
            verifyPass() {
                if (this.password) {
                    this.$ajax({
                        url: this.$api.verifypass,
                        data: {
                            password: this.password
                        },
                        success: data => {
                            if (data.code && data.code == 200) {
                                this.verify = true
                            } else {
                                this.pass_error = data.message || data
                            }
                        }
                    })
                }
            }
        }
    }

</script>