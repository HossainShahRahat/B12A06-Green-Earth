1. What is the difference between var, let, and const?
	These are all ways to declare variables, but they have different rules about scope and reassigning values.
	var: The old way. It's function-scoped, meaning it's only confined to the function it was declared in. You can update and re-declare it, which can sometimes lead to bugs. It's generally best to avoid var.
	let: The new, preferred way for variables that will change. It's block-scoped ({}), meaning it's only available within the block it's defined in. You can update its value, but you can't re-declare it in the same scope.
	const: Used for variables that should not change. It's also block-scoped. You must assign it a value when you declare it, and you cannot reassign it later.

2. What is the difference between map(), forEach(), and filter()?
	All three are array methods that loop over an array, but they do different things.
	forEach(): Simply executes a function once for each element in an array. It doesn't return anything. Think of it as a basic loop for when you just want to do something with each item, like logging it.
	map(): Creates a new array by transforming every element in the original array. The new array will always have the same length as the original. It's perfect for when you want to change each item into something else.
	filter(): Creates a new array with only the elements that pass a test you provide. The new array can be shorter than the original. It's great for selecting a subset of data.

3. What are arrow functions in ES6?
	Arrow functions are a shorter way to write function expressions. The main difference is that they don't have their own this keyword; they inherit it from the parent scope. This behavior helps avoid common bugs 		related to this inside callbacks.

4. How does destructuring assignment work in ES6?
	Destructuring is a shortcut for unpacking values from objects or arrays into their own variables. It makes your code cleaner and easier to read by avoiding repetitive dot or bracket notation. For example, you can pull 	properties like firstName and lastName from a person object directly into variables with the same names.

5. Explain template literals in ES6.
	Template literals are an easier way to create strings, especially complex ones. You use backticks (`) instead of single or double quotes.
	They are better than traditional string concatenation (+) for two main reasons:
	Embedded Expressions: You can easily embed variables and expressions directly into the string using the ${...} syntax.
	Multi-line Strings: You can create multi-line strings without needing to use the newline character (\n).




## WELCOME TO ( সহজ সরল সিম্পল ) ASSIGNMENT-006

### 📅 Deadline For 60 marks: 9th September, 2025 (11:59 pm ⏱️)

### 📅 Deadline For 50 marks : 13th September , 2025 (6:00 pm⏱️)

### 📅 Deadline For 30 marks: Any time after 13the September , 2025 (6:01 pm⏱️).

---
🌴 API Endpoints
---
1. Get 🌴All Plants
```bash
https://openapi.programming-hero.com/api/plants
```

2. Get 🌴All categories <br/>
```bash
https://openapi.programming-hero.com/api/categories
```


3. Get 🌴plants by categories <br/>
```bash
https://openapi.programming-hero.com/api/category/${id}
```

```bash
https://openapi.programming-hero.com/api/category/1
```

4. Get 🌴Plants Detail <br/>

```bash
https://openapi.programming-hero.com/api/plant/${id}
```

```bash
https://openapi.programming-hero.com/api/plant/1
```
---




## ✅ Main Requirements 

#### 1) Navbar

- Website **logo/name** on the **left**  
- **Menu items** in the **center** 
- **Plant a Tree button** on the **right** 

#### 2) Banner 
- A **background image**  
- A **title** and **subtitle**  
- A **centered button**  

#### 3) About Campaign
- **Section heading**  
- **Image on the left**, **text on the right**  

#### 4) Our Impact Section 
- Show **3 cards** with campaign **statistics**  

#### 5) Plant a Tree Today Section & Footer
- **Form**: Name, Email, Number of Trees  
- **Footer** with copyright info 

#### 6) Responsiveness 
- Website must be **mobile responsive**  

---
#### 7) Create a README file to answer the following question-


#### 1) What is the difference between var, let, and const?

#### 2) What is the difference between map(), forEach(), and filter()? 

#### 3) What are arrow functions in ES6?

#### 4) How does destructuring assignment work in ES6?

#### 5) Explain template literals in ES6. How are they different from string concatenation?

## ⚙️ Functionalities 

1) Category Loading 
Load Tree Categories dynamically on the left side.

2) Category Click → Tree Data 
On clicking a category: load trees of that category.

Display in a 3-column card layout.

3) Card Contents 
 Each card includes:

        - Image

        -  Name

        - Short description

        - Category

        - Price

        - Add to Cart button

4) Modal on Card Click 
Clicking a tree name on a card opens a modal with full tree details.


##  🧪 Challenges 


    1) Add to Cart 
    Clicking Add to Cart: - Adds the tree to Cart List
                          - Shows tree name 

    2) Total Calculation 
    Calculate total price of trees in cart.

    3) Remove from Cart 
    Clicking ❌ removes tree and deducts price from total.

    4) Loading Spinner
    Show spinner while data is loading.

    5) Active Button State 
    Highlight active category button when selected.



🧰 Technology Stack:
        
        HTML

        CSS (Vanilla / Tailwind / DaisyUI)

        JavaScript (Vanilla only, no frameworks)

📌 Rules
✅ At least 5 meaningful commits

❌ No dummy text or Lorem Ipsum — must use relevant content





## 🔗 Submission
- **Live Link :** YOUR_DEPLOYED_URL_HERE  
- **GitHub Private Repository:** YOUR_REPO_URL_HERE  

---
