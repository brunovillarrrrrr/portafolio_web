const jugador = localStorage.getItem('jugador');
const nombreSpan = document.getElementById('jugadorNombre');
const scoreSpan = document.getElementById('score');
let score = 0;

// Validación de nombre
if (!jugador) {
    alert('⚠️ No has ingresado tu nombre. Regresando...');
    window.location.href = 'index.html';
} else {
    nombreSpan.textContent = jugador;
}

// Escuchar respuestas
const opciones = document.querySelectorAll('.opcion');
opciones.forEach(boton => {
    boton.addEventListener('click', () => {
        if (boton.classList.contains('correcto')) {
            score += 10;
            scoreSpan.textContent = score;
            boton.style.backgroundColor = '#0f0';
        } else {
            boton.style.backgroundColor = '#f33';
        }
        // Deshabilitar botones después de responder
        opciones.forEach(btn => btn.disabled = true);
    });
});

// Terminar juego
document.getElementById('terminar').addEventListener('click', () => {
    // Guardamos el score en localStorage para resultados
    localStorage.setItem('score', score);

    // Log de depuración: ¿qué datos vas a enviar?
    console.log("DEBUG :: Va a guardar score", { jugador, score });

    // Envía el score al backend ANTES de redirigir
    guardarScore(jugador, score, function (respuesta) {
        // Log de depuración: ¿qué responde el backend?
        console.log("DEBUG :: Respuesta backend", respuesta);

        // Aquí puedes mostrar feedback si quieres usando la respuesta del backend

        // Redirige al resultado
        window.location.href = 'resultado.html';
    });
});
