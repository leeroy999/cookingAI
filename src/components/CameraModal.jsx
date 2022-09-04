import { CircularProgress, Modal, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Camera from 'react-html5-camera-photo';
import "react-html5-camera-photo/build/css/index.css";

const CameraModal = (props) => {
  const { isOpen, handleClose, addIngredient } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleTakePhoto = (dataUri) => {
    console.log(dataUri);
    setIsLoading(true);
    axios.get("http://127.0.0.1:33507/image?url=" + dataUri).then((response) => {
    // axios.get("/image?url=" + dataUri).then((response) => {
      addIngredient(response.data);
      setIsLoading(false);
      handleClose();
    }).catch((e) => {
      console.log(e);
      setIsLoading(false);
      handleClose();
    });
  }

  const LoadingIndicator = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: 24,
      width: '100%',
    }}>
      <div style={{ position: 'absolute' }}>
        <CircularProgress size={60} />
      </div>
    </div>
  );
  
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      style={{display:'flex', alignItems:'center', justifyContent:'center'}}
    >
      {isLoading ? (LoadingIndicator()) : (
        <Paper style={{padding: '20px'}}>
          {isOpen && 
            <Camera
              onTakePhoto={handleTakePhoto}
              idealFacingMode="environment"
              isImageMirror={false}
            />
          }
        </Paper>
      )}
    </Modal>
  )
};

export default CameraModal;
