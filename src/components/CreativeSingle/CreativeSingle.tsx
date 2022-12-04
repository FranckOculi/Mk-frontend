import React from "react";
import { useQuery } from "react-query";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { Contributor } from "../../types/types";
import { formatDate } from "../../utils/utils";
import { getCreativeById } from "../../services/api.creative";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

type Props = {
  page: number;
  selectedId: string;
};

type RenderContributorProps = {
  contributor: Contributor;
};

const RenderContributor = ({ contributor }: RenderContributorProps) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText
        primary={contributor.firstName + " " + contributor.lastName}
      />
    </ListItem>
  );
};

const CreativeSingle = ({ page, selectedId }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, error } = useQuery(
    ["creativeById", selectedId],
    () => getCreativeById(selectedId)
  );

  const handleModify = () => {
    navigate(`/creative/${data.id}`, {
      state: {
        page: page,
        id: selectedId,
      },
    });
  };

  if (isLoading || isFetching) return <Loader />;

  if (error) return <div>An error has occurred: + {error}</div>;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Paper style={{ padding: 16 }} elevation={8}>
          {data && (
            <Grid container spacing={3}>
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Grid>
                  <Typography variant="h6" paragraph>
                    {data.title}
                  </Typography>
                  <Typography paragraph>
                    {data.description && data.description}
                  </Typography>
                  <Typography paragraph>
                    {data.content && data.content}
                  </Typography>
                </Grid>
                <Grid item xs={6} container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <Button variant="outlined" onClick={handleModify}>
                      Modifier
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} style={{ padding: 16 }}>
                  <Typography paragraph variant="subtitle2">
                    Créé par{" "}
                    {data.createdBy.firstName + " " + data.createdBy.lastName}
                  </Typography>
                  <Typography paragraph variant="subtitle2">
                    Dernière modification le{" "}
                    {formatDate(new Date(data.lastModified))}
                  </Typography>
                </Paper>

                <Paper elevation={2}>
                  <List>
                    {data.contributors.map((contributor: Contributor) => (
                      <RenderContributor
                        key={contributor.id}
                        contributor={contributor}
                      />
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreativeSingle;
