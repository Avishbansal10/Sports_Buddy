import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBAh3S7U6h6E1cg5AZS8Yr6CVZuVQBkmUo",

    authDomain: "sportsbuddy-10.firebaseapp.com",

    projectId: "sportsbuddy-10",

    storageBucket: "sportsbuddy-10.firebasestorage.app",

    messagingSenderId: "623624815959",

    appId: "1:623624815959:web:29f594d2298acbf3a62a12"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function logAction(userId, actionType, details) {
    try {
        const logsRef = collection(db, "logs");
        await addDoc(logsRef, {
            userId,
            actionType,
            details,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error("Logging failed:", error);
    }
}

export async function adminLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Admin logged in successfully");
        return userCredential.user;
    } catch (error) {
        alert("Login failed: " + error.message);
    }
}

export async function addSportsEvent(data) {
    if (!auth.currentUser) {
        alert("Please login as admin.");
        return;
    }
    try {
        const sportsEventsRef = collection(db, "sportsEvents");
        const docRef = await addDoc(sportsEventsRef, data);
        await logAction(auth.currentUser.uid, "add_sports_event", { id: docRef.id, data });
        alert("Sports event added successfully.");
    } catch (error) {
        alert("Error adding sports event: " + error.message);
    }
}

export async function updateSportsEvent(id, data) {
    if (!auth.currentUser) {
        alert("Please login as admin.");
        return;
    }
    try {
        const eventRef = doc(db, "sportsEvents", id);
        await updateDoc(eventRef, data);
        await logAction(auth.currentUser.uid, "update_sports_event", { id, data });
        alert("Sports event updated successfully.");
    } catch (error) {
        alert("Error updating sports event: " + error.message);
    }
}

export async function deleteSportsEvent(id) {
    if (!auth.currentUser) {
        alert("Please login as admin.");
        return;
    }
    try {
        const eventRef = doc(db, "sportsEvents", id);
        await deleteDoc(eventRef);
        await logAction(auth.currentUser.uid, "delete_sports_event", { id });
        alert("Sports event deleted successfully.");
    } catch (error) {
        alert("Error deleting sports event: " + error.message);
    }
}

export async function addOrUpdateSportsCategory(id = null, data) {
    if (!auth.currentUser) {
        alert("Please login as admin.");
        return;
    }
    try {
        if (id) {
            const categoryRef = doc(db, "sportsCategories", id);
            await updateDoc(categoryRef, data);
            await logAction(auth.currentUser.uid, "update_sports_category", { id, data });
            alert("Sports category updated.");
        } else {
            const categoriesRef = collection(db, "sportsCategories");
            const docRef = await addDoc(categoriesRef, data);
            await logAction(auth.currentUser.uid, "add_sports_category", { id: docRef.id, data });
            alert("Sports category added.");
        }
    } catch (error) {
        alert("Error in sports category operation: " + error.message);
    }
}
export async function addOrUpdateCity(id = null, data) {
    if (!auth.currentUser) {
        alert("Please login as admin.");
        return;
    }
    try {
        if (id) {
            const cityRef = doc(db, "cities", id);
            await updateDoc(cityRef, data);
            await logAction(auth.currentUser.uid, "update_city", { id, data });
            alert("City updated.");
        } else {
            const citiesRef = collection(db, "cities");
            const docRef = await addDoc(citiesRef, data);
            await logAction(auth.currentUser.uid, "add_city", { id: docRef.id, data });
            alert("City added.");
        }
    } catch (error) {
        alert("Error in city operation: " + error.message);
    }
}

export async function addOrUpdateArea(id = null, data) {
    if (!auth.currentUser) {
        alert("Please login as admin.");
        return;
    }
    try {
        if (id) {
            const areaRef = doc(db, "areas", id);
            await updateDoc(areaRef, data);
            await logAction(auth.currentUser.uid, "update_area", { id, data });
            alert("Area updated.");
        } else {
            const areasRef = collection(db, "areas");
            const docRef = await addDoc(areasRef, data);
            await logAction(auth.currentUser.uid, "add_area", { id: docRef.id, data });
            alert("Area added.");
        }
    } catch (error) {
        alert("Error in area operation: " + error.message);
    }
}
export async function deleteDocument(collectionName, id, actionType) {
    if (!auth.currentUser) {
        alert("Please login as admin.");
        return;
    }
    try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
        await logAction(auth.currentUser.uid, actionType, { id });
        alert(`${collectionName} document deleted successfully.`);
    } catch (error) {
        alert(`Error deleting document from ${collectionName}: ` + error.message);
    }
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Admin logged in:", user.email);

    } else {
        console.log("No admin logged in.");

    }
});
