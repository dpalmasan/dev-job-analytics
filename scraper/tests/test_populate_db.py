"""Test import to MongoDB job."""
from datetime import datetime

import pytest
from freezegun import freeze_time
from mock import MagicMock
from mongoengine import connect

from scraper import populate_db as pdb
from scraper import scraper
from scraper.jobserver_record import JobserverRecord
from scraper.so_questions import StackOverflowQuestion


@pytest.fixture(scope="module")
def mongodb_connection():
    """Fixture for mongomock."""
    connect("mongoenginetest", host="mongomock://localhost")


@pytest.fixture
def linkescraper_mock(monkeypatch):
    """Fixture to control data from linkedin scraper."""
    _linkemock = MagicMock()
    _linkemock().get_worldwide_job_count.side_effect = [
        3245,
        5200,
    ]
    _linkemock().get_job_count_distribution.side_effect = [
        {
            "Alemania": 120,
            "Australia": 345,
            "Brasil": 200,
            "Canadá": 315,
            "Chile": 171,
            "China": 500,
            "Estados Unidos": 389,
            "India": 411,
            "Países Bajos": 125,
            "Polonia": 73,
            "Reino Unido": 180,
        },
        {
            "Alemania": 140,
            "Australia": 500,
            "Brasil": 280,
            "Canadá": 400,
            "Chile": 213,
            "China": 678,
            "Estados Unidos": 400,
            "India": 450,
            "Países Bajos": 180,
            "Polonia": 96,
            "Reino Unido": 180,
        },
    ]
    monkeypatch.setattr(scraper, "LinkedinScraper", _linkemock)
    yield _linkemock


@pytest.fixture
def so_question_request(monkeypatch):
    """Fixture for StackOverflowClient resource."""
    # Mock for get_total_questions
    def get_total_questions(
        start_ts: int,
        end_ts: int,
        tag: str,
    ) -> int:
        return {
            ("react", 1628640000, 1628726399): 334,
            ("javascript", 1628640000, 1628726399): 1240,
            ("react", 1628726400, 1628812799): 111,
            ("javascript", 1628726400, 1628812799): 285,
        }[(tag, start_ts, end_ts)]

    so_question = MagicMock()
    so_question().get_total_questions = get_total_questions
    monkeypatch.setattr(pdb, "Questions", so_question)


@freeze_time("2021-6-6")
def test_import_data(mongodb_connection, linkescraper_mock):
    """Test import data to DB."""
    sc = scraper.LinkedinScraper()
    pdb.import_data(sc, ["React.js"], 2)
    records = JobserverRecord.objects()
    record = records[0]
    assert record.name == "React.js"
    assert record.date == datetime(2021, 6, 6, 0, 0)
    assert record.jobs_total == 3245
    countries = {country.name: country.jobs for country in record.countries}

    expected = {
        "Alemania": 120,
        "Australia": 345,
        "Brasil": 200,
        "Canadá": 315,
        "Chile": 171,
        "China": 500,
        "Estados Unidos": 389,
        "India": 411,
        "Países Bajos": 125,
        "Polonia": 73,
        "Reino Unido": 180,
    }
    assert countries == expected

    record = records[1]
    assert record.name == "React.js"
    assert record.date == datetime(2021, 6, 5, 0, 0)
    assert record.jobs_total == 1955
    countries = {country.name: country.jobs for country in record.countries}

    expected = {
        "Alemania": 20,
        "Australia": 155,
        "Brasil": 80,
        "Canadá": 85,
        "Chile": 42,
        "China": 178,
        "Estados Unidos": 11,
        "India": 39,
        "Países Bajos": 55,
        "Polonia": 23,
        "Reino Unido": 0,
    }
    assert countries == expected


def test_date_to_timestamp():
    """Test that date in UTC time gives correct timestamp value."""
    date = pdb.ds_to_utc_date("2021-08-11")
    assert pdb.date_to_timestamp(date) == 1628640000


def test_get_last_second_from_utc_date():
    """Test get_last_second_from_utc_date.

    Several tests are made:

    - We get a known date object with UTC timezone
    - We get the last second from that date.
    - We check that timestamps are of the expected values.

    Since one day has 86400 seconds, the last second of the day, which is
    23:59:59 minus the first second of the day which is 00:00:00 will have
    86399 seconds.
    """
    date = pdb.ds_to_utc_date("2021-08-11")
    last_second_date = pdb.get_last_second_from_utc_date(date)
    assert pdb.date_to_timestamp(last_second_date) == 1628726399
    assert (
        pdb.date_to_timestamp(last_second_date) - pdb.date_to_timestamp(date)
        == 86399
    )


def test_backfill_so_question_data(mongodb_connection, so_question_request):
    """Test backfill with mock data."""
    pdb.backfill_so_question_data(
        "2021-08-11", "2021-08-12", ["react", "javascript"]
    )
    records = StackOverflowQuestion.objects()
    record = records[0]
    assert record.tag == "react"
    assert record.date == datetime(2021, 8, 11, 0, 0)
    assert record.count == 334

    record = records[1]
    assert record.tag == "javascript"
    assert record.date == datetime(2021, 8, 11, 0, 0)
    assert record.count == 1240

    record = records[2]
    assert record.tag == "react"
    assert record.date == datetime(2021, 8, 12, 0, 0)
    assert record.count == 111

    record = records[3]
    assert record.tag == "javascript"
    assert record.date == datetime(2021, 8, 12, 0, 0)
    assert record.count == 285
