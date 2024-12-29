import { IUserLocal, UserForm } from "../interfaces/unser.interface";

export async function signup(newUser: UserForm) {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });

    const body = await response.json();
    if (response.ok) {
        // à revoir pour le retour
        return body;
    } else {
        throw body;
    }
}

export async function signin(data: IUserLocal) {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        throw body;
    }
}

export async function signout() {
    await fetch(` ${import.meta.env.VITE_APP_API_URL}/signout`, {
        credentials: "include",
        method: "DELETE",
    });
}
