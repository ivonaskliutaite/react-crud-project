import * as React from 'react';
import {
  Typography,
  Box,
  Card,
  Button,
} from '@mui/material';
import Image from './image';

const RecipeCard = ({
  title,
  img,
  category,
  onDelete,
  onEdit,
}) => (
  <Card sx={{
    display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'black',
  }}
  >
    <Typography paddingLeft="2vw" color="white" variant="h5">{title}</Typography>
    <Typography paddingLeft="4vw" fontStyle="italic" color="yellow" variant="subtitle">{category}</Typography>
    <Box sx={{ position: 'relative', width: '100%', pt: '50%' }}>
      <Image src={img} sx={{ position: 'absolute', top: 0 }} />
    </Box>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '3vw',
      }}
    >
      <Button
        sx={{
          color: 'orange',
          border: '1px solid orange',
        }}
        onClick={onEdit}
      >
        Pataisyti
      </Button>
      <Button
        sx={{
          color: 'red',
          border: '1px solid red',
        }}
        onClick={onDelete}
      >
        Ištrinti
      </Button>
    </Box>
  </Card>
);

export default RecipeCard;
