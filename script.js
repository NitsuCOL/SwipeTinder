let isAnimating = false;
let pullDeltaX = 0; //Distancia del movimiento de la card
const DECISION_THRESHOLD = 80;

function startDrag(event) {
    if (isAnimating) return

    //Recuperar el primer elemento
    const actualCard = event.target.closest('article');
    if (!actualCard) return

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

        //Cambiar la opacidad de la informacion escogida
        const opacity = Math.abs(pullDeltaX) / 100;
        const isRight = pullDeltaX > 0;

        const cohiceEl = isRight
            ? actualCard.querySelector('.choice.like')
            : actualCard.querySelector('.choice.nope')

        cohiceEl.style.opacity = opacity
    }
    
    function onEnd(event) {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);

        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);

        //Conocer si el usuario decidio
        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD
        if (decisionMade) {
            const goRight = pullDeltaX >= 0;
            const goLeft = !goRight;

            //Añadir la clase de acuerdo a la decision
            actualCard.classList.add(goRight ? 'go-right' : 'go-left')
            actualCard.addEventListener('transitionend', () =>{
                actualCard.remove()
            }, {once: true});
        }else{
            actualCard.classList.add('reset')
            actualCard.classList.remove('go-right', 'go-left')
            actualCard.querySelectorAll('choice').forEach(el => {
                el.style.opacity = 0
            })
        }

        //Reiniciar variables
        actualCard.addEventListener('transitionend', () =>{
            actualCard.removeAttribute('style');
            actualCard.classList.remove('reset');

            pullDeltaX = 0;
            isAnimating = false;
        });
    }
}

document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, {passive: true});