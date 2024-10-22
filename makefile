init:
	npm install next@latest react@latest react-dom@latest 

build:
	npm run build

run:
	npm run dev

# run server on port 80
runServer: build
	sudo npm run start -- --port 80 &
