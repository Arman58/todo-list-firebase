import React, {createContext, useEffect, useState} from 'react';
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "@firebase/firestore";
import {db} from "../firebase";


export const TodoContext = createContext({
    todos: []
});

export const TodoProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const getTodos = async () => {
            const data = await getDocs(collection(db, "todos"));
            setTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getTodos()
    }, [])

    const handleAdd = async (data) => {
        await addDoc(collection(db, "todos"), {data}).then((doc) => {
            setTodos([...todos, {
                data,
                id: doc.id
            }])
            setIsOpen(false)
        });
    }

    const deleteTodo = async (todoId) => {
        const todoDoc = doc(db, "todos", todoId);
        await deleteDoc(todoDoc);
        setTodos(todos.filter((todo) => todo.id !== todoId))
    }

    const updateTodo = async (todoId, data) => {
        const todoDoc = doc(db, "todos", todoId);
        if (data && todoId) {
            await updateDoc(todoDoc, {data});
            setTodos(() => todos.filter((item) => (item.id === todoId ? item.data = data : item.data)))
        }
    };

    const isCheckedTodo = async (todoId, dataUpdate) => {
        const todoDoc = doc(db, "todos", todoId);
        const data = {
            ...dataUpdate,
            checked: !dataUpdate.checked
        }
        await updateDoc(todoDoc, {data});
        setTodos(() => todos.filter((item) => (item.id === todoId ? item.data = data : item.data)));
    }

    const isCheckedTodoTrue = async (todoId, dataUpdate) => {
        const todoDoc = doc(db, "todos", todoId);
        const data = {
            ...dataUpdate,
            checked: true
        }
        await updateDoc(todoDoc, {data});
        setTodos(() => todos.filter((item) => (item.id === todoId ? item.data = data : item.data)));
    }
    const value = {
        todos,
        handleAdd,
        deleteTodo,
        isOpen,
        setIsOpen,
        updateTodo,
        isCheckedTodo,
        isCheckedTodoTrue
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
