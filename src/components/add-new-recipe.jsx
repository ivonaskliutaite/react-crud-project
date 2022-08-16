import React from 'react';
import {
  Button,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddNewRecipe = ({ openModal }) => (
  <Stack padding="2vh" margin="12%" borderRadius="20%" backgroundColor="black">
    <Button variant="outlined" size="large" onClick={openModal} endIcon={<AddIcon />}>
      Pridėti receptą čia
    </Button>
  </Stack>
);

export default AddNewRecipe;
