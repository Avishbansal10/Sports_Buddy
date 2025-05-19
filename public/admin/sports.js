import { db, auth } from "./firebase-config.js";
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { logAction } from "./logging.js";

const sportsCollection = collection(db, "sports_events");
export async function addSportsEvent(eventData) {
    const userId = auth.currentUser.uid;
    try {
        const docRef = await addDoc(sportsCollection, { ...eventData, userId });
        await logAction(userId, "add_sports_event", { id: docRef.id, ...eventData });
        alert("Sports event added!");
    } catch (error) {
        alert("Failed to add event: " + error.message);
    }
}

export async function updateSportsEvent(id, updatedData) {
    const userId = auth.currentUser.uid;
    try {
        const docRef = doc(db, "sports_events", id);
        await updateDoc(docRef, updatedData);
        await logAction(userId, "update_sports_event", { id, ...updatedData });
        alert("Sports event updated!");
    } catch (error) {
        alert("Failed to update event: " + error.message);
    }
}

export async function deleteSportsEvent(id) {
    const userId = auth.currentUser.uid;
    try {
        const docRef = doc(db, "sports_events", id);
        await deleteDoc(docRef);
        await logAction(userId, "delete_sports_event", { id });
        alert("Sports event deleted!");
    } catch (error) {
        alert("Failed to delete event: " + error.message);
    }
}
export async function getUserSportsEvents() {
    const userId = auth.currentUser.uid;
    const q = query(sportsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const events = [];
    snapshot.forEach((doc) => events.push({ id: doc.id, ...doc.data() }));
    return events;
}
