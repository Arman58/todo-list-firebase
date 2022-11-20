import {useForm} from "react-hook-form"
import styles from "./EditTodoForm.module.less"
import {useContext} from "react";
import {TodoContext} from "../../context/TodoContext";

const EditTodoForm = ({setIsOpen, todoId}) => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const {updateTodo} = useContext(TodoContext)

    const editTodo = async (data) => {
        if (data) {
            await updateTodo(todoId, data).then(() => setIsOpen(false))
        }
    }

    return (
        <div>
            <form id='edit' onSubmit={handleSubmit(editTodo)} className={styles.container}>
                <div className={styles.field}>
                    <label>Title</label>
                    <input type='text' placeholder="TitleEdit"
                           className={styles.input} {...register('title')} />
                </div>
                <div className={styles.field}>
                    <label>Description</label>
                    <textarea placeholder="Description"
                              className={styles.input} {...register('description')}
                    />
                </div>
                <div className={styles.field}>
                    <label>Date</label>
                    <input type='date' className={styles.input} {...register('date')} />
                </div>
            </form>
        </div>
    );
}

export default EditTodoForm
