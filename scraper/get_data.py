"""Utility to import data into a MongoDB."""
import yaml
from mongoengine import connect
from selenium import webdriver

from scraper.populate_db import import_data
from scraper.selenium_scraper import LoggedLinkedinScrapper


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

    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = config["google_chrome_path"]
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(
        executable_path=config["chrome_driver_path"],
        chrome_options=chrome_options,
    )
    sc = LoggedLinkedinScrapper(config["email"], config["password"], driver)
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
            "PHP",
            "Kotlin",
            "Swift",
            "Data Scientist",
            "Machine Learning",
        ],
        0,
    )


if __name__ == "__main__":
    main()
