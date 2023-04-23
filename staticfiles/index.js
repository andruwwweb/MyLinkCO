document.addEventListener('DOMContentLoaded', () => {

    //Выгрузка первых четырех ставок
    const mainBody = document.querySelector('.main-body');
    if (mainBody) {
        const uuidWrapper = document.querySelector('.ID');
        const id = uuidWrapper.innerText;
        const getTopBidsDataUrl = `/api/comments/?end_count=4&product_id=${id}`
        getQuery(getTopBidsDataUrl)
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
                    bidTemplateLeft(object.pic, object.name, object.price, object.text)
                } else {
                    bidTemplateRight(object.pic, object.name, object.price, object.text)
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            const bids = document.querySelectorAll('bid');
            if (mainBody) {
                if (bids.length < 1) {
                    createBidsWarning();
                    showMoreButton.style.display = 'none'
                } else if (bids.length <= 4) {
                    showMoreButton.style.display = 'none'
                }
            }
        });
    //Спецэффекты кнопок
    const doBidButton = document.querySelector('.dobid');
    const modalWrapper = document.querySelector('.modal-wrapper');
    const modal = document.querySelector('.modal')
    if (doBidButton) {
        doBidButton.addEventListener('click', () => {
            modalWrapper.style.cssText = 'display: block';
            mainBody.style.cssText = 'overflow: hidden;'
        });
    };
    modalWrapper.addEventListener('click', (e) => {
        const target = e.target
        if (!modal.contains(target) || target.classList.contains('modal-img')) {
            modalWrapper.style.cssText = 'display: none;'
            mainBody.style.cssText = 'overflow: auto;'
        }
    })


    // Тут мы делаем так, чтобы загруженное фото отображалось в поле ввода
    const modalInput = document.querySelector('#modalImage');
    const modalLabel = document.querySelector('label[for="modalImage"]');
    const addTextModal = document.querySelector('.add-text-modal');

    modalInput.addEventListener('change', () => {
        if (modalInput.files.length > 0) {
            const file = modalInput.files[0];
            const url = URL.createObjectURL(file);
            addTextModal.textContent = '';
            addTextModal.style.cssText = 'top: -290px';
            modalLabel.style.cssText = `background: url(${url}); background-repeat: no-repeat; background-size: cover; background-position: center;`;
        } else {
            modalInput.textContent = 'Loading...';
            modalInput.style.cssText = 'top: -290px';
            addLabel.style.cssText = "background: none;";
        }
    });

    //Запрос на создание всех остальных транзакций
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
                if (showMoreButton) {
                    showMoreButton.style.display = 'none';
                }
            })
        })
    }
    }



    //Форма на странице добавления продукта
    const addFrom = document.querySelector('.add-form')
    if (addFrom) {
        const addText = document.querySelector('.add-text');
        const fileInput = document.querySelector('#imageFile');
        const addLabel = document.querySelector('.addLabel');

        const addFromWidth = addFrom.offsetWidth;
        addLabel.style.width = `${addFromWidth}px`;

        // Тут мы делаем так, чтобы загруженное фото отображалось в поле ввода
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
    function bidTemplateLeft(userImage, userName, userBid, userMessage) {
        const bids = document.querySelector('.bids')
        const template1 = document.createElement('div');
        template1.classList.add('bid-container-1', 'bid');
        template1.innerHTML = `
        <div class="bid-template-1">
            <div class="user-box-1">
                <div class="box-1">
                    <div class="user-image">${userImage}</div>
                    <div class="user-name-1">${userName}</div>
                </div>
                <div class="user-bid">${userBid}</div>
            </div>
            <div class="user-message-1">${userMessage}</div>
        </div>
        `;
        bids.append(template1)
    }
    function bidTemplateRight(userImage, userName, userBid, userMessage) {
        const bids = document.querySelector('.bids')
        const template1 = document.createElement('div');
        template1.classList.add('bid-container-2', 'bid');
        template1.innerHTML = `
        <div class="bid-template-2">
            <div class="user-box-2">
                <div class="box-2">
                    <div class="user-image">${userImage}</div>
                    <div class="user-name-2">${userName}</div>
                </div>
                <div class="user-bid">${userBid}</div>
            </div>
            <div class="user-message-2">${userMessage}</div>
        </div>
        `;
        bids.append(template1)
    };
    function createBidsWarning() {
        const bidsContainer = document.querySelector('.bids')
        const warningText = document.createElement('div');
        warningText.classList.add('warning-text')
        warningText.textContent = 'Here is no bids yet, be the first!';
        if (bidsContainer) {
            bidsContainer.append(warningText);
        }
    }
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