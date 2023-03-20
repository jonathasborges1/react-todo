import { useState, useEffect } from "react";
import {
	Box,
	Button,
	Checkbox,
	Container,
	Grid,
	IconButton,
	TextField,
	ThemeProvider,
	Typography,
	createTheme,
} from "@mui/material";
import { Check, Clear, Delete, Edit } from "@mui/icons-material";

interface TodoListProps {
   sx?: object; 
 }

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

// const theme = createTheme();

const TodoAPI : React.FC<TodoListProps> = ({...props}) => {
   const initialState: Todo[] = [
      { id: 1, title: "Learn React", completed: false },
      { id: 2, title: "Build a Todo App", completed: false },
      { id: 3, title: "Deploy to Netlify", completed: false },
   ] 
   const [editTodo, setEditTodo] = useState<Todo | null>(null); // controla 1 tarefa por vez
   const [todos, setTodos] = useState<Todo[]>(initialState);  // controla a lista de tarefas
   const [newTodo, setNewTodo] = useState("");
 
   useEffect(() => {
     fetchTodos();
   }, []);
 
   const fetchTodos = async () => {
     const response = await fetch("https://jsonplaceholder.typicode.com/todos");
     const data = await response.json();
     setTodos(data);
   };
 
   const addTodo = () => {
     const newId = todos.length + 1;
     const newTodoObject = { id: newId, title: newTodo, completed: false };
     setTodos([newTodoObject , ...todos]);
     setNewTodo("");
   };
 

   const deleteTodo = (id: number) => {
     const updatedTodos = todos.filter((todo) => todo.id !== id);
     setTodos(updatedTodos);
   };

 
   const updateTodo = () => {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo?.id ? { ...todo, title: editTodo.title } : todo
      );
      setTodos(updatedTodos);
      setEditTodo(null);
    };

   const toggleCompleted = (id: number) => {
     const updatedTodos = todos.map((todo) =>
       todo.id === id ? { ...todo, completed: !todo.completed } : todo
     );
     setTodos(updatedTodos);
   };

   const handleClickEditTodo = (todo: Todo) => {
      setEditTodo(todo);
   }
   
   const handleSubmit = () => {
      updateTodo();
   }

   const cancelEdit = () => {
      if(editTodo){ // Retorna ao estado inicial
         setEditTodo({ id: editTodo.id, title: "", completed: editTodo.completed });
      }
    };

   return (
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Todo List
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9}>
              <TextField
                label="New Todo"
                variant="outlined"
                size="small"
                fullWidth
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!newTodo}
                fullWidth
                onClick={addTodo}
              >
                Add Todo
              </Button>
            </Grid>
          </Grid>
          {todos.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
              No todos found.
            </Typography>
          ) : (
            <Box component="ul" style={{ listStyleType: "none" }}>
              {todos.map((todo) => (
                <Box
                  component="li"
                  key={todo.id}
                  display="flex"
                  alignItems="center"
                  mb={1}
                >
                  <Checkbox
                    color="primary"
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo.id)}
                  />
                  {editTodo?.id === todo.id ? (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Edit Todo"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={editTodo.title}
                        color="secondary"
                        onChange={(e) => setEditTodo({ id: editTodo.id, title: e.target.value, completed: editTodo.completed })}
                      />
                      <IconButton color="success" type="submit">
                        <Check />
                      </IconButton>
                      <IconButton color="warning" onClick={cancelEdit}>
                        <Clear />
                      </IconButton>
                    </form>
                  ) : (
                    <>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {todo.title}
                      </Typography>
                      <IconButton 
                           color="secondary"
                           size="small" 
                           onClick={() => handleClickEditTodo(todo)}
                        >
                           <Edit />
                      </IconButton>
                    </>
                  )}
                  <IconButton 
                     color="error"
                     size="small" 
                     onClick={() => deleteTodo(todo.id)}
                  >
                     <Delete />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    );


};

export default TodoAPI;

