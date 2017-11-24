[![CircleCI](https://circleci.com/gh/krausest/js-framework-benchmark.svg?style=svg)](https://circleci.com/gh/krausest/js-framework-benchmark)

# js-framework-benchmark

This is a simple benchmark for several javascript frameworks. The benchmarks creates a large table with randomized entries and measures the time for various operations including rendering duration.

![Screenshot](images/screenshot.png?raw=true "Screenshot")

## About the benchmarks

The following operations are benchmarked for each framework:

* create rows: Duration for creating 1000 rows after the page loaded.
* replace all rows: Duration for updating all 1000 rows of the table (with 5 warmup iterations).
* partial update: Time to update the text of every 10th row (with 5 warmup iterations).
* select row: Duration to highlight a row in response to a click on the row. (with 5 warmup iterations).
* swap rows: Time to swap 2 rows on a 1K table. (with 5 warmup iterations).
* remove row: Duration to remove a row. (with 5 warmup iterations).
* create many rows: Duration to create 10,000 rows
* append rows to large table: Duration for adding 1000 rows on a table of 10,000 rows.
* clear rows: Duration to clear the table filled with 10.000 rows.
* clear rows a 2nd time: Time to clear the table filled with 10.000 rows. But warmed up with only one iteration.
* ready memory: Memory usage after page load.
* run memory: Memory usage after adding 1000 rows.
* startup time: Duration for loading and parsing the javascript code and rendering the page.

For all benchmarks the duration is measured including rendering time. You can read some details on this [article](http://www.stefankrause.net/wp/?p=218).
The results of this benchmark is outlined on my blog ([round 1](http://www.stefankrause.net/wp/?p=191), [round 2](http://www.stefankrause.net/wp/?p=283), [round 3](http://www.stefankrause.net/wp/?p=301), [round 4](http://www.stefankrause.net/wp/?p=316) [round 5](http://www.stefankrause.net/wp/?p=392) and [round 6](http://www.stefankrause.net/wp/?p=431)).



## How to get started - building and running

### 1. Prerequisites

Have *node.js (>=7.6)* installed. If you want to do yourself a favour use nvm for that and install yarn. The benchmark has been tested with node 8.4.0.
For some frameworks you'll also need *java* (>=8, e.g. openjdk-8-jre on ubuntu).
Please make sure that the following command work before trying to build:
```
> npm
npm -version
5.0.0
> node --version
v8.0.0
> echo %JAVA_HOME% / echo $JAVA_HOME
> java -version
java version "1.8.0_131" ...
> javac -version
javac 1.8.0_131
```

### 2. Start installing

As stated above building and running the benchmarks for all frameworks can be challenging, thus we start step by step...

Install global dependencies
This installs just a few top level dependencies for the building the frameworks and a http-server.
```
npm install
```
We start the http-server in the root directory
```
npm start
```
Verify that the http-server works:
Try to open [http://localhost:8081/index.html](http://localhost:8081/index.html). If you see something like that you're on the right track:
![Index.html](images/index.png?raw=true "Index.html")

Now open a new terminal window and keep http-server running in background.

### 3. Run react-v16.1.0-keyed

```
cd react-v16.1.0-keyed
npm install
npm run build-prod
```

There should be no build errors and we can open the framework in the browser:
[http://localhost:8081/react-v16.1.0-keyed/](http://localhost:8081/react-v16.1.0-keyed/)

### 4. Run polymer-v2.0.0-non-keyed

```
cd polymer-v2.0.0-non-keyed
npm install
npm run build-prod
```

There should be no build errors and we can open the framework in the browser:
[http://localhost:8081/polymer-v2.0.0-non-keyed/](http://localhost:8081/polymer-v2.0.0-non-keyed/)

### 5. Run react-polymer-data-table

```
cd react-polymer-data-table
npm install
npm run build-prod
```

There should be no build errors and we can open the framework in the browser:
[http://localhost:8081/react-polymer-data-table/](http://localhost:8081/react-polymer-data-table/)
