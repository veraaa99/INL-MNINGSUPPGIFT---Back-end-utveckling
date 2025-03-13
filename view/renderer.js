const url = 'http://localhost:8080/api/products' 

let productList = document.querySelector('#productList');

const products = []

const getProducts = async () => {
    const response = await fetch (url)
    const data = await response.json()
    console.log(data)

    data.forEach(product => products.push(product))
    showProducts()

    return true;
}

getProducts();

const showProducts = () => {
    products.forEach((product) => {
        let li = document.createElement("li")
        li.innerText = product.name
        li.id = product._id

        let img = document.createElement("img")
        img.src = product.images[0]
        img.id = product._id

        li.appendChild(img)
        productList.appendChild(li)

    })
}