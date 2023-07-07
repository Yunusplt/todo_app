import React,{FC, useEffect, useState} from 'react'
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TodoListItem from './TodoListItem';

interface ITodos {
  todos: TodoType[]
  deleteTodo: DeleteFn
  toggleTodo : ToggleFn;
}

const TodoList:FC<ITodos> = ({todos,deleteTodo,toggleTodo}) => {
  const [completedTodos,setCompletedTodos] = useState<TodoType[]>([])
  const [progressTodos,setProgressTodos] = useState<TodoType[]>([])

  useEffect(()=>{
    setCompletedTodos(todos.filter(todo=> todo.isDone))
    setProgressTodos(todos.filter(todo=> !todo.isDone))
  },[todos])



  return (
    <Grid
      container
      sx={{
        d: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}>
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          border: "1px solid purple",
          borderRadius: "0.5rem",
          p: "1rem",
          minHeight: "350px",
        }}>
        <Typography variant="h4" align="center" color="secondary">
          InProgress Todos
        </Typography>
        {progressTodos.length ? (
          progressTodos.map(item => <TodoListItem key={item.id} item={item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />)
        ) : (
          <Typography color="error" mt={3}>
            No Progress todos!{" "}
          </Typography>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          border: "1px solid green",
          borderRadius: "0.5rem",
          p: "1rem",
          minHeight: "350px",
        }}>
        <Typography variant="h4" align="center" sx={{ color: "green" }}>
          Completed Todos
        </Typography>
        {completedTodos.length ? (
          completedTodos.map(item => <TodoListItem key={item.id} item={item} deleteTodo={deleteTodo}  toggleTodo={toggleTodo}  />)
        ) : (
          <Typography color="error" mt={3}>
            No Completed todos!{" "}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default TodoList