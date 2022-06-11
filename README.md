## Amorr

Amorr is a marketplace that connects clients to service providers or freelancers who provide a multitude of different services.

## Motivation

For better customer experiences, Amorr allows for the services to be performed at the customer’s residency, eliminating the need for the customer to travel to specific locations where the service would normally be performed.

The services hosted on the app include barbers and hairdressers, makeup artists, cleaners, spa treatments, massage treatments, eyebrows, and eyelashes.

Other benefits include providing customers with convenience, eliminating customer travel time and expenses.

## Installation

Tech stack:

+ Frontend: React
+ Backend: Python (Django)
+ Database: SQLite (Database may be transferred to MySQL in production environment)

### Docker

We are using docker (to make our life easier).

To install docker, check: [Get Docker - docker docs](https://docs.docker.com/get-docker/).

After docker is correctly installed, enter the `src` directory.

Before building the docker image of our project, you need to build the frontend by using npm first:

```shell
cd frontend
npm install
npm run build
```

After `npm build`, you should be able to see a directory named `build` in your `frontend` directory.

Then go back to the `src` directory:

```shell
cd ..
```

Now you can build the docker image by:

```shell
docker build -t amorr .
```

The command above means: build the docker image from current directory and tag it as "amorr".

After building the image, you can check what docker images you have by:

```shell
docker images
```

Now, you can run the docker image in a container (named "amorr-test") and mount the volumns for development by:

```shell
docker run --name amorr-test --restart unless-stopped \
        -p 8080:8000 \
        -v $(pwd)/frontend/build/:/amorr/frontend/build/ \
        -v $(pwd)/backend/:/amorr/backend/ \
        -d amorr
```

Then you should be able to visit the website at `http://localhost:8080/` in your browser.

To stop the container, use:

```shell
docker stop amorr-test
```

To remove the container, use:

```shell
docker rm amorr-test
```

To remove the built image, use:

```shell
docker rmi amorr
```

### Setup New Frontend / Backend

This is how you can setup a new frontend / backend, which is not frequently used after sprint0.

#### Setup Frontend

Firstly, please make sure `npm` is correctly installed and configured in your system.

We are using `create-react-app` for creating our react app.

To install `create-react-app`, execute:

```shell
npm install -g create-react-app
```

To create the app, execute:

```shell
create-react-app frontend
```

You may encounter such issue when creating the app (if you are using Ubuntu 20.04): `You are running Node 10.19.0. Create React App requires Node 14 or higher.`

To solve this problem, execute:

```shell
npm cache clean -f
npm install -g n
n stable
```

After the frontend app is created, you can start it by:

```shell
cd frontend
npm start
```

You should be able to get access to it at `http://localhost:3000/` in your browser.

#### Setup Backend

We are going to use `pipenv` to create our virtual environment. Make sure you have `Python 3.8.10` and `pipenv` installed in your system.

Firstly use these commands to create our virtual environment:

```shell
mkdir backend && cd backend
pipenv install django~=3.1.0
```

To activate the virtual environment, use:

```shell
pipenv shell
```

Now we can use the `startproject` command to create a new Django project:

```shell
django-admin startproject backend
```

Run the backend with:

```shell
cd backend
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8080
```

Then you should be able to get access to it at `http://localhost:8080/` in your browser.

### Database

The SQLite database is automatically installed with Django project since it is a built-in feature in Django framework.

## Contribution

We are using Git Flow model.

Branches:

+ `main`: containing the current working version
+ `develop`: the develop branches, containing the developing codes that will be merged into the `main` branch
+ `AM-**-****`: the feature branches, must start with the corresponding JIRA ticket number, containing the code for new features that will be merged into the develop branch
+ `AM-**`: the subtask branches for features, must start with the corresponding JIRA ticket number, containing part of the code for a new feature

Pull requests:

1. Clone the repository and create a new branch
2. Add / modify features
3. Perform detailed tests
4. Make a pull request with detailed description

Commit messages:

+ all commit message begin with the ticket number of the task followed by a short description of commit changes (you should be able to find one in JIRA)

