<style>
    .warp {
        height: 100%;
        /* background: url('~@/assets/bg.jpg') center center no-repeat;
        background-size: auto 100%; */
    }

    .logo {
        background: url('~@/assets/logo.png') center center no-repeat;
        min-height: 10rem;
    }
</style>
<template>
    <md-layout md-align="center" md-vertical-align="center" class="warp">
        <md-layout md-flex="80" md-column>
            <md-layout md-gutter md-align="center">
                <md-layout md-flex="50" class="logo">
                </md-layout>
            </md-layout>
            <md-layout md-column md-gutter>
                <md-input-container :class="{'md-input-invalid':!!name_error}">
                    <label>用户名</label>
                    <md-input v-model="name"></md-input>
                    <span class="md-error">{{name_error}}</span>
                </md-input-container>
                <md-input-container :class="{'md-input-invalid':pass1_error}">
                    <label>密码</label>
                    <md-input v-model="pass1"></md-input>
                    <span class="md-error">{{pass1_error}}</span>
                </md-input-container>
                <md-input-container :class="{'md-input-invalid':pass2_error}">
                    <label>重复密码</label>
                    <md-input v-model="pass2"></md-input>
                    <span class="md-error">{{pass2_error}}</span>
                </md-input-container>
            </md-layout>
            <md-layout md-align="center">
                <md-button class="md-raised md-primary" @click="submit">注册</md-button>
                <router-link to="/login"><md-button class="md-raised md-primary">登录</md-button></router-link>
            </md-layout>
        </md-layout>
    </md-layout>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                name_error: '',
                pass1: '',
                pass1_error: '',
                pass2: '',
                pass2_error: ''
            }
        },
        mounted() {
            document.body.style.height = '100%'
        },
        methods: {
            submit() {
                let reg1 = /^(?=[A-Za-z])[A-Za-z0-9]{6,}$/
                let reg2 = /^[A-Za-z0-9]{6,}$/
                if (!reg1.test(this.name)) {
                    this.name_error = "中英文数字组合，且字母开头，6位以上"
                    return false
                } else {
                    this.name_error = ''
                }
                if (!reg2.test(this.pass1)) {
                    this.pass1_error = "中英文组合，6位以上"
                    return false
                } else {
                    this.pass1_error = ''
                    if (this.pass1 == this.pass2) {
                        this.pass2_error = ''
                    } else {
                        this.pass2_error = '两次密码输入不同'
                        return false
                    }
                }

                this.$ajax({
                    url: this.$api.register,
                    data: {
                        name: this.name,
                        password: this.pass1
                    },
                    success: data => {
                        if (data.code && data.code == 200) {
                            console.log('登录成功')
                        } else {
                            console.log(123)
                        }
                    }
                })
            }
        }
    }

</script>