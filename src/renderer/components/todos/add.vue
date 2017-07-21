<template>
    <div>
        <md-input-container>
            <label>待办事项值</label>
            <md-input v-model="initialValue"></md-input>
        </md-input-container>
        <md-button class="md-raised md-primary md-fab-bottom-center">提交</md-button>
    </div>
</template>