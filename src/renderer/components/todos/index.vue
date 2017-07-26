<template>
    <ul class="md-list md-theme-default" @drop="drop($event)" @dragover="allowDrop($event)">
        <li class="md-list-item" draggable="true" v-for="(item,index) in list" :key="index" :class="{'md-list-item-expand':typeof(item)!='string'}"
            @dragstart="drag(index,$event)" @click="toggle(item,$event)">
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
                        <ul class="md-list md-theme-default" v-for="child in item.children">
                            <li class="md-list-item md-inset">
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
            drag(index, evt) {
                evt.dataTransfer.setData("prev", index)
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
            drop(evt) {
                let prev = evt.dataTransfer.getData("prev")
                let next = Array.prototype.indexOf.call(this.$el.childNodes, evt.target.parentNode)
                let arr = this.list.slice(0)
                let tmp = arr[prev]
                arr[prev] = arr[next]
                arr[next] = tmp
                this.list = arr
            },
            allowDrop(evt) {
                evt.preventDefault()
            }
        }
    }

</script>