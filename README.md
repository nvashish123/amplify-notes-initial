This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Steps


- git clone this repo to your local environment
- cd into the folder
- npm install
- npm start (this will run plain react app, with no Amplify at all)
- npm i aws-amplify aws-amplify-react
- npm i -g @aws-amplify/cli
- amplify configure : this command will configure amplify on your environment, and its a one-time setup, unless you want to change some configuration
- Follow the instructions to understand the changes being made in this starter app
- amplify init
- amplify add auth (choose user name, and everything else default)
- amplify push



## Code changes for the lab

Edit index.js:

###

```
import Amplify from "aws-amplify";

import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);
```


Edit App.js:

###

```
import { withAuthenticator } from "aws-amplify-react";

export default withAuthenticator(App, { includeGreetings: true });
```

Checkout the app, it should have sign in, sign up functionality added now.

###

```amplify add api```

(Choose first option with notes todo)

Update schema.grapgql with the following : 

###

```
type Note @model {
id: ID!
note: String!
}
```


###

```
amplify push
```

Once finished, explore the local folder structure and show all the auto-generated code
Walk through the AppSync console and show the GraphQL editor etc.

Run a mutation from the console, to create a note - 

###
```
mutation {
  createNote(input: {
    note: "Hello Atl"
  }) {
    id
    note
  }
}
```

Edit App.js - 

###
```

import { API, graphqlOperation } from "aws-amplify";
import { createNote } from "./graphql/mutations";
import { listNotes } from "./graphql/queries";

```

Add to handleAddNote method - 

###
```
const result = await API.graphql(graphqlOperation(createNote, { input }));
const newNote = result.data.createNote;
const updatedNotes = [newNote, ...notes];
this.setState({ notes: updatedNotes, Note: "" });
```

Add new method -

###

```
async componentDidMount() {
const result = await API.graphql(graphqlOperation(listNotes));
this.setState({ notes: result.data.listNotes.items });
}
```


Now, you should be able to add and see notes from the UI, coming from the AppSync API. DynamoDB table should have all the notes. 



Add authorization - 

currently,there is no authorization on the note records. All users see the records regardless of who created it. Lets add authorization so that only the user who created a note can see it. Create a new user to test it.

Update the schema.graphql file to add authorization to the model : 

###
```
type Note @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  note: String!
}
```

###
```
amplify update api
amplify push
```
now each note should have an owner field associated, and a logged in user will only see the noptes created by that user, and none of other user's notes

=========== end of builder session hands on ======


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
