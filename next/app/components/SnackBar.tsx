import React from 'react';
import { Snackbar, SnackbarContent } from '@mui/material';

interface SnackbarComponentProps {
  message: string;
  open: boolean;
  duration?: number;
  onClose: () => void;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ message, open, duration = 3000, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // 中央に配置
      sx={{
        width: '100%',
        marginBlockEnd: '12px',
        '& .MuiSnackbarContent-root': {
          width: '100%', // SnackbarContentも100%に設定
          justifyContent: 'center', // 中央に配置
          margin: '0 16px', // 左右にマージンを追加
        },
      }}
    >
      <SnackbarContent
        message={message}
        sx={{
          width: '100%', // SnackbarContentを横いっぱいに広げる
        }}
      />
    </Snackbar>
  );
};

export default SnackbarComponent;