import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { firebaseConfig } from './firebase-config.js';



const firebaseConfig = {
    apiKey: "AIzaSyBAh3S7U6h6E1cg5AZS8Yr6CVZuVQBkmUo",
    authDomain: "sportsbuddy-10.firebaseapp.com",
    projectId: "sportsbuddy-10",
    storageBucket: "sportsbuddy-10.appspot.com",
    messagingSenderId: "623624815959",
    appId: "1:623624815959:web:29f594d2298acbf3a62a12"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const eventNameInput = document.getElementById("eventName");
const eventLocationInput = document.getElementById("eventLocation");
const eventTimeInput = document.getElementById("eventTime");
const addEventBtn = document.getElementById("addEventBtn");
const eventListContainer = document.getElementById("eventList");
const loader = document.getElementById("loader");

function setLoading(isLoading) {
    addEventBtn.disabled = isLoading;
    loader.style.display = isLoading ? 'inline-block' : 'none';
}

function validateInputs() {
    const name = eventNameInput.value.trim();
    const location = eventLocationInput.value.trim();
    const time = eventTimeInput.value;
    if (!name || !location || !time) {
        alert('All fields are required.');
        return null;
    }
    return { name, location, time: new Date(time) };
}

addEventBtn.addEventListener("click", async () => {
    const data = validateInputs();
    if (!data) onAuthStateChanged(auth, (user) => {
        if (!user || user.email !== "admin@emaple.com") {
            alert("Access denied. Admins only.");
            window.location.href = "../index.html";
        } else {
            console.log("Admin logged in:", user.email);
        }
    });
    ;

    try {
        setLoading(true);
        await addDoc(collection(db, "sportsEvents"), {
            name: data.name,
            location: data.location,
            time: data.time,
            createdAt: serverTimestamp(),
            createdBy: auth.currentUser.uid
        });
        alert("Event added successfully!");
        eventNameInput.value = eventLocationInput.value = eventTimeInput.value = "";
        fetchEvents();
    } catch (err) {
        console.error("Error adding event:", err);
        alert("Failed to add event: " + err.message);
    } finally {
        setLoading(false);
    }
});

async function fetchEvents() {
    try {
        eventListContainer.innerHTML = '';
        const q = query(
            collection(db, "sportsEvents"),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
            const { name, location, time } = doc.data();
            const li = document.createElement("li");
            li.className = "bg-white p-4 rounded-lg shadow mb-2";
            li.innerHTML = `
        <strong>${name}</strong><br>
        <em>${location}</em><br>
        <small>${new Date(time.seconds * 1000).toLocaleString()}</small>
      `;
            eventListContainer.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching events:", err);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchEvents();
    } else {
        alert("Please log in as admin.");
        window.location.href = "admin-login.html";
    }
});
