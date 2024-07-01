/* CONSTANTS */
const bookList = document.querySelector("#book-list"); //container for individual book cards
const toggleBookFormButton = document.querySelector('#toggleForm') //button to open and close form
const bookForm = document.querySelector('#book-form'); //book form


//✅ 1a. start json-server, examine data structure
//✅ 1b. use chat-gpt to generate additional stores
    //generate JSON for 5 technology bookstores with the following fields: location, name, address, number
    //add an id field that increments by one starting with an id of 4


///////////////////////////////
// communicating with server //
///////////////////////////////
//✅ 2. fetch request to get all books
//✅ 2a. save the base url as a const (to reuse later)
  //✅ 2b. render books from database instead of from data.js


//✅ 3. use db.json to get information about the store
//✅ 3a. make a fetch request
  //✅ 3b. use data to update DOM
//✅ 3c. add a .catch for errors

//id is the unique identifier for each individual store
//not only can you access all the stores with /stores
//you can access individual stores via its unique id
//such as stores/1
fetch('http://localhost:3000/stores/3') // => Promise
//extract the data from the response
//response contains a lot of other things such as the status code,
//text, timestamp, content type, content length
.then(response => response.json())
.then(stores => {
  console.log(stores)
  renderHeader(stores)
  renderFooter(stores)
})

//asking the server to get the data at /book
//this returns a promise which we are going to have to wait for  
//to fulfill
fetch('http://localhost:3000/books') // => Promise
//if the promise successfully fulfills, we will get a response from the
//server
//which contains a bunch of stuff including our data (as JSON)
.then(res => {
  //console.log(res)
  //specificall extracting the data from our response
  //res.json returns a promise so we also have to wait for that to fulfill
  return res.json()
})
//once our res.json()'s promise successfully fulfills you can do whatever you
//want with the data
.then(books => {
  //console.log(books)
  //in this case, we are iterating over books, and rendering each
  //book to the page
  books.forEach(renderBook)
})


/**
 * 
 * 
 *OLD BUSINESS
 *
 * 
 */

/* helper function to format the price of a book */
function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

/* adds name of bookstore to header */
function renderHeader(bookStore) {
  document.querySelector('#store-name').textContent = bookStore.name;
}

/* adds details of bookstore to footer */
function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

/* renders one book object as card*/
function renderBook(book) {
  const li = document.createElement("li");
	const titleNode = document.createElement("h3");
	const authorNode = document.createElement("p");
	const priceNode = document.createElement("p");
	const imgNode = document.createElement("img");
	const deleteBtn = document.createElement("button");

  li.className = "card";
  titleNode.textContent = book.title;
	authorNode.textContent = book.author;
	priceNode.textContent = formatPrice(book.price);
	imgNode.src = book.imageUrl;

  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", (e) => {
		li.remove();
	});

  bookList.append(li);
	li.append(titleNode);
	li.append(authorNode);
	li.append(priceNode);
	li.append(imgNode);
	li.append(deleteBtn);
  //logic to display in or out of stock
  const pStock = document.createElement('p');
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock"
  }
  li.append(pStock);
}

/*
*
*
* event listeners and render on DOM content loaded
*
*
*/

/*  on click helper function: toggles collapsed class on form */
function toggleBookForm() {
  const bookFormHidden = bookForm.classList.toggle('collapsed');
  if (bookFormHidden) {
    toggleBookFormButton.textContent = "New Book";
  } else {
    toggleBookFormButton.textContent = "Hide Book Form";
  }
}

/* on click event using helper function to toggle collapsed class on form */
toggleBookFormButton.addEventListener('click', (e) => {
  toggleBookForm();
});

/* submit event listener for book form */
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: parseFloat(e.target.price.value),
    inventory: parseInt(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value,
    reviews: []
  }
  e.target.reset(); // clear form
  toggleBookForm(); // hide book form
  renderBook(book); // display new book to DOM
})

renderHeader(bookStore)
renderFooter(bookStore)
bookStore.inventory.forEach(renderBook)




