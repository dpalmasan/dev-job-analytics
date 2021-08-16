"""Test stackoverflow client."""
import pytest
from mock import MagicMock

from scraper import stack_overflow_client


@pytest.fixture(autouse=True)
def requests(monkeypatch):
    """Fixture to mock requests Session."""
    # Mock get method to read from data folder.
    def request(method, url, headers, **kwargs):
        """Mock get method from ``requests`` to read html from file."""
        result = MagicMock()
        result.json.return_value = {
            "total": 1434,
        }
        return result

    session = MagicMock()
    session().request = request
    monkeypatch.setattr(stack_overflow_client.requests, "Session", session)


def test_get_total_questions():
    """Test get_total_question using mock."""
    so_client = stack_overflow_client.Questions()
    assert so_client.get_total_questions() == 1434
