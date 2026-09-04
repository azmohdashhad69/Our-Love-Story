// 1. Failsafe Modal Listeners (Works Offline)
const settingsBtn = document.getElementById("settingsBtn");
const setupModal = document.getElementById("setupModal");
const closeModal = document.getElementById("closeModal");

settingsBtn.addEventListener("click", () => setupModal.style.display = "block");
closeModal.addEventListener("click", () => setupModal.style.display = "none");

// 2. Firebase Initialization (Wrapped in try...catch)
let db;
try {
  const firebaseConfig = {
    apiKey: "AIzaSyCPGc7u3K2Zbm6Ibgg_EFgleBkzUlcJDp0",
    authDomain: "my-lv-story.firebaseapp.com",
    databaseURL: "https://my-lv-story-default-rtdb.firebaseio.com",
    projectId: "my-lv-story",
    storageBucket: "my-lv-story.firebasestorage.app",
    messagingSenderId: "491070772667",
    appId: "1:491070772667:web:d02e0f4fd100ff8a70609e"
  };
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
} catch (error) {
  console.error("Firebase Init Error:", error);
}

// 3. IndexedDB for High-Res Photos
let idb;
const request = indexedDB.open("LovePhotos", 1);
request.onupgradeneeded = (e) => {
  idb = e.target.result;
  idb.createObjectStore("images", { keyPath: "id" });
};
request.onsuccess = (e) => {
  idb = e.target.result;
  loadLocalPhoto();
};

const photoFrame = document.getElementById("photoFrame");
const photoUpload = document.getElementById("photoUpload");
const memoryPhoto = document.getElementById("memoryPhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");

photoFrame.addEventListener("click", () => photoUpload.click());

photoUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const base64String = event.target.result;
    // Save to IndexedDB
    const tx = idb.transaction("images", "readwrite");
    tx.objectStore("images").put({ id: "mainPhoto", data: base64String });
    // Update UI
    displayPhoto(base64String);
  };
  reader.readAsDataURL(file);
});

function displayPhoto(dataUrl) {
  memoryPhoto.src = dataUrl;
  memoryPhoto.style.display = "block";
  photoPlaceholder.style.display = "none";
}

function loadLocalPhoto() {
  const tx = idb.transaction("images", "readonly");
  const request = tx.objectStore("images").get("mainPhoto");
  request.onsuccess = () => {
    if (request.result) displayPhoto(request.result.data);
  };
}

// 4. Firebase Sync & UI Updates
const appRef = db.ref("appSettings");

appRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) {
    document.getElementById("displayPartnerName").innerText = data.partnerName || "Partner";
    
    // Update Counter
    if (data.anniversaryDate) {
      const msDiff = new Date() - new Date(data.anniversaryDate);
      const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      document.getElementById("daysCounter").innerText = days >= 0 ? days : 0;
    }

    // Populate Modal Inputs
    document.getElementById("userNameInput").value = data.userName || "";
    document.getElementById("partnerNameInput").value = data.partnerName || "";
    document.getElementById("anniversaryInput").value = data.anniversaryDate || "";
    document.getElementById("secretUnlockDateInput").value = data.secretUnlockDate || "";
    document.getElementById("secretLetterInput").value = data.secretLetter || "";
    document.getElementById("notificationTimeInput").value = data.notificationTime || "";
  }
});

document.getElementById("saveSyncBtn").addEventListener("click", () => {
  const newData = {
    userName: document.getElementById("userNameInput").value,
    partnerName: document.getElementById("partnerNameInput").value,
    anniversaryDate: document.getElementById("anniversaryInput").value,
    secretUnlockDate: document.getElementById("secretUnlockDateInput").value,
    secretLetter: document.getElementById("secretLetterInput").value,
    notificationTime: document.getElementById("notificationTimeInput").value
  };
  appRef.set(newData).then(() => {
    setupModal.style.display = "none";
    alert("Saved & Synced! 💕");
  });
});

// 5. Secret Letter Confetti Logic
document.getElementById("secretDateInput").addEventListener("change", (e) => {
  appRef.once("value").then((snapshot) => {
    const data = snapshot.val();
    if (data && e.target.value === data.secretUnlockDate) {
      document.getElementById("secretLetterContent").innerText = data.secretLetter;
      document.getElementById("secretLetterContent").style.display = "block";
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ["#ff4b72", "#ffffff", "#ff8fa3"] });
    } else {
      document.getElementById("secretLetterContent").style.display = "none";
    }
  });
});

// 6. Push Notifications Subscription
const VAPID_PUBLIC_KEY = "BJwxqOSPdH3790jKbEAjBAEd0N7LiZkJzwtzTNpJhdAjc3-siiKWW2QyvXQkttRG0A6783XlTuwIkR5OOQXW6ng";

document.getElementById("enablePushBtn").addEventListener("click", async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const prefTime = document.getElementById("notificationTimeInput").value || "09:00";

      // Send to Backend
      await fetch("https://love-story-api.onrender.com/subscribe", {
        method: "POST",
        body: JSON.stringify({ subscription, timezone, prefTime }),
        headers: { "Content-Type": "application/json" }
      });
      alert("Push Notifications Enabled! 🔔");
    } catch (error) {
      console.error("Push Error:", error);
    }
  }
});