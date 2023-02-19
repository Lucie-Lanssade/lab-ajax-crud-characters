const router = require('express').Router();
const Character = require('../models/Character.model');
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get('/', async (req, res, next) => {
  try {
    const allCharacters = await Character.find();
    res.status(200).json(allCharacters);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post('/', async (req, res, next) => {
  try {
    const characterToCreate = { ...req.body };
    if (
      !characterToCreate.name ||
      !characterToCreate.occupation ||
      !characterToCreate.weapon ||
      !characterToCreate.cartoon
    ) {
      return res.json({
        errorMessage: 'Please fill out all of the fields!',
      });
    }

    const createdCharacter = await Character.create(characterToCreate);
    res.status(201).json(createdCharacter);
  } catch (error) {
    next(error);
  }
});

//didn't know how to do the 2.2 iteration were the user can search a character by name and we should display the character so I created a new route
router.get('/search', async (req, res, next) => {
  console.log(req.query);
  const searchTerm = req.query.search;

  try {
    const character = await Character.findOne({ name: searchTerm });
    res.status(200).json(character);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should respond with one character
 */
router.get('/:id', async (req, res, next) => {
  try {
    const oneCharacter = await Character.findById(req.params.id);

    res.status(200).json(oneCharacter);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const characterToUpdate = req.body;
  try {
    if (!characterToUpdate) {
      res.json({
        errorMessage: 'Character not found',
      });
    }

    const updatedCharacter = await Character.findByIdAndUpdate(
      id,
      characterToUpdate,
      { new: true }
    );
    res.status(200).json(updatedCharacter);
  } catch (error) {
    next(error);
  }
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    await Character.findByIdAndDelete(id);
    res.json({ message: `D ${req.params.id} was successfully deleted` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
