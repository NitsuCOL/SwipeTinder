let isAnimating = false;
let pullDeltaX = 0; //Distancia del movimiento de la card
const DECISION_THRESHOLD = 80;

function startDrag(event) {
    if (isAnimating) return

    //Recuperar el primer elemento
    const actualCard = event.target.closest('article');

    //Obtener la posicion inicial
    const startX = event.pageX ?? event.touches[0].pageX;

    //Escuchar cuando se esta moviendo
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    document.addEventListener('touchmove', onMove, {passive: true});
    document.addEventListener('touchend', onEnd, {passive: true});

    function onMove(event) {
        //Seleccionar la posicion actual
        const currentX = event.pageX ?? event.touches[0].pageX;
    
        //La distancia recorrida
        pullDeltaX = currentX - startX;
    
        if (pullDeltaX === 0) return

        isAnimating = true;
        //Calcular la rotacion de la card
        const deg = pullDeltaX / 14;
        //Aplicar la rotacion a la carta
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;
        //Cambiar el cursor a grabbing
        actualCard.style.cursor = 'grabbing';
    }
    
    function onEnd(event) {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);

        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);

        //Conocer si el usuario decidio
        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD
        if (decisionMade) {
            
        }else{
            
        }
    }
}

document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, {passive: true});