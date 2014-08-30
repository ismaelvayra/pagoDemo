from web.core.handlers.main_handler import MainHandler, TestHandler
import tornado.web


web_handlers = [
    (r"/", MainHandler),
    (r"/test", TestHandler),

#     Static handlers
    (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "static_path"}),
]