from data.core.exceptions.exceptions import APIError

import tornado.web
import json


class BaseHandler(tornado.web.RequestHandler):

    def write(self, stuff):
        if isinstance(stuff, dict):
            if not stuff.has_key('r'):
                stuff['r'] = self.get_status()
            super(BaseHandler, self).write('resp(' + json.dumps(stuff) + ')')
            self.set_header('Content-Type', 'application/javascript')
        else:
            super(BaseHandler, self).write(stuff)

    def send_error(self, status_code=500, **kwargs):
        super(BaseHandler, self).send_error(200, **kwargs)
        # self.write_error()

    def write_error(self, status_code, **kwargs):
        if isinstance(kwargs['exc_info'][1], APIError):
            stuff = {'err_msg': kwargs['exc_info'][1].err_message, 'values': list(kwargs['exc_info'][1].err_values),
                     'r': 500}
            self.set_header('Content-Type', 'application/javascript')
            self.finish(stuff)
        else:
            super(BaseHandler, self).write_error(status_code, **kwargs)
