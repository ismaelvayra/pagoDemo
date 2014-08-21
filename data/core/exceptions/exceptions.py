__author__ = 'tanito'


class APIError(Exception):

    def __init__(self, message, *values):
        self.err_message = message
        self.err_values = values

    def __str__(self):
        return repr(self.err_message + " " + str(self.err_values))


class APIArgError(APIError):

    def __init__(self, message, *values):
        APIError.__init__(self, message, *values)


class APINotMatchError(APIError):

    def __init__(self, message, *values):
        APIError.__init__(self, message, *values)


class APIAlreadyExistError(APIError):

    def __init__(self, message, *values):
        APIError.__init__(self, message, *values)


class APINotFound(APIError):

    def __init__(self, message, *values):
        APIError.__init__(self, message, *values)