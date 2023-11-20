const storageKey = "STORAGE_KEY";

const formAddingBook = document.getElementById("inputBook");
function CheckForStorage() {
  return typeof Storage !== "undefined";
}

formAddingBook.addEventListener("submit", function (event) { 
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = parseInt(document.getElementById("inputBookYear").value);
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const idTemp = document.getElementById("inputBookId").value;
  if (idTemp !== "") {
    // if (confirm("Apakah Anda Yakin Menyimpan Perubahan Buku ini?")) 
    // {
    //   const bookData = GetBookList();
    //   for (let index = 0; index < bookData.length; index++) {
    //     if (bookData[index].id == idTemp) {
    //       bookData[index].title = title;
    //       bookData[index].author = author;
    //       bookData[index].year = year;
    //       bookData[index].isComplete = isComplete;
    //     }
    //   }
    //   localStorage.setItem(storageKey, JSON.stringify(bookData));
    //   ResetAllForm();
    //   RenderBookList(bookData);
    //   alert("Buku Berhasil Disimpan.");
    //   return;
    // } 
    // else
    {
      return;
    }
  } 
  else
  {
    const id = JSON.parse(localStorage.getItem(storageKey)) === null ? 0 + Date.now() : JSON.parse(localStorage.getItem(storageKey)).length + Date.now();
    const newBook = {
      id: id,
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };
  
    PutBookList(newBook);

    // const bookData = GetBookList();
    // RenderBookList(bookData);
    // alert("Buku Berhasil Disimpan.");
  
  }
});
function PutBookList(data) {
  if (CheckForStorage()) {
    let bookData = [];

    if (localStorage.getItem(storageKey) !== null) {
      bookData = JSON.parse(localStorage.getItem(storageKey));
    }

    bookData.push(data);
    localStorage.setItem(storageKey, JSON.stringify(bookData));
  }
}
function RenderBookList(bookData) {
  if (bookData === null) {
    return;
  }
}

// halo egiiS
// Render Book List
function RenderBookList(bookData)  {
  if (bookData === null) {
    return;
  }

  const containerIncomplete = document.getElementById("incompleteBookshelfList");
  const containerComplete = document.getElementById("completeBookshelfList");

  containerIncomplete.innerHTML = "";
  containerComplete.innerHTML = "";
  for (let book of bookData) {
    const id = book.id;
    const title = book.title;
    const author = book.author;
    const year = book.year;
    const isComplete = book.isComplete;

    let bookItem = document.createElement("article");
    bookItem.classList.add("book_item", "select_item");
    bookItem.innerHTML = "<h3 name = " + id + ">" + title + "</h3>";
    bookItem.innerHTML += "<p>Penulis: " + author + "</p>";
    bookItem.innerHTML += "<p>Tahun: " + year + "</p>";

    let containerActionItem = document.createElement("div");
    containerActionItem.classList.add("action");

    const moveButton = CreateMoveButton(book, function (event) {
      FinishedBookHandler(event.target.parentElement.parentElement);

      const bookData = GetBookList();
      ResetAllForm();
      RenderBookList(bookData);
    });
  