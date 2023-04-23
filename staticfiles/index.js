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

const modalForm = document.querySelector('.modal-form');
const modalLabel = document.querySelector('label[for="modalImage"]');
const addTextModal = document.querySelector('.add-text-modal')

if (modalForm) {
    modalLabel.addEventListener('change', (e) => {
        e.preventDefault();
        modalLabel.textContent = 'Already loaded'
        modalLabel.style.cssText = `background-image: none; display: flex; justify-content: center; align-items: center; font-size: 30px;`
        addTextModal.remove()
    })
}
const showMoreButton = document.querySelector('.show-more');

async function loadBids(url, data) {
    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: data
    })
    return res
}

if (showMoreButton) {
    showMoreButton.addEventListener('click', () => {
        loadBids()
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            } else {
                return response.json()
            }
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            showMoreButton.style.display = 'none';
        })
    })
}
