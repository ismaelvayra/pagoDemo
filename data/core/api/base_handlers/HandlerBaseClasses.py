import tornado.web
from tornado.web import MissingArgumentError
import json

from data.core.exceptions.exceptions import APIError


class BaseHandler(tornado.web.RequestHandler):
    def write(self, stuff):
        response = {}
        if isinstance(stuff, dict) or isinstance(stuff, list):
            if isinstance(stuff, dict) and not stuff.has_key('r'):
                response['r'] = self.get_status()
                response['data'] = stuff.copy()
            if isinstance(stuff, dict) and 'err_msg' in stuff:
                response['r'] = stuff.pop('r')
                response['error'] = stuff.copy()
            if isinstance(stuff, list):
                response['r'] = self.get_status()
                response['data'] = stuff

            super(BaseHandler, self).write('resp(' + json.dumps(response) + ')')
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
        elif isinstance(kwargs['exc_info'][1], (AttributeError, MissingArgumentError)):
            stuff = {'err_msg': kwargs['exc_info'][1].log_message, 'values': kwargs['exc_info'][1].arg_name,
                     'r': kwargs['exc_info'][1].status_code}
            self.set_header('Content-Type', 'application/javascript')
            self.finish(stuff)
        else:
            super(BaseHandler, self).write_error(status_code, **kwargs)
