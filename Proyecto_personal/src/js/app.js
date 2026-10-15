console.log('App Shell de ShopExpress inicializado correctamente.');

const syncButton = document.getElementById('btn-sync');
syncButton.addEventListener('click', () => {
    alert('Pronto aquí implementaremos la sincronización con Background Sync.');
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registro => {
            console.log('¡Éxito! Service Worker registrado correctamente.', registro);
        })
        .catch(error => {
            console.warn('Error al registrar el Service Worker:', error);
        });
} else {
    console.error('Este navegador no soporta Service Workers.');
}
