<template>
    <div>
        <md-list>
            <md-list-item v-for="(item,index) in list" :key="index">
                <template v-if="typeof(item)=='string'">
                    <span>{{item}}</span>
                </template>
                <template v-else>
                    <span>{{item.father}}</span>
                    <md-list-expand>
                        <md-list v-for="child in item.children">
                            <md-list-item class="md-inset">{{child}}</md-list-item>
                        </md-list>
                    </md-list-expand>
                </template>
            </md-list-item>
        </md-list>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        created() {
            this.$ajax({
                url: 'http://localhost:3000/todos/list',
                data: {
                    type: 0
                },
                success: data => {
                    if (data.code && data.code == 200) {
                        this.list = data.data
                    } else {
                        this.list = []
                    }
                }
            })
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.commit('CHANGE_TYPE', 1)
            })
        }
    }

</script>