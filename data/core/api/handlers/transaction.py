from data.core.models.db.transaction import Transaction

__author__ = 'tanito'

from sqlalchemy import or_

from data.core.exceptions.exceptions import (
    APIArgError,
    APINotMatchError,
    APIAlreadyExistError,
    APINotFound
)
from data.core.api.base_handlers.HandlerBaseClasses import BaseHandler
from data.core.models.db.db_entities import db_session, User
from data.core.constants.error_constants import APIErrorMsg


class TransactionHandler(BaseHandler):

    def get(self):

        args = {
            'transaction_id': self.get_argument('id', None) if self.get_argument('id', None) else None,
        }

        if not args['transaction_id']:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "transaction_id")

        transaction = db_session.query(Transaction).filter(
            User.id == args['user_id']
        ).first()

        if transaction is None:
            raise APINotMatchError(APIErrorMsg.NOT_FOUND, "transaction_id", args['transaction_id'])

        self.write(transaction.to_dict())


class TransactionsHandler(BaseHandler):

    def get(self):

        args = {
            'users': list(self.get_argument('users')) if self.get_argument('users') else None,
            'transactions': list(self.get_argument('transactions')) if self.get_argument('transactions') else None,
        }

        if args['users'] is None and args['transactions'] is None:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "users", "transactions")

        transactions = [e.toDict() for e in db_session.query(Transaction).filter(
            or_(
                Transaction.user_id in args['users'],
                Transaction.id in args['transactions'],
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
        )

        if existing_user is None:
            raise APINotFound(APIErrorMsg.NOT_FOUND, 'user_id', args['user_id'])

        new_transaction = Transaction(
            user_id=args['user_id'],
            concept=args['concept'],
            amount=args['amount'],
        )
        db_session.add(new_transaction)
        db_session.commit()
        self.write(new_transaction.to_dict())


class EditTransactionHandler(BaseHandler):

    def get(self):

        args = {
            'id': self.get_argument('id'),
            'username': self.get_argument('username', None) if self.get_argument('username', None) else None,
            'surname': self.get_argument('surname', ""),
            'name': self.get_argument('name', ""),
            'password': self.get_argument('password', None) if self.get_argument('password', None) else None,
        }

        user = db_session.query(User).filter(
            User.username == args['username'],
            User.id != args['id'],
        ).first()
        if user:
            raise APIAlreadyExistError(APIErrorMsg.ALREADY_IN_USE, "username: %s" % args['username'])

        edited_user = db_session.query(User).filter(
            User.id == args['id'],
        ).first()

        if edited_user is None:
            raise APINotFound(APIErrorMsg.NOT_FOUND, "id: %s" % args['id'])

        if args['username']:
            edited_user.username = args['username']
        if args['password']:
            edited_user.password = args['password']

        edited_user.surname = args['surname']
        edited_user.name = args['name']

        # if user_changed:
        db_session.commit()

        self.write(edited_user.to_dict())


class DeleteTransactionHandler(BaseHandler):

    def get(self):

        args = {
            'id': self.get_argument('id') if self.get_argument('id') else None,
            'username': self.get_argument('username', None) if self.get_argument('username', None) else None,
        }

        if not args['username'] and not args['id']:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "username", "id")

        user = db_session.query(User).filter(
            or_(
                User.username == args['username'],
                User.id == args['id']
            )
        ).first()

        if user is None:
            raise APINotFound(APIErrorMsg.NOT_FOUND, "id: %s" % args['id'])

        if args['id'] is not None and args['username'] is not None and (
                (str(user.id) == args['id'] and args['username'] != user.username) or\
                (str(user.id) != args['id'] and args['username'] == user.username)):
            raise APINotMatchError(APIErrorMsg.FIELDS_NOT_MATCH, "username", "id")

        db_session.delete(user)
        db_session.commit()
        self.write({'deleted': 'ok'})
