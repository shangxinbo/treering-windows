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

                <h2 class="md-title">My App</h2>

                <md-button class="md-icon-button" @click="add">
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
                    <md-list-item @click="redirect('/todo/list',{type:0})">代办事项</md-list-item>
                    <md-list-item @click="redirect('/todo/list',{type:1})">重要事项</md-list-item>
                    <md-list-item @click="redirect('/history')">历史纪录</md-list-item>
                    <md-list-item>定时提醒</md-list-item>
                </md-list>
                <router-link tag="md-button" to="/current" class="md-raised md-primary">去完成任务</router-link>
            </md-sidenav>
        </div>
    </div>
</template>
<script>
    export default {
        computed:{
            type(){
                return this.$store.state.type
            }
        },
        methods: {
            toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle()
            },
            redirect(str,query){
                this.$router.push({
                    path:str,
                    query:query
                })
                this.$refs.leftSidenav.close()
            },
            add() {
                this.$prompt('添加新的任务', value => {
                    this.$ajax({
                        url: 'http://localhost:3000/todos/create',
                        data: {
                            text: value,
                            type: this.type
                        },
                        success: data => {
                            if(data.code&&data.code==200){
                                let query = Object.assign({},this.$route.query,{t:new Date()})
                                this.$router.replace({query})
                            }else{
                                this.$alert(data.message)
                            }
                        }
                    })
                })
            }
        }
    }

</script>