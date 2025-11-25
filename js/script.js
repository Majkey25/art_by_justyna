document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById('myModal');
    const modalImageElement = document.getElementById('modalImage');
    const modalTitleElement = document.getElementById('modalTitle');
    const modalMaterialElement = document.getElementById('modalMaterial');
    const closeButtonElement = document.querySelector('.close');
    const zoomLensElement = document.querySelector('.zoom-lens');
    const zoomFactor = 2;

    const paintingCards = document.querySelectorAll('.painting-card');
    if (!modalElement || !modalImageElement || !zoomLensElement || paintingCards.length === 0) {
        return;
    }

    paintingCards.forEach((card) => {
        const imageElement = card.querySelector('img');
        const titleText = card.dataset.title || 'Untitled';
        const materialText = card.dataset.material || 'Unknown material';

        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${titleText} - ${materialText}`);

        const overlayElement = document.createElement('div');
        overlayElement.className = 'hover-meta';
        overlayElement.innerHTML = `
            <span class="title">${titleText}</span>
            <span class="material">${materialText}</span>
        `;
        card.appendChild(overlayElement);

        card.addEventListener('click', () => {
            showModal(imageElement?.src || '', titleText, materialText);
        });

        card.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showModal(imageElement?.src || '', titleText, materialText);
            }
        });
    });

    function showModal(imageSrc, titleText, materialText) {
        modalElement.style.display = 'flex';
        modalImageElement.src = imageSrc;
        modalTitleElement.textContent = titleText;
        modalMaterialElement.textContent = materialText;
    }

    function hideModal() {
        modalElement.style.display = 'none';
    }

    closeButtonElement?.addEventListener('click', hideModal);

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideModal();
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalElement) {
            hideModal();
        }
    });

    modalImageElement.addEventListener('mousemove', (event) => {
        handleZoom(event);
    });

    modalImageElement.addEventListener('mouseleave', () => {
        zoomLensElement.style.display = 'none';
    });

    function handleZoom(event) {
        zoomLensElement.style.display = 'block';
        const cursorPosition = getCursorPosition(event);
        let positionX = cursorPosition.x - zoomLensElement.offsetWidth / 2;
        let positionY = cursorPosition.y - zoomLensElement.offsetHeight / 2;

        const maxX = modalImageElement.width - zoomLensElement.offsetWidth;
        const maxY = modalImageElement.height - zoomLensElement.offsetHeight;

        positionX = Math.min(Math.max(positionX, 0), maxX);
        positionY = Math.min(Math.max(positionY, 0), maxY);

        zoomLensElement.style.left = `${positionX}px`;
        zoomLensElement.style.top = `${positionY}px`;
        zoomLensElement.style.backgroundImage = `url(${modalImageElement.src})`;
        zoomLensElement.style.backgroundSize =
            `${modalImageElement.width * zoomFactor}px ${modalImageElement.height * zoomFactor}px`;
        zoomLensElement.style.backgroundPosition =
            `-${positionX * zoomFactor}px -${positionY * zoomFactor}px`;
    }

    function getCursorPosition(event) {
        const rectangle = modalImageElement.getBoundingClientRect();
        return {
            x: event.pageX - rectangle.left - window.pageXOffset,
            y: event.pageY - rectangle.top - window.pageYOffset
        };
    }
});
