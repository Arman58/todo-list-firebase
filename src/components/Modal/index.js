import {RiCloseLine} from "react-icons/ri";
import styles from "./Modal.module.less"
import AddTodoForm from "../AddTodoForm";
import EditTodoForm from "../EditTodoForm";
import {useContext} from "react";
import {TodoContext} from "../../context/TodoContext";


const Modal = ({isEdit, todoId}) => {
    const {setIsOpen} = useContext(TodoContext)

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)}/>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Add Todo</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{marginBottom: "-3px"}}/>
                    </button>
                    {!isEdit ? <AddTodoForm setIsOpen={setIsOpen}/>
                        : <EditTodoForm setIsOpen={setIsOpen} todoId={todoId}/>}
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            {!isEdit ? <button className={styles.deleteBtn} type="submit" form="add">
                                    Add
                                </button>
                                : <button className={styles.deleteBtn} type="submit" form="edit">
                                    Edit
                                </button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;
