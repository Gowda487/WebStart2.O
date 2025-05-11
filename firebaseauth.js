import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyCn2z0khaLNLUtx54TeuxzyGnP3ypZFsKI",
  authDomain: "regis-4308d.firebaseapp.com",
  projectId: "regis-4308d",
  storageBucket: "regis-4308d.firebasestorage.app",
  messagingSenderId: "810804248185",
  appId: "1:810804248185:web:2297197ba78cf159811ea8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submit handler
document.getElementById("registration-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const id = document.getElementById("idnum").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const classValue = document.getElementById("class").value;
  const section = document.getElementById("section").value;
  const termsAccepted = document.getElementById("terms").checked;

  const laptopInput = document.querySelector('input[name="laptop"]:checked');
  const laptop = laptopInput ? laptopInput.value : null;

  // Validation: Check if laptop is selected
  if (!laptop) {
    alert("Please select whether you have a laptop.");
    return;
  }

  // Validation: Check if terms and conditions are accepted
  if (!termsAccepted) {
    alert("Please agree to the Terms and Conditions.");
    return;
  }

  // Email validation regex (simple validation)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Mobile validation regex (validates a 10-digit mobile number)
  const mobilePattern = /^\d{10}$/;
  if (!mobilePattern.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  try {
    // 🔍 Check if ID already exists in Firestore
    const idQuery = query(collection(db, "registrations"), where("id", "==", id));
    const querySnapshot = await getDocs(idQuery);

    if (!querySnapshot.empty) {
      alert("You have already registered with this ID.");
      return;
    }

    // ✅ Proceed to add new registration
    await addDoc(collection(db, "registrations"), {
      name,
      email,
      id,
      mobile,
      class: classValue,
      section,
      laptop,
      timestamp: serverTimestamp()
    });

    alert("Registration successful! Your data has been saved.");
    document.getElementById("registration-form").reset();
  } catch (error) {
    console.error("Firebase error:", error);
    alert("Error saving data. Check console for details.");
  }
});
