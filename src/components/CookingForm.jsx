import { CameraAlt, Search } from '@mui/icons-material';
import { FormControl, InputBase, IconButton, Paper, Box } from '@mui/material';
import { useState } from 'react';
import CameraModal from './CameraModal';
import './CookingForm.css';

const CookingForm = () => {
  const [ingredients, setIngredients] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const title = "What ingredients do you have?"

  const handleIngredients = (e) => {
    setIngredients(e.target.value)
  };

  const addIngredient = (aiIngredient) => {
    setIngredients(ingredients + aiIngredient);
  };

  const handleCloseModal = () => {
    setOpenCamera(false);
  };

  return (
    <Box className="App">
      <header className="App-header">
        <p>{title}</p>
        <FormControl>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <Search />
            <InputBase
              sx={{ ml: 1, flex: 1}}
              value={ingredients}
              placeholder="Ingredient1, Ingredient2, ..."
              onChange={handleIngredients}
              onEnter
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={() => setOpenCamera(true)}
            >
              <CameraAlt />
            </IconButton>
          </Paper>
        </FormControl>
      </header>
      <Box sx={{alignItems: 'center'}}>
        <CameraModal isOpen={openCamera} handleClose={handleCloseModal} addIngredient={addIngredient} />
      </Box>
    </Box>
  );
}

export default CookingForm;
