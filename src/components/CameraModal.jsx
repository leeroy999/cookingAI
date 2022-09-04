import { Modal, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Camera from 'react-html5-camera-photo';
import "react-html5-camera-photo/build/css/index.css";
import LoadingIndicator from "./LoadingIndicator";

const CameraModal = (props) => {
  const { isOpen, handleClose, addIngredient } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleTakePhoto = (dataUri) => {
    console.log(dataUri);
    setIsLoading(true);
    fetch("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/1200px-Banana-Single.jpg")
      .then(res => res.blob())
      .then((val) =>{
        const file = new File([val], 'picture.png', { type: 'image/png' });
        const url = URL.createObjectURL(file);
        console.log(url);
        const form = new FormData();
        form.append('url', file, 'picture.png');
        axios.post("http://127.0.0.1:33507/image", form).then((response) => {
        // axios.get("/image?url=" + dataUri).then((response) => {
          console.log(response.data)
          addIngredient(response.data);
          setIsLoading(false);
          handleClose();
        }).catch((e) => {
          console.log(e);
          setIsLoading(false);
          handleClose();
        });
      });
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      style={{display:'flex', alignItems:'center', justifyContent:'center'}}
    >
      {isLoading ? (<LoadingIndicator />) : (
        <Paper style={{padding: '20px'}}>
          {isOpen && 
            <Camera
              onTakePhoto={handleTakePhoto}
              idealFacingMode="environment"
              isImageMirror={false}
              // idealResolution={{width: 300, height: 300}}
            />
          }
        </Paper>
      )}
    </Modal>
  )
};

export default CameraModal;
