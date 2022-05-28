const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const allCategories = await Category.findAll({
      include: [{model: Product}]
    });
    if (allCategories.length>0) 
    {
      res.status(200).json(allCategories);}
    else
    {
      res.status(404).json("not found");}
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (singleCategory)
      {res.status(200).json(singleCategory);}
    else{
      res.status(200).json("No Record found");
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
  }
  catch(err){
    res.status(400).json("Category cannot be added. Please check the details and try again.");
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
  // Check if record exists in db
   const category= await Category.findByPk(req.params.id)
    if (category) {    
          await Category.update(req.body, {
            where: { id: req.params.id }
          });
          res.status(200).json({message:"Category updated."});
    }
    else
    {
      res.status(400).json({message:"no category matched for updating."});
    }
      
  }
  catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
  const deleteCategory = await Category.destroy({
    where: { id: req.params.id }
  });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json({message : "catergory deleted."});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
