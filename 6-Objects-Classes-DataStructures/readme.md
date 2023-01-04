# Objects, Classes, Data Containers/Structures

We can difference between (Objects & Classes) vs (Data Structures/Containers)

## Real Objects

**Private** internal/properties

**Public** API (methods).

They contain your business logic.

We prefer abstractions over concretions.

```
class Database{
    private uri:string;
    private provider: any;
    private connection: any;

    constructor(){
        // logic
    }

    connect(){
        // logic
    }

    disconnect(){
        // logic
    }
}
```

## Data Structures

Simple objects

**Public** internals/properties

Almost no API (methods).

They are just used to store and transport data.

They are almost just concretions.

```
class UserCredentials{
    public email: string;
    public password: string;
}
```

## Why the Difference Matters ?

You could write dirty code if you mix these two concepts.

In order to write clean code, make the difference and create classes with well defined responsibilities.

Do not mix objects and data structures features.

Example of dirty code: making **public** the internals/properties of an object class.

# Classes & Polymorphism

Polymorphism : The ability of an object to take on many forms.

And object or a function that has the same name as others, but behaves in a different way, based on how it was build.

```
interface Delivery{
    void deliverProduct();
    void trackProduct();
}

class ExpressDelivery implements Delivery{
    deliverProduct(){
        // specific implementation
    }
    trackProduct(){
        // specific implementation
    }
}

class InsuredDelivery implements Delivery{
    deliverProduct(){
        // specific implementation
    }
    trackProduct(){
        // specific implementation
    }
}

function deliveryFactory(purchase){
    if(purchase.deliveryType == 'express'){
        return new ExpressDelivery();
    } else if(purchase.deliveryType == 'insured'){
        return new InsuredDelivery();
    }
}

let delivery: Delivery = deliveryFactory(purchase);

delivery.trackProduct();
```

# Classes Should be Small

Rule: **You should prefer many small classes over a few large classes**;

Your classes should be focus on just **one single responsibility**

With functions we have the concept of just doing 'one thing', in classes we have the concept that a class should have 'a single responsibility'.

Avoid classes with a lots of many different functions, take very carefully when it is necessary to split. Remember, multiple small classes are better than a few large classes.

Bad Code (a class with a lots of responsibilities):

```
class OnlineShop{
    public addProduct(){
        //...
    }

    public createCustomer(){
        //...
    }

    public refund(){
        //...
    }

    public updateProfile(){
        //...
    }

    public loginCustomer(){
        //...
    }
}
```

Improved code (split responsibilities):

```
class Product{
    public create(){
        //...
    }
}

class Customer{
    public create(){
        //...
    }

    public update(){
        //...
    }

    public login(){
        //...
    }
}
class Order{
    public refund(){
        //...
    }
}
```

# Understanding Cohesion

Cohesion: **How much your class methods are using the class properties?**.

- Maximum Cohesion: **All methods** are using **all properties**. Then we say we have a highly cohesive object.

- No Cohesion: Of all methods in our class, **no method** is using **any class property.** For example, all the properties are 'public' and are used outside the class but not inside the class.

Data structures or utility classes have low cohesion.

Rule: **Our goal is to have highly cohesive classes.**

Of course having maximum cohesion is almost impossible and unnecessary in practice, but we want our classes to really use their properties a lot in their methods.

In a class every method should use many of the properties of the class.

If we have a class were every method is using just one property, that is a case of low cohesion.

We should **split classes with low cohesion.** When you start splitting classes, you will find that in the smaller classes **cohesion grows.**

# The Law of Demeter

You should always **tell**, don't **ask**.

**Principle of Least Knowledge:** Don't depend of the internals of "strangers" (other objects you don't directly know).

Example of bad code:

```
this.customer.lastPurchase.data
```

Accessing a lot of nested attributes violates the principle of last knowledge.

When something changes inside 'lastPurchase' or 'data' you'll need to change a lot of things.

This kind of statements are also harder to read.

