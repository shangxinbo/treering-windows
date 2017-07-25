<style>
    .md-title {
        flex: 10;
    }
    a li div{
        color:black
    }
</style>
<template>
    <div id="app">
        <div class="phone-viewport">
            <md-toolbar>
                <md-button class="md-icon-button" @click="toggleLeftSidenav">
                    <md-icon>menu</md-icon>
                </md-button>

                <h2 class="md-title">My App</h2>

                <md-button class="md-icon-button" @click="redirect('/todo/add')">
                    <md-icon>add</md-icon>
                </md-button>
            </md-toolbar>
            <router-view></router-view>
            <md-sidenav class="md-left" ref="leftSidenav">
                <md-toolbar class="md-default">
                    <div class="md-toolbar-container">
                        <h3 class="md-title">menu</h3>
                    </div>
                </md-toolbar>
                <md-list>
                    <md-list-item @click="redirect('/todo/list')">代办事项</md-list-item>
                    <md-list-item>重要事项</md-list-item>
                    <md-list-item>历史纪录</md-list-item>
                    <md-list-item>定时提醒</md-list-item>
                </md-list>
            </md-sidenav>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle()
            },
            redirect(str){
                this.$router.push(str)
                this.$refs.leftSidenav.close()
            }
        }
    }

</script>