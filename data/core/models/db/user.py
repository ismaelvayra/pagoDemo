__author__ = 'tanito'

import uuid

from sqlalchemy import Column, String
from db_entities import GUID, Base


class User(Base):

    __tablename__ = "mipago_user"

    id = Column(GUID(), default=uuid.uuid4, nullable=False, unique=True, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    name = Column(String)
    surname = Column(String)
    password = Column(String)

    def __repr__(self):
        return "<MiPagoUser(username='%s', name='%s', password='%s')>"\
               % (self.username, self.name, self.password)

    def to_dict(self):
        return {
            'id': str(self.id),
            'username': self.username,
            'name': self.name,
            'surname': self.surname,
            'password': self.password,
        }
