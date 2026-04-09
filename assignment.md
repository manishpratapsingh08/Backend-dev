# Mongoose Assignment Answers

---

## 1. Advantages of using Mongoose over the native MongoDB driver

Mongoose provides several advantages:

- Uses schema-based structure to define data models.
- Provides built-in validation (required, min, max).
- Supports middleware (hooks) for pre/post operations.
- Makes handling relationships easier using population.
- Reduces boilerplate code.
- Provides easy-to-use CRUD methods.

---

## 2. Difference between findOneAndUpdate() and updateOne()

### findOneAndUpdate()

- Finds and updates a document.
- Returns the updated document (if `{ new: true }` is used).
- Used when updated data is required.

### updateOne()

- Updates a single document.
- Returns only update status (not the document).
- Faster and lightweight.

---

### Example

js
// findOneAndUpdate
User.findOneAndUpdate(
  { name: "Tushar" },
  { age: 20 },
  { new: true }
);

// updateOne
User.updateOne(
  { name: "Tushar" },
  { age: 20 }
);```



## 3. Purpose of Middleware in Mongoose.

Middleware in Mongoose (also known as hooks) are functions that are executed before or after certain database operations.

### Types of Middleware

- Pre Middleware: Executes before an operation is performed.
- Post Middleware: Executes after an operation is completed.

### Purpose / Uses

- To validate data before saving to the database.
- To hash passwords before storing them.
- To log operations for debugging or tracking.
- To perform actions like updating timestamps automatically.

### Example


schema.pre("save", function(next) {
  console.log("Before saving document");
  next();
});

---


## 4. Implement Pagination in mongoose

--Pagination is used to fetch data in parts.

Methods Used
limit() → limits number of records
skip() → skips records
Formula

skip = (page - 1) * limit

#Example:
const page = 2;
const limit = 5;

const users = await User.find()
  .skip((page - 1) * limit)
  .limit(limit);

-----

### 5. Embedding vs Referencing in MongoDB schema design

#Embedding

-Stores related data in the same document.
-Faster read performance.
-Best for small, related data.
 ##Example:
 {
  name: "Tushar",
  address: {
    city: "Delhi",
    pin: 110096
  }
}

## -Referencing.

-Stores data in separate collections.
-Uses ObjectId references.
-Suitable for large or reusable data.
#Example:-
{
  name: "Tushar",
  addressId: ObjectId("123abc")
}

---when to use--
-Use Embedding → small + frequently used together.
-Use Referencing → large + reusable + complex relationships.

