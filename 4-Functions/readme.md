# Functions and Methods

To write clean functions:

**Be Concise - In Every of these Aspects:**

- Parameters
- Function length
- Function abstraction levels
- Splitting Functions

## What makes up a function ?

Calling the function should be readable.

The number and order of arguments matter.

```
add(a,b)
```

Working inside the function body should be easy/readable

The length of the function body matters

```
function add(n1,n2){
    return n1 + n2;
}
```

## Calling a Function

To make the calling of a function cleaner there is just one simple rule.

Rule: **Minimize the number of parameters.**

The more parameters a function uses, the harder is to read it.

Memorizing the "order" of the arguments is always painful and uncomfortable.

| Number of Arguments | Example           | Is it good ?                                                               |
| ------------------- | ----------------- | -------------------------------------------------------------------------- |
| 0                   | user.save()       | Best possible solution, easy to understand.                                |
| 1                   | log('message')    | Very good option, easy to understand                                       |
| 2                   | Point(10,20)      | Decent to understand, use it with caution                                  |
| 3                   | calc(5,10,'add')  | Avoid if possible, hard to understand and know the correct argument order. |
| 4                   | coords(10,3,9,12) | Always avoid, difficult to read and understand                             |

Example:

```
function saveUser(email,password){
    const user = {
        id: Math.random.toString(),
        email,
        password
    }

    db.insert('users',user);
}

```

When calling this function, we must do something like this:

```
saveUser('test@test.com','Test123!');
```

We always need to keep in mind which argument goes first, the email?, the password?, is not too bad, but can be improved. And what happens if in the future we increase the number of user fields?

Better solution:

```
function saveUser(user){
    db.insert('users',user);
}

const user = {
    ...
}

saveUser(user);
```

- We out source the responsibility of creating the user data. It is easier to call and we can increase the number of user fields.

An even better solution:

```
class User{
    constructor User(name,email){
        this.name = name;
        this.email = email;
    }

    save(){
        db.insert('users',this);
    }
}

user.save();

```

In some applications the order is not a problem, it is common sense:

```
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
```

## Splitting Functions:

Bad:

```
function log(message, isError){
    if(isError){
        console.error(message);
    }else{
        console.log(message);
    }
}
```

Good:

```
function log(message){
    console.log(message);
}

function logError(message){
    console.error(message);
}
```

## Dealing with too Many Arguments

Too complex function with many arguments:

```
class User{
    constructor User(name,lastName, age,email){
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
    }
}

const user = new User('Max','Gomez',31, 'test@test.com');
```

Better solution:

```
class User{
    constructor User(userData){
        this.name = userData.name;
        this.lastName = userData.lastName;
        this.age = userData.age;
        this.email = userData.email;
    }
}

const user = new User({name:'Max',email:'test@test.com',age:31, lastName:'Gomez'});
```

Our code now is more readable, we don't need to care about the order of the arguments and get confused. **It reduces cognitive load**.

### Function with dynamic number of functions

This an **exception** to the rule of too many parameters:

```
function sumUp(...numbers){
    let sum = 0;
    for(const number of numbers){
        sum += number;
    }
    return sum;
}

const total = sumUp(10,19,-3,22,5);
```

This code is totally fine, the name of the function makes sense and justify a large number of arguments. **Clean code is not about hard rules, sometimes we can write cleaner code making exceptions if it makes sense.**.

## Avoid Output Parameters

Try to avoid output arguments - specially if they are unexpected

Example: a function that mutates, modifies the parameter.

```
function createId(user){
    user.id = 'u1';
}

createId(user)
```

If the createId function modifies the user object by adding the id, this is not great, data gets modified in an unexpected way. This an output argument.

Try to avoid this function, but if you need to do it, name it in a proper way:

```
function addId(user){
    user.id = 'u1';
}

addId(user)
```

This is better, the function name implies it.

# Function Body

Main Rule : **Function should be small**.

The larger the function, the more complicated to read and maintain.

Usually this is breaking Single Responsibility Principle.

Always try to split your code in small, concise function with a well defined responsibility.

Rule: **Functions should do just one thing.**

What is "one thing?", well it is very generic, but usually it is obvious when we are doing more than one thing.

"One thing"

- Operations. eg (validations, arithmetic, render something, save something)
- Levels of Abstraction. eg(storing in database, validate request, UI tasks, etc)

You should think about the **Level of Abstraction** of a function and the operation it should perform, to decide what should be it's single responsibility and do only "one thing".

