from rest_framework import permissions
from .user import User

class admin_org(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user_type == "is_amin"