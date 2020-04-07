<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>vue-apollo</h1>
     <input v-model="data" @keyup.enter="Enterclick"/>
     <TodoList :dataList="dataList"/>
  </div>
</template>

<script>
import gql from "graphql-tag";
const ADD_TODO = gql`
  mutation createTodo($content:String!, $checked:Boolean){
    createTodo(content: $content, checked: $checked){
      content
      id
      checked
    }
  }
`;

import TodoList from './components/TodoList.vue'
export default {
  name: 'App',
  components: {
     TodoList
  },
  data() {
    return {
       data:'',
       dataList:[]
    };
  },
  methods:{
      Enterclick(){
         if(this.data){
            this.$apollo.mutate({
              mutation:ADD_TODO,
              variables:{content:this.data,checked:null},
                }).then(data=>{
                    console.log(data.data)
                    this.dataList = data.data.createTodo
                    this.data = ''
                }).catch(error=>{
                    console.log(error)
                })
              }
         }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

