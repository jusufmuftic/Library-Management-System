//fetch to backend
//async func

async function getData() {
 const res= await fetch('http://localhost:3000/books')
 const knjige = await res.json();    
 console.log(knjige)

for(let i = 0; i < knjige.length; i++){
    const knjiga = knjige[i]
    const title = document.createElement('h3')
    const author = document.createElement('p')
    title.innerHTML = knjiga.title
    author.innerHTML = knjiga.author

    console.log(knjiga)

    const kanta = document.getElementById('container')
    kanta.appendChild(title)
    kanta.appendChild(author)
}

}

getData()






