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



const modalForm = document.querySelector('.modal-form');
const modalLabel = document.querySelector('label[for="modalImage"]');
const addTextModal = document.querySelector('.add-text-modal')
const showMoreButton = document.querySelector('.show-more');

async function postQuery(url, data) {
    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: data
    })
    return res
}
function formDataToJson(formData) {
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        jsonData[key] = value.name;
      } else {
        jsonData[key] = value;
      }
    }
    return jsonData;
}

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

    addFrom.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(addFrom);
        const file = fileInput.files[0];
        data.append('imageFile', file);
      
        const jsonBody = formDataToJson(data);
        console.log(jsonBody);
    })
}

