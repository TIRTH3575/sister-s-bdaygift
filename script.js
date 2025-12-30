const jars = {
    smile: [
        "That time you said you love to make me smile i smiled HARD.",
        "When you told me i am the best bro alive.",
        "tbh i was just thinking how much your happiness affects me and makes me happier lol so you better keep smiling :3"
    ],
    miss: [
        "When I feel a bit alone.",
        "when i miss the moments where we used to chat all ngiht lol.",
        "when i sometimes see moon and remember how you also loved to see moon.",
        "when i was walking in my room thinking about IIT i missed ya."
    ],
    here: [
        "i wish i could have pillow fights with you.",
        "wanna have long walks?",
        "i wanna pat your head so bad ;-;"
    ]
};
function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    });
}
function getSeen(jar) {
    return JSON.parse(localStorage.getItem(`seen-${jar}`)) || [];
}

function saveSeen(jar, data) {
    localStorage.setItem(`seen-${jar}`, JSON.stringify(data));
}

function getUnseen(jar) {
    const seenTexts = getSeen(jar).map(item => item.text);
    return jars[jar].filter(note => !seenTexts.includes(note));
}
function openJar(jar) {
    const unseen = getUnseen(jar);

    if (unseen.length === 0) {
        document.getElementById("note").innerHTML =
            "<div>Nothing new here yet 🤍</div>";
        return;
    }

    const note = unseen[0];
    document.getElementById("note").innerHTML = `
    <div>${note}</div>
    <div style="font-size:0.8rem;color:#999;margin-top:6px;">
      Added just now 💌
    </div>
  `;

    const seen = getSeen(jar);
    seen.push({ text: note, addedAt: getCurrentTimestamp() });
    saveSeen(jar, seen);

    updateBadges();
}
function updateBadges() {
    for (let jar in jars) {
        const unseenCount = getUnseen(jar).length;
        const badge = document.getElementById(`badge-${jar}`);
        if (badge) {
            badge.style.display = unseenCount > 0 ? "block" : "none";
        }
    }
}
function toggleMenu() {
    document.getElementById("memoryPanel").classList.toggle("open");
}
function showArchive(jar) {
    const archive = document.getElementById("archive");
    archive.style.display = "block";
    const seen = getSeen(jar);

    if (seen.length === 0) {
        archive.innerHTML = "<p>No memories here yet 🤍</p>";
        return;
    }

    archive.innerHTML = "";
    seen.slice().reverse().forEach(item => {
        const div = document.createElement("div");
        div.className = "archive-note";
        div.innerHTML = `
      <div>${item.text}</div>
      <div style="font-size:0.75rem;color:#999;margin-top:4px;">
        Added on ${item.addedAt}
      </div>
    `;
        archive.appendChild(div);
    });
}
updateBadges();

