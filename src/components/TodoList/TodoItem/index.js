import {AiFillDelete} from "@react-icons/all-files/ai/AiFillDelete";
import {useContext, useEffect, useState} from "react";
import styles from "./TodoItem.module.less"
import {AiFillEdit} from "@react-icons/all-files/ai/AiFillEdit";
import {TodoContext} from "../../../context/TodoContext";
import dayjs from "dayjs";

const TodoItem = ({todo, todoId, setIsEdit, setTodoId}) => {
    const [toggle, setToggle] = useState(false)
    const {deleteTodo, isCheckedTodo, setIsOpen, isCheckedTodoTrue} = useContext(TodoContext)
    const today = dayjs(new Date());


    useEffect(() => {
        if (dayjs(todo.date).isBefore(today)) {
            isCheckedTodoTrue(todoId, todo)
        }
    }, [])


    const handleDelete = async (todoId) => {
        await deleteTodo(todoId)
    }
    const handleChange = async (todoId) => {
        await isCheckedTodo(todoId, todo)
    }

    const handleClick = (e) => {
        e.preventDefault()
        setToggle(!toggle)
    }

    const updateTodoInfo = (todoId) => {
        setIsEdit(true)
        setIsOpen(true)
        setTodoId(todoId)
    }


    return (
        <div className={styles.todoList}>
            <div className={styles.todoItem}>
                <label>
                    <input type="checkbox" checked={todo?.checked} onChange={() => handleChange(todoId)}/>
                    <span style={{textDecoration: todo?.checked ? 'line-through' : 'none'}}
                          onClick={handleClick}>{todo.title}</span>
                </label>
                <div className={styles.icons}>
                    <AiFillDelete onClick={() => handleDelete(todoId)}/>
                    <AiFillEdit onClick={() => updateTodoInfo(todoId)}/>
                </div>
            </div>
            {toggle && <div className={styles.todoInfo}>
                <span>{todo.description}</span>
                <span>{todo.date}</span>
                {todo.img && <img src={todo.img} alt={todo.title} style={{width: "50px"}}/>}
            </div>}
        </div>
    )
}

export default TodoItem
