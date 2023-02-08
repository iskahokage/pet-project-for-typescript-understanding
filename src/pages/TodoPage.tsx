import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import List from '../components/List';
import TodoItem from '../components/TodoItem';
import { ITodo } from '../types/types';

const TodoPage: FC = () => {

    const [todoList, setTodoList] = useState<ITodo[]>([])

    useEffect(()=> {
        getTodos()
    }, [])


    const getTodos = async()=> {
        try {
            const {data} = await axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
            console.log(data)
            setTodoList(data)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            
            <List items={todoList} renderItem={(todo: ITodo)=> <TodoItem todo={todo} key={todo.id}/> }/>
        </div>
    );
};

export default TodoPage;