import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const NovelModal = ({ open, handleClose, novel }) => {
  if (!novel) {
    return null;
  }

  const { title, author, content, backgroundImage } = novel;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <div style={{ display: "flex" }}>
          <img
            src={backgroundImage}
            alt={title}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
          <div style={{ marginLeft: "20px" }}>
            <DialogContentText>
              <strong>글쓴이:</strong> {author}
            </DialogContentText>
            <DialogContentText>
              <strong>내용:</strong> {content}
            </DialogContentText>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NovelModal;
