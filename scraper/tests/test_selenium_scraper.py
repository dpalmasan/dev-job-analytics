"""Test for selenium scraper."""
from typing import cast

import pytest
from mock import call
from mock import MagicMock

from scraper import selenium_scraper


EMAIL = "pytest@jobservatory.io"
PASSWORD = "pytest-1234-secure"


@pytest.fixture
def webdriver(monkeypatch):
    """Fixture for selenium webdriver."""
    _webdriver = MagicMock()
    _webdriver.chrome.webdriver.WebDriver = (
        selenium_scraper.webdriver.chrome.webdriver.WebDriver
    )
    monkeypatch.setattr(selenium_scraper, "webdriver", _webdriver)
    yield _webdriver


@pytest.fixture
def chrome_driver_manager(monkeypatch):
    """Fixture to avoid installing ChroneDriver on test session."""
    _chrome_driver_manager = MagicMock()
    monkeypatch.setattr(
        selenium_scraper, "ChromeDriverManager", _chrome_driver_manager
    )
    yield _chrome_driver_manager


@pytest.fixture
def webdriver_wait(monkeypatch):
    """Mock for WebDriverWait."""
    _wait = MagicMock()
    monkeypatch.setattr(selenium_scraper, "WebDriverWait", _wait)
    yield _wait


def test_logged_linkedin_scraper_init(webdriver, chrome_driver_manager):
    """Test logged linkedin scraper with basic config."""
    scraper = selenium_scraper.LoggedLinkedinScrapper(EMAIL, PASSWORD)
    chrome_driver_manager().install.assert_called_once_with()
    webdriver.Chrome.assert_called_once_with(chrome_driver_manager().install())
    assert not scraper.logged
    assert scraper.email == EMAIL and scraper.password == PASSWORD


def test_logged_linkedin_scraper_login(
    webdriver, chrome_driver_manager, webdriver_wait
):
    """Test logged linkedin scraper login method."""
    scraper = selenium_scraper.LoggedLinkedinScrapper(EMAIL, PASSWORD)
    scraper._login()
    driver = webdriver.Chrome()
    driver.find_element_by_id.assert_has_calls(
        [
            call("username"),
            call().send_keys(EMAIL),
            call("password"),
            call().send_keys(PASSWORD),
            call().submit(),
        ]
    )
    assert scraper.logged


def test_logged_linkedin_scraper_job_count(
    webdriver, chrome_driver_manager, webdriver_wait
):
    """Test logged linkedin scraper login method."""
    cast(MagicMock, selenium_scraper.webdriver.chrome.webdriver.WebDriver)
    scraper = selenium_scraper.LoggedLinkedinScrapper(EMAIL, PASSWORD)
    driver = webdriver.Chrome()

    # To make isinstance check for this type
    driver.__class__ = selenium_scraper.webdriver.chrome.webdriver.WebDriver
    driver.find_element_by_tag_name.return_value = MagicMock(text="13,456")
    assert (
        scraper._get_job_count("tech", selenium_scraper.Location.WORLDWIDE)
        == 13456
    )
