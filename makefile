installnvm:
	# install nvm
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

installModules:
	npm install express
	npm install nodemon


install:
	# install node 18.18.1
	nvm install 18.18.1
	nvm use 18.18.1

	npm install


run:
	wslview home.html

dev:
	./node_modules/.bin/nodemon index.js