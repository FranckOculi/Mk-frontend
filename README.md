# Mockups React-query - Material-ui - TypeScript

Une application permettant l'édition de bannières de publicité.

Le projet est bootstrappé avec [Create React App](https://github.com/facebook/create-react-app).

Voici les bibliothèques utilisées :

- [material-ui](https://github.com/mui-org/material-ui)
- [react-query](https://github.com/tannerlinsley/react-query)
- [react-router](https://github.com/remix-run/react-router)

## API

Une API permettant de récupérer/modifier/supprimer des publicités réalisée avec [JSON Server](https://github.com/typicode/json-server).

Pour lancer l'API en dev : `yarn server`

URL : [http://localhost:3001](http://localhost:3001)

### Endpoints

```
GET    /user

GET    /creatives
GET    /creatives/:uuid
POST   /creatives
PUT    /creatives/:uuid
DELETE /creatives/:uuid
```

Quelques exemples de paramètres fournis par l'API :

- pagination : `/creatives?_page=:page&_limit=:limit`
- tri : `/creatives?_sort=lastModified&_order=desc`

## Commandes

Pour démarrer le projet : `yarn start`

Pour lancer les tests : `yarn test`
