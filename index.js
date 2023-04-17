const headerButton = document.querySelector('.header-button');
if (headerButton) {
    headerButton.addEventListener('click', () => {
        headerButton.classList.toggle('header-button-active');
    });
}
const doBidButton = document.querySelector('.dobid');
if (doBidButton) {
    doBidButton.addEventListener('click', () => {
        doBidButton.classList.toggle('dobid-active');
    });
}

const addFrom = document.querySelector('.add-form')
const addLabel = document.querySelector('label[for="my-file"]');
const addText = document.querySelector('.add-text')

if (addFrom) {
    const addFromWidth = addFrom.offsetWidth;
    addLabel.style.width = `${addFromWidth}px`;
    addLabel.addEventListener('change', (e) => {
        e.preventDefault();
        addLabel.textContent = 'Already loaded'
        addLabel.style.cssText = `background-image: none; display: flex; justify-content: center; align-items: center; font-size: 30px;`
        addText.remove()
    })
}

