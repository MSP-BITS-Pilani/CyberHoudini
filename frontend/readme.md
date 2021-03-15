# APOGEE-21 MLSA CTF frontend

This folder contains the code of frontend for Cyber-houdini event conducted by MLSA in APOGEE 2021.
Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is entirely based on
ReactJS framework.

## Preview of design theme
https://user-images.githubusercontent.com/56752137/111108186-56965b80-857e-11eb-8fcb-f35dd89b9d8f.mp4

The colours in final deployed version would not be the same. Once core functioning is finished, design and responsiveness would follow.

## Design stages' Blueprint

- Website design should move from mobile to desktop priority
- Colours and fonts must follow the [MLSA style guide](https://drive.google.com/drive/folders/1a06ADXfAv7VzuBI0ArgIomQcxoWW21Dm)
- The colour scheme should be made such that it can be easily replaced whenever needed in future. Create a theme.js file that stores all colour information. The entire code fetches theme info from this global file.

## Setting up the dev environment

- to start the frontend lite-development mode, use the command in frontend folder 

  >yarn start
  
  open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

-All react components and their corresponding CSS files are stored together in a folder following camelCase naming scheme. ("nameComponent.js"). All components are stored in a hierarchy inside Containers folder.

-Store folder contains the redux store files, both reducers and actions. For each specific action, maintain preferably seperate reducers and action files. All reducers get combined in the index.js file using combineReducers()

-In every file keep indentation set as 2 spaces.

-For any situation demanding conditional CSS, use styled-components and classnames packages already installed liberally.