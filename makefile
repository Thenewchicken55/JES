init:
	npm install next@latest react@latest react-dom@latest 

run:
	npm run dev

# run server on port 80
run80:
	sudo PORT=80 npm run dev &
