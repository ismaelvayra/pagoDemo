__author__ = 'tanito'

import uuid

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID, CHAR
from sqlalchemy.orm import sessionmaker
from sqlalchemy import TypeDecorator
from sqlalchemy import Column, String, ForeignKey, Float, Enum
from sqlalchemy.orm import relationship, backref

from data.core.models.db.db_connection import DbConnection

Base = declarative_base()
db_conn = DbConnection()
Session = sessionmaker(bind=db_conn.get_db_connection())
db_session = Session()


class GUID(TypeDecorator):
    """Platform-independent GUID type.

    Uses Postgresql's UUID type, otherwise uses
    CHAR(32), storing as stringified hex values.

    """
    impl = CHAR

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(UUID())
        else:
            return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return "%.32x" % uuid.UUID(value)
            else:
                # hexstring
                return "%.32x" % value

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            return uuid.UUID(value)


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


class Transaction(Base):

    __tablename__ = "mipago_transaction"

    id = Column(GUID(), default=uuid.uuid4, nullable=False, unique=True, primary_key=True)
    user_id = Column(GUID(), ForeignKey('mipago_user.id'))
    concept = Column(String)
    amount = Column(Float)
    status = Column(Enum("ok", "pending", "canceled", name="tracker_status_enum"), nullable=False)

    # Relationship declaration
    mipago_user = relationship('User', backref=backref('mipago_transaction', order_by=id))

    def __repr__(self):
        return "<MiPagoTransaction(amount='%s', concept='%s', username='%s')>"\
               % (self.amount, self.concept, self.user_id)

    def to_dict(self):
        return {
            'id': str(self.id),
            'user_id': str(self.user_id),
            'concept': self.concept,
            'amount': self.amount,
            'status': self.status
        }


Base.metadata.create_all(db_conn.get_db_connection())
