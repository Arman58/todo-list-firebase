import {useForm} from "react-hook-form"
import styles from "./AddTodoForm.module.less"
import {storage} from "../../firebase";
import {useContext, useEffect, useState} from "react";
import {TodoContext} from "../../context/TodoContext";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const AddTodoForm = ({setIsOpen}) => {
    const {handleAdd} = useContext(TodoContext)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [file, setFile] = useState("");
    const [imageData, setImageData] = useState({});
    const [per, setPer] = useState(null);

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;

            console.log(name);
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setPer(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageData((prev) => ({...prev, img: downloadURL}));
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);


    const addTodo = async (data) => {
        if (per && per === 100) {
            await handleAdd({...data, ...imageData, checked: false})
        }else{
            await handleAdd({...data, checked: false})
        }
    }

    return (
        <div>
            <form id='add' onSubmit={handleSubmit(addTodo)} className={styles.container}>
                <div className={styles.field}>
                    <label>Title</label>
                    <input type='text' placeholder="TitleAdd"
                           className={styles.input} {...register('title', {required: true})} />
                    {errors.title && <p className={styles.error}>title is required.</p>}
                </div>
                <div className={styles.field}>
                    <label>Description</label>
                    <textarea placeholder="Description"
                              className={styles.input} {...register('description', {required: true})} />
                    {errors.description && <p className={styles.error}>description is required.</p>}
                </div>
                <div className={styles.field}>
                    <label>Date</label>
                    <input type='date' className={styles.input} {...register('date', {required: true})} />
                    {errors.date && <p className={styles.error}>Please enter the end date.</p>}
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                                style={{width: "50px"}}
                            />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="file">
                                    Choose Image:
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{display: "none"}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddTodoForm
