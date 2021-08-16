"""Implement a Linkedin Scrapper logged in via ``Selenium``.

This is an optional dependency.
"""
from typing import Optional
from urllib.parse import urlencode

from scraper.scraper import JOB_REGEX
from scraper.scraper import LinkedinScraper
from scraper.scraper import Location
from scraper.scraper import SECONDS_PER_DAY

try:
    from selenium import webdriver
    from selenium.webdriver.support.wait import WebDriverWait
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support import expected_conditions as EC
    from webdriver_manager.chrome import ChromeDriverManager
except (ImportError, ModuleNotFoundError):
    print(
        "To use this you need to install extra "
        "dependencies: e.g. poetry install --extras 'selenium'"
    )
    raise


class LoggedLinkedinScrapper(LinkedinScraper):
    """Implement a LinkedinScraper using identity."""

    driver: Optional[webdriver.chrome.webdriver.WebDriver]

    def __init__(
        self,
        email: str,
        password: str,
        driver: Optional[webdriver.chrome.webdriver.WebDriver] = None,
    ):
        """Start ``selenium`` driver to scrap from the web.

        :param email: Email to login into Linkedin
        :type email: str
        :param password: Password
        :type password: str
        """
        self.driver: Optional[webdriver.chrome.webdriver.WebDriver] = driver
        if self.driver is None:
            self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.email = email
        self.password = password
        self.logged = False

    def _login(self):
        if self.logged:
            return
        self.driver.get("https://www.linkedin.com/login")
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "username"))
        )
        email_elem = self.driver.find_element_by_id("username")
        email_elem.send_keys(self.email)

        password_elem = self.driver.find_element_by_id("password")
        password_elem.send_keys(self.password)
        password_elem.submit()
        self.logged = True

    def _get_job_count(
        self, tech: str, location: Location, days: Optional[int] = None
    ) -> int:
        self._login()
        params = {"keywords": tech, "location": location.value}
        if days is not None:
            params["f_TPR"] = f"r{(days + 1)*SECONDS_PER_DAY}"

        url_query = self.url + "?" + urlencode(params)

        if isinstance(self.driver, webdriver.chrome.webdriver.WebDriver):
            self.driver.get(url_query)
            element = self.driver.find_element_by_tag_name("small")
        return int(JOB_REGEX.sub("", element.text))
