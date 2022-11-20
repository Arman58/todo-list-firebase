import styles from "./TodoList.module.less"
import Modal from "../Modal";
import {useContext, useState} from "react";
import TodoItem from "./TodoItem";
import {TodoContext} from "../../context/TodoContext";

const Index = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [todoId, setTodoId] = useState()
    const {todos, isOpen, setIsOpen} = useContext(TodoContext)

    return (
        <main className={styles.container}>
            <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
                Add Todo
            </button>
            {isOpen && <Modal isEdit={isEdit} todoId={todoId}/>}
            <div className={styles.todoList}>
                {todos?.map(todo => <TodoItem key={todo.id} todoId={todo.id} todo={todo.data} setIsEdit={setIsEdit}
                                              setTodoId={setTodoId}/>)}
            </div>
        </main>
    );
}

export default Index;
