import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Creative, Format } from "../../types/types";

type Props = {
  creative: Creative;
  setCreative: React.Dispatch<React.SetStateAction<Creative | undefined>>;
};

type RenderFormProps = {
  setWidth: React.Dispatch<React.SetStateAction<number | undefined>>;
  setHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  errorData: {
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    widthError: boolean;
    setWidthError: React.Dispatch<React.SetStateAction<boolean>>;
    heightError: boolean;
    setEightError: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const RenderForm = ({ setWidth, setHeight, errorData }: RenderFormProps) => {
  const { setError, widthError, setWidthError, heightError, setEightError } =
    errorData;

  return (
    <DialogContent>
      <Box
        component="form"
        sx={{
          display: "flex",
          marginTop: "5px",
        }}
      >
        <TextField
          label="Largeur"
          variant="outlined"
          size="small"
          required
          type="number"
          error={widthError}
          onChange={(e) => {
            setWidth(parseInt(e.target.value));
            setWidthError(false);
            setError(false);
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DialogContentText marginLeft={2} marginRight={2}>
            X
          </DialogContentText>
        </Box>
        <TextField
          label="Hauteur"
          variant="outlined"
          size="small"
          required
          type="number"
          error={heightError}
          onChange={(e) => {
            setHeight(parseInt(e.target.value));
            setEightError(false);
            setError(false);
          }}
        />
      </Box>
    </DialogContent>
  );
};

const FormatModal = ({ creative, setCreative }: Props) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [isError, setError] = useState<boolean>(false);
  const [widthError, setWidthError] = useState<boolean>(false);
  const [heightError, setEightError] = useState<boolean>(false);

  const errorData = {
    setError,
    widthError,
    setWidthError,
    heightError,
    setEightError,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFormat = () => {
    if (
      width !== 0 &&
      typeof width === "number" &&
      height !== 0 &&
      typeof height === "number"
    ) {
      setCreative({
        ...creative,
        formats: [...creative.formats, { width, height }],
      });
      handleClose();
    } else {
      if (!width || width <= 0 || typeof width !== "number")
        setWidthError(true);
      if (!height || height <= 0 || typeof height !== "number")
        setEightError(true);
      setError(true);
    }
  };

  return (
    <>
      <IconButton size="small" color="primary" onClick={handleClickOpen}>
        <Add />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un format</DialogTitle>
        {isError && (
          <DialogContentText sx={{ alignSelf: "center" }} color="error">
            Veuillez renseigner un format valide
          </DialogContentText>
        )}
        <RenderForm
          setWidth={setWidth}
          setHeight={setHeight}
          errorData={errorData}
        />
        <DialogActions>
          <Button
            variant="contained"
            disableElevation
            type="submit"
            onClick={handleAddFormat}
          >
            AJOUTER
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            FERMER
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormatModal;
