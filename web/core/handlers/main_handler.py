import tornado.web


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")


class TestHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("test.html")
