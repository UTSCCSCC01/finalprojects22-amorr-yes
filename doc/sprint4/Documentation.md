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

    



- ### React Checkbox(Sprint 3)

  - ##### React checkbox doc: https://mdui-docs-en.netlify.app/selection_control.html

  - ##### Checkbox is a component of MDUI

    more on https://mdui-docs-en.netlify.app/selection_control.html

    ```
    <label class="mdui-checkbox">
      <input type="checkbox"/>
      <i class="mdui-checkbox-icon"></i>
      Not selected by default
    </label>
    
    <label class="mdui-checkbox">
      <input type="checkbox" checked/>
      <i class="mdui-checkbox-icon"></i>
      Selected by default
    </label>
    
    <label class="mdui-checkbox">
      <input type="checkbox" disabled/>
      <i class="mdui-checkbox-icon"></i>
      Disabled and unchecked
    </label>
    
    <label class="mdui-checkbox">
      <input type="checkbox" disabled checked/>
      <i class="mdui-checkbox-icon"></i>
      Disabled, and selected
    </label>
    
    <label class="mdui-checkbox">
      <input type="checkbox" id="indeterminate-demo1"/>
      <i class="mdui-checkbox-icon"></i>
      Indeterminate state
    </label>
    <script>
      // The indeterminate property can only be set via JavaScript
      document.getElementById('indeterminate-demo1').indeterminate = true;
    </script>
    
    <label class="mdui-checkbox">
      <input type="checkbox" disabled id="indeterminate-demo2"/>
      <i class="mdui-checkbox-icon"></i>
      Disabled, and indeterminate status
    </label>
    <script>
      document.getElementById('indeterminate-demo2').indeterminate = true;
    </script>
    ```

    If and only if the element Checked or Disabled is empty, the checkbox will not be selected or disabled. 

  - ##### To set the default value of Checkbox

    ```
    let check=true
    <label class="mdui-checkbox">
      <input type="checkbox" checked={check?"true":""}/>
      <i class="mdui-checkbox-icon"></i>
      Selected by default
    </label>
    ```

    Whether the checkbox is defaultly selected is based on the bool value of check.





- ### Hide content (MDUI) (Sprint 4)

  - Related document: https://mdui-docs-en.netlify.app/helper.html

  - #### Hide content (Can be used to adjust navbar components according to user types)

    - `.mdui-hidden` The class is used to hide elements, which is equivalent to adding styles `display: none;`, The hidden elements do not occupy page space.
    - `.mdui-invisible` The class is used to make the element invisible, but still occupy space on the page, which is equivalent to adding styles `visibility: hidden;`。

  - #### Responsive tools

    These tools use media queries to hide content for different devices. These tools include:

    - `.mdui-hidden-*`: Hide on the device of the specified width.
    - `.mdui-hidden-*-up`: Hide on devices with a specified width and above.
    - `.mdui-hidden-*-down`: Hide on devices with a specified width and below.

    |                        | Ultra-small screen <600px | Small screen >=600px - <1024px | Medium screen >=1024px - <1440px | big screen >=1440px - <1920px | Large screen >=1920px |
    | :--------------------- | :------------------------ | :----------------------------- | :------------------------------- | :---------------------------- | :-------------------- |
    | `.mdui-hidden-xs`      | hide                      | visible                        | visible                          | visible                       | visible               |
    | `.mdui-hidden-sm`      | visible                   | hide                           | visible                          | visible                       | visible               |
    | `.mdui-hidden-md`      | visible                   | visible                        | hide                             | visible                       | visible               |
    | `.mdui-hidden-lg`      | visible                   | visible                        | visible                          | hide                          | visible               |
    | `.mdui-hidden-xl`      | visible                   | visible                        | visible                          | visible                       | hide                  |
    | `.mdui-hidden-xs-down` | hide                      | visible                        | visible                          | visible                       | visible               |
    | `.mdui-hidden-sm-down` | hide                      | hide                           | visible                          | visible                       | visible               |
    | `.mdui-hidden-md-down` | hide                      | hide                           | hide                             | visible                       | visible               |
    | `.mdui-hidden-lg-down` | hide                      | hide                           | hide                             | hide                          | visible               |
    | `.mdui-hidden-xl-down` | hide                      | hide                           | hide                             | hide                          | hide                  |
    | `.mdui-hidden-xs-up`   | hide                      | hide                           | hide                             | hide                          | hide                  |
    | `.mdui-hidden-sm-up`   | visible                   | hide                           | hide                             | hide                          | hide                  |
    | `.mdui-hidden-md-up`   | visible                   | visible                        | hide                             | hide                          | hide                  |
    | `.mdui-hidden-lg-up`   | visible                   | visible                        | visible                          | hide                          | hide                  |
    | `.mdui-hidden-xl-up`   | visible                   | visible                        | visible                          | visible                       | hide                  |

    



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

  

