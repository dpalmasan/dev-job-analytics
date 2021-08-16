"""Utility to import data into a MongoDB."""
import yaml
from mongoengine import connect

from scraper.populate_db import import_data
from scraper.selenium_scrapper import LoggedLinkedinScrapper


def main():
    """Entry point."""
    with open("jobserver-config.yaml", "r") as fp:
        config = yaml.safe_load(fp)

    connect(
        db=config["db"]["name"],
        username=config["db"]["user"],
        password=config["db"]["pass"],
        host=config["db"]["uri"],
    )

    sc = LoggedLinkedinScrapper(config["email"], config["password"])
    import_data(
        sc,
        [
            "React.js",
            "Angular.js",
            "Ruby on Rails",
            "Java",
            "Python",
            "Data Engineer",
            "Node.js",
            "jQuery",
            "Spring Boot",
            "ASP.NET",
            "Vue.js",
            "Bootstrap",
            "Django",
            "FastAPI",
            "Ember",
            "Flask",
            "Backbone.js",
            "Next.js",
            "Gatsby",
            "Laravel",
            "Semantic UI",
            "Express",
            "Svelte",
            "Meteor",
        ],
        0,
    )


if __name__ == "__main__":
    main()
