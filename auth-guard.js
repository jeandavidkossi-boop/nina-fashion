// auth-guard.js

function verifierHabilitation(rolesAutorises) {
    const sessionActive = localStorage.getItem('sessionActive');
    const roleActuel = localStorage.getItem('roleUtilisateur') || '';
    const roleMinuscule = roleActuel.toLowerCase();

    // 1. Vérification de la session et du rôle
    if (!sessionActive || !rolesAutorises.includes(roleMinuscule)) {
        localStorage.clear();
        window.location.replace('index.html');
        return;
    }

    // 2. Gestion de l'inactivité (30 minutes)
    let tempsInactivite;
    const TEMPS_LIMITE = 30 * 60 * 1000;

    function deconnexionAutomatique() {
        localStorage.clear();
        window.location.replace('index.html');
    }

    function reinitialiserMinuteur() {
        clearTimeout(tempsInactivite);
        tempsInactivite = setTimeout(deconnexionAutomatique, TEMPS_LIMITE);
    }

    // Surveille les mouvements
    window.addEventListener('load', reinitialiserMinuteur);
    document.addEventListener('mousemove', reinitialiserMinuteur);
    document.addEventListener('keypress', reinitialiserMinuteur);
    document.addEventListener('touchstart', reinitialiserMinuteur);

    // 3. Détecteur anti-retour (contre le cache du navigateur)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted || !localStorage.getItem('sessionActive')) {
            localStorage.clear();
            window.location.replace('index.html');
        }
    });

    return roleActuel; // Retourne le rôle pour usage éventuel
}
