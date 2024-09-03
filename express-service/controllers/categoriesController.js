const { getCategories, updateCategory, createNewCategory, deleteCategory, getOneCategory } = require("../services/categoryService");

async function categoriesListAll(req, res) {
  const categories = await getCategories();
  res.json(categories)
};

async function categoriesListOne(req, res) {
  const { id } = await req.params;
  const one = await getOneCategory(id)
  if (!one) {
    res.status(404).json({ message: "NOT FOUND" })
    return;
  }
  res.json(one);
};

async function categoriesUpdate(req, res) {
  const { id } = req.params;
  const input = req.body;
  await updateCategory(id, input);
  res.sendStatus(204);
};

async function categoriesCreate(req, res) {
  const { name } = req.body;
  const categories = await getCategories();
  const id = await createNewCategory({ name });
  res.status(201).json({ id });
};

async function categoriesDelete(req, res) {
  const { id } = req.params;
  await deleteCategory(id);
  res.sendStatus(204);
}

module.exports = {
  categoriesListAll,
  categoriesListOne,
  categoriesUpdate,
  categoriesCreate,
  categoriesDelete
};