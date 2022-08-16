import * as React from 'react';

import { Box, Grid, Modal } from '@mui/material';
import { red, green } from '@mui/material/colors';
import MenuService from './services/menu-service';
import { AddNewRecipe, RecipeCard, RecipeForm } from './components';

const App = () => {
  const [menu, setRecipe] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [recipeEdit, setRecipeEdit] = React.useState(null);

  const closeModal = () => {
    setModalOpen(false);
    setRecipeEdit(null);
  };

  const fetchMenu = async () => {
    const fetchedRecipes = await MenuService.fetchAll();
    setRecipe(fetchedRecipes);
  };

  const createRecipe = async (recipeProps) => {
    await MenuService.create(recipeProps);
    await fetchMenu();
    closeModal();
  };

  const editRecipe = (id) => {
    const findRecipe = menu.find((recipe) => recipe.id === id);
    setRecipeEdit(findRecipe);
    setModalOpen(true);
  };

  const updateRecipe = async (recipeProps) => {
    await MenuService.update(recipeEdit.id, recipeProps);
    await fetchMenu();
    closeModal();
  };

  const removeRecipe = async (id) => {
    await MenuService.remove(id);
    fetchMenu();
  };

  React.useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <Box sx={{
      gap: { xs: 4, xxl: 0 },
      pt: 2,
      px: 2,
    }}
    >
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={{
          position: 'absolute',
          backgroundColor: green[100],
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        >
          <RecipeForm
            onSubmit={recipeEdit ? updateRecipe : createRecipe}
            formTitle={recipeEdit ? 'Pakoreguokite receptą' : 'Naujas receptas'}
            submitText={recipeEdit ? 'Atnaujinti' : 'Sukurti'}
            color={recipeEdit ? 'warning' : 'success'}
            initValues={recipeEdit}
            backgroundColor={red}
          />
        </Box>
      </Modal>

      <Grid
        container
        spacing={6}
        sx={{
          paddingLeft: '12%',
        }}
      >
        {menu.map(({
          id,
          title,
          ingridients,
          category,
          img,
        }) => (
          <Grid key={id} item xs={6} md={5} xl={5}>
            <RecipeCard
              title={title}
              ingridients={ingridients}
              img={img}
              category={category}
              onDelete={() => removeRecipe(id)}
              onEdit={() => editRecipe(id)}
            />
          </Grid>
        ))}
        <AddNewRecipe borderRadius="50%" openModal={() => setModalOpen(true)} />
      </Grid>
    </Box>
  );
};

export default App;
