import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Signup.module.scss";
import { signup } from "../../apis/user";
import { UserForm } from "../../interfaces/unser.interface";

export default function Signup() {
    const navigate = useNavigate();

    const registerSchema = yup.object({
        userName: yup
            .string()
            .required("Le nom est obigatoire")
            .min(4, "Trop court (4 min)"),
        email: yup
            .string()
            .required("l'email est obligatoire")
            .email("l'email invalide"),

        password: yup
            .string()
            .required("le mot de passe est obligatoire")
            .min(6, "Mot de passe trop court (6 min)"),
    });

    const initValues: UserForm = {
        userName: "",
        email: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        //setError,
        clearErrors,
    } = useForm<UserForm>({
        defaultValues: {
            ...initValues,
        },
        resolver: yupResolver(registerSchema),
    });
    const onSubmit = handleSubmit(async (data) => {
        try {
            clearErrors();
            await signup(data);
            navigate("/signin");
        } catch (message) {
            console.log(message);
            //setError("email" { type: "generic", message });
        }
    });
    return (
        <div className="flex-fill d-flex align-items-center justify-content-center">
            <form
                onSubmit={onSubmit}
                className={` d-flex flex-column card p-20 ${styles.form}`}
            >
                <h2 className="mb-10 teext-center">Inscription</h2>
                <div className="mb-10 d-flex flex-column">
                    <label htmlFor="userName">Nom</label>
                    <input
                        id="userName"
                        type="text"
                        {...register("userName")}
                    />
                    {errors.userName && (
                        <p className="form-error">{errors.userName.message}</p>
                    )}
                </div>
                <div className="mb-10 d-flex flex-column ">
                    <label htmlFor="email">Email</label>
                    <input id="email" {...register("email")} />
                    {errors.email && (
                        <p className="form-error">{errors.email.message}</p>
                    )}
                </div>
                <div className="mb-10 d-flex flex-column">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="form-error ">{errors.password.message}</p>
                    )}
                </div>
                <div className="text-center">
                    <button disabled={isSubmitting} className="btn btn-primary">
                        Inscription
                    </button>
                </div>
            </form>
        </div>
    );
}
