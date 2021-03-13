Deployment to heroku

- Ensure path to the build folder is in the gitignore file so that it does not get pushed

* Ensure heroku CLI is installed
* heroku login
* heroku create (enter unique name)
* In root create a Procfile with (web: node backend/server.js) (the route to your server file)
* In root package.json create a new script "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend" (the same command used to connect to frontend)
