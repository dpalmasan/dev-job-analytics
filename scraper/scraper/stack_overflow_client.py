"""Implement Stack Exchange client for API requests."""
from abc import ABC
from abc import abstractmethod
from typing import Optional

import requests


class StackOverflowResource(ABC):
    """Represent a resource from Stack Exchange API."""

    base_uri = "https://api.stackexchange.com/2.3"
    endpoint = ""

    def __init__(self):
        """Start a session."""
        self.session = requests.Session()

    @property
    def uri(self):
        """Resource URI."""
        return f"{self.base_uri}/{self.endpoint}"

    def request(self, method, uri, **kwargs):
        """Send request to an uri.

        User-Agent and Content-Type headers are set in this wrapper. Since
        Content-Type is JSON, we just return a JSON.

        :param method: HTTP method (e.g. GET, POST)
        :type method: str
        :param uri: URI to send the request to.
        :type uri: str
        :return: Response from the server
        :rtype: json
        """
        headers = {
            "User-Agent": "python-stackoverflow/",
            "Content-Type": "application/json",
        }
        response = self.session.request(method, uri, headers=headers, **kwargs)
        response.raise_for_status()
        return response

    @abstractmethod
    def get(self):
        """Get request to resource."""
        pass


class Questions(StackOverflowResource):
    """Questions resource."""

    endpoint = "questions"

    def get(self, **kwargs):
        """Implement get resuest for /questions resource."""
        results = self.request("GET", self.uri, **kwargs)
        return results.json()

    def get_total_questions(
        self,
        start_ts: Optional[int] = None,
        end_ts: Optional[int] = None,
        tag: Optional[str] = None,
    ) -> int:
        """Get the total number of questions in Stack Overflow.

        :param start_ts: Start date of interests, defaults to None
        :type start_ts: Optional[int], optional
        :param end_ts: End date, defaults to None
        :type end_ts: Optional[int], optional
        :param tag: Tags of interest (e.g. javascript, react), defaults to None
        :type tag: Optional[str], optional
        :return: The number of questions.
        :rtype: int
        """
        params = {
            "site": "stackoverflow",
            "filter": "total",
        }
        if tag is not None:
            params["tagged"] = tag
        if start_ts is not None:
            params["start_ts"]
        if tag is not None:
            params["tagged"] = tag
        results = self.get(params=params)
        return int(results["total"])
