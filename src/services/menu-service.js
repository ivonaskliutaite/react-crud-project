const serverAddress = 'http://localhost:3000';

const formatRecipe = ({
  id,
  title,
  ingridients,
  img,
  categoryId,
  category,
}) => ({
  id,
  title,
  ingridients,
  img,
  categoryId,
  category: category.title,
});

const fetchAll = async () => {
  const response = await fetch(`${serverAddress}/menu?_expand=category`);
  const menu = await response.json();

  return menu.map(formatRecipe);
};

const create = async (menuProps) => {
  const response = await fetch(`${serverAddress}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuProps),
  });

  const recipe = await response.json();

  return recipe;
};

const update = async (id, menuProps) => {
  const response = await fetch(`${serverAddress}/menu/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuProps),
  });

  const recipe = await response.json();

  return recipe;
};

const remove = async (id) => {
  await fetch(`${serverAddress}/menu/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const fetchCategories = async () => {
  const response = await fetch(`${serverAddress}/categories`);
  const categories = await response.json();

  return categories;
};

const MenuService = {
  fetchAll,
  create,
  update,
  remove,
  fetchCategories,
};

export default MenuService;
