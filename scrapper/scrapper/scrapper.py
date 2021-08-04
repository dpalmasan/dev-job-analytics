"""Scrapper interface and basic implementations."""
import re
from abc import ABC
from abc import abstractmethod

import requests
from bs4 import BeautifulSoup


JOB_REGEX = re.compile(r"[^0-9]")


class JobserverScrapper(ABC):
    """Abstract class for scrappers."""

    @abstractmethod
    def get_worldwide_job_count(self, tech: str) -> int:
        """Get job count for a specific tech.

        :param tech: Technology to be analyzed.
        :type tech: str
        :return: Job count.
        :rtype: int
        """
        pass


@JobserverScrapper.register
class LinkedinScrapper:
    """Implement Linkedin Scrapper."""

    _url = "https://www.linkedin.com/jobs/search/"

    def get_worldwide_job_count(self, tech: str) -> int:
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
        page = requests.get(
            self.url, params={"keywords": tech, "location": "Todo el mundo"}
        )
        soup = BeautifulSoup(page.content, "html.parser")
        job_elements = soup.find_all(
            "span", attrs={"class": "results-context-header__job-count"}
        )
        return int(JOB_REGEX.sub("", job_elements[0].text))

    @property
    def url(self) -> str:
        """Get url property.

        :return: Url property for the scrapper.
        :rtype: str
        """
        return self._url
