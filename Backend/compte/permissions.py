from rest_framework import permissions
from .user import User

class admin_org(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        user = User.objects.get(user_type="is_amin")
        return obj.user == user