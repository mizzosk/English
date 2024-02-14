// vocabulary list for new words
//var vocabListNewEn = ["living room","dining room","kitchen","bathroom"];
//var vocabListNewSk = ["obývacia izba","jedáleň","kuchyňa","kúpeľňa"];
// var vocabListNewEn = ["circle","square","rectangle","triangle","diamond","star","heart"];
// var vocabListNewSk = ["kruh","štvorec","obdĺžnik","trojuholník","diamant","hviezda","srdce"];
var vocabListsBebe = ["rooms - miestnosti", "word - slovo"];
var roomsEn = ["living room","dining room","kitchen","bathroom"];
var roomsSk = ["obývacia izba","jedáleň","kuchyňa","kúpeľňa"];
var wordEn = ["pen"];
var wordSk = ["pero"];


var vocabListsLuci = ["shapes - tvary"];
var shapesEn = ["circle","square","rectangle","triangle","diamond","star","heart"];
var shapesSk = ["kruh","štvorec","obdĺžnik","trojuholník","diamant","hviezda","srdce"];

var vocabListNewEn = [];
var vocabListNewSk = [];
var vocabListNewGameEn= [];
var vocabListNewGameSk = [];
var newWord = document.getElementById("newWordId");
var counterHelp =  0;
var counterFalseAnswer =  0;
var user = "";

function randomNewWordGeneration(){
    // randomly switch between En and Sk list
    if (vocabListNewGameEn.length === 0){
        var randomSwitch = 1;
    } else if (vocabListNewGameSk.length === 0){
        var randomSwitch = 0;
    } else {
    var randomSwitch = Math.floor(Math.random() * 2);
    }
    //game finished
    if(vocabListNewGameEn.length === 0 && vocabListNewGameSk.length === 0){
        $(".secondary-button").hide();
        $(".button-record").hide();
        newWord.textContent = "ÚSPEŠNOSŤ: " + ((1-counterHelp/(vocabListNewEn.length*2))*100).toFixed(0) + " %"; // / POMOC: " + counterHelp + "KRÁT.";
    }else{
        if (randomSwitch===0 ){
            var vocabListNew = vocabListNewGameEn;
            var vocabListNewRandomWord = Math.floor(Math.random() * vocabListNewGameEn.length);
        } if (randomSwitch===1){
            var vocabListNew = vocabListNewGameSk;
            var vocabListNewRandomWord = Math.floor(Math.random() * vocabListNewGameSk.length);
        }
        // displaying random word from en or sk vocabulary list
        newWord.innerHTML = vocabListNew[vocabListNewRandomWord];
        //console.log(counter);
    
        //delete used word from the game list
        if (vocabListNewGameEn.includes(newWord.innerHTML)){
            var index = vocabListNewGameEn.indexOf(newWord.innerHTML);
            vocabListNewGameEn.splice(index,1);
        } 
        if (vocabListNewGameSk.includes(newWord.innerHTML)){
            var index = vocabListNewGameSk.indexOf(newWord.innerHTML);
            vocabListNewGameSk.splice(index,1);
        }
        }
    console.log(vocabListNewEn);
    console.log(vocabListNewSk);
    console.log(vocabListNewGameEn);
    console.log(vocabListNewGameSk);
    }

//create vocabLists for Bebe
function displayButtonsBebe() {
    var buttonContainer = document.getElementById("button-container-bebe");
    for (var i = 0; i < vocabListsBebe.length; i++) {
        var button = document.createElement("button");
        button.innerHTML = vocabListsBebe[i]; //.toUpperCase()
        button.classList.add("vocab-list");
        buttonContainer.appendChild(button);
    }
}
displayButtonsBebe();
$("#button-container-bebe button").hide();

//create vocabLists for Luci
function displayButtonsLuci() {
    var buttonContainer = document.getElementById("button-container-luci");
    for (var i = 0; i < vocabListsLuci.length; i++) {
        var button = document.createElement("button");
        button.innerHTML = vocabListsLuci[i]; //.toUpperCase()
        button.classList.add("vocab-list");
        buttonContainer.appendChild(button);
    }
}
displayButtonsLuci();
$("#button-container-luci button").hide();

// offer user list upon clicking on the user icon
$(".player-button").on("click", function(){
    $(this).fadeToggle(30).fadeToggle(30);
    user = $(this).find('img').attr('alt');
    setTimeout(function() {
        $(".player-button").hide();
            if(user === "Bebe"){
            $("#button-container-bebe button").show();
            }else{$("#button-container-luci button").show();}
        }, 100);
});

