document.addEventListener("DOMContentLoaded", () => {
  // 1. Background Hearts
  const heartContainer = document.getElementById('heartContainer');
  if(heartContainer) {
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
  }

  // 2. Daily Message
  const messages = [
    "You make my codebase bug-free. 💕",
    "Every moment with you is my favorite memory.",
    "I love you more than caffeine on a Monday morning.",
    "You are the CSS to my HTML."
  ];
  const msgEl = document.getElementById('aiDailyMessage');
  if(msgEl) msgEl.innerText = messages[Math.floor(Math.random() * messages.length)];

  // 3. Dodging Button
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const loveResponse = document.getElementById('loveResponse');

  if(noBtn && yesBtn) {
    const dodge = (e) => {
      e.preventDefault(); 
      const x = Math.random() * 150 - 75; 
      const y = Math.random() * -100 - 50; 
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
    };
    noBtn.addEventListener('mouseover', dodge);
    noBtn.addEventListener('touchstart', dodge, {passive: false});

    yesBtn.addEventListener('click', () => {
      confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
      loveResponse.innerText = "I knew it! I love you too! 🥰";
      loveResponse.style.display = 'block';
      noBtn.style.display = 'none';
    });
  }

  // 4. Reasons Jar
  const jarBtn = document.getElementById('jarBtn');
  const jarOutput = document.getElementById('jarOutput');
  const reasons = [
    "The way you scrunch your nose when you laugh.", "How you always support my crazy coding projects.",
    "Your awful, adorable taste in movies.", "Because you make the hard days feel easy.",
    "The way your eyes light up when you talk about things you love.", "How safe I feel when I'm with you.",
    "Because you're my best friend.", "The sound of your voice.", "Your completely contagious laugh.",
    "How you always know how to make me smile.", "Because you challenge me to be better.",
    "The way you look at me.", "Your warmth and kindness.", "How we can talk for hours about nothing.",
    "Because even your flaws are perfect to me.", "The way you hold my hand.",
    "Your sense of humor perfectly matches mine.", "Because you remember the little things.",
    "How comfortable we are in comfortable silence.", "Because you believe in me.",
    "Your smile can fix my worst days.", "Because of all our inside jokes.",
    "The way you say my name.", "How you care so deeply for others.",
    "Because you're the first person I want to tell good news to.", "Your determination.",
    "How you make every ordinary day feel special.", "Because you never give up on us.",
    "The way you get excited about food.", "Your endless patience with me.",
    "Because you are my favorite notification.", "The way you sleep.", "Your intelligence.",
    "Because you make me feel understood.", "How you text me just to check in.",
    "Because you let me be exactly who I am.", "Your spontaneous ideas.",
    "Because I can't imagine my future without you in it.", "How perfectly we fit together.",
    "Because you're the most beautiful person inside and out.", "The way you tease me.",
    "Because you always listen when I need to vent.", "Your passion for life.",
    "Because you make me want to be the best version of myself.", "The way you give the best hugs.",
    "Because every love song reminds me of you.", "How you forgive me when I mess up.",
    "Because you are my home.", "The way you look when you're deeply focused.",
    "Because choosing you is the easiest decision I've ever made."
  ];
  if(jarBtn) {
    jarBtn.addEventListener('click', () => {
      jarOutput.innerText = reasons[Math.floor(Math.random() * reasons.length)];
      jarOutput.style.display = 'block';
      jarOutput.style.animation = 'none';
      setTimeout(() => jarOutput.style.animation = 'floatUp 0.5s ease-out', 10);
    });
  }

  // 5. Open When Letters
  const letterBtns = document.querySelectorAll('.letter-btn');
  const moodOverlay = document.getElementById('moodOverlay');
  const closeMoodBtn = document.getElementById('closeMoodBtn');

  const moodData = {
    sad: { title: "When you're sad 🌧️", text: "Close your eyes. Take a deep breath. I am right here with you, and whatever is hurting you will pass. I love you.", color: "rgba(10, 25, 47, 0.95)" },
    happy: { title: "When you're happy ☀️", text: "Keep smiling! Your smile literally lights up my entire world.", color: "rgba(255, 180, 0, 0.95)" },
    miss: { title: "When you miss me 🥺", text: "I miss you too! Look at the moon tonight, we are looking at the exact same one.", color: "rgba(75, 20, 50, 0.95)" },
    angry: { title: "When you're angry 😡", text: "Take a second to breathe. Drink a glass of water. If you're mad at me, I'm sorry. Let's talk it out when you're ready. I love you regardless.", color: "rgba(80, 10, 10, 0.95)" },
    bored: { title: "When you're bored 🥱", text: "Text me right now! Or go look at our old photos. Or try touching your nose with your tongue. See, slightly less bored now?", color: "rgba(40, 40, 40, 0.95)" },
    annoyed: { title: "When you're annoyed 🙄", text: "Whatever is getting on your nerves isn't worth your peace. Roll your eyes, let it go, and remember I'm always on your side.", color: "rgba(80, 50, 0, 0.95)" },
    stressed: { title: "When you're stressed 😫", text: "You are doing great. One step at a time, one thing at a time. You are so much stronger than whatever is stressing you out.", color: "rgba(20, 50, 50, 0.95)" },
    insecure: { title: "When you feel insecure 🫂", text: "If you could see yourself through my eyes, you would never doubt yourself again. You are absolutely perfect to me.", color: "rgba(50, 20, 60, 0.95)" },
    sick: { title: "When you're sick 🤒", text: "Drink water, get some sleep, and let your body rest. I wish I was there to take care of you right now.", color: "rgba(20, 60, 30, 0.95)" },
    overthinking: { title: "When you're overthinking 🌀", text: "Stop. Let go of the scenarios that haven't happened. Focus on what is real right now: You are safe, you are loved, and everything will be okay.", color: "rgba(30, 30, 80, 0.95)" }
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

  if(closeMoodBtn) {
    closeMoodBtn.addEventListener('click', () => moodOverlay.style.display = 'none');
  }

  // 6. Settings Modal
  const settingsBtn = document.getElementById("settingsBtn");
  const setupModal = document.getElementById("setupModal");
  const closeModal = document.getElementById("closeModal");

  if(settingsBtn && setupModal && closeModal) {
    settingsBtn.addEventListener("click", () => setupModal.style.display = "flex");
    closeModal.addEventListener("click", () => setupModal.style.display = "none");
  }

  // 7. Firebase Initialization
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

    appRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        document.getElementById("displayPartnerName").innerText = data.partnerName || "Partner";
        document.getElementById("partnerNameInput").value = data.partnerName || "";
        document.getElementById("anniversaryInput").value = data.anniversaryDate || "";
        document.getElementById("secretUnlockDateInput").value = data.secretUnlockDate || "";
        document.getElementById("secretLetterInput").value = data.secretLetter || "";
        
        if (data.anniversaryDate) {
          const annivDate = new Date(data.anniversaryDate);
          annivDate.setHours(0,0,0,0);
          const today = new Date();
          today.setHours(0,0,0,0);
          const msDiff = today - annivDate;
          const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
          document.getElementById("daysCounter").innerText = days >= 0 ? days : 0;
        }
      }
    });

    document.getElementById("saveSyncBtn").addEventListener("click", () => {
      const newData = {
        partnerName: document.getElementById("partnerNameInput").value,
        anniversaryDate: document.getElementById("anniversaryInput").value,
        secretUnlockDate: document.getElementById("secretUnlockDateInput").value,
        secretLetter: document.getElementById("secretLetterInput").value
      };
      appRef.update(newData).then(() => {
        setupModal.style.display = "none";
        alert("Settings Saved & Synced! 💕");
      });
    });

    document.getElementById("secretDateInput").addEventListener("change", (e) => {
      appRef.once("value").then((snapshot) => {
        const data = snapshot.val();
        if (data && e.target.value === data.secretUnlockDate) {
          document.getElementById("secretLetterContent").innerText = data.secretLetter;
          document.getElementById("secretLetterContent").style.display = "block";
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        } else {
          document.getElementById("secretLetterContent").style.display = "none";
        }
      });
    });

  } catch (error) {
    console.error("Firebase Init Error:", error);
  }
});