from data.core.api.handlers.user import (
    UserHandler,
    AddUserHandler,
    EditUserHandler,
    DeleteUserHandler,
    UsersHandler,
)

from data.core.api.handlers.transaction import (
    TransactionHandler,
    TransactionsHandler,
    EditTransactionHandler,
    AddTransactionHandler,
    DeleteTransactionHandler,
)


data_handlers = [

    # USER CRUD
    (r"/api/user/get", UserHandler),
    (r"/api/user/add", AddUserHandler),
    (r"/api/user/edit", EditUserHandler),
    (r"/api/user/delete", DeleteUserHandler),
    (r"/api/users", UsersHandler),

    # TRANSACTION CRUD
    (r"/api/transaction/get", TransactionHandler),
    (r"/api/transaction/add", AddTransactionHandler),
    (r"/api/transaction/edit", EditTransactionHandler),
    (r"/api/transaction/delete", DeleteTransactionHandler),
    (r"/api/transactions", TransactionsHandler),
]