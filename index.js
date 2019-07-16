const arrayBodyTag = document.querySelector('tbody');
const tabletag = document.querySelector('table');

function createBookRow({ titre, author, price, available }) {

    return `
     <tr class="table-${available ? 'success' : 'danger'}">
        <td>${titre}</td>
        <td>${author}</td>
        <td>${price}€</td>
    </tr>
`;
}

function render(parentTag, content) {
    parentTag.innerHTML += content;
}

//Data
let books = getBooks();


function getBooks() {
    if (window.localStorage && localStorage.getItem('books')) {
        try {
            books = JSON.parse(localStorage.getItem('books'));
        } catch (e) {
            return [];
        }
    }
    return [];
}

// S'il y a des courageux qui veulent terminer le TP, voici la marche à suivre :

// Vérifier si le nombre de livres récupérer N'EST PAS le même que celui stocker en local (books.length)
// Si c'est le cas il faut reconstruire l'interface graphique (avec mise à jour évidemment de l'objet local)
// Sinon il faut :
// Parcourir les livres à disposition un par un,
// Récupérer le livre correspondant depuis la liste récupérée,
// Vérifier si au moins un prix ou une disponibilité est différente,
// Si oui, reconstruire l'interface graphique
// Si non, ne rien faire

fetch('./books.json').then(function (response) {
    response.json().then(function (booksJSON) {
        saveData(booksJSON);

        if (books.length !== booksJSON.length) {
            books = booksJSON;
            buildTable();
        } else {// meme nombre de livre
            for (let book of books){
                booksJSON.filter(function(item){
                    return item.titre === book.titre && item.author === book.author;
                })[0];

                if (bookJSOn.available !== book.available || bookJSON.price !== book.price) {
                    books = booksJSON;
                    buildTable();
                    break;
                }
            }
        }
    });
}).catch(function (error) {
    console.log(error);
});



//Main code
function buildTable() {
    if (books.length > 0) {
        tabletag.style.display = "table";

        for (let book of books) {
            const row = createBookRow(book);
            render(
                arrayBodyTag,
                row
            );
        }
    }
}

function saveData(data) {
    if (window.localStorage) {
        localStorage.setItem('books', JSON.stringify(data));
    }
}

