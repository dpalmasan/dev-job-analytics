"""Utility to import data into a MongoDB."""
import yaml
from mongoengine import connect

from scraper.populate_db import import_data
from scraper.selenium_scrapper import LoggedLinkedinScrapper


def main():
    """Entry point."""
    connect("jobservatory")
    with open("jobserver-config.yaml", "r") as fp:
        creds = yaml.safe_load(fp)

    sc = LoggedLinkedinScrapper(creds["email"], creds["password"])
    import_data(sc, ["React.js", "Angular.js", "Ruby on Rails"], 15)


if __name__ == "__main__":
    main()
