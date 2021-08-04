# JOBservatory Scrapper

## Overview

Python jobs to feed the database.


## Scrapper Interface

The scrapper interface support several types of queries, that will depend on the site we will do the scrapping.


### Linkedin Scrapper

The `LinkedinScrapper` implements the interface to get data from linkedin.

```python
scrapper = LinkedinScrapper()
print(scrapper.get_worldwide_data("React.js"))
```