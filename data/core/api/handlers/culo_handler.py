from data.core.exceptions.exceptions import APIArgError
from data.core.api.base_handlers.HandlerBaseClasses import BaseHandler


class CuloHandler(BaseHandler):

    def get(self):
        variable = self.get_argument("culo")

        if variable != "toma":
            raise APIArgError("Es distinto de toma...asi que TOMA!")

        variable += "soyeltanovayra"
        response = {"datos": variable}
        self.write(response)