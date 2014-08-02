import tornado.ioloop
import tornado.web
import tornado.httpserver

from web.core.endpoints import web_handlers
import Settings


class Application(tornado.web.Application):
    def __init__(self):
        handlers = web_handlers
        settings = {
            "template_path": Settings.TEMPLATE_PATH,
            "static_path": Settings.STATIC_PATH,
        }
        tornado.web.Application.__init__(self, handlers, **settings)


def main():
    app = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(9999)

    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()