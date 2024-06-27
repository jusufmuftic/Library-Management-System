CREATE TABLE Role (
	role_id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR(50)
);

CREATE TABLE Categories (
	category_id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(50),
    category_description TEXT
);

CREATE TABLE Author (
	author_id INT PRIMARY KEY auto_increment,
    author_name VARCHAR (50),
    biography TEXT
);

CREATE TABLE Book (
	book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES Author(author_id)
		on delete cascade
        on update cascade,
    publisher VARCHAR(50),
    ISBN VARCHAR(13) NOT NULL,
    category_id INT, 
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
		on delete cascade
		on update cascade,
    quantity INT
);


CREATE TABLE Users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR (50),
    pass VARCHAR (50),
    user_name VARCHAR (50) NOT NULL,
    email VARCHAR (50),
    phone_number VARCHAR (50),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES Role(role_id)
		on delete cascade
        on update cascade
);

CREATE TABLE Borrowing_Records (
	record_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, 
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
		on delete cascade
		on update cascade,
    book_id INT, 
    FOREIGN KEY (book_id) REFERENCES Book(book_id)
		on delete cascade
        on update cascade,
    borrowed_at TIMESTAMP,
    due_at TIMESTAMP,
    returned_at TIMESTAMP NULL
);

CREATE TABLE History (
	history_id INT PRIMARY KEY auto_increment,
    user_id INT, 
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
		on delete cascade
        on update cascade,
    action VARCHAR(50),
    book_id INT, 
    FOREIGN KEY (book_id) REFERENCES Book(book_id)
		on delete cascade
        on update cascade,
    time TIMESTAMP
);



