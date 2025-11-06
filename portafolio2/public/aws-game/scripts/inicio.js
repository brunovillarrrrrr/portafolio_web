document.getElementById('jugar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const error = document.getElementById('error');

    if (!nombre) {
        error.classList.remove('hidden');
        return;
    }

    // Guardar nombre en localStorage para futuras pantallas
    localStorage.setItem('jugador', nombre);

    // Ir a juego.html
    window.location.href = 'juego.html';
});
