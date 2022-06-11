## Docker

We are using docker (to make our life easier).

To install docker, check: [Get Docker - docker docs](https://docs.docker.com/get-docker/).

After docker is correctly installed, enter the `src` directory.

Before building the docker image of our project, you need to build the frontend by using npm first:

```
cd frontend
npm install
npm run build
```

After `npm build`, you should be able to see a directory named `build` in your `frontend` directory.

Then go back to the `src` directory:

```
cd ..
```

Now you can build the docker image by:

```
docker build -t amorr .
```

The command above means: build the docker image from current directory and tag it as "amorr".

After building the image, you can check what docker images you have by:

```
docker images
```

Now, you can run the docker image in a container (named "amorr-test") and mount the volumns for development by:

```
docker run --name amorr-test --restart unless-stopped \
        -p 8080:8000 \
        -v $(pwd)/frontend/build/:/amorr/frontend/build/ \
        -v $(pwd)/backend/:/amorr/backend/ \
        -d amorr
```

Then you should be able to visit the website at `http://localhost:8080/` in your browser.

To stop the container, use:

```
docker stop amorr-test
```

To remove the container, use:

```
docker rm amorr-test
```

To remove the built image, use:

```
docker rmi amorr
```



## Frontend

- ### Axios

  - New axios docs website https://axios-http.com/

  - Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface.

  - Feature we used: Make [http](http://nodejs.org/api/http.html) requests

  - #### Installing using npm

    - ```$ npm install axios```

  - #### POST Requests

    How to perform POST requests with Axios

    Performing a `POST` request

    ```js
    axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    ```

    Performing multiple concurrent requests

    ```js
    function getUserAccount() {
      return axios.get('/user/12345');
    }
    
    function getUserPermissions() {
      return axios.get('/user/12345/permissions');
    }
    
    Promise.all([getUserAccount(), getUserPermissions()])
      .then(function (results) {
        const acct = results[0];
        const perm = results[1];
      });
    ```

    

    



- ### React router

  - ##### Reactrouter Docs: https://reactrouter.com/docs/en/v6

  - ##### npm install ``` $ npm install react-router-dom@6```

  - ##### Configuring Routes (more on https://reactrouter.com/docs/en/v6/getting-started/overview#configuring-routes)

    ```
    import ReactDOM from "react-dom/client";
    import {
      BrowserRouter,
      Routes,
      Route,
    } from "react-router-dom";
    // import your route components too
    
    const root = ReactDOM.createRoot(
      document.getElementById("root")
    );
    root.render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
    ```

    In previous versions of React Router you had to order your routes a certain way to get the right one to render when multiple routes matched an ambiguous URL. V6 is a lot smarter and will pick the most specific match so you don't have to worry about that anymore. For example, the URL `/teams/new` matches both of these route:

    ```
    <Route path="teams/:teamId" element={<Team />} />
    <Route path="teams/new" element={<NewTeamForm />} />
    ```

    But `teams/new` is a more specific match than `/teams/:teamId`, so `<NewTeamForm />` will render.

    ##### Navigation

    Use `Link` to let the user change the URL or `useNavigate` to do it yourself (like after form submissions):

    ```
    import { Link } from "react-router-dom";
    
    function Home() {
      return (
        <div>
          <h1>Home</h1>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="about">About</Link>
          </nav>
        </div>
      );
    }
    import { useNavigate } from "react-router-dom";
    
    function Invoices() {
      let navigate = useNavigate();
      return (
        <div>
          <NewInvoiceForm
            onSubmit={async (event) => {
              let newInvoice = await createInvoice(
                event.target
              );
              navigate(`/invoices/${newInvoice.id}`);
            }}
          />
        </div>
      );
    }
    ```

    ## 



## Backend (Django)

- #### Useful resources: 

  - W3schools Django Tutorial: https://www.w3schools.com/django/index.php

- #### Views

  - Django views are Python functions that takes http requests and returns http response, like HTML documents.

    A web page that uses Django is full of views with different tasks and missions.

    Views are usually put in a file called `views.py` located on your app's folder.

    There is a `views.py` in your `members` folder that looks like this:

    `members/views.py`:

    ```python
    from django.shortcuts import render
    
    # Create your views here.
    ```

    Find it and open it, and replace the content with this:

    `members/views.py`:

    ```python
    from django.shortcuts import render
    from django.http import HttpResponse
    
    def index(request):
        return HttpResponse("Hello world!")
    ```

    This is a simple example on how to send a response back to the browser.

    But how can we execute the view? Well, we must call the view via a URL.

- #### URLs

  - Create a file named `urls.py` in the same folder as the `views.py` file, and type this code in it:

    `members/urls.py`:

    ```python
    from django.urls import path
    from . import views
    
    urlpatterns = [
        path('', views.index, name='index'),
    ]
    ```

    The `urls.py` file you just created is specific for the `members` application. We have to do some routing in the root directory `myworld` as well. This may seem complicated, but for now, just follow the instructions below.

    There is a file called `urls.py` on the `myworld` folder, open that file and add the `include` module in the `import` statement, and also add a `path()` function in the `urlpatterns[]` list, with arguments that will route users that comes in via `127.0.0.1:8000/members/`.

    Then your file will look like this:

    `myworld/urls.py`:

    from django.contrib import admin
    from django.urls import include, path

    urlpatterns = [
      path('members/', include('members.urls')),
      path('admin/', admin.site.urls),
    ]

    If the server is not running, navigate to the `/myworld` folder and execute this command in the command prompt:

    py manage.py runserver

    In the browser window, type `127.0.0.1:8000/members/` in the address bar.

    ![img](https://www.w3schools.com/django/screenshot_django_hello_world.png)

  

  