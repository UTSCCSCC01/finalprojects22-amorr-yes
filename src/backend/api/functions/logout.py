def logout(request):
    request.session.flush()
    return 1