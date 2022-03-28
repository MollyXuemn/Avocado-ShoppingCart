###### Install Depedencies of npm

- install nodemon for running the application in the local/global environment, then defining our own command line code: 
*** package.json ***
``` "scripts": { ```
   ``` "start": "nodemon index.js"  },```

- slugify "~1.3.4" 
          "*1.3.4" all the latest package
          "^1.3.4" only the latest minor(2nd ones) package
- node_modules: 
          if we accidently delete it, others can use ``` npm install``` to recover