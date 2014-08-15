from web.core.handlers.main_handler import MainHandler
import tornado.web


web_handlers = [
    (r"/", MainHandler),

#     Static handlers
    (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": "static_path"}),
]