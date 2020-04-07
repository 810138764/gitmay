<template>
  <div>
     <ul class="itemList" >
        <li v-for="(item,index) in itemList" :key="item.id" class="list">
          <div v-if="!item.checked">
            <span class="li1">{{item.content}}</span>
            <span class="li3" @click="deleteHandler({id:item.id})" >删除</span>
            <span class="li2" @click="setEditing(index)" >修改</span>
          </div>
          <div v-else>
              <input class="li1 li1_input" v-model="item.content" />
              <span class="li3" @click="updateHandler({id:item.id, content:item.content, checked:null })">保存</span>
          </div>
        </li>
     </ul>
  </div>
</template>


<style>
.itemList{
     width: 500px;
     margin: 20px auto;
}
.list{
    border: 1px solid #e8e8e8;
    display: block;
    height:40px;
    overflow: hidden;
    line-height: 40px;
    padding: 0 10px;
    margin-top:5px;
}
.li1{
  float: left;
}
.li1_input{
    margin-top:10px;
    width: 300px;
}
.li3,.li2{
    float: right;
    margin-right:10px;
}
</style>
<script>

import gql from "graphql-tag";

//获取
const QUERY_TODO = gql` 
  {
    TodoList{
      content
      id
      checked
    }
  }
`;
//更新
const UPDATE_TODO = gql` 
  mutation UpdateTodo($content: String!, $id: ID, $checked: Boolean) {
    updateTodo(content: $content, id: $id, checked: $checked){
      content
      id
      checked
    }
  }
`;
//删除
const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID) {
    deleteTodo(id: $id) {
      content
      id
      checked
    }
  }
`;

export default {
  data() {
    return {
       itemList:[]
    };
  },
  props: {
       dataList:{
            type: Array,
             default(){
                return []
            }
       },
  },
  watch: {
       dataList(val){
         this.itemList = val
       }
  },
  created() {
      this.$apollo.mutate({
      // Query
      mutation:QUERY_TODO,
        }).then(data=>{
             console.log(data.data)
            this.itemList = data.data.TodoList
        }).catch(error=>{
            console.log(error)
        })
  },
  methods: {
     setEditing(index){ //获取
        //  val = !val
        this.itemList[index].checked = !this.itemList[index].checked
     },
     updateHandler(render){ //更新
       console.log(render)
        this.$apollo.mutate({
        mutation:UPDATE_TODO,
        variables: render,
        }).then(data=>{
            this.itemList = data.data.updateTodo
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
     },
     deleteHandler(id){ //删除
         console.log(id)
          this.$apollo.mutate({
            mutation:DELETE_TODO,
            variables: id,
            }).then(data=>{
                 this.itemList = data.data.deleteTodo
                console.log(data)
            }).catch(error=>{
                console.log(error)
            })
     },
  }
};
</script>