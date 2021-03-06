import tornado.web


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")


class TestHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("test.html")


class MenuHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("menu.html")


class SalesHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("sales.html")


class TransactionHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("transaction.html")