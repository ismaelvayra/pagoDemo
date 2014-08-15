import json

from data.core.mi_pago_core.HandlerBaseClasses import BaseHandler


class CuloHandler(BaseHandler):

    def get(self):
        variable = self.get_argument("culo")
        variable += "japi"
        response = {"datos": variable}
        self.write(response)