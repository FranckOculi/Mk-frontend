import React from "react";
import { Grid, Pagination, Paper } from "@mui/material";
import { Creative } from "../../types/types";
import CreativeListItem from "./CreativeListItem";

type Props = {
  creatives: Array<Creative>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
};

const CreativeList = ({
  creatives,
  pageNumber,
  setPageNumber,
  selectedId,
  setSelectedId,
}: Props) => {
  const handleChangePage = (number: number) => {
    setPageNumber(number);
    setSelectedId("");
  };

  return (
    <Grid container justifyContent="center" rowSpacing={3}>
      <Grid item xs={10}>
        <Paper style={{ padding: 16 }} elevation={8}>
          {creatives.map((creative, index) => (
            <CreativeListItem
              key={index}
              creative={creative}
              index={index}
              length={creatives.length}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </Paper>
      </Grid>

      <Grid item xs={10}>
        <Grid container justifyContent="center">
          <Pagination
            count={10}
            page={pageNumber}
            onChange={(_, number) => {
              handleChangePage(number);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreativeList;
