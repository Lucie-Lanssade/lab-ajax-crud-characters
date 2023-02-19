/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 *
 *
 *
 *
 */
const myUrl = 'http://localhost:5005/api/characters/';
const template = document.getElementById('template');
const characterContainer = document.querySelector('.characters-container');

//2.1/Fetch all characters
const btnFetchAll = document.getElementById('fetch-all');

btnFetchAll.addEventListener('click', async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/characters');
    const allCharacters = response.data;
    characterContainer.innerHTML = '';

    allCharacters.forEach((character, index) => {
      const clone = template.content.cloneNode('true');
      clone.querySelector('.character-id span').textContent = index + 1;
      clone.querySelector('.name span').textContent = character.name;
      clone.querySelector('.occupation span').textContent =
        character.occupation;
      clone.querySelector('.cartoon span').textContent = character.cartoon;
      clone.querySelector('.weapon span').textContent = character.weapon;
      characterContainer.append(clone);
    });
  } catch (error) {
    next(error);
  }
});

//2.2/Fetch one character
//didn't know how to do it whithout creating a new route
//didn't understand how to display the character's number as shown in the lab's mockup (because this time we only retrieve one)
const btnFetchOne = document.getElementById('fetch-one');
const searchedCharacter = document.querySelector('.operation input');

btnFetchOne.addEventListener('click', async () => {
  let input = searchedCharacter.value;
  const { data } = await axios.get(
    `http://localhost:5005/api/characters/search/?search=${input}`
  );

  if (data) {
    characterContainer.innerHTML = '';
    const clone = template.content.cloneNode('true');
    clone.querySelector('.character-id span').textContent = 1;
    clone.querySelector('.name span').textContent = data.name;
    clone.querySelector('.occupation span').textContent = data.occupation;
    clone.querySelector('.cartoon span').textContent = data.cartoon;
    clone.querySelector('.weapon span').textContent = data.weapon;

    characterContainer.append(clone);
  }
  console.log(data);
});

//2.3 Delete one character

const btnDelete = document.getElementById('delete-one');

const characterToDelete = document.querySelector('.delete input');

btnDelete.addEventListener('click', async () => {
  let idInput = characterToDelete.value;
  try {
    const deleteCharacter = await axios.delete(myUrl + `${idInput}`);

    btnDelete.classList.add('active');
  } catch (error) {
    btnDelete.classList.add('wrong');
  }
});

//2.5 Edit a character
//tried to check for empty fields whithout putting "cartoon" but edition fails when I don't check the cartoon box

const editForm = document.getElementById('edit-character-form');
const editformContainer = document.querySelector('.character-info');

const idInputEdit = document.getElementById('idEdit');
const nameInputEdit = document.getElementById('nameEdit');
const occupationInputEdit = document.getElementById('occupationEdit');
const weaponInputEdit = document.getElementById('weaponEdit');
const cartoonInputEdit = document.getElementById('cartoonEdit');

const editBtn = document.getElementById('send-data-edit');

editForm.addEventListener('submit', async () => {
  event.preventDefault();

  const id = idInputEdit.value;
  const name = nameInputEdit.value;
  const occupation = occupationInputEdit.value;
  const weapon = weaponInputEdit.value;
  const cartoon = cartoonInputEdit.checked ? true : false;

  if (!id || !name || !occupation || !weapon) {
    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = 'Please fill all the fields';
    editForm.appendChild(errorMessage);
    editBtn.classList.add('wrong');
    return;
  }

  try {
    const characterToEdit = {
      id,
      name,
      occupation,
      cartoon,
      weapon,
    };

    const response = await axios.patch(myUrl + id, characterToEdit);
    console.log(response);

    editBtn.classList.add('active');
  } catch (error) {
    editBtn.classList.add('wrong');
  }
});

//2.4 Create a new character
//tried to check for empty fields whithout putting "cartoon" but creation fails when I don't check the cartoon box

const form = document.getElementById('new-character-form');
const createBtn = document.getElementById('send-data');
const formContainer = document.querySelector('.character-info');

const nameInput = document.getElementById('name');
const occupationInput = document.getElementById('occupation');
const weaponInput = document.getElementById('weapon');
const cartoonInput = document.getElementById('cartoon');

form.addEventListener('submit', async () => {
  event.preventDefault();
  const name = nameInput.value;
  const occupation = occupationInput.value;
  const weapon = weaponInput.value;
  const cartoon = cartoonInput.value;

  if (!name || !occupation || !weapon) {
    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = 'Please fill all the fields';
    form.appendChild(errorMessage);
    createBtn.classList.add('wrong');
    return;
  }

  try {
    const characterToCreate = {
      name: nameInput.value,
      occupation: occupationInput.value,
      weapon: weaponInput.value,
      cartoon: cartoonInput.checked ? true : false,
    };

    const response = await axios({
      method: 'post',
      url: myUrl,
      data: characterToCreate,
    });

    createBtn.classList.add('active');
  } catch (error) {
    createBtn.classList.add('wrong');
  }
});
