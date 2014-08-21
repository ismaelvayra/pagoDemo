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
        user_id = self.get_argument('id', None)

        if not username and not user_id:
            raise APIArgError(APIErrorMsg.EMPTY_ARG, "username", "id")

        user = db_session.query(User).filter(
            or_(
                User.username == username,
                User.id == user_id
            )
        ).first()

        if user_id is not None and username is not None and \
                (str(user.id) == user_id and username != user.username) or\
                (str(user.id) != user_id and username == user.username):
            raise APINotMatchError(APIErrorMsg.FIELDS_NOT_MATCH, "username", "id")

        self.write(
            {
                'data': {
                    'id': str(user.id),
                    'username': user.username,
                    'name': user.name,
                    'surname': user.surname,
                },
                'result': 'ok'
            })


class AddUserHandler(BaseHandler):

    def post(self):

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
        self.write({'result': 'ok'})


class EditUserHandler(BaseHandler):

    def post(self):

        args = {
            'id': self.get_argument('id'),
            'username': self.get_argument('username', None),
            'surname': self.get_argument('surname', None),
            'name': self.get_argument('name', None),
            'password': self.get_argument('password', None),
        }

        user = db_session.query(User).filter(
            User.username == args['username'],
        ).first()
        if user:
            raise APIAlreadyExistError(APIErrorMsg.ALREADY_IN_USE, "username: %s" % args['username'])

        edited_user = db_session.query(User).filter(
            User.id == args['id'],
        ).first()

        if edited_user is None:
            raise APINotFound(APIErrorMsg.NOT_FOUND, "id: %s" % args['id'])

        user_changed = False
        for key, val in args.iteritems():
            if key != 'id' and edited_user.__dict__[key] != val:
                user_changed = True
                edited_user.__dict__[key] = val

        if user_changed:
            # db_session.add(edited_user)
            db_session.commit()
        self.write({'result': 'ok'})


class DeleteUserHandler(BaseHandler):

    def post(self):

        username = self.get_argument('username')
        surname = self.get_argument('surname')
        name = self.get_argument('name')
        password = self.get_argument('password')

        get_user = db_session()
        user = get_user.query(User).filter(
                User.username == username,
        ).first()
        if user.username == username:
            raise APIAlreadyExistError(APIErrorMsg.ALREADY_IN_USE, "username")

        new_user = User(username=username, name=name, surname=surname, password=password)
        add_user = db_session()
        add_user.add(new_user)
        add_user.commit()
        self.write({'result': 'ok'})

