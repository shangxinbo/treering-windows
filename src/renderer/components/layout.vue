<style>
    .md-title {
        flex: 10;
    }

    a li div {
        color: black
    }
</style>
<template>
    <div id="app">
        <div class="phone-viewport">
            <md-toolbar>
                <md-button class="md-icon-button" @click="toggleLeftSidenav">
                    <md-icon>menu</md-icon>
                </md-button>

                <h2 class="md-title">{{title}}</h2>

                <md-button class="md-icon-button" v-if="type==0||type==1" @click="add">
                    <md-icon>add</md-icon>
                </md-button>
                <md-button class="md-icon-button" v-if="type==3" @click="editBackup">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button" v-if="type==2" @click="saveBackup">
                    <md-icon>save</md-icon>
                </md-button>
            </md-toolbar>
            <router-view></router-view>
            <md-sidenav class="md-left" ref="leftSidenav">
                <md-toolbar class="md-default">
                    <div class="md-toolbar-container">
                        <h3 class="md-title">菜单</h3>
                    </div>
                </md-toolbar>
                <md-list>
                    <md-list-item @click="redirect('/todo/list',{type:0})">待办事项</md-list-item>
                    <md-list-item @click="redirect('/todo/list',{type:1})">重要事项</md-list-item>
                    <md-list-item @click="redirect('/history')">历史纪录</md-list-item>
                    <md-list-item @click="redirect('/backup')">备忘录</md-list-item>
                    <md-list-item>定时提醒</md-list-item>
                </md-list>
                <router-link tag="md-button" to="/current" class="md-raised md-primary">去完成任务</router-link>
                <md-button class="md-raised md-primary" @click="quit">退出</md-button>
            </md-sidenav>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            type() {
                return this.$store.state.type
            },
            title() {
                if (this.$route.path == '/todo/list') {
                    if (this.$route.query.type == 1) {
                        return '重要事项'
                    } else {
                        return '待办事项'
                    }
                } else if (this.$route.path == '/history') {
                    return '历史记录'
                } else if (this.$route.path == '/backup') {
                    return '备忘录'
                } else {
                    return 'Treering'
                }
            }
        },
        methods: {
            toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle()
            },
            redirect(str, query) {
                this.$router.push({
                    path: str,
                    query: query
                })
                this.$refs.leftSidenav.close()
            },
            add() {
                this.$prompt('添加新的任务', value => {
                    this.$ajax({
                        url: this.$api.todos_create,
                        data: {
                            text: value,
                            type: this.type
                        },
                        success: data => {
                            if (data.code && data.code == 200) {
                                let query = Object.assign({}, this.$route.query, { t: new Date().getTime() })
                                this.$router.replace({ query })
                            } else {
                                this.$alert(data.message || data)
                            }
                        }
                    })
                })
            },
            saveBackup() {
                this.$store.commit('CHANGE_TYPE', 3)
            },
            editBackup() {
                this.$store.commit('CHANGE_TYPE', 2)
            },
            quit() {
                sessionStorage.clear()
                this.$router.replace('/login')
            }
        }
    }

</script>