The Law of Demeter tell us that **code in a method may only access direct internals (properties and methods) of:**

- the object **it belongs to.**
- objects that are **stored in the properties of that object.**
- objects which are **received as method parameters.**
- objects which are **created in the method.**

The law of Demeter help us to always respect the principle of least knowledge, and avoid accessing a lot of nested attributes.

Examples:

```
const date = this.customer.lastPurchase.date; // incorrect
const purchase = this.customer.lastPurchase; // correct

// to get the 'date' property without breaking law of demeter we could add a new method in the class containing date
const date = this.customer.getLastPurchaseDate(); // correct

this.warehouse.deliverPurchaseByDate(this.customer, date); // correct


// an even better solution is to -Tell- don't -Ask-
// we can update the warehouse class to outsource the responsibility of getting the date.

this.warehouse.deliverPurchase(this.customer.lastPurchase); // inside warehouse class extract the date.

class Warehouse{
    deliverPurchase(purchase){
        const date = purchase.date;
        // ...
    }
}

```

In the last example we really don't need to get the 'date' value in that place, so we change the place where we extract it, that is **cleaner code**. You are placing the responsibility in the right place.

Always consider that: "It is really necessary to extract the data here?, or we should tell another place to do it?"

# The SOLID Principles

## Single Responsibility Principle - SRP

- Classes should have a **single responsibility** - a class shouldn't **change for more than one reason.**

"What is a single responsibility?"

Normally it is related to business areas.

If a class is doing performing a lot of different business task, then it is breaking the single responsibility principle.

**Even if a class is small we can still break the SRP**.

Example of violating SPR:

```
class ReportDocument{
    generateReport(data){
        // ...
    }

    createPDF(report){
        // ...
    }
}
```

It is violating SRP because "generating a report" based on the data is a different task, a totally different area of our organization than "creating a PDF".

In this case "generating a report" is about analyzing some data, maybe calculate some statistics.

While "creating a PDF" is more about layout, how is going to look when printed.

Example of not violating SPR:

```
class User{
    login(email, password){

    }

    signUp(email, password){

    }

    assignRole(role){

    }
}
```

But this still debatable, maybe we can discuss that authentication is a different task. It depends of the business logic.

**You should always keep your classes small and focus.**

SRP leads to smaller classes.

## The Open Close Principle - OCP

- A class should be **open for extension** but **close for modification.**

Violating the OCP:

```
class Printer {

    printPDF(data){
        verifyData(data);
        // ..
    }

    printWebDoc(data){
        verifyData(data);
        //...
    }

    printImage(data){
         verifyData(data);
        //...
    }

    verifyData(data){
        //...
    }
}
```

Why is this violating OCP?

What happens if we want to **add** more functionalities ? like adding printExcel() or printWord() features ? Then we'll need to **modify** the existing class in order to add this new methods. The class **is not closed for modification.**

If we want to **extend** the class (inheritance), then it is also hard to make the business logic clear.

Improved example using OCP:

```
interface Printer{
    print(data);
}

class PrinterImplementation{
    verifyData(data){
        // ...
    }
}

class PDFPrinter extends PrinterImplementation implements Printer{
    print(data){
        verifyData(data);
        //...
    }
}

class WebPrinter extends PrinterImplementation implements Printer{
    print(data){
        verifyData(data);
        //...
    }
}

class ImagePrinter extends PrinterImplementation implements Printer{
    print(data){
        verifyData(data);
        //...
    }
}

class ExcelPrinter extends PrinterImplementation implements Printer{
    print(data){
        verifyData(data);
        //...
    }
}
```

Now our classes are **open for extension**, and if we need to add a new printer, we don't need to modify existing classes adding more methods, so they are **close for modification.**

> The extensibility of classes lead to small classes, since we don't need to continue adding more and more methods to an existing class. It also help us with code duplication, so we stay DRY. All of this leads to Clean Code.

## Liskov Substitution Principle - LSP

