from data.core.api.handlers.culo_handler import CuloHandler
from data.core.api.handlers.user import UserHandler


data_handlers = [
    (r"/papein", CuloHandler),
    (r"/api/get_user", UserHandler)
]