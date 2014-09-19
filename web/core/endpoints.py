from web.core.handlers.rendering import MainHandler, TestHandler, SalesHandler, MenuHandler, TransactionHandler
import tornado.web


web_handlers = [
    (r"/", MainHandler),
    (r"/test", TestHandler),
    (r"/transaction", TransactionHandler),
    (r"/menu", MenuHandler),
    (r"/sales", SalesHandler),

#     Static handlers
    (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "static_path"}),
]