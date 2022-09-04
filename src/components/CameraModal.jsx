import { Modal, Paper } from "@mui/material";
import Camera from 'react-html5-camera-photo';
import "react-html5-camera-photo/build/css/index.css";

const CameraModal = (props) => {
  const { isOpen, handleClose, addIngredient } = props;

  const handleTakePhoto = (dataUri) => {
    console.log(dataUri);
    handleClose();
  }
  
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      style={{display:'flex', alignItems:'center', justifyContent:'center'}}
    >
      <Paper style={{padding: '20px'}}>
        {isOpen && 
          <Camera
            onTakePhoto={handleTakePhoto}
            idealFacingMode="environment"
            isImageMirror={false}
          />
        }
      </Paper>
    </Modal>
  )
};

export default CameraModal;
