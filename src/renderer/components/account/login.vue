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
    <div style="width:100%;height:100%;" @keyup.enter="submit">
        <md-layout md-align="center" md-vertical-align="center" class="warp">
            <md-layout md-flex="80" md-column>
                <md-layout md-gutter md-align="center">
                    <md-layout md-flex="50" class="logo">
                    </md-layout>
                </md-layout>
                <md-layout md-column md-gutter>
                    <md-input-container>
                        <label>用户名</label>
                        <md-input v-model="name"></md-input>
                    </md-input-container>
                    <md-input-container md-has-password>
                        <label>密码</label>
                        <md-input type="password" v-model="pass"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <router-link to="/register">还没有账号？立即注册</router-link>
                </md-layout>
                <md-layout md-align="center">
                    <md-button style="width:80%;margin-top:20px;" class="md-raised md-primary" @click="submit">登录</md-button>
                </md-layout>
            </md-layout>
        </md-layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                pass: ''
            }
        },
        mounted() {
            document.body.style.height = '100%'
        },
        methods: {
            submit() {
                if (!this.name || !this.pass) return false
                this.$ajax({
                    url: this.$api.login,
                    data: {
                        name: this.name,
                        password: this.pass
                    },
                    success: data => {
                        if (data.code && data.code == 200) {
                            sessionStorage.setItem('user', JSON.stringify(data.data))
                            this.$router.replace('/todo/list')
                        } else {
                            //TODO TOAST
                            console.log(data.message)
                        }
                    }
                })
            }
        }
    }

</script>