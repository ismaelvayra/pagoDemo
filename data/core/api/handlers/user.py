__author__ = 'tanito'

from data.core.exceptions.exceptions import APIArgError
from data.core.mi_pago_core.HandlerBaseClasses import BaseHandler
from data.core.models.db.db_entities import Session, User
from data.core.constants.error_constants import APIArgErrorMsg


class UserHandler(BaseHandler):

    def get(self):

        user = self.get_argument('user', None)
        email = self.get_argument('email', None)

        if not user and not email:
            raise APIArgError(APIArgErrorMsg.EMPTY_ARG)

        session = Session()


class AddUserHandler(BaseHandler):

    def post(self):

        user = self.get_argument('email')
        surname = self.get_argument('surname')
        name = self.get_argument('name')
        password = self.get_argument('password')
        add_user = Session()
        add_user(User(user=user, name=name, surname=surname, password=password))
        add_user.commit()
        self.write({'datos': 'ok'})

