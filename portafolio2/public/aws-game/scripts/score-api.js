function guardarScore(nombre, score, callback = null) {
    // 1. Si no se pasa nombre o score, intenta recuperarlos automáticamente
    if (!nombre) {
        nombre = localStorage.getItem('jugador') ||
            (document.getElementById('jugadorNombre')?.textContent || '').trim();
    }

    if (typeof score === "undefined" || score === null) {
        const scoreText = document.getElementById('score')?.textContent || "0";
        score = parseInt(scoreText, 10);
        if (isNaN(score)) score = 0;
    }

    // 2. Validación defensiva
    if (!nombre || isNaN(score)) {
        console.error("❌ Datos inválidos:", { nombre, score });
        if (typeof callback === "function") callback("error_datos");
        return;
    }

    // 3. Detectar carpeta del proyecto dinámicamente
    const rutaProyecto = window.location.pathname.split('/')[1]; // Ej: "AWSGameVM"
    const endpoint = `/${rutaProyecto}/api/guardar_score.php`;

    // 4. Enviar los datos
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `nombre=${encodeURIComponent(nombre)}&score=${encodeURIComponent(score)}`
    })
        .then(res => res.text())
        .then(data => {
            console.log("✅ Respuesta del servidor:", data);

            if (typeof mostrarMensaje === "function") {
                mostrarMensaje(data);
            }
            if (typeof callback === "function") {
                callback(data);
            }
        })
        .catch(err => {
            console.error("❌ Error al guardar:", err);
            if (typeof mostrarMensaje === "function") {
                mostrarMensaje("❌ Error al guardar score");
            }
            if (typeof callback === "function") {
                callback("error");
            }
        });
}
