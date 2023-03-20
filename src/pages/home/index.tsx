import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import TodoList from '@components/todoList';

interface Props {
    children?: React.ReactNode;
    // sx?: any
}

const Home: React.FC<Props> = ({ children, ...props }) => {
     const classes = useStyles();
    return (
        <Grid container justifyContent={"center"}>
            <Grid item xs={10}>
                <TodoList sx={{border: "1px solid red"}} ></TodoList>
            </Grid>

        </Grid>
    )
}

export default Home;

const useStyles = makeStyles((theme: Theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));
