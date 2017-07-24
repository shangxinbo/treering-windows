<template>
    <div style="height:100%">
        <img src="~@/assets/logo.png" />
        <md-layout style="width:80%;margin:0 auto;" md-column md-gutter>
            <md-input-container>
                <label>用户名</label>
                <md-input v-model="name"></md-input>
            </md-input-container>
            <md-input-container>
                <label>密码</label>
                <md-input v-model="pass1"></md-input>
            </md-input-container>
            <md-input-container>
                <label>重复密码</label>
                <md-input v-model="pass2"></md-input>
            </md-input-container>
        </md-layout>
        <md-layout md-align="center">
            <md-button class="md-raised md-primary" @click="submit">提交</md-button>
        </md-layout>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name:'',
                pass1:'',
                pass2:''
            }
        },
        mounted(){
            document.body.style.height = '100%'
        },
        methods:{
            submit(){
                this.$ajax({
                    url:'http://localhost:3000/register',
                    data:{
                        name:this.name,
                        password:this.pass1
                    },
                    success:data=>{
                        if(data.code&&data.code==200){
                            //console.log('登录成功')
                        }else{
                            console.log(123)
                        }
                    }
                })
            }
        }
    }
</script>