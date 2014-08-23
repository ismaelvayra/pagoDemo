from data.core.api.handlers.culo_handler import CuloHandler
from data.core.api.handlers.user import (
    UserHandler,
    AddUserHandler,
    EditUserHandler,
    DeleteUserHandler,
    UsersHandler,
)


data_handlers = [
    (r"/papein", CuloHandler),

    # USER CRUD
    (r"/api/user/get", UserHandler),
    (r"/api/user/add", AddUserHandler),
    (r"/api/user/edit", EditUserHandler),
    (r"/api/user/delete", DeleteUserHandler),
    (r"/api/users", UsersHandler),
]