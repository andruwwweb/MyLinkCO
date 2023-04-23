document.addEventListener('DOMContentLoaded', () => {

    //Главная страница
    const mainBody = document.querySelector('.main-body');
    if (mainBody) {
        //Берем айдишник продукта из блока и вставляем его в ссылку
        const uuidWrapper = document.querySelector('.ID');
        const id = uuidWrapper.innerText;
        const getTopBidsDataUrl = `/api/comments/?end_count=4&product_id=${id}`;
        //Делаем гет запрос на сервер чтобы отрендерить первые 4 ставки
        getQuery(getTopBidsDataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            } else {
                return response.json()
            }
        })
        .then(data => {
            //В зависимости от количества обьектов работаем с кнопкой show more
            if (data.length < 1) {
                createBidsWarning();
                showMoreButton.style.display = 'none'
            } else if (data.length == 4) {
                showMoreButton.style.display = 'none'
            }
            //Полученый ответ обрабатываем и разделяем на два шаблона
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
            console.log('Success')
        });
        //Логика модального окна - открывание и закрывание
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

        // Тут мы делаем так, чтобы загруженное фото отображалось в поле ввода и убирался текст 
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

        //Запрос на создание всех остальных транзакций - также рендерим и потом убираем кнопку показать еще
        const showMoreButton = document.querySelector('.show-more');
        if (showMoreButton) {
            const getLastBidsDataUrl = `/api/comments/?start_count=5&product_id${id}`
            showMoreButton.addEventListener('click', () => {
                getQuery(getLastBidsDataUrl)
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

    //Страница добавления продукта
    const addBody = document.querySelector('.add-body')
    if (addBody) {
        const addFrom = document.querySelector('.add-form')
        const addText = document.querySelector('.add-text');
        const fileInput = document.querySelector('#imageFile');
        const addLabel = document.querySelector('.addLabel');

        //Задаем ширину лейбла 
        const addFromWidth = addFrom.offsetWidth;
        addLabel.style.width = `${addFromWidth}px`;

        // Тут тоже делаем так, чтобы загруженное фото отображалось в поле ввода и убирался текст
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







    //Функции

    //Пост запрос
    async function postQuery(url, data) {
        let res = await fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: data
        })
        return res
    };
    //Гет запрос
    async function getQuery(url) {
        let result = await fetch(url, {
            method: "GET"
        });
        return result;
    };
    //Создание одного шаблона
    function bidTemplateLeft(userImage, userName, userBid, userMessage) {
        if (!userImage) {
            let imagePlaceHolder = userName.substring(1, 3).toUpperCase()
            userImage2 = imagePlaceHolder
        }
        const bids = document.querySelector('.bids')
        const template1 = document.createElement('div');
        template1.classList.add('bid-container-1', 'bid');
        template1.innerHTML = `
        <div class="bid-template-1">
            <div class="user-box-1">
                <div class="box-1">
                    <div class="user-image">
                        <img src="${userImage}" alt="image_comment">
                    </div>
                    <div class="user-name-1">${userName}</div>
                </div>
                <div class="user-bid">${userBid}</div>
            </div>
            <div class="user-message-1">${userMessage}</div>
        </div>
        `;
        bids.append(template1)
        if (!document.querySelector('.image')) {
            let imagePlaceHolder = document.querySelector('.user-name-1').substring(1, 3).toUpperCase()
            document.querySelector('.user-image').innerHTML = imagePlaceHolder;
        }
    };
    //Создание второго шаблона
    function bidTemplateRight(userImage, userName, userBid, userMessage) {
        if (!userImage) {
            let imagePlaceHolder = userName.substring(1, 3).toUpperCase()
            userImage2 = imagePlaceHolder
        }
        const bids = document.querySelector('.bids')
        const template1 = document.createElement('div');
        template1.classList.add('bid-container-2', 'bid');
        template1.innerHTML = `
        <div class="bid-template-2">
            <div class="user-box-2">
                <div class="box-2">
                    <div class="user-image">
                        ${userImage2}
                        <img src="${userImage}" alt="image_comment">
                    </div>
                    <div class="user-name-2">${userName}</div>
                </div>
                <div class="user-bid">${userBid}</div>
            </div>
            <div class="user-message-2">${userMessage}</div>
        </div>
        `;
        bids.append(template1)
    };

    //Создание окна если нет ставок
    function createBidsWarning() {
        const bidsContainer = document.querySelector('.bids')
        const warningText = document.createElement('div');
        warningText.classList.add('warning-text')
        warningText.textContent = 'Here is no bids yet, be the first!';
        if (bidsContainer) {
            bidsContainer.append(warningText);
        }
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