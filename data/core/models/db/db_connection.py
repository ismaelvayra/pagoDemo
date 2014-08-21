from sqlalchemy import create_engine

from data.core.constants.api_constants import DATABASE


class Singleton(type):

    def __init__(cls, name, bases, dct):
        cls.__instance = None
        type.__init__(cls, name, bases, dct)

    def __call__(cls):
        if cls.__instance is None:
            cls.__instance = type.__call__(cls)
        return cls.__instance


class DbConnection:
    """
    This class does the db connection using singleton
    """
    __metaclass__ = Singleton

    def __init__(self):
        self.engine = None
        self.set_db_connection()

    def get_db_connection(self):
        return self.engine

    def set_db_connection(self):
        self.engine = create_engine("postgresql://%s:%s@%s/%s" % (
            DATABASE['adminUser'],
            DATABASE['password'],
            DATABASE['host_db'],
            DATABASE['database'],
        ))
