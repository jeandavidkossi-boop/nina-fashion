document.addEventListener("DOMContentLoaded", function() {
    const pages = {
        "/admin.html": { moduleName: "Administration", badgeClass: "badge-cash", icon: "👮" },
        "/caisse.html": { moduleName: "Caisse", badgeClass: "badge-cash", icon: "💳" },
        "/stock.html": { moduleName: "Logistique", badgeClass: "", icon: "📦" },
        "/vendeur.html": { moduleName: "Vente", badgeClass: "", icon: "👔" },
        "/machiniste.html": { moduleName: "Atelier", badgeClass: "", icon: "🧵" },
        "/rayon.html": { moduleName: "Rayon", badgeClass: "", icon: "🏪" }
    };

    let pathname = window.location.pathname;
    let pageInfo = pages[pathname] || { moduleName: "Portail", badgeClass: "", icon: "" };

    // Find if the path corresponds to any of the pages, handling cases where it might run locally without root
    for (const [key, value] of Object.entries(pages)) {
        if (pathname.endsWith(key)) {
            pageInfo = value;
            break;
        }
    }

    const header = document.createElement("header");
    header.innerHTML = `
        <div class="header-left">
            <h1>Nina Fashion</h1>
        </div>
        <div class="header-center">
            <span style="font-weight: bold; font-size: 1rem; color: #fff; text-transform: uppercase; letter-spacing: 2px;">
                ${pageInfo.icon} ${pageInfo.moduleName}
            </span>
        </div>
        <div class="header-right" id="header-right-container">
            <button class="btn-retour" onclick="localStorage.clear(); window.location.replace('index.html')">🚪 Déconnexion</button>
        </div>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    // Inject the "Rembourser un Reliquat" button dynamically for caisse.html to restore missing functionality
    if (pathname.endsWith("/caisse.html")) {
        const headerRight = document.getElementById("header-right-container");
        const btnRembourser = document.createElement("button");
        btnRembourser.className = "btn btn-danger";
        btnRembourser.style.padding = "6px 12px";
        btnRembourser.style.fontSize = "0.85rem";
        btnRembourser.style.marginRight = "10px";
        btnRembourser.innerHTML = "💸 Rembourser un Reliquat";
        btnRembourser.onclick = function() {
            if(typeof ouvrirRemboursementSec === 'function') {
                ouvrirRemboursementSec();
            }
        };
        headerRight.insertBefore(btnRembourser, headerRight.firstChild);
    }
});
