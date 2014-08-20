import tornado.web
import json


class BaseHandler(tornado.web.RequestHandler):
    def write(self, stuff):
        super(BaseHandler, self).write('resp(' + json.dumps(stuff) + ')')
        self.set_header('Content-Type', 'application/javascript')