# Apogee 2021 MLSA CyberHoudini Backend
This directory contains server side code for the CyberHoudini event conducted by MLSA BITS Pilani during apogee 2021. 
Node.js, Express and MonogDB has been used. 

## Usage 
To begin with, you must have a config.env file in your root directory i.e. in the directory which you cloned from this github repo. For MLSA developers, 
you can contact me to get the config.env file. You must download and copy the file into your root directory i.e. in the folder `CyberHoudini/`.

After copying the config.env file, run
```
$ npx nodemon -L server
```
This will start the development server on `localhost:4000`
