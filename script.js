// 1. Background Hearts Generator
const heartContainer = document.getElementById('heartContainer');
setInterval(() => {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.classList.add('bg-heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
  heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 13000);
}, 800);

// 2. Daily Message Randomizer
const messages = [
  "You make my codebase bug-free. 💕",
  "Every moment with you is my favorite memory.",
  "I love you more than caffeine on a Monday morning.",
  "You are the CSS to my HTML."
];
document.getElementById('aiDailyMessage').innerText = messages[Math.floor(Math.random() * messages.length)];

// 3. Do You Love Me? (Dodging Logic)
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const loveResponse = document.getElementById('loveResponse');

const dodge = (e) => {
  e.preventDefault(); // Prevents mobile touch from immediately clicking
  const x = Math.random() * 150 - 75; // Moves left or right
  const y = Math.random() * -100 - 50; // Moves up
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
};
// Bind to both mouse hover and mobile tap
noBtn.addEventListener('mouseover', dodge);
noBtn.addEventListener('touchstart', dodge, {passive: false});

yesBtn.addEventListener('click', () => {
  confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
  loveResponse.innerText = "I knew it! I love you too! 🥰";
  loveResponse.style.display = 'block';
  noBtn.style.display = 'none';
});

// 4. Random Reasons Jar
const jarBtn = document.getElementById('jarBtn');
const jarOutput = document.getElementById('jarOutput');
const reasons = [
  "The way you scrunch your nose when you laugh.",
  "How you always support my crazy coding projects.",
  "Your awful, adorable taste in movies.",
  "Because you make the hard days feel easy."
];
jarBtn.addEventListener('click', () => {
  jarOutput.innerText = reasons[Math.floor(Math.random() * reasons.length)];
  jarOutput.style.display = 'block';
  jarOutput.style.animation = 'none';
  setTimeout(() => jarOutput.style.animation = 'floatUp 0.5s ease-out', 10);
});

// 5. Open When Letters (Mood Routing)
const letterBtns = document.querySelectorAll('.letter-btn');
const moodOverlay = document.getElementById('moodOverlay');
const closeMoodBtn = document.getElementById('closeMoodBtn');

const moodData = {
  sad: { title: "When you're sad 🌧️", text: "Close your eyes. Take a deep breath. I am right here with you, and whatever is hurting you will pass. I love you.", color: "rgba(10, 25, 47, 0.95)" },
  happy: { title: "When you're happy ☀️", text: "Keep smiling! Your smile literally lights up my entire world.", color: "rgba(255, 180, 0, 0.95)" },
  miss: { title: "When you miss me 🥺", text: "I miss you too! Look at the moon tonight, we are looking at the exact same one.", color: "rgba(75, 20, 50, 0.95)" }
};

letterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const mood = e.target.getAttribute('data-mood');
    const data = moodData[mood];
    
    moodOverlay.style.background = data.color;
    document.getElementById('moodTitle').innerText = data.title;
    document.getElementById('moodContent').innerText = data.text;
    moodOverlay.style.display = 'flex';
  });
});

closeMoodBtn.addEventListener('click', () => moodOverlay.style.display = 'none');

// 6. Leaflet Memory Map (Initializes on load)
function initMap() {
  if (document.getElementById('memoryMap').innerHTML !== "") return;
  // Centered on New Delhi
  const map = L.map('memoryMap').setView([28.6139, 77.2090], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const marker = L.marker([28.6139, 77.2090]).addTo(map);
  marker.bindPopup("<b>Our Spot!</b><br>A special memory happened here.").openPopup();
}
setTimeout(initMap, 500); // Small delay ensures the map container is fully rendered

// 7. Settings Modal UI Logic
const settingsBtn = document.getElementById("settingsBtn");
const setupModal = document.getElementById("setupModal");
const closeModal = document.getElementById("closeModal");

settingsBtn.addEventListener("click", () => setupModal.style.display = "flex");
closeModal.addEventListener("click", () => setupModal.style.display = "none");

// 8. Firebase Sync (IMPORTANT: Paste YOUR config keys here!)
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
  const db = firebase.database();
  const appRef = db.ref("appSettings");

  // Read from Database
  appRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
      document.getElementById("displayPartnerName").innerText = data.partnerName || "Partner";
      document.getElementById("partnerNameInput").value = data.partnerName || "";
      document.getElementById("anniversaryInput").value = data.anniversaryDate || "";
      
      if (data.anniversaryDate) {
        const msDiff = new Date() - new Date(data.anniversaryDate);
        const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        document.getElementById("daysCounter").innerText = days >= 0 ? days : 0;
      }
    }
  });

  // Write to Database
  document.getElementById("saveSyncBtn").addEventListener("click", () => {
    const newData = {
      partnerName: document.getElementById("partnerNameInput").value,
      anniversaryDate: document.getElementById("anniversaryInput").value
    };
    appRef.update(newData).then(() => {
      setupModal.style.display = "none";
      alert("Settings Saved & Synced! 💕");
    });
  });

} catch (error) {
  console.error("Firebase Init Error:", error);
}