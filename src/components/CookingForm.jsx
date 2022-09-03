import { Search } from '@mui/icons-material';
import { FormControl, InputBase, IconButton, Paper } from '@mui/material';
import { Box } from '@mui/system';
import './CookingForm.css';

const CookingForm = () => {
  return (
    <Box className="App">
      <header className="App-header">
        <p>Cooking Recipes</p>
        <FormControl>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1}}
              placeholder="Ingredient1, Ingredient2, ..."
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <Search />
            </IconButton>
          </Paper>
        </FormControl>
      </header>
    </Box>
  );
}

export default CookingForm;
