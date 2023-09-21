import React from "react";
import {
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";

type TableProps = {
  title: string;
  heads: string[];
  body: (string | number)[][];
};
const DataTable: React.FC<TableProps> = ({ title, heads, body }) => {
  return (
    <Box style={{ border: "1px solid black", padding: "0.5rem" }}>
      <Box style={{ display: "flex", justifyContent: "flex-start" }}>
        <Typography sx={{ textAlign: "center", fontSize: "1.0rem" }}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {heads.map((head) => (
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
            {body?.map((row, index) => (
              <TableRow key={index}>
                {row?.map((cell) => (
                  <TableCell
                    key={cell}
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
    </Box>
  );
};
export default DataTable;
