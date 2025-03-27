const url = 'http://localhost:8080/api/products' 
const url2 = 'http://localhost:8080/api/messages' 

let productForm = document.querySelector('#productForm');
let messageForm = document.querySelector('#messageForm')
let productList = document.querySelector('#productList');
let editForm = document.querySelector('#editForm')

const products = []

// READ
const getProducts = async () => {
    const response = await fetch (url)
    const data = await response.json()
    console.log(data)

    data.forEach(product => products.push(product))
    console.log(products)
    if(products.length !== 0){
        showProducts()
    }

    return true;
}

getProducts();

const showProducts = () => {
    products.forEach((product) => {
        let li = document.createElement("li")
        li.innerHTML = product.name + '<br /> Price: ' + product.price + '<br /> Category: ' + product.category + '<br /> Description: ' + product.description
        li.id = product._id

        let img = document.createElement("img")
        img.src = product.images[0]
        img.id = product._id

        let deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "Delete product"
        deleteBtn.id = product._id

        let updateBtn = document.createElement("button")
        updateBtn.innerHTML = "Update product"
        updateBtn.id = product._id

        li.appendChild(img)
        li.appendChild(deleteBtn)
        li.appendChild(updateBtn)
        productList.appendChild(li)

        // DELETE PRODUCT
        deleteBtn.addEventListener('click', async() => {
            const res = await fetch('/api/products/' + product._id, {
                method: 'DELETE'
            })

            // const data = await res.json()

            if(!res.ok) {
                // Skriv ut felmeddelande
                return
            }

            // products = products.filter(product => product._id != null)
            delete products[product._id]
            console.log("product deleted")
            showProducts()
        })

        // EDIT PRODUCT
        updateBtn.addEventListener('click', async() => {

            editForm.style.display = editForm.style.display === "block" ? "none" : "block";

            // const res = await fetch('/api/products/' + product._id, {
            //     method: 'PUT'
            // })

            // // const data = await res.json()

            // if(!res.ok) {
            //     // Skriv ut felmeddelande
            //     return
            // }

            // // products = products.filter(product => product._id != null)
            // delete products[product._id]
            // console.log("product deleted")
            // showProducts()
        })

    })
}

// CREATE PRODUCT
productForm.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(productForm)
    const obj = Object.fromEntries(formData)
    console.log(obj)

    // validateInput(obj)

    submitProduct(obj)
})

const submitProduct = async ( obj ) => {

    if (obj.description == "" || obj.description == '') {
        obj.description = undefined
    }
    if (obj.category == "" || obj.category == '') {
        obj.category = undefined
    }
    if (obj.images.name == "" || obj.images.name == '') {
        obj.images = undefined
    }

    console.log(obj)

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        // checkResponse(response);
        // window.location.reload()
        const data = await response.json()
        console.log(data)
        console.log(response)

    } catch (error) {
        console.error(error.message)
    }
}

// CREATE MESSAGE
messageForm.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData(messageForm)
    const obj = Object.fromEntries(formData)
    console.log(obj)

    // validateInput(obj)

    submitMessage(obj)
})

const submitMessage = async ( obj ) => {

    console.log(obj)

    try {
        let response = await fetch(url2, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        // checkResponse(response);
        // window.location.reload()
        const data = await response.json()
        console.log(data)
        console.log(response)

    } catch (error) {
        console.error(error.message)
    }
}