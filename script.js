let countdown = null;
let zeitInSekunden = 0;
let pausiert = false;

// ⏯️ Start-Button
document.getElementById("startButton").addEventListener("click", function () {
  if (countdown) return; // Verhindert mehrfaches Starten
  startTimer(true); // true = komplett neuer Start
});

// 🔄 Reset-Button
document.getElementById("resetButton").addEventListener("click", () => {
  clearInterval(countdown);
  countdown = null;
  zeitInSekunden = 0;
  pausiert = false;
  document.getElementById("timeDisplay").textContent = "25:00";
  document.getElementById("zeit").value = "25";
  console.log("🔄 Timer zurückgesetzt");
});

// ⏸️ Pause-Button
document.getElementById("pauseButton").addEventListener("click", () => {
  if (countdown) {
    clearInterval(countdown);
    countdown = null;
    pausiert = true;
    console.log("⏸️ Timer pausiert");
  }
});

// ▶️ Weiter-Button
document.getElementById("continueButton").addEventListener("click", () => {
  if (!countdown && pausiert) {
    startTimer(false); // ohne neuen Wert
    pausiert = false;
    console.log("▶️ Timer läuft weiter");
  }
});

// 🧠 Timer-Funktion mit Steuerung
function startTimer(neuStart = false) {
  const anzeige = document.getElementById("timeDisplay");

  if (neuStart) {
    const eingabe = document.getElementById("zeit").value;
    const minuten = parseInt(eingabe);

    if (isNaN(minuten) || minuten <= 0) {
      alert("Bitte eine gültige Minutenanzahl eingeben!");
      return;
    }

    zeitInSekunden = minuten * 60;
  }

  countdown = setInterval(() => {
    if (zeitInSekunden <= 0) {
      clearInterval(countdown);
      countdown = null;
      anzeige.textContent = "⏰ Zeit ist um!";
      return;
    }

    const min = Math.floor(zeitInSekunden / 60);
    const sek = zeitInSekunden % 60;
    anzeige.textContent = ` ${min}:${sek < 10 ? "0" + sek : sek}`;
    zeitInSekunden--;
  }, 1000);

  console.log("⏱️ Timer läuft...");
}
// 🎻 Musiksteuerung
const musik = document.getElementById("musik");
const musikButton = document.getElementById("musikButton");
const stop = document.getElementById("stop");
const lauter = document.getElementById("lauter");
const leiser = document.getElementById("leiser");

// ▶️ Play
musikButton.addEventListener("click", () => musik.play());

// ⏹️ Stop
stop.addEventListener("click", () => {
  musik.pause();
  musik.currentTime = 0;
});

// 🔊 Lauter
lauter.addEventListener("click", () => {
  if (musik.volume < 1) musik.volume = Math.min(1, musik.volume + 0.1);
});

// 🔉 Leiser
leiser.addEventListener("click", () => {
  if (musik.volume > 0) musik.volume = Math.max(0, musik.volume - 0.1);
});

// 🧠 DOM-Elemente holen
const nervi = document.getElementById("nervi");
const sherlock = document.getElementById("sherlock");

// 💬 Sprüche für Nervi & Sherlock
const spruecheNervi = [
  "✨ Du schaffst das!",
  "✨ Ich glaube an dich!",
  "✨ Noch ein bisschen – dann Pause!",
  "✨ Fokus aktiviert. Sternenpower!",
  "✨ Trink was, bevor du vertrocknest wie ein Museumsdino!",
  "✨ Hallo?! Konzentration, bitte!",
  "✨ Wenn du weiter so starrst, wird die Wand dich adoptieren.",
  "✨ Ich zähl bis drei und dann bist du wieder konzentriert. 1... 2... 2½...",
  "✨ Ich bin klein, aber dafür laut! Fokus, du Sternchen!",
  "✨ Das hier ist kein Tagtraum-Theater. Das hier ist dein Lernabenteuer!",
  "✨ Du bist nicht müde. Dein Gehirn lädt nur kurz Magie nach.",
  "✨ Ein bisschen Glitzer auf die Aufgabe – und zack, du rockst das!",
  "✨ Pausen sind kein Weltuntergang. Nur eine freundliche Erinnerung vom Universum.",
  "✨ Dein ADHS ist wie ich – chaotisch, funkelnd und absolut zauberhaft.",
  "✨ Du bist kein Problem. Du bist ein Feuerwerk mit eigener Umlaufbahn!",
  "✨ Konzentration ist kein Mythos. Ich hab sie gesehen. Irgendwo…",
  "✨ Nervi sagt: Du bist besser als diese Ablenkung!",
  "✨ Die Zeit läuft! Und ich nerv auch gleich weiter, wenn du nicht loslegst!"
];

