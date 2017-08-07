<template>
    <div>
        <ul v-if="list.length>0" class="md-list md-theme-default" @drop="drop($event,-1)" @dragover="allowDrop($event)" >
            <li class="md-list-item" draggable="true" v-for="(item,index) in list" :key="index" :class="{'md-list-item-expand':typeof(item)!='string'}"
                @dragstart="drag(index,-1,$event)" @click="toggle(item,$event)">
                <div class="md-list-item-container" v-if="typeof(item)=='string'">
                    <i aria-hidden="true" class="md-icon md-theme-default material-icons" @click.stop="add(index)">add</i>
                    <span>{{item}}</span>
                    <md-button class="md-icon-button" @click="del(index,-1)">
                        <md-icon>delete sweep</md-icon>
                    </md-button>
                </div>
                <template v-else>
                    <div class="md-list-item-container md-button">
                        <i aria-hidden="true" class="md-icon md-theme-default material-icons" @click.stop="add(index)">add</i>
                        <span>{{item.father}}</span>
                        <i aria-hidden="true" class="md-icon md-list-expand-indicator md-theme-default material-icons">keyboard_arrow_down</i>
                    </div>
                    <div class="md-list-expand" style="margin-bottom: -192px;">
                        <div class="md-list-expand-container">
                            <ul class="md-list md-theme-default" @click.stop @drop.stop="drop($event,index)" @dragover="allowDrop($event)">
                                <li class="md-list-item md-inset" draggable="true" v-for="(child,code) in item.children" @dragstart.stop="drag(code,index,$event)">
                                    <div class="md-list-item-container">
                                        <span>{{child}}</span>
                                        <md-button class="md-icon-button" @click="del(code,index)">
                                            <md-icon>delete sweep</md-icon>
                                        </md-button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
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
            drag(index, father, evt) {
                evt.dataTransfer.setData("prev", father + '~' + index)
            },
            toggle(item, evt) {
                if (typeof item != 'string') {
                    if (evt.currentTarget.className.indexOf('md-active') >= 0) {
                        let ss = evt.currentTarget.className
                        evt.currentTarget.className = ss.replace('md-active', '')
                    } else {
                        evt.currentTarget.className = evt.currentTarget.className + ' md-active'
                    }
                }
            },
            getParentLi(target) {
                if (!target.parentNode) return target
                if (target.parentNode.tagName == 'LI') {
                    return target.parentNode
                } else {
                    return this.getParentLi(target.parentNode)
                }
            },
            drop(evt, index) {
                let prev = evt.dataTransfer.getData("prev").split('~')
                if (prev[0] < 0) {
                    let next = Array.prototype.indexOf.call(this.$el.querySelector('ul').childNodes, this.getParentLi(evt.target))
                    let arr = this.list.slice(0)
                    let tmp = arr[prev[1]]
                    arr.splice(prev[1],1)
                    arr.splice(next,0,tmp)
                    this.list = arr
                } else {
                    if (prev[0] == index) {
                        let next = Array.prototype.indexOf.call(this.$el.querySelector('ul').childNodes[index].querySelector('ul').childNodes, this.getParentLi(evt.target))
                        let arr = this.list.slice(0)
                        let tmp = arr[prev[0]].children[prev[1]]
                        arr[prev[0]].children.splice(prev[1],1)
                        arr[prev[0]].children.splice(next,0,tmp)
                        this.list = arr
                    }
                }

                this.save()

            },
            allowDrop(evt) {
                evt.preventDefault()
            },
            add(index) {
                this.$prompt('添加子任务', value => {
                    if (value) {
                        let v = this.list[index]
                        if (typeof v == 'string') {
                            this.list.splice(index,1,{
                                father: v,
                                children: [value]
                            })
                        } else {
                            this.list[index].children.push(value)
                        }

                        this.save()
                    }
                })
            },
            del(index, father) {
                let str = index
                if (father < 0) {
                    this.list.splice(index, 1)
                } else {
                    if (this.list[father].children.length > 1) {
                        this.list[father].children.splice(index, 1)
                    } else {
                        this.list.splice(father, 1)
                    }

                }
                this.save()
            },
            save() {
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