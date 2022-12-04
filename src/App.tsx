import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Grid } from "@mui/material";
import CreativeList from "./components/CreativeList";
import CreativeSingle from "./components/CreativeSingle";
import { getCreatives } from "./services/api.creative";
import Loader from "./components/Loader";
import { useLocation } from "react-router-dom";

function App() {
  const { state } = useLocation();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string>("");

  const {
    data: list,
    isLoading,
    isFetching,
    error,
  } = useQuery(
    ["creatives", pageNumber],
    async () => await getCreatives(pageNumber)
  );

  useEffect(() => {
    // retrieve state (page and id history)
    if (state?.page) setPageNumber(state.page);

    if (state?.id) setSelectedId(state.id);

    // clean state
    return () => {
      if (state?.page) state.page = "";
      if (state?.id) state.id = "";
    };
  }, [state, list]);

  if (isLoading || isFetching) return <Loader />;

  if (error) return <div>An error has occurred: + {error}</div>;

  return (
    <Grid
      container
      style={{
        marginTop: 16,
        marginBottom: 16,
        display: "flex",
        justifyContent: "center",
      }}
      spacing={3}
    >
      <Grid item xs={12} />
      <CreativeList
        creatives={list}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      {selectedId && (
        <>
          <Grid item xs={12} />
          <CreativeSingle page={pageNumber} selectedId={selectedId} />
        </>
      )}
    </Grid>
  );
}

export default App;
