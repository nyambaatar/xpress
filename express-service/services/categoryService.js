const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { sql } = require('../configs/database');
const Content = fs.readFileSync("data/categories.json", "utf-8");
async function getCategories() {
  const list = await sql`select * from category`;
  return list;
};

let categories = getCategories();

async function getOneCategory(id) {
  const list = await sql`select * from category where id = ${id}`;
  if (list.length) {
    return list[0];
  }
  return null;
};

async function updateCategory(id, {name, color, icon}) {
  await sql`update category set name = ${name}, color=${color}, icon=${icon} where id = ${id}`;
};

async function deleteCategory(id) {
  await sql`delete from category where id = ${id}`;
};

async function createNewCategory({ name, icon, color}) {
  const id = uuidv4();
  await sql`insert into category(id, name, icon, color) values (${id}, ${name}, ${icon}, ${color})`;
  return id;
};

module.exports = {
  createNewCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
}

