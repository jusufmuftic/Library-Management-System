const express = require('express');
const mongoose = require('mongoose')
const Book = require('./models/book')

const app = express();

const dbURI = 'mongodb+srv://jusufmuftic:W7IqsHsi6pkJq7Bj@cluster0.pr2th.mongodb.net/';

mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded())

// app.use((req, res, next) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// });

app.get('/', (req, res) => {
  res.redirect('/books')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/books', (req, res) => {
  Book.find().sort({createdAt: -1})
  .then((result) => {
    res.render('index', {title : 'All Books', books: result})
  })
  .catch((err) => {
    console.log(err)
  })
})

app.post('/books', (req, res) => {
  const book = new Book(req.body)

  book.save()
  .then((result) => {
    res.redirect('/books')
  })
  .catch((err) => {
    console.log(err)
  })
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