## Levels of Abstraction

Low Level: concrete implementation of a high level layer of abstraction. Operations related with basic programming language capabilities. Examples: arithmetic operations, string operations.

```
email.includes('@');  // includes is a method that can be implemented in any string, not only emails.

// it is harder for the reader to know the exact purpose of the code, specially if the function is large.
```

High Level: when we call a method that is hiding the concrete implementation. Using 3rd party libraries or complex services that are hiding the implementation.

```
isEmail(email) // it is easy to read, it is using .includes() function but specifies is exact responsibility.
```

Important Rule: **Functions should do work that's only one level of abstraction below their name.**

This means that a function **should not do two or more lower level operations behind its name.**

- Correct:

```
function isValidEmail(email){
    return email.includes('@'); // this operation is just 1 level below the implied name, so it is Correct.
}
```

- Bad:

```
function saveUser(email){

    if(email.includes(@)){  // validating the email here is too low level for the implied name, so it is incorrect.
        user.save()
        // ...
    }
}
```

The name "saveUser" of the function doesn't implied anything about the low level code doing the email validation. It is harder to read.

The function "saveUser" should only orchestrate the necessary steps to save the user.

Rule: **Try not to mix level of abstractions in the same function.**

- Bad:

```
function saveUser(email){
    if(!email.includes(@)){
        console.log("Invalid email!");
    }else{
        const user = new User(email);
        user.save();
    }
}
```

In the above code we are mixing levels of abstraction `!email.includes(@)` is too low level and `user.save()` is too high level in comparison.

- Corrected version:

```
function saveUser(email){
    if(!isEmail(email)){
        showError('Invalid email!');
    }else{
        saveNewUser(email);
    }
}
```

Now, all the functions are in the same level of abstraction (all of them are high level).

If you add low level code, then you need to read and **interpret** the different steps. Which makes code harder to read and increase cognitive load.

Instead, if you have just high level code in the correct place, your code is easier to read like a clear and understandable book. You just need to "read the steps of the recipe".

Figuring out the correct levels of abstraction comes with **experience**.

## Keep Functions Short

**You should think about splitting a function in multiple pieces if you find code that works on the same functionality.**

**Extract code that requires more interpretation that the surrounding code.**

Requires more interpretation:

```
if(!email.includes('@)){
    saveNewUser(email)
}
```

Clear code:

```
if(isValid(email)){
    saveNewUser(email)
}
```

## Stay Dry - Don't Repeat Your Self

Rule: **Reusability matters**.

Simply try to don't write the same code more than once.

If you repeat your self, if you want to change that code you'll need to change things in every place.

Signs of code which is not DRY:

- You find yourself copy & pasting code
- You find that when applying a change, you need to do it in multiple places.

## Don't Over Do - Avoid Useless Extractions

You always should use your **common sense** and think if splitting a function makes sense.

If you split a lot your code, you could start being too granular.

Don't split if:

- You are just renaming the operation.
- Finding the new function will take longer than reading the extracted code.
- Can't produce a reasonable name for the extracted function.

# Understanding & Avoiding Unexpected Side Effects.

## Try Keeping Functions Pure

A pure function is a function that for the same input, it generates the same output.

```
// A pure function is 100% predictable

function generateId(userName){
    const id = 'id_' + userName;
    return id;
}
```

Impure functions are not bad, but they are less predicable. You should only go for impure functions if it is the only way.

```
// Not a pure function, it is unpredictable

function generateId(userName){
    const id = userName + Math.random().toString();
    return id;
}
```

**Pure functions should not have side effects**. Specially if you are following a functional programming approach.

What is a side effect ?

A side effect is an operation which does not just act on a function inputs and change the function output, but which instead **changes the overall system/program state.**

```
function createUser(email,password){
    const user = new User(email,password);

    startSession(user); // probably changes the overall state of our application
    // you don't expect that while calling a 'createUser' function

    return user;
}
```

Side effects are not automatically bad. But **unexpected** side effects should be avoided.

The **name** of a function should **signal** or **imply** that a side effect is likely to occur.

# Unit Testing Helps !

You should be testing your code.

Unit testing helps you to write not just error-free code, but also **clean code**.

The main idea is:

**Can you easily test a function?**

If the answer is Yes -> Then probably have clean code, you are avoiding big functions with side effects.

If no -> You must consider splitting your function in smaller pieces that are easier to test.

When writing unit test you'll find out what should be split and extracted, since you'll want to write as much test as possible in an easier way.
