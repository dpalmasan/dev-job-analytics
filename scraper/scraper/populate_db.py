"""Data import from website to DB job."""
from datetime import datetime
from datetime import timedelta
from typing import List
from typing import Optional

from scraper import scraper
from scraper.jobserver_record import CountryJobCount
from scraper.jobserver_record import JobserverRecord


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
