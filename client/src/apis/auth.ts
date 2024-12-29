export async function getCurrentUser() {
    const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL!}/current`
    );
    return response.json();
}
