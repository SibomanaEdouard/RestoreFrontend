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
  openDoubleTableModal: boolean;
  setOpenDoubleTableModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subtitle1: string;
  subtitle2: string;
  heads: string[];
  body: (string | number)[][];
  heads2: string[];
  body2: (string | number)[][];
};

const DoubleTableModal: React.FC<TableModalProps> = ({
  openDoubleTableModal,
  setOpenDoubleTableModal,
  title,
  heads,
  subtitle1,
  subtitle2,
  body,
  heads2,
  body2,
}) => {
  const [maxWidth, setMaxWidth] = React.useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >("sm");
  const handleClose = () => {
    setOpenDoubleTableModal(false);
  };
  return (
    <Dialog
      open={openDoubleTableModal}
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
          <Box>
            <Typography sx={{ textAlign: "center", fontSize: "1.0rem" }}>
              {subtitle1}
            </Typography>
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
                  <TableRow key={index}>
                    {row?.map((cell, index) => (
                      <TableCell
                        key={`head-${index}`}
                        sx={{
                          textAlign: "center",
                          border: "solid 1px #e2e2e2",
                        }}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box>
            <Typography sx={{ textAlign: "center", fontSize: "1.0rem" }}>
              {subtitle2}
            </Typography>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {heads2.map((head) => (
                    <TableCell
                      key={head}
                      sx={{ textAlign: "center", border: "solid 1px #e2e2e2" }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {body2?.map((row, index) => (
                  <TableRow key={index}>
                    {row?.map((cell, index) => (
                      <TableCell
                        key={`head-${index}`}
                        sx={{
                          textAlign: "center",
                          border: "solid 1px #e2e2e2",
                        }}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
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

export default DoubleTableModal;
