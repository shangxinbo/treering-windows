<template>
    <div>
        <md-input-container>
            <label>待办事项值</label>
            <md-input v-model="text" :required="true"></md-input>
        </md-input-container>
        <md-layout md-align="center">
            <md-button style="width:80%" class="md-raised md-primary" :disabled="!text" @click="submit">提交</md-button>
        </md-layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                text: ''
            }
        },
        computed:{
            type(){
                return this.$store.state.type
            }
        },
        methods: {
            submit() {
                this.$ajax({
                    url: 'http://localhost:3000/todos/create',
                    data: {
                        text: this.text
                    },
                    success: data => {
                        if(data.code&&data.code==200){
                            this.$router.replace('/todo/list')
                        }else{
                            //TODO
                            console.log(data.message)
                        }
                    }
                })
            }
        }
    }

</script>