const spruecheSherlock = [
  "🐾 Trink was. Auch Genies dehydrieren.",
  "🐾 Ein leerer Bauch kann nicht kombinieren.",
  "🐾 Fakten! Keine Ausreden. Weiter geht's.",
  "🐾 Beobachten, nicht verzweifeln.",
  "🐾 Die Mumie im Ägyptenraum hat mehr Bewegung als du heute.",
  "🐾 Hättest du mal auf mich gehört. Aber nein, du brauchst Drama.",
  "🐾 Selbst die Dinosaurier haben’s nicht so lange ausgehalten. Pause gefällig?",
  "🐾 Ich versteh ja, dass Ablenkung dein Hobby ist. Aber jetzt: Fokus.",
  "🐾 Das ist nicht Aufschieben, das ist archäologische Tiefenmeditation. Wirklich beeindruckend.",
  "🐾 ADHS ist kein Grund – das ist dein Superheldenanzug. Jetzt flieg.",
  "🐾 Ich mecker nur, weil ich dich mag. Sonst wärst du mir zu anstrengend.",
  "🐾 Wer seine Pause ignoriert, bekommt Besuch vom Fluch der Amphore.",
  "🐾 Du starrst das Exponat an wie ein Rätsel – und ich liebe dich dafür.",
  "🐾 Achtung: Du verlierst dich wieder in Gedanken. Such dich schnell wieder!",
  "🐾 Dein Gehirn springt mehr als ein Museumsbesucher auf Koffein. Beruhig dich.",
  "🐾 Noch ein Versuch, dich abzulenken, und ich werf dir ein Fossil an den Kopf. Mit Liebe, natürlich.",
  "🐾 das ist kein Chaos – das ist ein ADHS-Meisterwerk in Aktion.",
  "🐾 Du weißt, dass ich recht habe. Also tu nicht so, als wär das überraschend."
];

// 💫 Funktion zum Zeigen der Bubble
function zeigeBubble(quelle) {
  const box = quelle === "nervi" ? nervi : sherlock;
  const bubble = box.querySelector(".bubble"); // 👈 GENAU DIE Bubble, die zur Box gehört
  const spruchArray = quelle === "nervi" ? spruecheNervi : spruecheSherlock;
  const spruch = spruchArray[Math.floor(Math.random() * spruchArray.length)];

  bubble.textContent = spruch;
  box.classList.remove("hidden");

  setTimeout(() => {
    box.classList.add("hidden");
  }, 10000);
}
// 🎧 Audio-Elemente für Geräusche
const geraeusche = {
  regen: document.getElementById("regen"),
  gewitter: document.getElementById("gewitter"),
  stadt: document.getElementById("stadt"),
  museum: document.getElementById("museum"),
};

// 🧠 Status-Tracker
const soundAktiv = {
  regen: false,
  gewitter: false,
  stadt: false,
  museum: false,
};

// 🔄 Umschaltfunktion für die Buttons
function toggleGeraeusch(id) {
  const sound = geraeusche[id];
  if (!sound) return;

  if (!soundAktiv[id]) {
    sound.play();
    soundAktiv[id] = true;
    console.log(`🔊 ${id} läuft`);
  } else {
    sound.pause();
    sound.currentTime = 0;
    soundAktiv[id] = false;
    console.log(`🔇 ${id} gestoppt`);
  }
}

// 🧩 Buttons verbinden
document.getElementById("regenBtn").addEventListener("click", () => toggleGeraeusch("regen"));
document.getElementById("gewitterBtn").addEventListener("click", () => toggleGeraeusch("gewitter"));
document.getElementById("stadtBtn").addEventListener("click", () => toggleGeraeusch("stadt"));
document.getElementById("museumBtn").addEventListener("click", () => toggleGeraeusch("museum"));

// ✅ Testausgabe, optional
console.log(geraeusche.museum.readyState); // → sollte 4 sein, wenn geladen

// 🧠 Motivation-Buttons verbinden
document.getElementById("testNervi").addEventListener("click", () => zeigeBubble("nervi"));
document.getElementById("sherlockBtn").addEventListener("click", () => zeigeBubble("sherlock"));

// ... dein kompletter JS-Code oben ...

// 🎲 Zufallsanzeige von Nervi & Sherlock
function starteZufallsBubbles() {
  function zeigeZufallsBubble() {
    const wer = Math.random() < 0.5 ? "nervi" : "sherlock";
    zeigeBubble(wer); // deine bestehende Bubble-Funktion
    const naechsteZeit = Math.floor(Math.random() * (10 * 60 * 1000)) + (5 * 60 * 1000);
    setTimeout(zeigeZufallsBubble, naechsteZeit);
  }
  zeigeZufallsBubble();
}

// 💥 Wichtig: Beim Laden starten
document.addEventListener("DOMContentLoaded", () => {
  starteZufallsBubbles(); // hier wird der Zufalls-Zauber aktiviert!
});

// ───────────── 🎁 Zufallsüberraschungen ─────────────
document.addEventListener("DOMContentLoaded", () => {
  starteZufallsBubbles();
});