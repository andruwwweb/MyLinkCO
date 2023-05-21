document.addEventListener('DOMContentLoaded', () => {

    //Главная страница
    const mainBody = document.querySelector('.main-body');
    if (mainBody) {
        //Берем айдишник продукта из блока и вставляем его в ссылку
        const uuidWrapper = document.querySelector('.ID');
        const id = uuidWrapper.innerText;
        const getTopBidsDataUrl = `/api/comments/?end_count=5&product_id=${id}`;
        const showMoreButton = document.querySelector('.show-more');

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
            if(data.length === 0) {
                createBidsWarning('Here is no bids yet, be the first!')
            } else {
                data.forEach((object, index) => {
                    if (index % 2 === 0 && index !== 4) {
                        bidTemplate(object.pic, object.name, object.price, object.text, 1)
                        }
                    else if (index % 2 !== 0) {
                        bidTemplate(object.pic, object.name, object.price, object.text, 2)
                        }
                    else if (index === 4) {
                        showMoreButton.style.display = 'block';
                    }
                })
            }
        })
        .catch(error => {
            createBidsWarning('Something went wrong, reload the page...')
            console.log(error);
        })


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
                const lastFile = +modalInput.files.length - 1
                const file = modalInput.files[lastFile];
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

        //Запрос на создание всех остальных ставок - также рендерим и потом убираем кнопку показать еще
        const getLastBidsDataUrl = `/api/comments/?start_count=5&product_id=${id}`
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
                    if (index % 2 === 0) {
                        bidTemplate(object.pic, object.name, object.price, object.text, 1)
                    } else {
                        bidTemplate(object.pic, object.name, object.price, object.text, 2)
                    }
                })

            })
            .catch(error => {
                createBidsWarning('Something went wrong, reload the page...')
                console.log(error)
            })
            .finally(() => {
                console.log('Already load.');
                showMoreButton.style.display = 'none';
            })
        })
        //Создаем значение минимальной ставки
        const priceInput = document.querySelector('.price-box-2 input')
        const prices  = document.querySelectorAll('.user-bid')
        const minPrice = document.querySelector('.min-price')

        if (prices.length > 0) {
            let bidsArr = []
            prices.forEach(item => {
                bidsArr.push(item.match(/\d+/g))
            })
            const maxBid = Math.max(...bidsArr)

            priceInput.min = +maxBid
        } else {
            priceInput.min = +minPrice.textContent.match(/\d+/g)
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
                const lastFile = +fileInput.files.length-1
                const file = fileInput.files[lastFile];
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

    //Гет запрос
    async function getQuery(url) {
        let result = await fetch(url, {
            method: "GET"
        });
        return result;
    };
    //Создание шаблона
    function bidTemplate(userImage, userName, userBid, userMessage, templateNumber) {
        const bids = document.querySelector('.bids')
        const template = document.createElement('div');
        template.classList.add(`bid-container-${templateNumber}`, 'bid');
        if (!userImage) {
            const imagePlaceHolder = userName.substring(1, 3).toUpperCase()
            template.innerHTML = `
            <div class="bid-template-${templateNumber}">
                <div class="user-box-${templateNumber}">
                    <div class="box-${templateNumber}">
                        <div class="user-image" style="display: flex; justify-content: center; align-items: center">
                            <div style="text-align: center;">${imagePlaceHolder}</div>
                        </div>
                        <div class="user-name-${templateNumber}">${userName}</div>
                    </div>
                    <div class="user-bid">${userBid}</div>
                </div>
                <div class="user-message-${templateNumber}">${userMessage}</div>
            </div>
            `;
        } else {
            template.innerHTML = `
            <div class="bid-template-${templateNumber}">
                <div class="user-box-${templateNumber}">
                    <div class="box-${templateNumber}">
                        <div class="user-image">
                            <img class="image-${templateNumber}" src="${userImage}" alt="User photo">
                        </div>
                        <div class="user-name-${templateNumber}">${userName}</div>
                    </div>
                    <div class="user-bid">${userBid}</div>
                </div>
                <div class="user-message-${templateNumber}">${userMessage}</div>
            </div>
            `;
        }
        bids.append(template);
    };

    //Создание окна если нет ставок
    function createBidsWarning(text) {
        const bidsContainer = document.querySelector('.bids')
        const warningText = document.createElement('div');
        warningText.classList.add('warning-text')
        warningText.textContent = text;
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