import React from "react";
import {
  Avatar,
  AvatarGroup,
  Chip,
  Grid,
  ListItem,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import { Contributor, Creative, Format } from "../../types/types";
import { updateCreative } from "../../services/api.creative";
import { useMutation } from "react-query";

type Props = {
  creative: Creative;
  index: number;
  length: number;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
};

type RenderContributorProps = {
  contributor: Contributor;
  index: number;
};

type RenderChipProps = {
  format: Format;
};

const RenderContributor = ({ contributor, index }: RenderContributorProps) => {
  const label =
    contributor.firstName.charAt(0) + contributor.lastName.charAt(0);

  if (index !== 0) return <Avatar style={{ marginLeft: -16 }}>{label}</Avatar>;
  return <Avatar>{label}</Avatar>;
};

const RenderChip = ({ format }: RenderChipProps) => {
  const label = format.width + "x" + format.height;

  return <Chip style={{ marginRight: 8 }} label={label} />;
};

const CreativeListItem = ({
  creative,
  index,
  length,
  selectedId,
  setSelectedId,
}: Props) => {
  const mutation = useMutation((editedCreative: Creative) =>
    updateCreative(editedCreative)
  );

  const HandleChange = () => {
    const editedCreative = creative;
    editedCreative.enabled = !creative.enabled;
    mutation.mutate(editedCreative);
  };

  return (
    <ListItem
      secondaryAction={
        <Switch checked={creative.enabled} onChange={HandleChange} />
      }
      divider={index < length - 1}
    >
      <ListItemText
        onClick={() =>
          setSelectedId(selectedId === creative.id ? "" : creative.id)
        }
        primary={
          <Grid container spacing={1}>
            <Grid item xs={4} md={4}>
              <Typography
                variant="h6"
                style={{
                  ...(selectedId === creative.id && { fontWeight: "bold" }),
                }}
              >
                {creative.title}
              </Typography>
            </Grid>
            <Grid item xs={3} md={2}>
              <AvatarGroup sx={{ justifyContent: "left" }} max={4}>
                {creative.contributors.map((contributor, index) => (
                  <RenderContributor
                    key={contributor.id}
                    contributor={contributor}
                    index={index}
                  />
                ))}
              </AvatarGroup>
            </Grid>
            <Grid item xs={5} md={6}>
              {creative.formats.map((format, index) => (
                <RenderChip key={index} format={format} />
              ))}
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
};

export default CreativeListItem;
