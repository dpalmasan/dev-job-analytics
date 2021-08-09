# JOBservatory Scraper

## Overview

Python jobs to feed the database.


## Scraper Interface

The scraper interface support several types of queries, that will depend on the site we will do the scrapping.


### Linkedin Scraper

The `LinkedinScraper` implements the interface to get data from linkedin.

```python
scraper = LinkedinScraper()
print(scraper.get_worldwide_job_count("React.js"))
```