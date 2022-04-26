from rest_framework import permissions
from .user import User

class autorisation(permissions.BasePermission):
    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)

        if not is_authenticated:
            return False

        return request.user.is_autorise
    # def has_permission(self, request, view):
    #     return bool(
    #         request.user and request.user.is_authenticated
    #         and request.user.is_autorise 
    #     )
       


 