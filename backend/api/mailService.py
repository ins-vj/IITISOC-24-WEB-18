from django.core import mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def welcome_mail(to: str):
    subject = 'Welcome To expresso'
    html_message = render_to_string('welcome-mail.html')
    plain_message = strip_tags(html_message)

    mail.send_mail(subject, plain_message, None, [to], html_message=html_message)


def invite_mail(toUsers, username: str, url: str):
    subject = 'Meeting Invitation'
    context = {'username': username, 'url': url}
    html_message = render_to_string('invite-mail.html', context)
    plain_message = strip_tags(html_message)

    mail.send_mail(subject, plain_message, None, toUsers, html_message=html_message)
