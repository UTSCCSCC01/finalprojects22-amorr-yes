def logout(request):
    request.session.flush()
