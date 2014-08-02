from web.core.handlers.main_handler import MainHandler


web_handlers = [
    (r"/", MainHandler),
]