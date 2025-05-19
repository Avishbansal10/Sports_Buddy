import { auth } from "./firebase-config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { logAction } from "./logging.js";

export async function register(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        logAction(userCredential.user.uid, "register", { email });
        alert("Registration Successful!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
}
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        logAction(userCredential.user.uid, "login", { email });
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
}
export async function logout() {
    await signOut(auth);
    alert("Logged out!");
    window.location.href = "login.html";
}
export function observeAuthState(redirectIfLoggedOut = true) {
    onAuthStateChanged(auth, (user) => {
        if (!user && redirectIfLoggedOut) {
            window.location.href = "login.html";
        }
    });
}