//generate the random word clicking on list
$(".vocab-list").on("click", function(){
    console.log(vocabListNewGameEn);
    var extractListName = $(this).text().split(' ')[0];
    var selectedListEn = extractListName+"En";
    var selectedListSk = extractListName+"Sk";
    //copy selected list into new game and compare list
    $.extend(vocabListNewEn, window[selectedListEn]);
    $.extend(vocabListNewSk, window[selectedListSk]);
    $.extend(vocabListNewGameEn, window[selectedListEn]);
    $.extend(vocabListNewGameSk, window[selectedListSk]);

    // console.log(vocabListNewEn);
    // console.log(vocabListNewSk);
    // console.log(vocabListNewGameEn);
    // console.log(vocabListNewGameSk);
    $(".vocab-list").hide();
    $(".button").show();
    $(".secondary-button").show();
    randomNewWordGeneration();
});


// chech whether vocabListNewEn and vocabListNewSk have the same number of words
if (vocabListNewEn.length!==vocabListNewSk.length){
    alert("Slovak and English vocabulary lists do not have the same number of words!");
}

//hide game
$(".button").hide();
$(".secondary-button").hide();


// text to speech funtion
const synth = window.speechSynthesis;

function speak() {
    var buttonText = document.getElementById("newWordId").innerHTML;
    console.log(buttonText);
    if (vocabListNewEn.includes(buttonText)){
        var index = vocabListNewEn.indexOf(buttonText);
        var wordToSpeak = vocabListNewSk[index];
   } else {
        var index = vocabListNewSk.indexOf(buttonText);
        var wordToSpeak = vocabListNewEn[index];
    };
    const utterance = new SpeechSynthesisUtterance(wordToSpeak);
        if (vocabListNewEn.includes(wordToSpeak)){
            // Set the language to English (United States)
            utterance.lang = 'en-US';
           } else {
                // Set the language to Slovak
                utterance.lang = 'sk-SK';
           }
            // Optionally, you can set different properties like rate, pitch, and volume.
            //utterance.rate = 0.6;
            //utterance.pitch = 1.0;
            // utterance.volume = 1.0;
    synth.speak(utterance);    
    }

document.getElementById("textToSpeechBt").addEventListener("click", function(){
    $(this).fadeToggle(30).fadeToggle(30);
    speak();
    counterHelp++;
    console.log(counterHelp);
});

//Speech to text function
        // Check if the browser supports the Web Speech API
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'sk-SK';

             //if displayedWord is english set recognition language to slovak, else to english
            //if (vocabListNewEn.includes(displayedWord)){
                 // Set the language to Slovak
                 //recognition.lang = 'sk-SK';
                //console.log(recognition.lang);
            //} else {
                 // Set the language to English (United States)
                 //recognition.lang = 'en-US';
                //console.log(recognition.lang);
           // }
    
            // Event handler for when speech is recognized
            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                const transcriptClean = transcript.toLowerCase().replace(/[.,?'"!]/g, '');
                var displayedWord = document.getElementById("newWordId").textContent;
                //get the translated version of displayed word
                if (vocabListNewEn.includes(displayedWord)){
                    var index = vocabListNewEn.indexOf(displayedWord);
                    var displayedWordTranslated = vocabListNewSk[index];
               } else {
                var index = vocabListNewSk.indexOf(displayedWord);
                 var displayedWordTranslated = vocabListNewEn[index];
               }

                //console.log(transcript);
                if(displayedWordTranslated === transcriptClean){
                    if(user==="Bebe"){
                        playSound("./sounds/spravneBebe.m4a");
                    }else{
                        playSound("./sounds/skveleLuci.m4a");
                    }
                    console.log("HURRAAA - " + transcriptClean);
                    randomNewWordGeneration();
                    //new random word generation - only when there is at least one word in one of the lists
                    //if(vocabListNewGameEn.length > 0 || vocabListNewGameSk.length > 0){
                        //randomNewWordGeneration()}
                }
                else {playSound("./sounds/skusZnovaProsim.m4a");
                    console.log("cele zle - " + transcriptClean);}
                //document.getElementById('output').textContent = transcript;

            };

            // Event handler for when the recognition is started
            recognition.onstart = function () {
                $(".button-record").find("img").attr("src", "./images/recording_in_progress.png")
                //console.log('Speech recognition started');
            };

            // Event handler for when an error occurs
            recognition.onerror = function (event) {
                //console.error('Speech recognition error', event.error);
            };

            // Event handler for when the recognition is stopped
            recognition.onend = function () {
                $(".button-record").find("img").attr("src", "./images/record_sound.png")
                //console.log('Speech recognition ended');
            };

            // Event listener for the start button
            document.getElementById('speechToTextBt').addEventListener('click', function () {
                $(this).fadeToggle(30).fadeToggle(30);
                recognition.start();
                
            });
        } else {
            alert('Speech recognition is not supported in your browser. Please use a different browser.');
        }


        function playSound(soundFile) {
            var audio = new Audio(soundFile);
            audio.play();
        }