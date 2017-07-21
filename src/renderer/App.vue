<style>
    .md-title {
        flex: 10;
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

                <md-button class="md-icon-button">
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
                    <md-list-item>代办事项</md-list-item>
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
            }
        }
    }

</script>