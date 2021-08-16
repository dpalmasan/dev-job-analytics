"""Backfill job for SO question data."""
import yaml
from mongoengine import connect

from scraper.populate_db import backfill_so_question_data


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
    tags = [
        "java",
        "react",
        "nodejs",
        "javascript",
        "python",
        "sql",
        "vue",
        "django",
        "flask",
        "fastapi",
        "rails",
        "express",
        "angular",
    ]
    backfill_so_question_data("2021-08-09", "2021-08-15", tags)


if __name__ == "__main__":
    main()
