import styles from "./Profile.module.scss";

export default function Profile() {
    return (
        <div className="flex-fill d-flex justify-content-center align-items-center">
            <div className={`${styles.profileContainer} card p-20`}>
                <h2 className="text-center">Profil</h2>
            </div>
        </div>
    );
}
