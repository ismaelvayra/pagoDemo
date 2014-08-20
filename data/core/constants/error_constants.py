__author__ = 'tanito'


def enum(**enums):
    return type('Enum', (), enums)

APIArgErrorMsg = enum(
    EMPTY_ARG="These args shouldn't be empty",
    WRONG_ARG_TYPE="The arg type must be"
)