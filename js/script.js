document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalMaterial = document.getElementById('modalMaterial');
    const closeBtn = document.querySelector('.close');

    // Funkce pro zobrazení modálního okna
    function showModal(imageSrc, info, material) {
        modal.style.display = 'flex';
        modalImage.src = imageSrc;
        modalTitle.textContent = info || 'No title available';
        modalMaterial.textContent = material || 'No material info available';
    }

    // Přidání události kliknutí na všechny obrázky
    document.querySelectorAll('.images img').forEach(img => {
        img.addEventListener('click', () => {
            const imageSrc = img.src;
            const info = img.getAttribute('data-info');
            const material = img.getAttribute('data-material');
            showModal(imageSrc, info, material);
        });
    });

    // Zavření modálního okna
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Zavření modálního okna při kliknutí mimo obrázek
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Lupa
    const zoomLens = document.querySelector('.zoom-lens');
    const zoomFactor = 2;

    modalImage.addEventListener('mousemove', function(e) {
        zoom(e);
    });

    modalImage.addEventListener('mouseleave', function() {
        zoomLens.style.display = 'none';
    });

    function zoom(e) {
        zoomLens.style.display = 'block';
        const pos = getCursorPos(e);
        const x = pos.x - zoomLens.offsetWidth / 2;
        const y = pos.y - zoomLens.offsetHeight / 2;

        if (x > modalImage.width - zoomLens.offsetWidth) x = modalImage.width - zoomLens.offsetWidth;
        if (x < 0) x = 0;
        if (y > modalImage.height - zoomLens.offsetHeight) y = modalImage.height - zoomLens.offsetHeight;
        if (y < 0) y = 0;

        zoomLens.style.left = x + 'px';
        zoomLens.style.top = y + 'px';

        zoomLens.style.backgroundImage = `url(${modalImage.src})`;
        zoomLens.style.backgroundSize = modalImage.width * zoomFactor + 'px ' + modalImage.height * zoomFactor + 'px';
        zoomLens.style.backgroundPosition = `-${x * zoomFactor}px -${y * zoomFactor}px`;
    }

    function getCursorPos(e) {
        const rect = modalImage.getBoundingClientRect();
        return {
            x: e.pageX - rect.left - window.pageXOffset,
            y: e.pageY - rect.top - window.pageYOffset
        };
    }
});
