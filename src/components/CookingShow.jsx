import { CameraAlt, Search } from "@mui/icons-material";
import { Alert, Box, Card, CardContent, CardHeader, Chip, Drawer, Grid, IconButton, InputBase, Paper } from "@mui/material";
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
      <Box style={{display: 'flex', flexDirection: 'row'}}>
        <CardContent style={{alignSelf: 'center'}}>
          <img src={CookingLogo} style={{width: '200px'}} alt={title}/>
        </CardContent>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '200px',
            minHeight: '200px',
            padding: '10px',
            marginRight: '16px',
            flex: 'auto',
            border: '1px solid grey',
            borderRadius: '5px'
          }}>
          <div style={{textAlign: 'left', paddingBottom: '10px'}}>Ingredients:</div>
          <Box style={{minHeight: '100px'}}>
            <Grid
              container
              spacing={1}
            >
              {ingredients.map((ingredient, index) => (
                <Grid item key={index}>
                  <Chip label={ingredient} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Box>
      <Box style={{paddingBottom: '10px'}}>{cuisine}</Box>
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
        style={{ padding: '10px 10vw 10px 10vw' }}
        container
        spacing='10px' 
        columns={1}>
        {data.length !== 0 && data.map((food) => {
          const {cuisine, ingredients, title} = food;
          console.log(cuisine);
          console.log(ingredients);
          console.log(title);
          return (
            <Grid
              item
              xs={1}
              style={{
                display: 'flex',
                justifyContent: 'center',
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
