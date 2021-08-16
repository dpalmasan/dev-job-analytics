"""Schema definitions for Jobserver."""
from mongoengine import DateTimeField
from mongoengine import Document
from mongoengine import IntField
from mongoengine import StringField


class StackOverflowQuestion(Document):
    """Represent a record based on schema."""

    tag = StringField()
    date = DateTimeField()
    count = IntField()

    meta = {"indexes": [("tag", "date")], "collection": "so_questions"}
