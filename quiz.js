const clickSound = new Audio("soundeffects/click.wav");

const questions = [
    {
        text: "You have suddenly turned into a cat! None of your family or friends can understand you. What is your first thought?",
        image: "images/question1.gif",
        choices: [
            { text: "Interesting... I wonder if I can understand cats now.", points: { TF: 1 } }, // Thinking
            { text: "Oh no... My family and friends must be worried about my sudden disappearance.", points: { IE: -1 } } // Feeling
        ]
    },
    {
        text: "A mysterious wizard cat emerges from the shadows... <br> \"I know you have questions. If you follow me immediately, you will find the answer.\" <br> <br>What do you respond?",
        image: "images/question2.gif",
        choices: [
            { text: "Wait... who are you? Where are we going? Right now? Slow down.", points: { JP: 1 } }, // Judging
            { text: "Okay, lets go.", points: { JP: -1 } } // Percieving
        ]
    },
    {
        text: "You are led to a cat tower. Inside lies a portal. <br>What are your next actions?",
        image: "images/question3.gif",
        choices: [
            { text: "Climb the structure and enter. Theres only one way to find the answer.", points: { SN: 1 } }, // Sensing
            { text: "Enter cautiously. What if I never come back?", points: { SN: -1 } } // Intuitive
        ]
    },
    {
        text: "You enter the portal. You emerge on the other side and are greeted by a whimsical world filled with mushrooms, flowers, and cats! <br>You see a group of cats conversing in front of you. <br>What do you do?",
        image: "images/question4.png",
        choices: [
            { text: "Join them and gather information.", points: { IE: -1 } }, // Extraverted
            { text: "Explore your surroundings first.", points: { IE: 1 } } // Introverted
        ]
    },
    {
        text: "You are guided to a path. On that path, theres a random cardboard box. <br> What do you do?",
        image: "images/question5.png",
        choices: [
            { text: "Open the box. Maybe there is something useful inside.", points: { JP: -1 } }, // Percieving
            { text: "Leave it alone and walk past it. Let's stay focused on the goal.", points: { JP: 1 } } // Judging
        ]
    },
    {
        text: "POOF! The wizard cat appears from out of the box, blocking your path. <br> I see that you are adjusting well to Kitty Ville! All of your questions can be answered by our leader, SunCat! Follow the path up the hill to find him.",
        image: "images/question6.png",
        choices: [
            { text: "SunCat sounds like an important person. Let me prepare myself before meeting him.", points: { IE: 1 } }, // Introverted
            { text: "Cool! I hope hes a bright guy. Lead the way!", points: { IE: -1 } } // Extravert
        ]
    },             
    {
        text: "You walk further up the path and come across a fork in the road. <br>One side seems more dangerous and rugged, but seems to be a shortcut. The other path is paved, but seems like a longer path. <br><br> Which path do you take?",
        image: "images/question7.png",
        choices: [
            { text: "The paved path. It will take longer, but its better to be safe.", points: { JP: 1 } }, // Judging
            { text: "The shortcut! Im sure we can figure it out as we go.", points: { JP: -1 } } // Percieving
        ]
    },
    {
        text: "You eventually reach the highest hill in Kitty Ville. It is dark out now. At the top of the hill lies a snoozing SunCat. <br>How do you wake him?",
        image: "images/question8.png",
        choices: [
            { text: "Shouting. It seems like the most effective way.", points: { TF: 1 } }, // Thinking
            { text: "Tapping him. I wouldn't want to frighten someone so deep in sleep.", points: { TF: -1 } } // Feeling
        ]
    },
    {
        text: "SunCat is awoken. The skies turn bright as day again. <br> \"OHO! What have we here? A human?! I haven't seen a case like this in ages! A journey you must've had...\"",
        image: "images/question9.gif",
        choices: [
            { text: "Honestly, It was a fun experience and I enjoyed it!", points: { SN: -1 } }, // Intuitive
            { text: "It was definitely a journey!.. Now how do I become human again?", points: { SN: 1 } } // Sensing
        ]
    },
    {
        text: "SunCat smiles. \"Do not fret human. I can help you. When you step through the portal once more, you will return as a human.<br> Although, I implore you to stay for our SunDay celebration!\"",
        image: "images/question10.gif",
        choices: [
            { text: "Yes! I love parties!", points: { IE: -1 } }, // Extraverted
            { text: "Honestly, I'd love to go home now, but I'll stay since you have helped me.", points: { IE: 1 } } // Introverted
        ]
    },
    {
        text: "You make it down the hill where the celebration is being held. <br>How do you spend your time?",
        image: "images/question11.png",
        choices: [
            { text: "Trying out all of the weird snacks and drinks at the food table.", points: { IE: 1 } }, // Introverted
            { text: "Socializing with all of the cats at the picnic table.", points: { IE: -1 } } // Extraverted
        ]
    },
    {
        text: "After the party, you approach the portal. You reminisce on the crazy day you've had in Kitty Ville. <br>What are your closing thoughts?",
        image: "images/question12.gif",
        choices: [
            { text: "I honestly still think that none of this is real.", points: { TF: 1 } }, // Thinking
            { text: "Even if this is all a dream, I feel satisfied.", points: { TF: -1 } } // Feeling
        ]
    },
    {
        text: "Groggily, you blink awake to the familiar setting of your home and weight of your human body. \"I guess it really was all a dream...\" <br>You eventually gather yourself and get up to continue your day. Something slides under your front door. You pick it up. \<br> \"Ticket to KittyVille, Valid for 1 year.",
        image: "images/question13.gif",
        choices: [ 
            { text: "I'll visit sometime in the future.", points: { JP: -1 } }, // Percieving
            { text: "I'll look at my schedule and see when I have time.", points: { JP: 1 } } // Judging
        ]
    },
];

