# Run react-polymer
Open terminal, and do
```
cd js-framework-benchmark
npm install
npm start
```
Try to open [http://localhost:8081/index.html](http://localhost:8081/index.html). If you see something like that you're on the right track:
![Index.html](images/index.png?raw=true "Index.html")

Then open another terminal, and do
```
cd react-polymer
npm install
npm run build-prod
```

There should be no build errors and we can open the framework in the browser:
[http://localhost:8081/react-polymer/](http://localhost:8081/react-polymer/)