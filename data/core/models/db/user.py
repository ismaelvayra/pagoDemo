__author__ = 'tanito'

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from data.core.models.db.db_connection import DbConnection

Base = declarative_base()

db_conn = DbConnection()


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    user = Column(String)
    name = Column(String)
    password = Column(String)

    def __repr__(self):
        return "<User(user='%s', name='%s', password='%s')>" % (
                            self.user, self.name, self.password)

Base.metadata.create_all(db_conn.get_db_connection())
