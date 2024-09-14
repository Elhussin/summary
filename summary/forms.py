
from summary.models import User
from django.forms import ModelForm, TextInput, EmailInput, PasswordInput


class UserRegistraForm(ModelForm):
    """Class for the User Registration Form"""
    
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password']
        widgets = {
            'first_name': TextInput(attrs={
                'class': "form-control",
                'style': 'width: 400px; max-width:90%; margin:auto;',
                'placeholder': 'First Name'
            }),

            'last_name': TextInput(attrs={
                'class': "form-control",
                'style': 'width: 400px; max-width:90%; margin:auto;',
                'placeholder': 'Last Name'
            }),
            'username': TextInput(attrs={
                'class': "form-control",
                'style': 'width: 400px; max-width:90%; margin:auto;',
                'placeholder': 'User Name'
            }),

            'email': EmailInput(attrs={
                'class': "form-control",
                'style': 'width: 400px; max-width:90%; margin:auto;',
                'placeholder': 'Email'
            }),
            'password': PasswordInput(attrs={
                'class': "form-control",
                'style': 'width: 400px; max-width:90%; margin:auto;',
                'placeholder': 'Password'
            }),
        }
