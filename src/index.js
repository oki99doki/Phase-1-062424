//✅ 1. fork and sync git

//✅ 2. Review data.js and order of script tags in HTML <head> 

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

//✅ 3. explore the debugger

//✅ 4. update the store name with "easley's technical books"
//const storeName = document.getElementById("store-name")
//storeName.textContent = bookStore.name

function renderHeader(store){
  const storeName = document.getElementById("store-name")
  storeName.textContent = store.name

}

renderHeader(bookStore)




//✅ 5. create a function for render footer

const renderFooter = (store) => {
  //READ
  const storeName = document.getElementById("store")
  //document.querySelector("#nuber") ... is an alternativ
  const storeNumber = document.getElementById("number")
  const storeAddress = document.getElementById("address")
  //UPDATE
  //.textContent is a property
  //you will update it similarly to an object
  //in this analalogy
  //storeName would be the object, textContent would be the key, and store.name
  //would be the value
  storeName.textContent = store.name
  storeNumber.textContent = store.number
  storeAddress.textContent = store.address
}

renderFooter(bookStore)


//✅ 6. create a function called renderBook(book)

/***
function: create HTML structure for single book and append to page
input: a book object
output: none
***/

const renderBook = (book) => {
  // READing (accessing) an existing node
  const bookList = document.getElementById("book-list")
  const li = document.createElement("li")
  const titleNode = document.createElement("h3")
  const authorNode = document.createElement("p")
  const priceNode = document.createElement("p")
  const imageNode = document.createElement("img")
  const buttonNode = document.createElement("button")
  
  // technically we're updating li
  bookList.append(li)
  li.append(titleNode)
  li.append(authorNode)
  li.append(priceNode)
  li.append(imageNode)
  li.append(buttonNode)

  // UPDATING node contents (whether it be the id, textContent, src classNames)
  li.className = "card"
  titleNode.textContent = book.title
  authorNode.textContent = book.author
  priceNode.textContent = formatPrice(book.price)
  //ALWAYS DOUBLE CHECK THE KEYS
  //DO NOT ASSUME THEM
  imageNode.src = book.imageUrl
  buttonNode.textContent = "Delete"

}

/* renderBook(bookStore.inventory[0])
renderBook(bookStore.inventory[1])
renderBook(bookStore.inventory[2])
renderBook(bookStore.inventory[3]) */


//for all books in bookStore, inventory

/* for (let curBook of bookStore.inventory){
  renderBook(curBook)
} */

/*   for (let i = 0; i < bookStore.inventory.length; i++){
  renderBook(bookStore.inventory[i])
} */

//.forEach
//Use if one only wants to run instructions for each and not update //any not create.
//someArray.forEach( (curElement) => {instructions})
//bookStore.inventory.forEach( (curBook) => {renderBook(curBook)})

//Shortcut
//bookStore.inventory.forEach(renderBook)

//.map will replace each element in an array with an updated element
//use this if one wants to change array
bookStore.inventory.map( (curBook) => {renderBook(curBook)})



  //renderBook on current book


//✅ 7. iterate over all the books in data and show book on page


// General Process - manipulating the DOM

// get info (to populate node contents, text, imageUrls, etc.)
// create nodes
// update nodes
// add nodes to page