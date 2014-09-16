from web.core.handlers.main_handler import MainHandler, TestHandler, SalesHandler, MenuHandler
import tornado.web


web_handlers = [
    (r"/", MainHandler),
    (r"/test", TestHandler),
    (r"/menu", MenuHandler),
    (r"/sales", SalesHandler),

#     Static handlers
    (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "static_path"}),
]