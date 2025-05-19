import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

export async function logAction(userId, actionType, details) {
    try {
        await addDoc(collection(db, "logs"), {
            userId,
            actionType,
            details,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error("Logging error:", error);
    }
}
