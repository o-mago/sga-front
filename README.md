## SGA - Schedule Global Audit (Front)

### Before:

Clone the SGA REST Api and deploy it following its README file instructions:
`https://git.embraer.com.br/scm/~abedesch/sga-web.git`

### Preparing the environment:

1- Clone the repository: `$ git clone https://git.embraer.com.br/scm/~abedesch/sga-app.git`

2- Install the dependencies (go to the root folder): `$ npm install`

3- Create a file called .env inside the root folder with the following structure:

```env
REACT_APP_API_URL=http://address:port/api
REACT_APP_JIRA_URL=https://jiraexample.com.br
PUBLIC_URL=/sga-app
```
Where `http://address:port/api` must be replaced with the REST Api address.
And `/sga-app` must be replaced with the root folder of the built react project inside the application server

#### Run on develop mode:

`$ npm start`

#### Build:

`$ npm run build`

#### Deploying:

Copy the content inside the build folder and place it inside your application server (e.g. IIS)

#### Routes:

These are the routes inside SGA:

```
/
/doc
/update/:year
```

`/` is the application itself
`/doc` retrieves the SGA REST Api documentation
`/update/:year` updates SGA's information of a certain number (replace `:year` with a year, e.g `/update/2020`)

#### Built With

* [Visual Studio Code](https://code.visualstudio.com/)
* [ReactJs](https://pt-br.reactjs.org/)

#### Git Workflow
* [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)

#### Author

Alexandre Cabral Bedeschi - alexandre.bedeschi@embraer.com.br