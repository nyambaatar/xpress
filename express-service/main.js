const { startApp } = require ("./configs/basic");
const { categoriesListAll, categoriesListOne, categoriesUpdate, categoriesCreate, categoriesDelete } = require('./controllers/categoriesController');
const app = startApp(); 
app.get ("/categories", categoriesListAll);
app.get ("/categories/:id", categoriesListOne);
app.put ("/categories/:id", categoriesUpdate);
app.post ("/categories", categoriesCreate);
app.delete("/categories/:id", categoriesDelete);