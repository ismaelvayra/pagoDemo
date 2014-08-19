__author__ = 'tanito'


class APIArgError(Exception):

    def __init__(self, message):
        self.valor = message

    def __str__(self):
        return repr(self.valor)