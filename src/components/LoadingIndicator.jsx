import { CircularProgress } from "@mui/material";

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

export default LoadingIndicator