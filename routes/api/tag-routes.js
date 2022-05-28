const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const allTag = await Tag.findAll({
      include: [{model: Product}],
      // include: [{model: ProductTag}]
    });
    if (allTag.length>0) 
    {
      res.status(200).json(allTag);}
    else
    {
      res.status(404).json("No tag found.");}
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try{
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
      //include: [{model: Tag}]
    });
    if (singleTag) 
    {
      res.status(200).json(singleTag);}
    else
    {
      res.status(404).json("Tag not found");}
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
    }
    catch(err){
      res.status(400).send("Tag cannot be added. Please check the details and try again.");
    }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    // Check if record exists in db
     const tag= await Tag.findByPk(req.params.id)
      if (tag) {    
            await Tag.update(req.body, {
              where: { id: req.params.id }
            });
            res.status(200).json({message:"Tag updated."});
      }
      else
      {
        res.status(400).json({message:"no tag matched for updating."});
      }
        
    }
    catch(err){
      res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id }
    });
      if (!deleteTag) {
        res.status(404).json({ message: 'No Tag found with that id!' });
        return;
      }
  
      res.status(200).json({message : "Tag deleted."});
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
