//fetch to backend
//async func
const dotenv= require('dotenv')
const dbURI = process.env.MONGODB_URI;
async function getData() {
 const res= await fetch('http://localhost:3000/books')
 const knjige = await res.json();    
//  console.log(knjige)

    for(let i = 0; i < knjige.length; i++){
        const knjiga = knjige[i]

        const container = document.createElement('div')
        const leftCont = document.createElement('div')
        const rightCont = document.createElement('div')
        container.classList.add('book')

        const title = document.createElement('h3')
        const author = document.createElement('p')

        //button
        const delBtn = document.createElement('button')
        delBtn.classList.add('delBtn')
        delBtn.innerHTML = 'DELETE'

        //del req, tarik pomagaj
        delBtn.addEventListener('click', () => {
            // alert('Are you sure you want to delete?')
            const bookID = knjiga._id
            const url = dbURI + bookID

            fetch(url, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then((result) => {
                console.log('deleted')
            }).catch((err) => {
                console.log(err)
            })
        })

        title.innerHTML = knjiga.title
        author.innerHTML = knjiga.author

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






