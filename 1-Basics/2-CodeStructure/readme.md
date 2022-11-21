# Code Structure, Comments & Formatting

# Comments

Comments are (mostly) bad, **ideally the code should be readable without any comments.**

- Avoid comments, with only very few exceptions

## Bad Comments

A lot of comments provide just **redundant information**.

### Redundant Comments:

If you use good names, then the code should be self explanatory, and adding any comments is redundant. The comments makes it even harder to understand the code because all this extra redundant information.

### Creating Sections with Comments:

Other times people use comments to create 'dividers' or sections of the code, if you want to do so, well probably it means that **your file is too large, and you must split the code in multiple files**.

### Misleading Comments

Sometimes people write comments with wrong or confusing information/

```
insertData(data:any){
    this.dbEngine.insert(data); // update a user
}
```

The comments says that it is updating a user, but is it true? the code actually is inserting a user, not updating it. In this case the comment provides misleading information.

### Commented-Out Code

People usually comment code that is not being used, if we are using any version control system like Git, we actually don't need to archive code in the form of comments, we can always restore the history of git, or create a separate branch with different code.

## Good Comments

### Legal Information

```
// (c) Franklin Velasquez / Virtual Tech
// Created in 2022
```

Depending of the kind of project, probably you'll required to add comments with your data in the comments, it doesn't hurt code readability

### Add Specific Extra Explanation or Warnings

This are comments that provides extra explanation that **cannot be delivered using better naming**.

Examples of good comments:

```
// accepts [text]@[text].[text]
const emailRegex = /\S+@\S+\.\S+/;


// only works in browser environment
localStorage.setItem('user','test@test.com');
```

### Todo Notes

```
findOne(id:string){
    //TODO: needs to be implemented
}
```

But be careful, **do not abuse of adding a lot of TODO notes.**

### Documentation

This are special kind of comments with an specific and special format depending on each programming language, that allows you to provide readable quick notes and documentation to the users.

This kind of comments are specially use in libraries that pretend to be used by a lot of users, usually build-in libraries for each programming language.

Python documentation comment example:

```
"""Return an item

Optional params: a,b,c
"""
```
