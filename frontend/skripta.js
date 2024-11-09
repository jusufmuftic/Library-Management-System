async function getData() {
    const res = await fetch('http://localhost:3000/books');
    const knjige = await res.json(); 

    const allBooks = document.getElementById('all-books');

    knjige.forEach((knjiga) => {
        const delBtn = document.createElement('button');
        delBtn.classList.add('delBtn');
        delBtn.innerHTML = 'DELETE';

        const editBtn = document.createElement('button')
        editBtn.classList.add('editBtn')
        editBtn.innerHTML = 'EDIT'


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
        rightCont.appendChild(editBtn)
        rightCont.appendChild(delBtn);
        
         const x = document.querySelector('#x')
         const popup = document.querySelector('#pop-up')
         const body = document.querySelector('body')
         const title_insert = document.querySelector('.title_input')
         const author_insert = document.querySelector('.author_input')        

         x.addEventListener('click', () => {
             popup.style.display = 'none'
             body.style.backgroundColor = 'white'
         })

         editBtn.addEventListener('click', () => {
            popup.style.display = 'grid'
            body.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
            title_insert.value = `${knjiga.title}`
            author_insert.value = `${knjiga.author}`
         })

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
    })
}

getData()

async function edit(e){
    const title = document.querySelector('.title_input').value
    const author = document.querySelector('.author_input').value
    console.log(title, author)

    const res = await fetch('http://localhost:3000/books');
    const knjige = await res.json(); 

    

    try{

        

    } catch (err){
        console.log(err)
    }
}