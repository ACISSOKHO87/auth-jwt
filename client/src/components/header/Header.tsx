import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/images/jwt.svg";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
    const { user, signout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header
            className={` ${styles.header} d-flex flex-row align-items-center`}
        >
            <div className="flex-fill">
                <NavLink to={"/"}>
                    <img src={logo} alt="logo jsonwebtoken" />
                </NavLink>
            </div>
            <div className="d-flex">
                <NavLink to={"#"} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <FaXmark className={styles.menu} />
                    ) : (
                        <FaBars className={styles.menu} />
                    )}
                </NavLink>
                {user ? (
                    <ul className={styles.headerDesktop}>
                        <NavLink to={"/profile"} className="mr-15">
                            Profil
                        </NavLink>
                        <NavLink to="/" onClick={() => signout()}>
                            Déconnexion
                        </NavLink>
                    </ul>
                ) : (
                    <ul className={styles.headerDesktop}>
                        <NavLink to={"/signup"} className="mr-15">
                            Inscription
                        </NavLink>
                        <NavLink to={"/signin"}>Connexion</NavLink>
                    </ul>
                )}
            </div>
        </header>
    );
}
