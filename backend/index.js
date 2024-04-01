import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
   host:"localhost",
   user: "root",
   password: "rootuser",
   database: "test"
})

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootuser';
//middleware
app.use(express.json())
app.use(cors())
app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Gets values from array
// app.post("/books", (req,res)=>{
//     const q = "INSERT INTO books (title,description,cover) VALUES (?)"
//     const values = ["title from back", "desc from back", "cover from back"]
//     db.query(q, [values], (err,data)=>{
//         if(err) return res.json(err)
//         return res.json("Book has been created successfully")
//     })
// })


app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (title,description,price,cover) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price, 
        req.body.cover,
    ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created successfully")
    });
});

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully")
    });
});

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.description,
        req.body.price, 
        req.body.cover,
    ];

    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been updated successfully")
    });
});


app.get("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id = ?"

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.listen(8800, ()=>{
    console.log("Connected to backend, really good")
})