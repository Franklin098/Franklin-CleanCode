function handleCreateUserRequest(request) {
    try {
        createUser(request.email, request.password);
    } catch (error) {
        showErrorMessage(error.message);
    }
}

function createUser(email,password) {

    validateInput(email,password);
    
    saveUser(email,password);
}

function validateInput(email,password) {
    if(!isValidEmail(email) || !isValidPassword(password)){
        throw new Error('Invalid Input!');
    }
}

function isValidEmail(email){
 return email && email.includes('@')
}

function isValidPassword(password) {
    return password && password.trim().length > 0;
}

function showErrorMessage(message) {
    console.log(message);
}

function saveUser(email,password) {
    const user = {
        email,
        password
    };

    database.insert(user);
}