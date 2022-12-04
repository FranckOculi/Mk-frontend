import {
  Avatar,
  Button,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Person } from "@mui/icons-material";

const creatives = [
  {
    title: "Title creative 1",
    users: ["AB", "CD"],
    formats: ["120x120", "60x600"],
    enabled: true,
  },
  {
    title: "Title creative 2",
    users: ["AB", "CD"],
    formats: ["120x120", "60x600"],
    enabled: true,
    description:
      "Ekkovpu henuheewa mec fikpune likohfu vamuz hifeeta vabhec go oma aggunpo du zocme pu abihoki. Use row hebihcoc sa pujdide bur wubopiek ba okanavgu tegiz wavpop tizu apohup re tuca. Hunu us elecuj opmaba jerrasad eb bicsu zo mepak penbiva usafu mamkala.",
    content: "Cadiji dohfewwez poroci om suhfop",
  },
  {
    title: "Title creative 3",
    users: ["AB", "CD"],
    formats: ["120x120", "60x600", "43x300", "400x250"],
    enabled: true,
  },
  {
    title: "Title creative 4",
    users: ["DE"],
    formats: ["120x120", "60x600"],
    enabled: true,
  },
  {
    title: "Title creative 5",
    users: ["AB", "CD", "EF"],
    formats: ["120x120", "60x600", "43x300"],
    enabled: false,
  },
];

function Mockup() {
  return (
    <Grid container style={{ marginTop: 16, marginBottom: 16 }} spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Paper style={{ padding: 16 }} elevation={8}>
          <List>
            {creatives.map((creative, index) => (
              <ListItem
                secondaryAction={<Switch checked={creative.enabled} />}
                divider={index < creatives.length - 1}
              >
                <ListItemText
                  primary={
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography
                          variant="h6"
                          style={{
                            ...(index === 1 ? { fontWeight: "bold" } : {}),
                          }}
                        >
                          {creative.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <div style={{ display: "flex" }}>
                          {creative.users.map((user) => (
                            <Avatar key={user} style={{ marginLeft: -16 }}>
                              {user}
                            </Avatar>
                          ))}
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        {creative.formats.map((format) => (
                          <Chip
                            style={{ marginRight: 8 }}
                            key={format}
                            label={format}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item>
            <Pagination count={10} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={2} />
      <Grid item xs={8}>
        <Paper style={{ padding: 16 }} elevation={8}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography variant="h6" paragraph>
                {creatives[1].title}
              </Typography>
              <Typography paragraph>{creatives[1].description}</Typography>
              <Typography paragraph>{creatives[1].content}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={0} style={{ padding: 16 }}>
                <Typography paragraph variant="subtitle2">
                  Créé par Francis Nolastname
                </Typography>
                <Typography paragraph variant="subtitle2">
                  Dernière modification le 1 novembre 2021
                </Typography>
              </Paper>

              <Paper elevation={2}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="John Snow" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Tom Jedusor" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Marty McFly" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={6}>
        <Paper elevation={8} style={{ padding: 16 }}>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <TextField
                margin="normal"
                label="Titre"
                value={creatives[1].title}
              />
            </Grid>
            <Grid item xs container justifyContent="flex-end">
              <Grid item>
                <Switch checked />
              </Grid>
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            fullWidth
            multiline
            minRows={3}
            label="Description"
            value={creatives[1].description}
          />

          <TextField
            margin="normal"
            fullWidth
            multiline
            minRows={10}
            label="Contenu"
            value={creatives[1].content}
          />

          <Grid container spacing={2} alignItems="center">
            {creatives[1].formats.map((format) => (
              <Grid item>
                <Chip label={format} color="primary" />
              </Grid>
            ))}
            <Grid item>
              <IconButton size="small" color="primary">
                <Add />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={3} />

      <Grid item xs={3} />
      <Grid item xs={6} container spacing={3} justifyContent="center">
        <Grid item>
          <Button color="primary" variant="contained">
            Sauvegarder
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">Annuler</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">Supprimer</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Mockup;
