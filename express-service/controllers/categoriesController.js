const { getCategories, updateCategory, createNewCategory, deleteCategory } = require("../services/categoryService");

function categoriesListAll (req,res) {
    const categories = getCategories();  
    res.json(categories)
  };

function categoriesListOne (req,res) {
    const { id } = req.params;
    const one = getOneCategory(id)
    res.json(one);
  };
  
function categoriesUpdate (req,res) {
    const { id } = req.params; 
    const { name } = req.body;
    updateCategory ({id, name}); 
    res.sendStatus(204);
};

function categoriesCreate (req,res) {
    const { name } = req.body;
    const categories = getCategories();
    const id = createNewCategory({name});
    res.status(201).json ({ id });
};
function categoriesDelete (req, res) {
    const { id } = req.params;
    const categories = getCategories();
    const deleteIndex = categories.findIndex ((cat) => cat.id === id);
    if (deleteIndex < 0 ) {
      res.sendStatus(404);
      return;
    }
    deleteCategory(id);
    res.sendStatus(204);
}

module.exports={
    categoriesListAll,
    categoriesListOne,
    categoriesUpdate,
    categoriesCreate,
    categoriesDelete
};