"""Data import from website to DB job."""
from datetime import datetime
from datetime import time
from datetime import timedelta
from time import sleep
from typing import List
from typing import Optional

import pytz

from scraper import scraper
from scraper.jobserver_record import CountryJobCount
from scraper.jobserver_record import JobserverRecord
from scraper.so_questions import StackOverflowQuestion
from scraper.stack_overflow_client import Questions


DS_FORMAT = "%Y-%m-%d"


def import_data(
    sc: scraper.JobserverScraper,
    technologies: List[str],
    max_days: Optional[int] = None,
):
    """Import data collected by a scraper, to a database.

    :param sc: Scraper to be used to collect data
    :type sc: scraper.JobserverScraper
    :param technologies: List of technologies to get data from
    :type technologies: List[str]
    :param max_days: Amount of periods of data, defaults to None
    :type max_days: int, optional
    :raises ValueError: If ``max_days`` is less than 0
    """
    if max_days is None:
        max_days = 0

    if max_days < 0:
        raise ValueError("Days must be a positive value!")
    starting_date = datetime.utcnow()
    for tech in technologies:
        prev_date = datetime(
            starting_date.year, starting_date.month, starting_date.day
        )
        prev_job_distribution = sc.get_job_count_distribution(tech, 0)
        prev_job_count = sc.get_worldwide_job_count(tech, 0)
        countries = [
            CountryJobCount(
                name=key,
                jobs=value,
            )
            for key, value in prev_job_distribution.items()
        ]
        record = JobserverRecord(
            name=tech,
            date=prev_date,
            jobs_total=prev_job_count,
            countries=countries,
        )

        record.save()
        for days in range(1, max_days):
            date = prev_date - timedelta(days=1)
            job_count = sc.get_worldwide_job_count(tech, days)
            job_distribution = sc.get_job_count_distribution(tech, days)

            countries = [
                CountryJobCount(
                    name=key,
                    jobs=value - prev_job_distribution[key],
                )
                for key, value in job_distribution.items()
            ]

            record = JobserverRecord(
                name=tech,
                date=date,
                jobs_total=job_count - prev_job_count,
                countries=countries,
            )
            record.save()
            prev_job_distribution = job_distribution
            prev_job_count = job_count
            prev_date = date
            sleep(2)


def is_valid_ds(ds: str) -> bool:
    """Check if a datestring is in YYYY-MM-DD format.

    :param ds: Datestring to check
    :type ds: str
    :return: True if it is valid, false otherwise.
    :rtype: bool
    """
    try:
        datetime.strptime(ds, DS_FORMAT)
    except ValueError:
        return False

    return True


def ds_to_utc_date(ds: str) -> datetime:
    """Transform a ds in format YYYY-MM-DD into a UTC datetime.

    :param ds: Date string in format YYYY-MM-DD
    :type ds: str
    :return: Datetime object with UTC timezone
    :rtype: datetime
    """
    utc_time = pytz.timezone("UTC")
    utc_date = utc_time.localize(datetime.strptime(ds, "%Y-%m-%d"))
    return utc_date


def get_last_second_from_utc_date(date: datetime) -> datetime:
    """Get the 23:59:59 date in UTC timezone from a datetime object.

    :param date: Input date
    :type date: datetime
    :return: Last second date
    :rtype: datetime
    """
    utc_time = pytz.timezone("UTC")
    return utc_time.localize(datetime.combine(date, time.max))


def date_to_timestamp(date: datetime) -> int:
    """Get timestamp from date object.

    :param date: Input date
    :type date: datetime
    :return: TS in seconds
    :rtype: int
    """
    return int(datetime.timestamp(date))


def backfill_so_question_data(fromdate: str, todate: str, tags: List[str]):
    """Backfill StackOverflow.

    :param fromdate: Starting date for the backfill in format YYYY-MM-DD
    :type fromdate: str
    :param todate: End date
    :type todate: str
    :param tags: Tags to look for (e.g. javascript, nodejs)
    :type tags: List[str]
    """
    questions = Questions()
    cur_date = ds_to_utc_date(fromdate)
    end_date = ds_to_utc_date(todate)
    request_count = 0
    while cur_date <= end_date:
        for tag in tags:
            start_ts = date_to_timestamp(cur_date)
            end_ts = date_to_timestamp(get_last_second_from_utc_date(cur_date))
            record = StackOverflowQuestion(
                tag=tag,
                date=cur_date,
                count=questions.get_total_questions(
                    start_ts=start_ts, end_ts=end_ts, tag=tag
                ),
            )
            record.save()
            request_count += 1

            # To not get banned https://api.stackexchange.com/docs/throttle
            if request_count > 25:
                sleep(5)
                request_count = 0
        cur_date += timedelta(days=1)
