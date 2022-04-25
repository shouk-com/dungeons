# Discord Dungeons Bot with gpt-2 and firebase

## Getting Started


1. Create a new firebase project [here](https://console.firebase.google.com/).
2. Clone this repository.
3. Run `npm install` .
4. Create a file `fconfig.js` and add your firebase credentials in it like:
```js
module.exports = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
};
```
5. Create a new discord application [here](https://discord.com/developers/applications). Go to the Bot section and click **Reset Token** and copy it.
6. In the project directory create a file called `.env` and add your token. 
```
TOKEN = <add your token here>
```
7. You also should add your `G_ID` which is the guild id of the server you will be testing your bot in. You can copy the server id by right-clicking the server name in the top left. Also add `ENV = DEV`
8. Run the server `npm start`
