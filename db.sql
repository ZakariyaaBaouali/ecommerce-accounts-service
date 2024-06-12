use accounts_db;

create table accounts (
    id VARCHAR(255) PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NULL,
    avatar VARCHAR(255) NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select * from accounts;

insert into
    accounts (id, userName, email, password)
values (
        '1',
        'test',
        'test@gmail.com',
        'test2001'
    )

DELETE FROM accounts where id = 1;