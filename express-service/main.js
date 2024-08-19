const express = require ('express')
const cors = require('cors') 
const fs = require(`fs`)
const app = express()
const port = 4000

app.use(cors());
app.use(express.json());

const content = fs.readFileSync("categories.json", "utf-8" );
console.log ({ content })

let categories = JSON.parse(content);


//list
app.get ("/categories", (req,res)=> {
    res.json(categories);
});

app.get ("/categories/:id", (req,res)=> {
  const { id } = req.params;
  const category = categories.find(cat.id === id);
  res.json(categories);
});

// update
app.put ("/categories/:id", (req,res)=> {
  const { id } = req.params; 
  const { name } = req.body;
  const index = categories.findIndex((cat) => cat.id === id); 
  categories[index].name = name; 
  fs.writeFileSync("categories.json", JSON.stringify(categories));
  res.json(["Updated"]);
});

//create
app.post ("/categories", (req,res)=> {
    const { name } = req.body; 
        categories.push({
          id: new Date().toISOString(),
          name: name,
        });

    fs.writeFileSync("categories.json", JSON.stringify(categories));
    res.json(["Success"]);
});

//delete
app.delete("/categories/:id", (req, res) => {
    const { id } = req.body;
    categories = categories.filter((cat) => cat.id !== id);
    fs.writeFileSync("categories.json", JSON.stringify(categories));
    res.json(["Deleted"]);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/articles', (req, res) => {
  res.json([
    { id: 1, title: "hello" },
    { id: 2,  title: "world" },
    ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});