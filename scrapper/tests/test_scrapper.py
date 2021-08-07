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
        with open(TEST_ROOT / "data/linkedin-html-mock.html") as fp:
            _response = MagicMock(content=fp.read())
        return _response

    _requests = MagicMock()
    _requests.get = get
    monkeypatch.setattr(scrapper, "requests", _requests)


def test_linkedin_scrapper():
    """Test Linkedin scrapper implementation."""
    sc = scrapper.LinkedinScrapper()
    assert sc.get_worldwide_job_count("React.js") == 156000
