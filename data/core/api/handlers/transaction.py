__author__ = 'tanito'
import json

from sqlalchemy import or_

from data.core.exceptions.exceptions import (
    APIArgError,
    APINotMatchError,
    APINotFound
)
from data.core.api.base_handlers.HandlerBaseClasses import BaseHandler
from data.core.models.db.db_entities import db_session, User, Transaction
from data.core.constants.error_constants import APIErrorMsg


class TransactionHandler(BaseHandler):

    def get(self):

        args = {
            'transaction_id': self.get_argument('transaction_id', None) if self.get_argument('transaction_id', None) else None,
        }

        if not args['transaction_id']:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "transaction_id")

        transaction = db_session.query(Transaction).filter(
            Transaction.id == args['transaction_id']
        ).first()

        if transaction is None:
            raise APINotMatchError(APIErrorMsg.NOT_FOUND, "transaction_id", args['transaction_id'])

        self.write(transaction.to_dict())


class TransactionsHandler(BaseHandler):

    def get(self):

        args = {
            'users': json.loads(self.get_argument('users', None)) if self.get_argument('users', None) else None,
            'transactions': json.loads(self.get_argument('transactions', None)) if self.get_argument('transactions', None) else None,
        }

        if args['users'] is None and args['transactions'] is None:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "users", "transactions")

        transactions = [e.to_dict() for e in db_session.query(Transaction).filter(
            or_(
                Transaction.user_id.in_(tuple(args['users'])) if args['users'] is not None else None,
                Transaction.id.in_(tuple(args['transactions'])) if args['transactions'] is not None else None,
            )
        ).all()]

        self.write(transactions)


class AddTransactionHandler(BaseHandler):

    def get(self):

        args = {
            'user_id': self.get_argument('user_id'),
            'concept': self.get_argument('concept'),
            'amount': self.get_argument('amount'),
        }

        existing_user = db_session.query(User).filter(
            User.id == args['user_id'],
        ).first()

        if existing_user is None:
            raise APINotFound(APIErrorMsg.NOT_FOUND, 'user_id', args['user_id'])

        new_transaction = Transaction(
            user_id=args['user_id'],
            concept=args['concept'],
            amount=args['amount'],
            status="pending",
        )
        db_session.add(new_transaction)
        db_session.commit()
        self.write(new_transaction.to_dict())


class DeleteTransactionHandler(BaseHandler):

    def get(self):

        args = {
            'transaction_id': self.get_argument('transaction_id', None) if self.get_argument('transaction_id', None) else None,
        }

        if not args['transaction_id']:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "transaction_id")

        transaction = db_session.query(Transaction).filter(
            Transaction.id == args['transaction_id'],
        ).first()

        if transaction is None:
            raise APINotFound(APIErrorMsg.NOT_FOUND, "id: %s" % args['transaction_id'])

        db_session.delete(transaction)
        db_session.commit()
        self.write({'deleted': 'ok'})
