__author__ = 'tanito'

import uuid

from db_entities import GUID, Base
from sqlalchemy import Column, String, ForeignKey, Float
from sqlalchemy.orm import relationship, backref


class Transaction(Base):

    __tablename__ = "mipago_transaction"

    id = Column(GUID(), default=uuid.uuid4, nullable=False, unique=True, primary_key=True)
    user_id = Column(GUID(), ForeignKey('mipago_user.id'))
    concept = Column(String)
    amount = Column(Float)

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
        }