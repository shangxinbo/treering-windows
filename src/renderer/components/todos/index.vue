<template>
    <div>
        <ul v-if="list.length>0" class="md-list md-theme-default" @drop="drop($event)" @dragover="allowDrop($event)">
            <li class="md-list-item" draggable="true" v-for="(item,index) in list" :key="index" @dragstart="drag(index,$event)">
                <div class="md-list-item-container">
                    <span>{{item}}</span>
                    <md-button class="md-icon-button" @click="del(index)">
                        <md-icon>delete sweep</md-icon>
                    </md-button>
                </div>
            </li>
        </ul>
        <md-layout v-else md-column style="align-items: center;justify-content: center;min-height:500px;">
            <md-button md-flex="1" disabled>
                <i style="color:#b9b9b9" class="md-icon md-size-4x md-primary material-icons">folder open</i>
            </md-button>
            <div md-flex="1" style="text-align:center;color:#565656">暂时没有，请添加</div>
        </md-layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                timer: '',
                type: 0
            }
        },
        created() {
            this.init()
        },
        watch: {
            $route() {
                this.init()
            }
        },
        methods: {
            init() {
                this.type = this.$route.query.type ? this.$route.query.type : 0
                this.$store.commit('CHANGE_TYPE', this.type)
                this.$ajax({
                    url: this.$api.todos_list,
                    data: {
                        type: this.type
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
            drag(index, evt) {
                evt.dataTransfer.setData("prev", index)
            },
            getParentLi(target) {
                if (!target.parentNode) return target
                if (target.parentNode.tagName == 'LI') {
                    return target.parentNode
                } else {
                    return this.getParentLi(target.parentNode)
                }
            },
            drop(evt) {
                let prev = evt.dataTransfer.getData("prev")
                let next = Array.prototype.indexOf.call(this.$el.querySelector('ul').childNodes, this.getParentLi(evt.target))
                let arr = this.list.slice(0)
                let tmp = arr[prev]
                arr.splice(prev, 1)
                arr.splice(next, 0, tmp)
                this.list = arr

                this.save()

            },
            allowDrop(evt) {
                evt.preventDefault()
            },
            del(index) {
                let str = index
                this.$alert('确定要删除该任务', () => {
                    console.log(this.list)
                    this.list.splice(index, 1)
                    console.log(this.list)
                    this.save()
                })
            },
            save() {
                console.log(this.list)
                this.$ajax({
                    url: this.$api.todos_save,
                    data: {
                        type: this.type,
                        arr: this.list
                    },
                    success: data => {
                        if (!data.code || data.code != 200) {
                            this.$alert(data.message)
                        }
                    }
                })
            }
        }
    }

</script>