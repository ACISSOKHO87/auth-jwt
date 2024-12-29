import { getCurrentUser } from "../apis/auth";

export async function AuthRequire() {
    return getCurrentUser();
}
