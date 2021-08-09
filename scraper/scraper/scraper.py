"""Scraper interface and basic implementations."""
import re
from abc import ABC
from abc import abstractmethod
from enum import Enum
from typing import Dict
from typing import Optional

import requests
from bs4 import BeautifulSoup


JOB_REGEX = re.compile(r"[^0-9]")
SECONDS_PER_DAY = 86400


class Location(Enum):
    """Location enum to query for different locations."""

    WORLDWIDE = "Todo el Mundo"
    USA = "Estados Unidos"
    UK = "Reino Unido"
    CA = "Canadá"
    PL = "Polonia"
    BR = "Brasil"
    IN = "India"
    CH = "China"
    CL = "Chile"
    GR = "Alemania"
    HL = "Países Bajos"
    AU = "Australia"


class JobserverScraper(ABC):
    """Abstract class for scrapers."""

    _url = ""

    @abstractmethod
    def get_worldwide_job_count(self, tech: str, days: Optional[int]) -> int:
        """Get job count for a specific tech.

        :param tech: Technology to be analyzed.
        :type tech: str
        :return: Job count.
        :rtype: int
        """
        pass

    @abstractmethod
    def get_job_count_distribution(
        self, tech: str, days: Optional[int]
    ) -> Dict[str, int]:
        """Get distribution of job ads.

        :param tech: Technology to be queried
        :type tech: str
        :return:
        :rtype: int
        """
        pass

    @property
    def url(self) -> str:
        """Get url property.

        :return: Url property for the scraper.
        :rtype: str
        """
        return self._url


class LinkedinScraper(JobserverScraper):
    """Implement Linkedin Scraper."""

    _url = "https://www.linkedin.com/jobs/search/"

    def _get_job_count(
        self, tech: str, location: Location, days: Optional[int] = None
    ) -> int:
        params = {"keywords": tech, "location": location.value}
        if days is not None:
            params["f_TPR"] = f"r{(days + 1)*SECONDS_PER_DAY}"
        page = requests.get(self.url, params=params)
        soup = BeautifulSoup(page.content, "html.parser")
        job_elements = soup.find_all(
            "span", attrs={"class": "results-context-header__job-count"}
        )
        return int(JOB_REGEX.sub("", job_elements[0].text))

    def get_worldwide_job_count(
        self, tech: str, days: Optional[int] = None
    ) -> int:
        """Get job count for a specific tech.

        For example:

        ``https://www.linkedin.com/jobs/search/?geoId=92000000&keywords=React.js&location=Todo%20el%20mundo``

        At the time of implementation, job count is inside the following HTML
        tags:

        .. code-block:: html
            <span class="results-context-header__job-count">141,000+</span>

        So we inspect the rendered HTML and get text inside the desired tag.

        :param tech: Technology to be analyzed
        :type tech: str
        :return: Job count for the technology
        :rtype: int
        """
        return self._get_job_count(tech, Location.WORLDWIDE)

    def get_job_count_distribution(
        self, tech: str, days: Optional[int] = None
    ) -> Dict[str, int]:
        """Get job count distribution from Linkedin.

        :param tech: Technology to be queried
        :type tech: str
        :return: A dictionary with ``(location, count)`` pairs
        :rtype: Dict[str, int]
        """
        return {
            location.value: self._get_job_count(tech, location)
            for location in Location
            if location != Location.WORLDWIDE
        }
