<template>
    <ul class="md-list md-theme-default" @drop="drop($event,-1)" @dragover="allowDrop($event)">
        <li class="md-list-item" draggable="true" v-for="(item,index) in list" :key="index" :class="{'md-list-item-expand':typeof(item)!='string'}"
            @dragstart="drag(index,-1,$event)" @click="toggle(item,$event)">
            <div class="md-list-item-container" v-if="typeof(item)=='string'">
                <span>{{item}}</span>
            </div>
            <template v-else>
                <div class="md-list-item-container md-button">
                    <span>{{item.father}}</span>
                    <i aria-hidden="true" class="md-icon md-list-expand-indicator md-theme-default material-icons">keyboard_arrow_down</i>
                </div>
                <button type="button" class="md-button md-button-ghost md-theme-default">
                    <div class="md-ink-ripple">
                        <div class="md-ripple" style="width: 606px; height: 606px;"></div>
                    </div>
                </button>
                <div class="md-list-expand" style="margin-bottom: -192px;">
                    <div class="md-list-expand-container">
                        <ul class="md-list md-theme-default" @drop.stop="drop($event,index)" @dragover="allowDrop($event)">
                            <li class="md-list-item md-inset" draggable="true" v-for="(child,code) in item.children" @dragstart.stop="drag(code,index,$event)">
                                <div class="md-list-item-container">{{child}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </li>
    </ul>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                timer: ''
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
        },
        methods: {
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
                if (target.parentNode.tagName == 'LI') {
                    return target.parentNode
                } else {
                    return this.getParentLi(target.parentNode)
                }
            },
            drop(evt, index) {
                let prev = evt.dataTransfer.getData("prev").split('~')
                if (prev[0] < 0) {
                    let next = Array.prototype.indexOf.call(this.$el.childNodes, this.getParentLi(evt.target))
                    let arr = this.list.slice(0)
                    let tmp = arr[prev[1]]
                    arr[prev[1]] = arr[next]
                    arr[next] = tmp
                    this.list = arr
                } else {
                    if (prev[0] == index) {
                        let next = Array.prototype.indexOf.call(this.$el.childNodes[index].querySelector('ul').childNodes, this.getParentLi(evt.target))
                        let arr = this.list.slice(0)
                        let tmp = arr[prev[0]].children[prev[1]]
                        arr[prev[0]].children[prev[1]] = arr[prev[0]].children[next]
                        arr[prev[0]].children[next] = tmp
                        this.list = arr
                    }
                }

                // this.$ajax({
                //     url: 'http://localhost:3000/todos/saveChange',
                //     data: {
                //         type: 0,
                //         arr: arr
                //     },
                //     success: data => {
                //         if (data.code && data.code == 200) {
                //             this.list = arr
                //         }else{
                //             //TODO TOAST
                //         }
                //     }
                // })

            },
            allowDrop(evt) {
                evt.preventDefault()
            }
        }
    }

</script>