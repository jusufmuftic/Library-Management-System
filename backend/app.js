const express = require('express');
const mongoose = require('mongoose')
const Book = require('./models/book')
const dotenv= require('dotenv')
dotenv.config()
const app = express();
const dbURI = process.env.MONGODB_URI;
// cors
const cors=require("cors");

mongoose.connect(dbURI)
.then((result) => {
  console.log("Connected to DB")
  app.listen(3000)
})
.catch((err) => console.log(err))

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded())
app.use(cors())
app.use(express.json());

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/books', async (req, res) => {
  const knjige = await Book.find();
  res.json(knjige)
})

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  
  Book.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/books' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/books', (req, res) => {
  //validation

  const book = new Book(req.body)

  book.save()
  .then((result) => {
    // res.redirect('/books')
    res.json({success:'ok'})
  })
  .catch((err) => {
    console.log(err)
  })
})

app.post("/book/:title",async (req, res) => {
  console.log(req.body)
  console.log("poziv dobio")
  console.log(req.params)

  // naci u bazi knjigu
  const knjiga = await Book.findOne({title: req.params["title"]})
  console.log(knjiga.author)

  // updateat autora
  knjiga.author = req.body.author
  await knjiga.save(); 

  // vratit response ok
  res.json({ok: true})
})

app.get('/books/create', (req, res) => {
  res.render('create', { title: 'Add a new book' });
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  Book.findById(id)
  .then((result) => {
    res.render('details', {book: result, title: 'Book details'})
  })
  .catch((err) => {
    console.log(err)
  })
})

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

