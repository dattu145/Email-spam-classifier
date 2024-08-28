const textfield = document.querySelector(".textfield");
const sambox = document.querySelector(".sambox_outer");
const alertBox = document.querySelector(".alrt");

document.querySelector(".inputbtn").addEventListener('click',toggleInput)
document.querySelector('.closetextfield').addEventListener('click',()=>{
    toggleInput();
    document.querySelector('.message').value = '';
})

function toggleInput(){
    textfield.classList.toggle('textfield_active');
}

document.querySelector('.samples').addEventListener('click',toggleSamples)
document.querySelector('.closesambox').addEventListener('click',toggleSamples)

function toggleSamples(){
    sambox.classList.toggle('sambox_active');
}

    document.querySelector('.classifybtn').addEventListener('click', async () => {
        showalert("Classification Done");
        const message = document.querySelector('.message').value;

        const response = await fetch('http://127.0.0.1:5000/classify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const result = await response.json();
        const category = result.category;
        const probability = result.probability;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add("classifiedDivmsgs");
        messageDiv.textContent = message;

        const probDiv = document.createElement('div');
        probDiv.textContent = `Probability of spam: ${probability.spam.toFixed(2)}, ham: ${probability.ham.toFixed(2)}`;
        probDiv.style.padding = "10px";
        probDiv.style.color = "orange";
        probDiv.style.fontWeight = 350;
        messageDiv.append(probDiv);

        if (category === 'spam') {
            document.querySelector('.spammsg').appendChild(messageDiv);
            document.querySelector(".dialog2").style.display="none";
        } else {
            document.querySelector('.inboxmsg').appendChild(messageDiv);
            document.querySelector(".dialog").style.display="none";
        }
    });

    const smarray = [
        "WINNER!! As a valued network customer you have been selected to receivea £900 prize reward! To claim call 09061701461. Claim code KL341. Valid 12 hours only.",
        "SIX chances to win CASH! From 100 to 20,000 pounds txt> CSH11 and send to 87575. Cost 150p/day, 6days, 16+ TsandCs apply Reply HL 4 info",
        "URGENT! You have won a 1 week FREE membership in our £100,000 Prize Jackpot! Txt the word: CLAIM to No: 81010 T&C www.dbuk.net LCCLTD POBOX 4403LDNW1A7RW18",
        "Congrats! 1 year special cinema pass for 2 is yours. call 09061209465 now! C Suprman V, Matrix3, StarWars3, etc all 4 FREE! bx420-ip4-5we. 150pm. Dont miss out!",
        "Please call our customer service representative on 0800 169 6031 between 10am-9pm as you have WON a guaranteed £1000 cash or £5000 prize!",
        'Your free ringtone is waiting to be collected. Simply text the password "MIX" to 85069 to verify. Get Usher and Britney. FML, PO Box 5249, MK17 92H. 450Ppw 16',
        "GENT! We are trying to contact you. Last weekends draw shows that you won a £1000 prize GUARANTEED. Call 09064012160. Claim Code K52. Valid 12hrs only. 150ppm",
        "You are a winner U have been specially selected 2 receive £1000 or a 4* holiday (flights inc) speak to a live operator 2 claim 0871277810910p/min (18+)",
        "PRIVATE! Your 2004 Account Statement for 07742676969 shows 786 unredeemed Bonus Points. To claim call 08719180248 Identifier Code: 45239 Expires",
        "Todays Voda numbers ending 7548 are selected to receive a $350 award. If you have a match please call 08712300220 quoting claim code 4041 standard rates app",
        "Sunshine Quiz Wkly Q! Win a top Sony DVD player if u know which country the Algarve is in? Txt ansr to 82277. £1.50 SP:Tyrone"
    ];
    const hmarray = [
        "Go until jurong point, crazy.. Available only in bugis n great world la e buffet... Cine there got amore wat...",
        "Nah I don't think he goes to usf, he lives around here though",
        "I'm gonna be home soon and i don't want to talk about this stuff anymore tonight, k? I've cried enough today.",
        "I've been searching for the right words to thank you for this breather. I promise i wont take your help for granted and will fulfil my promise. You have been wonderful and a blessing at all times.",
        "Aft i finish my lunch then i go str down lor. Ard 3 smth lor. U finish ur lunch already?",
        "Fffffffff. Alright no way I can meet up with you sooner?",
        "Just forced myself to eat a slice. I'm really not hungry tho. This sucks. Mark is getting worried. He knows I'm sick when I turn down pizza. Lol",
        "I'm back & we're packing the car now, I'll let you know if there's room",
        "Ahhh. Work. I vaguely remember that! What does it feel like? Lol",
        "Wait that's still not all that clear, were you not sure about me being sarcastic or that that's why x doesn't want to live with us",
        "Yup... Ok i go home look at the timings then i msg ü again... Xuhui going to learn on 2nd may too but her lesson is at 8am",
        "Yeah hopefully, if tyler can't do it I could maybe ask around a bit"
    ];

    function createMessageElement(message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("smsgs");

        const messageP = document.createElement("p");
        messageP.classList.add("smsg");
        messageP.textContent = message;

        const icon = document.createElement("span");
        icon.classList.add("cicon");
        icon.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        icon.addEventListener("click", () => {
            document.querySelector(".message").value = message;
            showalert("Inputted Successfully..!");
            toggleSamples();
            toggleInput();
        });

        messageDiv.appendChild(messageP);
        messageDiv.appendChild(icon);

        return messageDiv;
    }

    function populateMessages(containerId, messages) {
        const container = document.querySelector(containerId);
        messages.forEach(message => {
            const messageElement = createMessageElement(message);
            container.appendChild(messageElement);
        });
    }

    populateMessages('.sbox', smarray);
    populateMessages('.hbox', hmarray);

    function showalert(msg) {
        alertBox.classList.add('alert_active')
        alertBox.textContent = msg;
        setTimeout(() => {
            alertBox.classList.remove('alert_active')
        }, 1500);
    }