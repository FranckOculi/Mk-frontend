import React, { useState } from "react";
import { Button, Chip, Grid, Paper, Switch, TextField } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  deleteCreative,
  getCreativeById,
  updateCreative,
} from "../../services/api.creative";
import { Creative, Format } from "../../types/types";
import Loader from "../Loader";
import FormatModal from "./FormatModal";

type RenderChipProps = {
  format: Format;
};

const RenderChip = ({ format }: RenderChipProps) => {
  const label = format.width + "x" + format.height;

  return (
    <Grid item>
      <Chip label={label} color="primary" />
    </Grid>
  );
};

const CreativeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [creative, setCreative] = useState<Creative>();

  const { isLoading, isFetching, error } = useQuery(
    ["creativeById", id],
    async () => {
      if (id)
        await getCreativeById(id).then((response) => {
          setCreative(response);
        });
    }
  );

  const useUpdateCreative = useMutation(
    async () => {
      if (creative) await updateCreative(creative);
    },
    {
      onSuccess: () => navigate("/home", renderRouteState()),
    }
  );

  const useDeleteCreative = useMutation(async () => {
    if (creative)
      await deleteCreative(id ? id : "").then((response) => handleGoBack());
  });

  const handleGoBack = () => {
    navigate("/home", renderRouteState());
  };

  const renderRouteState = () => {
    return {
      state: {
        page: state?.page,
        id: id,
      },
    };
  };

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
      <Grid item xs={10} />
      {creative && (
        <Grid container justifyContent="center" rowSpacing={3}>
          <Grid item xs={5}>
            <Paper elevation={8} style={{ padding: 16 }}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    margin="normal"
                    label="Titre"
                    defaultValue={creative.title}
                    onChange={(e) =>
                      setCreative({ ...creative, title: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs container justifyContent="flex-end">
                  <Grid item>
                    <Switch
                      checked={creative.enabled}
                      onChange={() =>
                        setCreative({ ...creative, enabled: !creative.enabled })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>

              <TextField
                margin="normal"
                fullWidth
                multiline
                minRows={3}
                label="Description"
                defaultValue={creative.description && creative.description}
                onChange={(e) =>
                  setCreative({ ...creative, description: e.target.value })
                }
              />

              <TextField
                margin="normal"
                fullWidth
                multiline
                minRows={10}
                label="Contenu"
                defaultValue={creative.content && creative.content}
                onChange={(e) =>
                  setCreative({ ...creative, content: e.target.value })
                }
              />

              <Grid container spacing={2} alignItems="center">
                {creative.formats.map((format, index) => (
                  <RenderChip key={index} format={format} />
                ))}
                <Grid item>
                  <FormatModal creative={creative} setCreative={setCreative} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} />

          <Grid item xs={5} container spacing={3} justifyContent="center">
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => useUpdateCreative.mutate()}
              >
                Sauvegarder
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleGoBack}>
                Annuler
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => useDeleteCreative.mutate()}
              >
                Supprimer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default CreativeEdit;
