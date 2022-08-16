import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
  styled,
} from '@mui/material';
import MenuService from '../services/menu-service';

const StyledButton = styled(Button)`
  background-color: #000;
  border-radius: 30%;
`;

const RecipeForm = ({
  onSubmit,
  formTitle,
  submitText,
  initValues,
}) => {
  const [categories, setCategories] = React.useState([]);
  const [title, setTitle] = React.useState(initValues?.title ?? '');
  const [category, setCategory] = React.useState(initValues?.categoryId ?? '');
  const [img, setImg] = React.useState(initValues?.img ?? '');
  const [ingridients, setIngridients] = React.useState(initValues?.ingridients ?? '');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      categoryId: category,
      img,
      ingridients,
    });
  };

  React.useEffect(() => {
    (async () => {
      const fethedCategories = await MenuService.fetchCategories();
      setCategories(fethedCategories);
    })();
  }, []);

  return (
    <Paper component="form" sx={{ p: 5 }} onSubmit={handleSubmit}>
      <Typography variant="h2" sx={{ textAlign: 'center' }}>{formTitle}</Typography>
      <Box sx={{
        display: 'flex', flexDirection: 'column', gap: 3, width: '30vw',
      }}
      >
        <TextField
          label="Parašykite pavadinimą"
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <TextField
          label="Pasirinkite kategoriją"
          select
          variant="outlined"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          {categories.map(({ id, title: categoryTitle }) => (
            <MenuItem key={id} value={id}>{categoryTitle}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Nuotraukos link'as"
          variant="outlined"
          value={img}
          onChange={(event) => setImg(event.target.value)}
          required
        />
        <TextField
          label="Aprašymas"
          variant="outlined"
          rows={4}
          value={ingridients}
          onChange={(event) => setIngridients(event.target.value)}
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton type="submit">
            {submitText}
          </StyledButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default RecipeForm;
