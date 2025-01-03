export async function getCurrentUser() {
    const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL!}/current`,
        {
            credentials: "include",
        }
    );
    return await response.json();
}
