<template>
    <div>
        <md-list>
            <md-list-item>
                <span>News</span>

                <md-list-expand>
                    <md-list>
                        <md-list-item class="md-inset">World</md-list-item>
                        <md-list-item class="md-inset">Americas</md-list-item>
                        <md-list-item class="md-inset">Europe</md-list-item>
                    </md-list>
                </md-list-expand>
            </md-list-item>

            <md-list-item>
                <span>Games</span>

                <md-list-expand>
                    <md-list>
                        <md-list-item class="md-inset">Console</md-list-item>
                        <md-list-item class="md-inset">PC</md-list-item>
                        <md-list-item class="md-inset">Phone</md-list-item>
                    </md-list>
                </md-list-expand>
            </md-list-item>

            <md-list-item>
                <span>Video</span>

                <md-list-expand>
                    <md-list>
                        <md-list-item class="md-inset">Humor</md-list-item>
                        <md-list-item class="md-inset">Music</md-list-item>
                        <md-list-item class="md-inset">Movies</md-list-item>
                        <md-list-item class="md-inset">TV Shows</md-list-item>
                    </md-list>
                </md-list-expand>
            </md-list-item>

            <md-list-item>
                <span>Shop</span>
            </md-list-item>
        </md-list>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        beforeRouteEnter(to,from,next){
            next(vm =>{
                vm.$store.commit('CHANGE_TYPE',1)
            })
        }
    }
</script>
