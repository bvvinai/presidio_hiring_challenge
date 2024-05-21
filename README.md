Teck Stack:
    
    Proxy Server: Nginx
    Frontend: React js
    Backend: Node js
    Database: Mongo Db (Atlas)
    Containerization: Docker
    Cloud Hosting: AWS Beanstalk

Features Added:

    -> Form Validation
    -> Pagination
    -> Mandate Login for buyers to view the seller details. (login redirect)
    -> Like button updated live.
    -> Email sent to both parties when interested.

Local hosting setup:

    Backend: (http://localhost:4000)

        -> cd /backend
        -> npm i
        -> npm run dev

    Frontend: (http://localhost:3000)

        -> cd /frontend
        -> npm i
        -> npm start

    Database: MongoDb (Atlas Cluster)

Production hosting setup:

    Elastic Beanstalk (Docker Environment):

        -> url: http://presidio.ap-south-1.elasticbeanstalk.com

        -> Docker Compose file

            -> Backend (Docker Container)
            -> Frontend (Docker Container)
            -> Database: MongoDb (Atlas Cluster)
            -> Nginx proxy: (Docker Container)

Routes and API's:

    Frontend:

        -> /                                      - home page (listing page)
        -> /login                                 - login page (both seller and buyer)
        -> /register                              - register page (both seller and buyer)
        -> /properties                            - list of seller properties (My Properties)
        -> /properties/addprop                    - Add a property for sale
        -> /properties/updateprop/:prop_id        - Update a property already posted
        -> /getseller/:prop_id                    - get seller details of that property
    
    Backend:

        -> /api/register
        -> /api/login
        -> /api/profile
        -> /api/logout
        -> /api/getallitems/:page_no        
        -> /api/search
        -> /api/getmyitems
        -> /api/getitembyid/:id
        -> /api/getsellerbyid/:id
        -> /api/updateitem/:id
        -> /api/deleteitem/:id
        -> /api/postitem
        -> /api/likeProp/:id
        -> /api/unlikeProp/:id