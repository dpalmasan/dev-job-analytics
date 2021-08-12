"""Schema definitions for Jobserver."""
from mongoengine import DateTimeField
from mongoengine import Document
from mongoengine import EmbeddedDocument
from mongoengine import EmbeddedDocumentField
from mongoengine import IntField
from mongoengine import ListField
from mongoengine import StringField


class CountryJobCount(EmbeddedDocument):
    """Represent a country in a job distribution by country."""

    name = StringField()
    jobs = IntField()


class JobserverRecord(Document):
    """Represent a record based on schema."""

    name = StringField()
    date = DateTimeField()
    jobs_total = IntField()
    countries = ListField(EmbeddedDocumentField(CountryJobCount))

    # To be consistent with mongoose, we use the collection name
    # "jobserver_records"
    meta = {"indexes": [("name", "date")], "collection": "jobserver_records"}
