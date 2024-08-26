const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const content = fs.readFileSync("data/categories.json", "utf-8");

 function getCategories () {
    const content = fs.readFileSync("data/categories.json", "utf-8");
    const categories = JSON.parse(content);   
    return categories;
};

let categories = getCategories();

async function getOneCategory(id) {

  const category = categories.find(cat.id === id);
};

async function updateCategory({id, name}) {

  const index = categories.findIndex((cat) => cat.id === id); 
  categories[index].name = name; 
  fs.writeFileSync("data/categories.json", JSON.stringify(categories));
};

async function deleteCategory(id) {

  categories = categories.filter((cat) => cat.id !== id);
  fs.writeFileSync("data/categories.json", JSON.stringify(categories));
};

async function createNewCategory (form) {
  const id = uuidv4();
  form.id = id;

  categories.push(form); 
  fs.writeFileSync("data/categories.json", JSON.stringify(categories));
  return id; 
};

module.exports = {
    createNewCategory,
    getCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
}