from django import forms
from summary.models import User
from django import forms
from django.forms import ModelForm, TextInput, EmailInput,PasswordInput

class UserRegistrationForm(forms.ModelForm):
    # password = forms.CharField(widget=forms.PasswordInput)

    # class Meta:
    #     model = User
    #     fields = ['email', 'first_name', 'last_name', 'password']
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name','password']
        widgets = {
            'first_name': TextInput(attrs={
                'class': "form-control",
                'style': 'max-width: 300px;',
                'placeholder': 'First Name'
                }),
 
            'last_name': TextInput(attrs={
                'class': "form-control",
                'style': 'max-width: 300px;',
                'placeholder': 'Last Name'
                }),
            
            'email': EmailInput(attrs={
                'class': "form-control", 
                'style': 'max-width: 300px;',
                'placeholder': 'Email'
                }),
            'password': PasswordInput(attrs={
                'class': "form-control", 
                'style': 'max-width: 300px;',
                'placeholder': 'Password'
                }),

        }