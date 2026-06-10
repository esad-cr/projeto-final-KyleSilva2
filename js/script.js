/**********SHOW MENU************/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')

        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
}

showMenu('nav-toggle','navMenu')
 
// js/projetos.js
 
document.addEventListener('DOMContentLoaded', () => {
 
    // ── 1. CARDS → mostrar/ocultar galeria ──────────────────
 
    const cards    = document.querySelectorAll('.card__article[data-galeria]');
    const galerias = document.querySelectorAll('.galeria');
 
    function mostrarGaleria(nomeGaleria) {
        galerias.forEach(g => {
            if (g.id === 'galeria-' + nomeGaleria) {
                g.classList.add('galeria--visivel');
                g.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                g.classList.remove('galeria--visivel');
            }
        });
    }
 
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const galeria   = card.dataset.galeria;
            const galeriaEl = document.getElementById('galeria-' + galeria);
 
            cards.forEach(c => c.classList.remove('card__active'));
            card.classList.add('card__active');
 
            if (galeriaEl.classList.contains('galeria--visivel')) {
                galeriaEl.classList.remove('galeria--visivel');
            } else {
                mostrarGaleria(galeria);
            }
        });
    });
 
 
    // ── 2. LIGHTBOX → abrir foto em grande ──────────────────
 
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div id="lightbox__overlay"></div>
        <img id="lightbox__img" src="" alt="">
    `;
    document.body.appendChild(lightbox);
 
    const lbOverlay = document.getElementById('lightbox__overlay');
    const lbImg     = document.getElementById('lightbox__img');
 
    function abrirLightbox(src, alt) {
        lbImg.src = src;
        lbImg.alt = alt;
        lightbox.classList.add('lightbox--visivel');
        document.body.classList.add('lightbox--aberto');
    }
 
    function fecharLightbox() {
        lightbox.classList.remove('lightbox--visivel');
        document.body.classList.remove('lightbox--aberto');
        setTimeout(() => { lbImg.src = ''; }, 300);
    }
 
    lbOverlay.addEventListener('click', fecharLightbox);
 
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') fecharLightbox();
    });
 
    document.addEventListener('click', e => {
        if (e.target.matches('.galeria__grid img')) {
            abrirLightbox(e.target.src, e.target.alt);
        }
    });
 
 
    // ── 3. Galeria activa por defeito ao carregar a página ──
    mostrarGaleria('animais');
 
});