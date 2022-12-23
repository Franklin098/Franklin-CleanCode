function createUser(email,password) {
    // this is too low level
    if(!email || !email.includes('@') || !password || password.trim() === ''){
        console.log('Invalid input!');
        return;
    }

    const user = {
        email,
        password
    };

    // this is to high level
    database.insert(user);
}


// we have mixed levels of abstractions and 
// we could split the code in multiple pieces with very well define responsibilities