# Jobservatory (WIP)

A platform to analyze technologies trend over time, by country, and by importance on StackOverFlow.

## Scrappers

Under the `scrapper` folder, there is all the code related to data pipelines which have the task of ingesting data into our database. Currently we are using `MongoDB` as our DB engine, because schema evolution flexibility and the fast iterations that are possible under this model.

## Jobservatory Express

Our backend is an express server (`Nodejs`), from which we implement endpoints for several queries. The related code is under `jobservatory_express` directory.

## Jobservatory React

As the name suggests, our frontend is built on `React` framework. Code is under `jobservatory_react`.

<img width="1358" alt="photo1" src="https://user-images.githubusercontent.com/4138483/130359870-d7645447-5d64-46d6-a4a4-8cb9929218f6.png">
<img width="1111" alt="photo2" src="https://user-images.githubusercontent.com/4138483/130359873-71eac9c6-3c40-492c-9372-a19e46000480.png">
<img width="1203" alt="photo3" src="https://user-images.githubusercontent.com/4138483/130359875-2d8dafde-c04e-4e74-805e-cafe6a6b33b2.png">
<img width="1170" alt="photo4" src="https://user-images.githubusercontent.com/4138483/130359878-2ca437bc-4e57-4117-b3e9-275e70309dca.png">

