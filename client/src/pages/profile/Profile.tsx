import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Profile.module.scss";

export default function Profile() {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex-fill d-flex justify-content-center align-items-center">
            <div className={`${styles.profileContainer} card p-20`}>
                <h2 className="text-center">Profil</h2>
                <ul>
                    <li>Nom: {user.userName}</li>
                    <li>Email: {user.local.email}</li>
                </ul>
            </div>
        </div>
    );
}
