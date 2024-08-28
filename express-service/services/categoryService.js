const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { sql } = require('../configs/database');

const content = fs.readFileSync("data/categories.json", "utf-8");

 async function getCategories () {
    const list = await sql `select * from category`;
    return list;
};

let categories = getCategories();

async function getOneCategory(id) {
  const list = await sql `select * from category where id = ${id}`;
  if (list.length) {
    return list[0];
  }
  return null;
};

async function updateCategory(id, update) {
  await sql`update category set name = ${update.name} where id = ${id}`;
};

async function deleteCategory(id) {
  await sql `delete from category where id = ${id}`;
};

async function createNewCategory ({name}) {
  const id = uuidv4();
  await sql`insert into category(id, name) values (${id}, ${name})`;
  return id; 
};

module.exports = {
    createNewCategory,
    getCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
}