const tasks = [
    { question: "ich - Ihnen - helfen - Können - ?", answer: "Kann ich Ihnen helfen?" },
    { question: "Ich - jetzt - gehen - müssen - .", answer: "Ich muss jetzt gehen." },
    { question: "du - mich - heiraten - Wollen - ?", answer: "Willst du mich heiraten?" },
    { question: "Ich - noch nicht - schlafen - wollen - .", answer: "Ich will noch nicht schlafen." },
    { question: "Hier - du - nicht - rauchen - dürfen - .", answer: "Hier darfst du nicht rauchen." },
    { question: "Du - jetzt - ins Bett gehen - müssen - .", answer: "Du musst jetzt ins Bett gehen." },
    { question: "Papa - heute lange - arbeiten - müssen - .", answer: "Papa muss heute lange arbeiten." },
    { question: "Sie mir - helfen - Können - ?", answer: "Können Sie mir helfen?" },
    { question: "du - einen Kaffee - Möchten - ?", answer: "Möchtest du einen Kaffee?" },
    { question: "du - einen Moment - warten - Können - ?", answer: "Kannst du einen Moment warten?" },
    { question: "Mein Sohn - heute nicht - in die Schule - gehen - können - .", answer: "Mein Sohn kann heute nicht in die Schule gehen." },
    { question: "Er - keinen Alkohol - trinken- dürfen - .", answer: "Er darf keinen Alkohol trinken." },
    { question: "ihr - Englisch - Können - ?", answer: "Könnt ihr Englisch?" },
    { question: "ihr - heute - Pizza essen - Wollen - ?", answer: "Wollt ihr heute Pizza essen?" },
    { question: "Tim - ins Kino - gehen - möchten - .", answer: "Tim möchte ins Kino gehen." },
    { question: "Er - hier - bleiben - wollen - .", answer: "Er will hier bleiben." },
    { question: "Hier - Sie - nicht parken - dürfen - .", answer: "Hier dürfen Sie nicht parken." },
    { question: "Herr Lopez, Sie - den Kurs noch - bezahlen - müssen - .", answer: "Herr Lopez, Sie müssen den Kurs noch bezahlen." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);