Objects should be **replaceable** with **instances of their subclasses without altering the behavior.**

Example of LSP:

```
class Bird{
    fly(){
        console.log("Flying..");
    }
}

class Eagle extends Bird{
    dive(){
        console.log("Diving..");
    }
}

// Example of successfully using LSP:
const bird: Bird = new Eagle();
bird.fly();

// Breaking LSP:
class Penguin extends Bird{
    // penguins can't fly
    fly(){
        throw new Error("Penguins can't fly");
    }
}

const bird: Bird = new Penguin();
bird.fly(); // it breaks

```

A Penguin is a bird, but it can't fly. So we can't replace a bird object with an instance of its subclass (penguin).

Solving problem to accomplish LSP:

```
class Bird{
    // ...
}

class FlyingBird{
    fly(){

    }
}

class Eagle extends FlyingBird{
    dive(){
        console.log("Diving..");
    }
}

class Penguin extends Bird{
    // penguins can't fly, but there is not problem since Bird() doesn't have th fly() method anymore
}

const bird: Bird = new Penguin();
bird.fooBar(); // correct
```

Now we can substitute any bird object with its Penguin subclass without braking anything.

**LSP help us to model data correctly.**

## Interface Segregation Principle - ISP

- **Many client-specific interfaces** are **better** than one general purpose interface.

What this is telling us is that interfaces should be small and have a single responsibility, be very specific. Actually it is a good idea to implement **multiple** interfaces in a class, rather than having just one big interface.

Example breaking ISP:

```
interface Database{
    connect();
    storeData();
}

class SQLDataBase implements Database{
    connect(){
        //...
    }
    storeData(){
        //..
    }
}

class InMemoryDatabase implements Database{
    // an in-memory database doesn't need a connect() method since it uses local memory.
    connect(){
        //...
    }
    storeData(){
        //..
    }
}
```

Fixing problem using ISP:

```
interface Database{
    storeData();
}

interface RemoteDatabase{
    connect();
}

// Interface Segregation Principle: it is good to implement multiple small interfaces.
class SQLDataBase implements Database, RemoteDatabase{
    connect(){
        //...
    }
    storeData(){
        //..
    }
}

class InMemoryDatabase implements Database{
    storeData(){
        //..
    }
}
```

## Dependency Inversion Principle - DIP

You should **depend upon abstractions, not concretions.**

What it means, is that you should use Liskov Substitution Principle when you have a class dependency.

Example NOT using DIP:

```
interface Database{
    storeData();
}

interface RemoteDatabase{
    connect();
}

class SQLDataBase implements Database, RemoteDatabase{
    connect(){
        //...
    }
    storeData(){
        //..
    }
}

class InMemoryDatabase implements Database{
    storeData(){
        //..
    }
}

// NOT using DIP:

class App{
    private database: SQLDatabase | InMemoryDatabase;

    constructor(database: SQLDatabase | InMemoryDatabase){
        this.database = database;
        if(database instanceof SQLDatabase){
            this.database.connect('my-url');
        }
    }

    saveData(){
        this.database.storeData('some data');
    }
}
```

In the above example, the variable 'database' is a dependency of our App Class. SQLDatabase and InMemoryDatabase are **concretions** not **abstractions**, that's why we are violating Dependency Inversion Principle.

Code like this is hard to maintain, if we have more types of Databases, we would add more and more if statements.

Fixing using Dependency Inversion Principle:

```
class App{
    // rely on abstractions not concretions.
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    saveData(){
        this.database.storeData('some data');
    }
}

const sqlDatabase: Database = new SQLDatabase();
sqlDatabase.connect("my-url");

const app = new App(sqlDatabase);
```

In our fix, first we change the type of our dependency to an interface type (an abstraction) -> 'Database', not a concretion.

Then, we don't care about the 'connect' method inside, since we just accept a general Database type, that is why it is called "Dependency Inversion", **we are inverting the responsibility of connecting**, since "connect" is a very specific method of a concretion. We invert the dependency.
