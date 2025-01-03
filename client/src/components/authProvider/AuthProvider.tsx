import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getCurrentUser } from "../../apis/auth";
import { IUser, IUserLocal } from "../../interfaces/unser.interface";
import { signin as login, signout as logout } from "../../apis/user";

interface props {
    children: ReactNode;
}
export default function AuthProvider({ children }: props) {
    const [user, setUser] = useState<IUser | null>(null);

    async function signin(credentials: IUserLocal) {
        const newUser = await login(credentials);
        setUser((currentUser) => (currentUser = newUser));
    }

    async function signout() {
        await logout();
        setUser((currentUser) => (currentUser = null));
    }

    useEffect(() => {
        getCurrentUser().then((res) => {
            setUser((current) => (current = res));
        });
    }, []);
    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}
