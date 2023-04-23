document.addEventListener('DOMContentLoaded', () => {

    //Выгрузка первых четырех ставок
    getQuery('Сюда вставляй урл для запроса первых 4 ставок')
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status)
        } else {
            return response.json()
        }
    })
    .then(data => {
        data.forEach((object, index) => {
            if (index % 2 == 0) {

            }
        })
    })
    //Спецэффекты кнопок
    const headerButton = document.querySelector('.header-button');
    if (headerButton) {
        headerButton.addEventListener('click', () => {
            headerButton.classList.toggle('header-button-active');
            window.location.replace('login.html');
        });
    };
    const doBidButton = document.querySelector('.dobid');
    if (doBidButton) {
        doBidButton.addEventListener('click', () => {
            doBidButton.classList.toggle('dobid-active');
        });
    };

    const modalForm = document.querySelector('.modal-form');
    const modalLabel = document.querySelector('label[for="modalImage"]');
    const addTextModal = document.querySelector('.add-text-modal')
    const showMoreButton = document.querySelector('.show-more');


    if (showMoreButton) {
        showMoreButton.addEventListener('click', () => {
            postQuery()
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

    //Форма на странице добавления продукта
    const addFrom = document.querySelector('.add-form')
    if (addFrom) {
        const addText = document.querySelector('.add-text');
        const fileInput = document.querySelector('#imageFile');
        const addLabel = document.querySelector('.addLabel');

        const addFromWidth = addFrom.offsetWidth;
        addLabel.style.width = `${addFromWidth}px`;

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const url = URL.createObjectURL(file);
                addText.textContent = '';
                addText.style.cssText = 'top: -290px';
                addLabel.style.cssText = `background: url(${url}); background-repeat: no-repeat; background-size: cover; background-position: center;`;
            } else {
                addText.textContent = 'Loading...';
                addText.style.cssText = 'top: -290px';
                addLabel.style.cssText = "background: none;";
            }
        });

    }


    function renderServerResponse(response) {
        const statusModal = document.createElement('div');
        statusModal.style.cssText = 'width: 100%; height: 100%; display: flex; position: absolute; top: 0; right: 0; justify-content: center; align-items: center';
        statusModal.innerHTML = `<div class="response-wrapper">${response}</div>`
    };
    async function postQuery(url, data) {
        let res = await fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: data
        })
        return res
    };
    async function getQuery(url) {
        let result = await fetch(url, {
            method: "GET"
        });
        return result;
    };
    
})


// addFrom.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const data = new FormData(addFrom);
//     const file = fileInput.files[0];
//     const url = URL.createObjectURL(file);
//     let jsonBody = formDataToJson(data);
//     jsonBody.imageFile = url;
//     postQuery('/product/create/', jsonBody)
//     .then(response => {
//         if(!response.ok) {
//             throw new Error(response.status)
//         }
//         else {
//             return;
//         }
//     })
//     .catch(error => {
//         console.error(error)
//         renderServerResponse(data.message)
//     })
//     .finally(() => {
//         addFrom.reset()
//     })
// })
// function formDataToJson(formData) {
//     const jsonData = {};
//     for (const [key, value] of formData.entries()) {
//         jsonData[key] = value;
//     }
//     return jsonData;
// };