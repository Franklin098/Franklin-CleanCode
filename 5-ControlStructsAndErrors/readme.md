# Control Structures & Errors

Code Smart, Not Verbose.

Loops and if/else statements are important inside our code structure.

**Avoid multiple and complex nested loops and if/else structure**.

Clean code is also about refactoring, specially complex control structures.

## Keep Your Control Structures Clean

- Avoid Deep Nesting -> To avoid this **Use Factory Functions & Polymorphism.**

- Prefer Positive Checks instead of negative checks

- Utilize Errors that can help you to delete some if/else statements.

## Use Guards & Fail Fast

Without guards:

```
if(email.includes('@)){
    // ...
    // huge amount of code here
    // ..
}
```

Using Guards to avoid deeply nested structures:

```
if(!email.includes('@)){
    return;
}

// huge amount of code here

```

By inverting to use a negative check and using 'return' you create a **Guard** , you 'fail fast'. It allows you to avoid a level of nesting.

Another example without guards:

```
if(user.active){
    if(user.hasPurchases()){
        // finally do stuff
    }
}
```

With Guards:

```
if(!user.active){
    return
}
if(!user.hasPurchases()){
    return;
}

// finally do stuff
```

## Embrace Errors & Error Handling

**A common mistake made by developers is not throwing errors enough !**

Throwing and handling errors can replace if statements and lead to more focused functions.

Rule **If something is an error -> make it an error**. Don't try to solve it with an if statement.

Example without using errors:

```
if(!isEmail){
    return {code:422, message: 'Invalid input'};
}
```

Better solution using error throwing:

```
if(!isEmail){
    const error = new Error('Invalid input');
    error.code = 422;
    throw error;
}
```

Remember to then handle the errors !

**Error handling is one thing :** if you have a function with a try/catch blog you should be doing just that, just handling the error, nothing else. If you have more logic, you must out source that to a separate function.

## Using Factory Functions & Polymorphism

A factory is a function that is used to produce something.

```
function buildUser(name,age){
    return {
        name,
        age
    }
}
```

Polymorphism means that we can have an object or a function that we can always use in the same way, but what that method does in detail depends in other factors.
