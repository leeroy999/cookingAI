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
    fetch(dataUri)
      .then(res => res.blob())
      .then((val) =>{
        const url = URL.createObjectURL(val);
        console.log(url);
        const formData = new FormData();
        formData.append('url', url);
        axios.post("/image", formData).then((response) => {
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
