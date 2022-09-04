import { CameraAlt, Search } from '@mui/icons-material';
import { InputBase, IconButton, Paper, Box, Button, Alert, Drawer } from '@mui/material';
import { useState } from 'react';
import CameraModal from './CameraModal';
import './CookingForm.css';
import CookingLogo from '../assets/cooknow_logo.png'

const CookingForm = (props) => {
  const { onSearch } = props;
  const [ingredients, setIngredients] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const title = "What ingredients do you have?";
  const ingredientPlaceholder = "apple, banana, ...";
  const submit = "Search for recipes";
  const emptyError = "Please input ingredients.";

  const handleIngredients = (e) => {
    setIngredients(e.target.value)
  };

  const addIngredient = (aiIngredient) => {
    setIngredients(ingredients + aiIngredient);
  };

  const handleCloseModal = () => {
    setOpenCamera(false);
  };

  const handleSubmit = () => {
    if (ingredients.trim() !== "") {
      setIsDirty(false);
      onSearch(ingredients);
      console.log(ingredients);
    } else {
      setIsDirty(true);
    }
  }

  return (
    <Box className="App">
      <header className="App-header">
        <img src={CookingLogo} style={{width: '150px'}} alt="cooknow_logo"/>
        <p>{title}</p>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '60vw' }}
        >
          <Search style={{padding: '5px'}}/>
          <InputBase
            autoFocus
            multiline
            sx={{ ml: 1, flex: 1}}
            value={ingredients}
            placeholder={ingredientPlaceholder}
            onChange={handleIngredients}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
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
        <p>
          <Button
            onClick={handleSubmit}
            variant="contained"
          >
            {submit}
          </Button>
        </p>
      </header>
      <Drawer open={isDirty} variant='persistent' anchor='bottom'>
        <Alert variant="standard" severity="error">
          {emptyError}
        </Alert>
      </Drawer>
      <Box sx={{alignItems: 'center'}}>
        <CameraModal isOpen={openCamera} handleClose={handleCloseModal} addIngredient={addIngredient} />
      </Box>
    </Box>
  );
}

export default CookingForm;
