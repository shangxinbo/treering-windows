<style>
    .markdown-body{
        height:100%;
    }
    textarea{
        border: none;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
        width:100%;
        min-height:500px;
    }
</style>
<template>
    <div class="markdown-body">
        <vue-markdown :source="content" :highlight="true" v-show="type==3" style="padding:10px;"></vue-markdown>
        <textarea @keydown="catchKey" v-model="content" v-show="type==2"></textarea>
    </div>
</template>
<script>
    import VueMarkdown from 'vue-markdown'
    export default {
        data(){
            return {
                content:''
            }
        },
        computed:{
            type(){
                return this.$store.state.type
            },
            contentHtml(){
                return this.content
            }
        },
        created(){
            this.$store.commit('CHANGE_TYPE', 3)
        },
        methods:{
            catchKey(){
                console.log(123)
            }
        },
        components:{
            'vue-markdown':VueMarkdown
        }
    }
</script>
