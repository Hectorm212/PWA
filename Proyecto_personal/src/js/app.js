console.log('App Shell de ShopExpress inicializado correctamente.');

const syncButton = document.getElementById('btn-sync');
syncButton.addEventListener('click', () => {
    alert('Pronto aquí implementaremos la sincronización con Background Sync.');
});

let installPrompt;
const installButton = document.getElementById('btn-install');

if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true) {
    installButton.hidden = true;
}

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
});

installButton.addEventListener('click', async () => {
    if (!installPrompt) {
        alert('Para instalarla, abre el menú del navegador y elige "Instalar aplicación" o "Agregar a pantalla de inicio". La instalación requiere HTTPS o localhost.');
        return;
    }

    const prompt = installPrompt;
    installPrompt = null;

    try {
        await prompt.prompt();
        await prompt.userChoice;
    } catch (error) {
        console.error('No se pudo abrir el diálogo de instalación:', error);
        alert('No se pudo iniciar la instalación. Inténtalo desde el menú del navegador.');
    }
});

window.addEventListener('appinstalled', () => {
    installPrompt = null;
    installButton.hidden = true;
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
