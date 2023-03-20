import TodoAPI from '@components/todoAPI';
import TodoList from '@components/todoList';
import React from 'react';

interface Props {
    children?: React.ReactNode;
}

const Services: React.FC<Props> = ({ children, ...props }) => {
    return (
        <>
            <TodoAPI sx={{border: "1px solid red"}} ></TodoAPI>
            
        </>
    )
}

export default Services;