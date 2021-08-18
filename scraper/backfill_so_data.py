"""Backfill job for SO question data."""
import argparse

import yaml
from mongoengine import connect

from scraper.populate_db import backfill_so_question_data
from scraper.populate_db import is_valid_ds


def datestring(ds: str) -> str:
    """Define custom type for argparse.

    :param ds: String to be "casted".
    :type ds: str
    :raises argparse.ArgumentTypeError: If ds is not in YYYY-MM-DD format.
    :return: Valid datestring
    :rtype: str
    """
    if not is_valid_ds(ds):
        raise argparse.ArgumentTypeError(
            f"'{ds}' is not a valid datestring. Valid format is " "YYYY-MM-DD"
        )
    return ds


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
        "php",
    ]

    parser = argparse.ArgumentParser(
        description="Backfill StackOverflow Question data."
    )
    parser.add_argument(
        "start_date", help="Start date for data importing.", type=datestring
    )
    parser.add_argument(
        "end_date", help="End date for data importing.", type=datestring
    )
    args = parser.parse_args()
    backfill_so_question_data(args.start_date, args.end_date, tags)


if __name__ == "__main__":
    main()
