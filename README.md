# Jobservatory: A platform for the intersection between Technologies and Jobs

<p align="center">
<a href="https://github.com/dpalmasan/dev-job-analytics/actions"><img alt="Backend Build" src="https://github.com/dpalmasan/dev-job-analytics/actions/workflows/backend-build.yaml/badge.svg"></a>
<a href="https://github.com/dpalmasan/dev-job-analytics/actions"><img alt="Backend Lint" src="https://github.com/dpalmasan/dev-job-analytics/actions/workflows/backend-lint.yaml/badge.svg"></a>
<a href="https://github.com/dpalmasan/dev-job-analytics/actions"><img alt="Frontend Build" src="https://github.com/dpalmasan/dev-job-analytics/actions/workflows/frontend-build.yaml/badge.svg"></a>
<a href="https://github.com/dpalmasan/dev-job-analytics/actions"><img alt="Frontend Lint" src="https://github.com/dpalmasan/dev-job-analytics/actions/workflows/frontend-lint.yaml/badge.svg"></a>
<a href="https://github.com/dpalmasan/dev-job-analytics/actions"><img alt="Scraper Build" src="https://github.com/dpalmasan/dev-job-analytics/actions/workflows/scraper-build.yaml/badge.svg"></a>
<a href="https://github.com/dpalmasan/dev-job-analytics/actions"><img alt="Scraper Lint" src="https://github.com/dpalmasan/dev-job-analytics/actions/workflows/scraper-lint.yaml/badge.svg"></a>
<a href="https://github.com/psf/black"><img alt="Code style: black" src="https://img.shields.io/badge/code%20style-black-000000.svg"></a>
</p>

A platform to analyze technology trend over time, based on information on multiple platform. The architecture is shown in figure 1:

<p align="center">
<img alt="Jobservatory Architecture" src="https://gist.githubusercontent.com/dpalmasan/103d61ae06cfd3e7dee7888b391c1792/raw/6dc4d4d1dd3af3fdb29714b11cceea63c4b63f80/jobservatory-architecture.png">
</p>

<p align="center">
  <em>Fig. 1: Jobservatory Architecture</em>
</p>

## Scrapers

Under the `scraper` folder, there is all the code related to data pipelines which have the task of ingesting data into our database. Currently we are using `MongoDB` as our DB engine, because schema evolution flexibility and the fast iterations that are possible under this model. We are currently scraping data from two sources: `Linkedin` and `StackOverflow`.

## Jobservatory Express

Our backend is an express server (`Nodejs`), from which we implement endpoints for several queries. The related code is under `jobservatory_express` directory. We also cache requests under the assumption that data will not vary faster than 10 minutes, so we have a `redis` cache to improve latency. Our performance tests showed that the reduction in latency was from `400 ms` to `3 ms` on average.

## Jobservatory React

As the name suggests, our frontend is built on `React` framework. Code is under `jobservatory_react`.

<img width="1358" alt="photo1" src="https://user-images.githubusercontent.com/4138483/130359870-d7645447-5d64-46d6-a4a4-8cb9929218f6.png">
<img width="1111" alt="photo2" src="https://user-images.githubusercontent.com/4138483/130359873-71eac9c6-3c40-492c-9372-a19e46000480.png">
<img width="1203" alt="photo3" src="https://user-images.githubusercontent.com/4138483/130359875-2d8dafde-c04e-4e74-805e-cafe6a6b33b2.png">
<img width="1170" alt="photo4" src="https://user-images.githubusercontent.com/4138483/130359878-2ca437bc-4e57-4117-b3e9-275e70309dca.png">
