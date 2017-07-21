<style>
    .md-title {
        flex: 10;
    }
</style>
<template>
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

        <md-sidenav class="md-left" ref="leftSidenav">
            <md-toolbar class="md-large">
                <div class="md-toolbar-container">
                    <h3 class="md-title">Sidenav content</h3>
                </div>
            </md-toolbar>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt
                ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis
                iusto!
            </p>
        </md-sidenav>
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