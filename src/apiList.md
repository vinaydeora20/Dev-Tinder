# DevTInder api's:

# authROuters
- POST /signup
- POST /login
- POST /logout

# profileRoutes
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/forgotpassword

# connectionsRequestRouters
- POST /request/send/intersted/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId