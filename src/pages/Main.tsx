import React, {useEffect, useState}  from 'react'
import { Container, Typography } from '@mui/material';
import AddTodoComp from '../components/AddTodoComp';
import TodoList from '../components/TodoList';
import axios from 'axios';
import { notify } from '../helper/sweetAlert';



//todo useState i typeni belirlemek icin asagidaki yapiyi olusturuyoruz...
//! simdi globala tasicaz bize TodoList componentinde lazim 
// interface TodoType {
//   id : string | number,
//   task : string,
//   isDone : boolean
// }

const url = "https://64a7a5bddca581464b848170.mockapi.io/todos"

const Main = () => {
const [todos, setTodos] = useState<TodoType[]>([])

const getTodos = async ()=>{
  try {
    const {data} = await axios.get<TodoType[]>(url)
    console.log(data);
    
    setTodos(data)
    
  } catch (error) {
    console.log(error);
    
  }
}

const deleteTodo:DeleteFn =async (id) => {
  try {
    await axios.delete(`${url}/${id}`)
    notify("Todo successfully deleted!", "success")
    getTodos()
  } catch (error) {
    notify("Todo can not deleted!", "error")
    console.log(error);
    
  }
}
const toggleTodo:ToggleFn =async item => {
  try {
    await axios.put(`${url}/${item.id}`, {...item, isDone: !item.isDone})
    getTodos()
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(() => {
 getTodos()
}, [])
//todo 1. yol       amac text i any olmaktan kurtariyoruz.....
// type Addfn = (text:string) => void;

const addTodo: AddFn = async (text)=>{
  const newTodo = {
    task: text,
    isDone : false
  }
  try {
    await axios.post(url,newTodo)
    getTodos()
  } catch (error) {
    
  }
}

//todo ikinci yol 
// const addTodo = async (text: string)=>{
//   const newTodo = {
//     task: text,
//     isDone : false
//   }
//   try {
//     await axios.post(url,newTodo)
//     getTodos()
//   } catch (error) {
    
//   }
// }


  return (
    <Container>
      <Typography color="error" variant='h2' component={"h1"} align='center' mt={3}>Todo App with TypeScript</Typography>
      <AddTodoComp addTodo={addTodo}/>
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
    </Container>

  )
}

export default Main