"""Test import to MongoDB job."""
from datetime import datetime

import pytest
from freezegun import freeze_time
from mock import MagicMock
from mongoengine import connect

from scraper import populate_db as pdb
from scraper import scraper
from scraper.jobserver_record import JobserverRecord


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
