__author__ = 'tanito'


def enum(**enums):
    return type('Enum', (), enums)

APIErrorMsg = enum(
    EMPTY_ARG="These args shouldn't be empty.",
    WRONG_ARG_TYPE="The arg type must be",
    FIELDS_NOT_MATCH="These fields don't match.",
    ALREADY_IN_USE="This field is already in use.",
    NOT_FOUND="Entity not found."
)
