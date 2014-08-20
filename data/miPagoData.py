import tornado.ioloop
import tornado.web
import tornado.httpserver

from data.core.api.endpoints import data_handlers


class Application(tornado.web.Application):
    def __init__(self):
        handlers = data_handlers
        tornado.web.Application.__init__(self, handlers)


def main():
    app = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(9000)

    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()