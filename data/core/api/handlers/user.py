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


class UserHandler(BaseHandler):

    def get(self):

        username = self.get_argument('username', None)
        user_id = self.get_argument('id', None) if self.get_argument('id', None) else None

        if not username and not user_id:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "username", "id")

        user = db_session.query(User).filter(
            or_(
                User.username == username,
                User.id == user_id
            )
        ).first()

        if user_id and username and \
                (str(user.id) == user_id and username != user.username) or\
                (str(user.id) != user_id and username == user.username):
            raise APINotMatchError(APIErrorMsg.FIELDS_NOT_MATCH, "username", "id")

        self.write({
            'data': {
                'id': str(user.id),
                'username': user.username,
                'name': user.name,
                'surname': user.surname,
            },
        })


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
        self.write({
            'data': {
                'id': str(new_user.id),
                'username': new_user.username,
                'name': new_user.name,
                'surname': new_user.surname,
            },
        })


class EditUserHandler(BaseHandler):

    def get(self):

        args = {
            'id': self.get_argument('id'),
            'username': self.get_argument('username', None),
            'surname': self.get_argument('surname', None),
            'name': self.get_argument('name', None),
            'password': self.get_argument('password', None),
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
        else:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, 'username')
        if args['password']:
            edited_user.password = args['password']
        else:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, 'password')

        edited_user.surname = args['surname']
        edited_user.name = args['name']

        # if user_changed:
        db_session.commit()

        self.write(
            {
                'data': {
                    'id': str(edited_user.id),
                    'username': edited_user.username,
                    'name': edited_user.name,
                    'surname': edited_user.surname,
                },
            })


class DeleteUserHandler(BaseHandler):

    def get(self):

        args = {
            'id': self.get_argument('id'),
            'username': self.get_argument('username', None),
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

        if args['id'] is not None and args['username'] is not None and \
                (str(user.id) == args['id'] and args['username'] != user.username) or\
                (str(user.id) != args['id'] and args['username'] == user.username):
            raise APINotMatchError(APIErrorMsg.FIELDS_NOT_MATCH, "username", "id")

        db_session.delete(user)
        db_session.commit()
        self.write({'deleted': 'ok'})
