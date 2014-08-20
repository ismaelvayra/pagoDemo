__author__ = 'tanito'

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID, CHAR
from sqlalchemy.orm import relationship, backref, sessionmaker
from sqlalchemy import TypeDecorator
from data.core.models.db.db_connection import DbConnection

Base = declarative_base()
db_conn = DbConnection()
Session = sessionmaker(bind=db_conn)

class GUID(TypeDecorator):
    """Platform-independent GUID type.

    Uses Postgresql's UUID type, otherwise uses CHAR(36), storing as
    stringified hex values.

    This implementation is based on the SQLAlchemy
    `backend-agnostic GUID Type
    <http://www.sqlalchemy.org/docs/core/types.html#backend-agnostic-guid-type>`_
    example.
    """
    impl = CHAR

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(UUID())
        else:
            return dialect.type_descriptor(CHAR(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, UUID):
                return str(UUID(value))
            else:
                # hexstring
                return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            return UUID(value)


class User(Base):

    __tablename__ = "mipago_user"

    id = Column('id', GUID(), primary_key=True)
    user = Column(String)
    name = Column(String)
    surname = Column(String)
    password = Column(String)

    def __repr__(self):
        return "<MiPagoUser(user='%s', name='%s', password='%s')>"\
               % (self.user, self.name, self.password)


class Transaction(Base):

    __tablename__ = "mipago_transaction"

    id = Column(GUID(), primary_key=True)
    user_id = Column(GUID(), ForeignKey('mipago_user.id'))
    concept = Column(String)
    amount = Column(Float)

    # Relationship declaration
    mipago_user = relationship('User', backref=backref('mipago_transaction', order_by=id))

    def __repr__(self):
        return "<MiPagoTransaction(amount='%s', concept='%s', user='%s')>"\
               % (self.amount, self.concept, self.user_id)

Base.metadata.create_all(db_conn.get_db_connection())