- #### Google Map Api (Sprint 2)

  - **Google Maps Platform Documentation**: https://developers.google.com/maps/documentation

  - What we used now is **geocoding**: https://developers.google.com/maps/documentation/geocoding/overview

  - [**Geocoding**](https://developers.google.com/maps/documentation/geocoding/requests-geocoding) is the process of converting addresses (like "1600 Amphitheatre Parkway, Mountain View, CA") into geographic coordinates (like latitude 37.423021 and longitude -122.083739), which you can use to place markers on a map, or position the map.

  - ### Geocoding Request

    A Geocoding API request takes the following form:

    ```
    https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
    ```

    where `outputFormat` may be either of the following values:

    - `json` (recommended) indicates output in JavaScript Object Notation (JSON); or
    - `xml` indicates output in XML

    HTTPS is required for requests that use an API key.

    **Note**: URLs must be [properly encoded](https://developers.google.com/maps/documentation/geocoding/web-service-best-practices#BuildingURLs) to be valid and are limited to 8192 characters for all web services. Be aware of this limit when constructing your URLs. Note that different browsers, proxies, and servers may have different URL character limits as well.

    Some parameters are required while some are optional. As is standard in URLs, parameters are separated using the ampersand (`&`) character.

    The rest of this page describes geocoding and [reverse geocoding](https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding) separately, because different parameters are available for each type of request.

    ### Geocoding (latitude/longitude lookup) parameters

    All reserved characters (for example the plus sign "+") must be [URL-encoded](https://developers.google.com/maps/documentation/geocoding/web-service-best-practices#BuildingURLs).

    **Required parameters in a geocoding request:**

    - `address`— The street address or plus code that you want to geocode. Specify addresses in accordance with the format used by the national postal service of the country concerned. Additional address elements such as business names and unit, suite or floor numbers should be avoided. Street address elements should be delimited by spaces (shown here as url-escaped to `%20`):

      ```
      address=24%20Sussex%20Drive%20Ottawa%20ON
      ```

      Format plus codes as shown here (plus signs are url-escaped to`%2B` and spaces are url-escaped to `%20`):

      - **global code** is a 4 character area code and 6 character or longer local code (849VCWC8+R9 is `849VCWC8%2BR9`).
      - **compound code** is a 6 character or longer local code with an explicit location (CWC8+R9 Mountain View, CA, USA is `CWC8%2BR9%20Mountain%20View%20CA%20USA`).

      --OR-- 

      `components`— A components filter with elements separated by a pipe (`|`). The components filter is also accepted as an optional parameter if an `address` is provided. Each element in the components filter consists of a `component:value` pair, and fully restricts the results from the geocoder. See more information about component filtering below.

    - `key` — Your application's API key. This key identifies your application for purposes of quota management. Learn how to [get a key](https://developers.google.com/maps/documentation/geocoding/get-api-key).

    Please refer to [the FAQ](https://developers.google.com/maps/faq#geocoder_queryformat) for additional guidance.

    **Optional parameters in a Geocoding request:**

    - `bounds` — The bounding box of the viewport within which to bias geocode results more prominently. This parameter will only influence, not fully restrict, results from the geocoder. (For more information see [Viewport Biasing](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#Viewports) below.)
    - `language` — The language in which to return results.
      - See the [list of supported languages](https://developers.google.com/maps/faq#languagesupport). Google often updates the supported languages, so this list may not be exhaustive.
      - If `language` is not supplied, the geocoder attempts to use the preferred language as specified in the `Accept-Language` header, or the native language of the domain from which the request is sent.
      - The geocoder does its best to provide a street address that is readable for both the user and locals. To achieve that goal, it returns street addresses in the local language, transliterated to a script readable by the user if necessary, observing the preferred language. All other addresses are returned in the preferred language. Address components are all returned in the same language, which is chosen from the first component.
      - If a name is not available in the preferred language, the geocoder uses the closest match.
      - The preferred language has a small influence on the set of results that the API chooses to return, and the order in which they are returned. The geocoder interprets abbreviations differently depending on language, such as the abbreviations for street types, or synonyms that may be valid in one language but not in another. For example, *utca* and *tér* are synonyms for street and square respectively in Hungarian.
    - `region` — The region code, specified as a ccTLD ("top-level domain") two-character value. This parameter will only influence, not fully restrict, results from the geocoder. (For more information see [Region Biasing](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#RegionCodes) below.)
    - `components` — A components filter with elements separated by a pipe (`|`). The components filter is *required* if the request doesn't include an `address`. Each element in the components filter consists of a `component:value` pair, and fully restricts the results from the geocoder. See more information about [component filtering](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#component-filtering) below.

  - ### Geocoding Responses

    Geocoding responses are returned in the format indicated by the `output` flag within the URL request's path.

    In this example, the Geocoding API requests a `json` response for a query on the place ID "ChIJeRpOeF67j4AR9ydy_PIzPuM", which is the place_ID for the building at 1600 Amphitheatre Parkway, Mountain View, CA.

    Plus codes are rectangular encoded location references derived from latitude and longitude coordinates. Requests with fully specified street addresses, such as "1600 Amphitheatre Parkway, Mountain View, CA", may not return a plus code when the result is a building, because buildings generally contain multiple plus code regions.

    This request demonstrates using the JSON `output` flag:

    ```
    https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=YOUR_API_KEY
    ```

    This request demonstrates using the XML `output` flag:

    ```
    https://maps.googleapis.com/maps/api/geocode/xml?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=YOUR_API_KEY
    ```

    Select the tabs below to see the sample JSON and XML responses.

    [JSON](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#json)

    ```
    {
        "results": [
            {
                "address_components": [
                    {
                        "long_name": "1600",
                        "short_name": "1600",
                        "types": [
                            "street_number"
                        ]
                    },
                    {
                        "long_name": "Amphitheatre Parkway",
                        "short_name": "Amphitheatre Pkwy",
                        "types": [
                            "route"
                        ]
                    },
                    {
                        "long_name": "Mountain View",
                        "short_name": "Mountain View",
                        "types": [
                            "locality",
                            "political"
                        ]
                    },
                    {
                        "long_name": "Santa Clara County",
                        "short_name": "Santa Clara County",
                        "types": [
                            "administrative_area_level_2",
                            "political"
                        ]
                    },
                    {
                        "long_name": "California",
                        "short_name": "CA",
                        "types": [
                            "administrative_area_level_1",
                            "political"
                        ]
                    },
                    {
                        "long_name": "United States",
                        "short_name": "US",
                        "types": [
                            "country",
                            "political"
                        ]
                    },
                    {
                        "long_name": "94043",
                        "short_name": "94043",
                        "types": [
                            "postal_code"
                        ]
                    }
                ],
                "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
                "geometry": {
                    "location": {
                        "lat": 37.4224428,
                        "lng": -122.0842467
                    },
                    "location_type": "ROOFTOP",
                    "viewport": {
                        "northeast": {
                            "lat": 37.4239627802915,
                            "lng": -122.0829089197085
                        },
                        "southwest": {
                            "lat": 37.4212648197085,
                            "lng": -122.0856068802915
                        }
                    }
                },
                "place_id": "ChIJeRpOeF67j4AR9ydy_PIzPuM",
                "plus_code": {
                    "compound_code": "CWC8+X8 Mountain View, CA",
                    "global_code": "849VCWC8+X8"
                },
                "types": [
                    "street_address"
                ]
            }
        ],
        "status": "OK"
    }
    ```

    Note that the JSON response contains two root elements:

    - `"status"` contains metadata on the request. See [Status codes](https://developers.google.com/maps/documentation/geocoding/requests-geocoding#StatusCodes).
    - `"results"` contains an array of geocoded address information and geometry information.

    Generally, only one entry in the `"results"` array is returned for address lookups,though the geocoder may return several results when address queries are ambiguous.

