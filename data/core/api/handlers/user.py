import json

__author__ = 'tanito'

from sqlalchemy import or_

from data.core.exceptions.exceptions import (
    APIArgError,
    APINotMatchError,
    APIAlreadyExistError,
    APINotFound
)
from data.core.api.base_handlers.HandlerBaseClasses import BaseHandler
from data.core.models.db.db_entities import db_session, User, Transaction
from data.core.constants.error_constants import APIErrorMsg


class UserHandler(BaseHandler):

    def get(self):

        args = {
            'username': self.get_argument('username', None),
            'user_id': self.get_argument('id', None) if self.get_argument('id', None) else None,
        }

        if not args['username'] and not args['user_id']:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "username", "id")

        user = db_session.query(User).filter(
            or_(
                User.username == args['username'],
                User.id == args['user_id']
            )
        ).first()

        if args['user_id'] and args['username'] and (
                (str(user.id) == args['user_id'] and args['username'] != user.username) or
                (str(user.id) != args['user_id'] and args['username'] == user.username)):
            raise APINotMatchError(APIErrorMsg.FIELDS_NOT_MATCH, "username", "id")

        if user is None:
            raise APINotMatchError(APIErrorMsg.NOT_FOUND, "username")

        self.write(user.to_dict())


class UsersHandler(BaseHandler):

    def get(self):

        args = {
            'users': json.loads(self.get_argument('users', None)) if self.get_argument('users', None) else None,
        }

        if args['users'] is None:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "users")

        users = [u.to_dict() for u in db_session.query(User).filter(
            User.id.in_(tuple(args['users'])) if args['users'] is not None else None,
        ).all()]

        self.write(users)


class AddUserHandler(BaseHandler):

    def get(self):

        args = {
            'username': self.get_argument('username'),
            'surname': self.get_argument('surname'),
            'name': self.get_argument('name'),
            'password': self.get_argument('password'),
        }

        user = db_session.query(User).filter(
            User.username == args['username'],
        ).first()
        if user is not None:
            raise APIAlreadyExistError(APIErrorMsg.ALREADY_IN_USE, "username")

        new_user = User(
            username=args['username'],
            name=args['name'],
            surname=args['surname'],
            password=args['password']
        )
        db_session.add(new_user)
        db_session.commit()
        self.write(new_user.to_dict())


class EditUserHandler(BaseHandler):

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


class DeleteUserHandler(BaseHandler):

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

        db_session.query(Transaction).filter(
            Transaction.user_id == args['id']
        ).delete()

        db_session.delete(user)
        db_session.commit()
        self.write({'deleted': 'ok'})
