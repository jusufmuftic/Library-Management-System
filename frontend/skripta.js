
async function getData() {
 const res= await fetch('http://localhost:3000/books')
 const knjige = await res.json();    
 console.log(knjige)

    for(let i = 0; i < knjige.length; i++){
        const knjiga = knjige[i]

        const container = document.createElement('div')
        const leftCont = document.createElement('div')
        const rightCont = document.createElement('div')
        container.classList.add('book')

        const title = document.createElement('h3')
        const author = document.createElement('p')
        

        title.innerHTML = knjiga.title
        author.innerHTML = knjiga.author

        const delBtn = document.createElement('button')
        delBtn.classList.add('delBtn')
        delBtn.innerHTML = 'DELETE'

        const allBooks = document.getElementById('all-books')
        allBooks.appendChild(container)
        container.appendChild(leftCont)
        container.appendChild(rightCont)
        leftCont.appendChild(title)
        leftCont.appendChild(author)
        rightCont.appendChild(delBtn)
    }
}

getData()

async function delData() {
    const res = await fetch('http://localhost:3000/books');
    const knjige = await res.json(); 

    const allBooks = document.getElementById('all-books');

    knjige.forEach((knjiga) => {
        const delBtn = document.createElement('button');
        delBtn.classList.add('delBtn');
        delBtn.innerHTML = 'DELETE';

        const container = document.createElement('div');
        const leftCont = document.createElement('div');
        const rightCont = document.createElement('div');
        container.classList.add('book');

        const title = document.createElement('h3');
        const author = document.createElement('p');

        title.innerHTML = knjiga.title;
        author.innerHTML = knjiga.author;

        allBooks.appendChild(container);
        container.appendChild(leftCont);
        container.appendChild(rightCont);
        leftCont.appendChild(title);
        leftCont.appendChild(author);
        rightCont.appendChild(delBtn);

        delBtn.addEventListener('click', async () => {
            const confirmDelete = confirm('Are you sure you want to delete this book?');
            if (confirmDelete) {
                try {
                    const deleteRes = await fetch(`http://localhost:3000/books/${knjiga._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (deleteRes.ok) {
                        console.log('Book deleted');
                    } else {
                        console.log('Failed to delete book');
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });
    });
}

delData();







