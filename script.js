window.addEventListener('DOMContentLoaded', (event) => {
    //fetch('https://raw.githubusercontent.com/nezzul/eventos-culturas/main/datos.json')
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {

            // Crea nuevo objeto para "hoy"
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            // Filtra los datos
            data = data.filter(item => new Date(item.fecha) >= hoy);

            // Ordena los datos por fecha
            data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

            //HTML GALERÍA
            const targetModal  = document.querySelector('.js-modal-show-target')
            const galeria = document.getElementById('galeria');
            const modal = document.querySelector('.js-modal-content-target');
            const modalClose = document.querySelector('.js-modal-close');
            const fragmentCards = document.createDocumentFragment();
            const fragmentModal = document.createDocumentFragment();

            modalClose.addEventListener('click', function() {
                targetModal.classList.remove('js-modal-show')
            })

            data.forEach(item => {
                const templateStringCard = `
                    <div data-key="" class="card js-show-modal-trigger">
                        <img src="${item.imagen}" alt="${item.alt}">
                        <h2 class="titulo">${item.titulo}</h2>
                        <h3 class="categoria">${item.categoria}</h3>
                        <br>
                        <h2 class="fechaApertura">Fecha de apertura: ${item.fechaApertura}</h2><br>
                        <h2 class="fechaCierre">Fecha de cierre: ${item.fechaCierre}</h2><br>
                        <h2 class="estado">Estado de la convocatoria: ${item.estado}</h2><br>
                        <h4 class="organizador">${item.organizador}</h4>
                    </div>
                `;

                const templateStringModal = `
                    <div class="modal__content--modal ">
                        <img src="${item.imagen}" alt="${item.alt}">
                        <h2 class="titulo">${item.titulo}</h2>
                        <h3 class="categoria">${item.categoria}</h3><br>
                        <h2 class="fechaApertura">Fecha de apertura: ${item.fechaApertura}</h2><br>
                        <h2 class="fechaCierre">Fecha de cierre: ${item.fechaCierre}</h2><br>
                        <h2 class="fechaResultados">Publicación de resultados: ${item.fechaResultados}</h2><br>
                        <h2 class="estado">Estado de la convocatoria: ${item.estado}</h2>
                        <p>${item.descripcion}</p>           
                        <p>+ Info:  <a href="${item.url}" target="_blank">${item.url}</a></p><br>
                        <h4 class="categoria">Documentos de la convocatoria:</h4>
                        <p>Términos y condiciones: <a href="${item.terminos}" target="_blank">${item.terminos}</a></p>
                        <p><a href="${item.documento1}" target="_blank">${item.documento1}</a></p>
                        <p><a href="${item.documento2}" target="_blank">${item.documento2}</a></p>
                        <p><a href="${item.documento3}" target="_blank">${item.documento3}</a></p>
                        <br><br>
                        <h3 class="organizador">${item.organizador}</h3>
                    </div>
                `;

                const parser = new DOMParser();
                const parsedHtml = parser.parseFromString(templateStringCard, 'text/html');
                const card = parsedHtml.body.firstChild;
                
                card.addEventListener('click', function(trigger, target){
                    const parser = new DOMParser();
                    const parsedHtml = parser.parseFromString(templateStringModal, 'text/html');
                    const modalContent = parsedHtml.body.firstChild;

                    fragmentModal.appendChild(modalContent);
                    modal.innerHTML = '';
                    targetModal.classList.add('js-modal-show')
                    modal.appendChild(fragmentModal);
                })

                fragmentCards.appendChild(card);
            });

            galeria.appendChild(fragmentCards);
        });
});
