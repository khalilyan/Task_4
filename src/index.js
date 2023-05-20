const input = document.querySelector('input')
const submit = document.getElementById('submit')
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const stopVoice = document.getElementById('Capa_1');
const openaiIcon = document.getElementById('openaiIcon');


const recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;


speechSynthesis.cancel()


start.addEventListener('mousedown', () => {
    speechSynthesis.cancel() 
    recognition.start()
    start.id = 'stop'
    stop.style.display = 'block'
});

stop.addEventListener('mouseup', () => {
     openaiIcon.style.fill = 'gold'
     openaiIcon.style.animationName = 'rotate'

     recognition.stop()
     start.id = 'start'
     stop.style.display = 'none'
    });
stopVoice.addEventListener('click',()=>{
    if(openaiIcon.style.fill === 'gold'){
        return null
    }
     speechSynthesis.cancel();
     openaiIcon.style.fill = 'black'
     openaiIcon.style.animationName = 'none'
    });

recognition.addEventListener('result',(event) => {
    const message = event.results[event.results.length - 1][0].transcript;
    input.value = message;
    fetch('/',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message
        })
    }).then(res => res.json()
        .then(res=>{
        const { response } = res;
        const { content } = response;
        let utterance = new SpeechSynthesisUtterance(content);
        var voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.filter(function(voice) { return voice.name == voices[100].name; })[0];

        speechSynthesis.speak(utterance); 

        utterance.addEventListener('start',()=>{
            openaiIcon.style.fill = 'lightgreen';
        })
        utterance.addEventListener('end',()=>{
            openaiIcon.style.fill = 'black';
            openaiIcon.style.animationName = 'none'
    })
    })).catch(res=>{
        openaiIcon.style.fill = 'darkred';
    })
    start.id = 'start'
    stop.style.display = 'none';    
});