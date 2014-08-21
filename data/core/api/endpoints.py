from data.core.api.handlers.culo_handler import CuloHandler
from data.core.api.handlers.user import (
    UserHandler,
    AddUserHandler,
    EditUserHandler,
)


data_handlers = [
    (r"/papein", CuloHandler),
    (r"/api/get_user", UserHandler),
    (r"/api/add_user", AddUserHandler),
    (r"/api/edit_user", EditUserHandler)
]