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
        return = new InsuredDelivery();
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
const date this.customer.getLastPurchaseDate(); // correct

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