let currentQuestionIndex = 0;

function startQuiz() {
    clickSound.play();
    document.getElementById("start-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("next-button").style.display = "inline-block";
    localStorage.setItem("IE", 0);
    localStorage.setItem("SN", 0);
    localStorage.setItem("TF", 0);
    localStorage.setItem("JP", 0);

    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionContainer = document.getElementById("question-container");

    questionContainer.innerHTML = "";

    const questionText = document.createElement("h3");
    questionText.innerHTML = question.text;
    questionContainer.appendChild(questionText);

    if (question.image) {
        const img = document.createElement("img");
        img.src = question.image;
        img.alt = "Question visual";

        img.classList.add("question-image");

        questionContainer.appendChild(img);
    }

    if (question.choices && question.choices.length > 0) {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-wrapper");
    
        question.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.text;
            button.classList.add("choice-button");
    
            button.onclick = () => {
                clickSound.play();
                handleAnswer(choice.points);
                document.getElementById("next-button").disabled = false;
    
                const allButtons = document.querySelectorAll(".choice-button");
                allButtons.forEach(btn => btn.classList.remove("selected"));
    
                button.classList.add("selected");
            };
    
            buttonContainer.appendChild(button);
        });
    
        questionContainer.appendChild(buttonContainer);
        document.getElementById("next-button").disabled = true;
    } else {
        document.getElementById("next-button").disabled = false;
    }
}


function handleAnswer(points) {
    for (let trait in points) {
        updateScore(trait, points[trait]);
    }
    document.getElementById("next-button").disabled = false;
}

function updateScore(dichotomy, value) {
    let currentScore = parseInt(localStorage.getItem(dichotomy));
    currentScore += value;
    localStorage.setItem(dichotomy, currentScore);
}

function nextQuestion() {
    clickSound.play();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        calculatePersonality();
    }
}

function calculatePersonality() {
    let IE = Number(localStorage.getItem("IE"));
    let SN = Number(localStorage.getItem("SN"));
    let TF = Number(localStorage.getItem("TF"));
    let JP = Number(localStorage.getItem("JP"));

    let personality = "";
    personality += IE > 0 ? "I" : "E";
    personality += SN > 0 ? "S" : "N";
    personality += TF > 0 ? "T" : "F";
    personality += JP > 0 ? "J" : "P";

    localStorage.setItem("personality", personality);

    document.getElementById("question-container").style.display = "none";
    document.getElementById("next-button").style.display = "none";

    document.getElementById("ending-screen").style.display = "block";

}

function showFinalResults() {
    clickSound.play();
    const type = localStorage.getItem("personality");
    const img = document.getElementById("personality-image");
    const desc = document.getElementById("personality-description");
    const heading = document.getElementById("personality-type");

    const personalityInfo = {
        "INTJ": {
            img: "images/gamerCat.png",
        },
        "INTP": {
            img: "images/nerdCat.png",
        },
        "ENTJ": {
            img: "images/painterCat.png",
        },
        "ENTP": {
            img: "images/businessCat.png",
        },
        "INFJ": {
            img: "images/magicCat.png",
        },
        "INFP": {
            img: "images/flowerCat.png",
        },
        "ENFJ": {
            img: "images/rainCat.png",
        },
        "ENFP": {
            img: "images/partyCat.png",
        },
        "ISTJ": {
            img: "images/chefCat.png",
        },
        "ISFJ": {
            img: "images/farmerCat.png",
        },
        "ESTJ": {
            img: "images/beeCat.png",
        },
        "ESFJ": {
            img: "images/superCat.png",
        },
        "ISTP": {
            img: "images/astronautCat.png",
        },
        "ISFP": {
            img: "images/cozyCat.png",
        },
        "ESTP": {
            img: "images/coolCat.png",
        },
        "ESFP": {
            img: "images/clownCat.png",
        },
    };

    document.getElementById("ending-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    if (personalityInfo[type]) {
        img.src = personalityInfo[type].img;
        img.style.display = "block";
    } else {
        heading.textContent = type || "Unknown";
        desc.textContent = "We couldn't find your perfect cat, but you're definitely unique!";
    }
}

displayQuestion();