import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
type TableModalProps = {
  openTableModal: boolean;
  setOpenTableModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  heads: string[];
  body: (string | number)[][];
};

const TableModal: React.FC<TableModalProps> = ({
  openTableModal,
  setOpenTableModal,
  title,
  heads,
  body,
}) => {
  const [maxWidth, setMaxWidth] = React.useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >("sm");
  const handleClose = () => {
    setOpenTableModal(false);
  };
  return (
    <Dialog
      open={openTableModal}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle>
        <Typography sx={{ textAlign: "center", fontSize: "1.5rem" }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box style={{ display: "flex", gap: "10px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {heads.map((head, index) => (
                  <TableCell
                    key={`head-${index}`}
                    sx={{ textAlign: "center", border: "solid 1px #e2e2e2" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {body?.map((row, index) => (
                <TableRow key={`body-${index}`}>
                  {row?.map((cell, index) => (
                    <TableCell
                      key={`cell-${index}`}
                      sx={{ textAlign: "center", border: "solid 1px #e2e2e2" }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableModal;
