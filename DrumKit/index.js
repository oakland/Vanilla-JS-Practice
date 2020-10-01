console.log('Welcome to JavaScript');


window.addEventListener('keydown', function (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`) ; 
    if (!audio) return;
    audio.currentTime=0;
    audio.play();
    key.classList.add('playing') ;
});



const keys = document.querySelectorAll(`.key`) ; 
keys.forEach( key => key.addEventListener('mousedown',function(e){
     let att = key.getAttribute("data-key"); 
     const audio = document.querySelector(`audio[data-key="${att}"]`);
    const keying = document.querySelector(`.key[data-key="${att}"]`) ; 
    if (!audio) return;
    keying.classList.add('playing') ;
    audio.currentTime=0;
    audio.play();
})) ;

keys.forEach( key => key.addEventListener('transitionend', removeTransition)) ;
    
function removeTransition(e){
    if(e.propertyName !== 'transform'){
        return ;
    }
    this.classList.remove('playing') ;
} 

