import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserLocal } from "../../interfaces/unser.interface";
import { AuthContext } from "../../context/AuthContext";
import * as yup from "yup";
import styles from "./Signin.module.scss";

export default function Signin() {
    const { signin, user } = useContext(AuthContext);

    const userSchema = yup.object({
        email: yup
            .string()
            .required("l'email est obligatoire ")
            .email("l'email invalide"),
        password: yup
            .string()
            .required("Mot de passe obligatoire")
            .min(6, "Mot de passe trop court"),
    });

    const initValues: IUserLocal = {
        email: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm<IUserLocal>({
        defaultValues: {
            ...initValues,
        },
        resolver: yupResolver(userSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            clearErrors();
            await signin(data);
        } catch (message: any) {
            setError("password", { type: "password", message });
        }
    });

    return (
        <>
            {user ? (
                <Navigate to="/profile" />
            ) : (
                <div className="flex-fill d-flex align-items-center justify-content-center">
                    <form
                        onSubmit={onSubmit}
                        className={` d-flex flex-column card p-20 ${styles.form}`}
                    >
                        <h2 className="mb-10 text-center">Connexion</h2>
                        <div className="mb-10 d-flex flex-column ">
                            <label htmlFor="email">Email</label>
                            <input id="email" {...register("email")} />
                            {errors.email && (
                                <p className="form-error">
                                    {errors.email.message}
                                </p>
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
                                <p className="form-error ">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="text-center">
                            <button
                                disabled={isSubmitting}
                                className="btn btn-primary"
                            >
                                Connexion
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
