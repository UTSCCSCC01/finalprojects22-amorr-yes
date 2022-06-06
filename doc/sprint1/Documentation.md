### Docker

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