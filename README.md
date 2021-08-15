# Jobservatory (WIP)

A platform to analyze technology trend over time, based on information on múltiple platform.

## Scrappers

Under the `scrapper` folder, there is all the code related to data pipelines which have the task of ingesting data into our database. Currently we are using `MongoDB` as our DB engine, because schema evolution flexibility and the fast iterations that are possible under this model.

## Jobservatory Express

Our backend is an express server (`Nodejs`), from which we implement endpoints for several queries. The related code is under `jobservatory_express` directory.

## Jobservatory React

As the name suggests, our frontend is built on `React` framework. Code is under `jobservatory_react`.
