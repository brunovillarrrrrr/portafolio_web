document.addEventListener('DOMContentLoaded', () => {
    // Detecta ruta base actual del proyecto
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
    const endpoint = `${basePath}/api/ranking.php`;

    fetch(endpoint)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(renderRanking)
        .catch(err => {
            console.error('❌ Error al cargar ranking:', err);
            const tbody = document.querySelector('#ranking tbody');
            if (tbody) {
                tbody.innerHTML = `
                    <tr><td colspan="4" class="error-row">Error al cargar ranking 😭</td></tr>
                `;
            }
        });
});

function renderRanking(datos) {
    const tbody = document.querySelector('#ranking tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!Array.isArray(datos) || datos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">📭 Sin registros aún</td></tr>`;
        return;
    }

    datos.forEach((jugador, idx) => {
        const icono = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1;
        const fecha = jugador.fecha?.split(' ')[0] || '';

        const row = `
          <tr>
            <td>${icono}</td>
            <td>${jugador.nombre || 'Desconocido'}</td>
            <td>${jugador.score ?? '0'}</td>
            <td>${fecha}</td>
          </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}
