import { CameraAlt, Search } from "@mui/icons-material";
import { Alert, Box, Card, CardContent, CardHeader, Drawer, Grid, IconButton, InputBase, List, ListItem, ListItemText, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import CookingLogo from '../assets/cooknow_logo.png'
import CameraModal from "./CameraModal";

const CookingShow = (props) => {
  const { search, onSearch, data } = props;
  const [value, setValue] = useState("");
  const [openCamera, setOpenCamera] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const ingredientPlaceholder = "apple, banana, ...";
  const emptyError = "Please input ingredients.";
  const noResults = "No results found...";

  useEffect(() => {
    setValue(search);
  }, [search]);

  useEffect(() => {
    if (data.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [data]);

  const handleCloseModal = () => {
    setOpenCamera(false);
  };

  const handleIngredients = (e) => {
    setValue(e.target.value)
  };

  const addIngredient = (aiIngredient) => {
    const str = value ? aiIngredient + ", " : ", " + aiIngredient + ", ";
    setValue(str);
  };

  const handleSubmit = () => {
    if (value.trim() !== "" && value !== search) {
      onSearch(value);
      console.log(value);
    }
    if (value.trim() === "") {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }

  const renderFoodCard = (cuisine, ingredients, title) => (
    <Card style={{flex: 'auto'}}>
      <CardHeader title={title} />
      <CardContent>
        <List style={{maxHeight: '200px', overflow: 'auto'}}>
          {ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>
        <Box>{cuisine}</Box>
      </CardContent>
    </Card>
  );

  return (
    <Box style={{
      backgroundColor: '#282c34',
      minHeight: '100vh',
      textAlign: '-webkit-center'
    }}>
      <img src={CookingLogo} style={{width: '150px', paddingTop: '10px'}} alt="cooknow_logo"/>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '60vw', margin: '10px' }}
      >
        <InputBase
          multiline
          sx={{ ml: 1, flex: 1}}
          value={value}
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
          aria-label="camera"
          onClick={() => setOpenCamera(true)}
        >
          <CameraAlt />
        </IconButton>
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleSubmit}
        >
          <Search />
        </IconButton>
      </Paper>
      <Grid 
        style={{ padding: '10px' }}
        container
        spacing='5px' 
        columns={{ xs: 1, lg: 3 }}>
        {data.length !== 0 && data.map((food) => {
          const {cuisine, ingredients, title} = food;
          console.log(cuisine);
          console.log(ingredients);
          console.log(title);
          return (
            <Grid
              item
              xs={0.75}
              style={{
                display: 'flex',
                justifyContent: 'left',
              }}
            >
              {renderFoodCard(cuisine, ingredients, title)}
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{alignItems: 'center'}}>
        <CameraModal isOpen={openCamera} handleClose={handleCloseModal} addIngredient={addIngredient} />
      </Box>
      <Drawer open={isDirty} variant='persistent' anchor='bottom'>
        <Alert variant="standard" severity="error">
          {emptyError}
        </Alert>
      </Drawer>
      <Drawer open={isEmpty} variant='persistent' anchor='bottom'>
        <Alert variant="standard" severity="error">
          {noResults}
        </Alert>
      </Drawer>
    </Box>
  );
};

export default CookingShow;
