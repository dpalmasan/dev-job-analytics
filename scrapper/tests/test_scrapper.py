"""Test scrapper interface."""
from pathlib import Path

import pytest
from mock import MagicMock

from scrapper import scrapper


TEST_ROOT = Path(__file__).parent


@pytest.fixture(autouse=True)
def requests(monkeypatch):
    """Fixture to mock requests.

    Monkeypatches the requests module, and read html from ``data`` folder
    under test root.
    """
    # Mock get method to read from data folder.
    def get(url, params):
        """Mock get method from ``requests`` to read html from file."""
        html_map = {
            scrapper.Location.WORLDWIDE: "data/linkedin-html-mock-all.html",
            scrapper.Location.USA: "data/linkedin-html-mock-usa.html",
            scrapper.Location.UK: "data/linkedin-html-mock-uk.html",
            scrapper.Location.CA: "data/linkedin-html-mock-ca.html",
            scrapper.Location.PL: "data/linkedin-html-mock-pl.html",
            scrapper.Location.BR: "data/linkedin-html-mock-br.html",
            scrapper.Location.IN: "data/linkedin-html-mock-in.html",
            scrapper.Location.CH: "data/linkedin-html-mock-ch.html",
            scrapper.Location.CL: "data/linkedin-html-mock-cl.html",
            scrapper.Location.GR: "data/linkedin-html-mock-gr.html",
            scrapper.Location.HL: "data/linkedin-html-mock-hl.html",
            scrapper.Location.AU: "data/linkedin-html-mock-au.html",
        }
        location = scrapper.Location(params["location"])
        with open(TEST_ROOT / html_map[location]) as fp:
            _response = MagicMock(content=fp.read())
        return _response

    _requests = MagicMock()
    _requests.get = get
    monkeypatch.setattr(scrapper, "requests", _requests)


def test_linkedin_scrapper():
    """Test Linkedin scrapper implementation."""
    sc = scrapper.LinkedinScrapper()
    assert sc.get_worldwide_job_count("React.js") == 156000
    assert sc.get_job_count_distribution("React.js") == {
        "Alemania": 12032,
        "Australia": 20345,
        "Brasil": 18200,
        "Canadá": 55500,
        "Chile": 1171,
        "China": 16135,
        "Estados Unidos": 48191,
        "India": 50200,
        "Países Bajos": 12123,
        "Polonia": 1324,
        "Reino Unido": 12123,
    }
