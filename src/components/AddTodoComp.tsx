import React, {useState} from 'react'
import { Container, Box, TextField, Button } from '@mui/material';
import SaveIcon from "@mui/icons-material/Save";

//todo gelen propsu tanimlamak icin asagidaki satir.
interface IAddTodo{
  // addTodo: (text:string) => void;
  addTodo: AddFn

}
//! comment var ekle

const AddTodoComp:React.FC<IAddTodo> = ({addTodo}) => {
  const [text, setText] = useState("")

  const handleClick =()=>{
    // addTodo(5) // error   cünkü string olmak zorunda
    addTodo(text)
    setText("")
    console.log(text)
  }

  return (
    <Container>
  <Box
    sx={{
      display: { xs: "block", sm: "flex" },
      justifyContent: "center",
      m: { xs: 4, sm: "auto" },
      height: { xs: "120px", sm: "80px" },
    }}>
    <TextField
      id="outlined-basic"
      label="New Todo"
      variant="outlined"
      sx={{ minWidth: { xs: "100%", sm: "50%" }, height: "50px", m: 1 }}
      inputProps={{ maxLength: 40 }}
      value={text}
      onChange={(e)=>setText(e.target.value)}
    />
    <Button
      variant="contained"
      endIcon={<SaveIcon />}
      sx={{ minWidth: { xs: "100%", sm: "15%" }, height: "55px", m: 1 }}
      onClick={handleClick}
      // disabled={true}    //todo input bos oludugunda disable olmasi icin disabled i static olarak ayarliyoruz.
      disabled={!text.trim()}
      >
      Save Todo
    </Button>
  </Box>
</Container>
  )
}

export default AddTodoComp