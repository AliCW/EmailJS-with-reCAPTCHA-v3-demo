# EmailJS-with-reCAPTCHA-v3-demo

Both front & backend are built with JavaScript. The backend uses postgresql (https://www.postgresql.org/) & express (https://expressjs.com/) with JS to seed & query the database. The frontend uses ReactJS with hooks (https://react.dev/) utilising webpack (https://webpack.js.org/) as configuration.

The repo provides basic email functionality provided utilising EmailJS (https://www.emailjs.com/) with google reCAPTCHA-v3 running (https://developers.google.com/recaptcha) in the background. The user is tested against reCAPTCHA for bot checking, for the purposes of demonstration, no failing score has been currently set. The email form itself requires name, message & reply address, providing the captcha does not fail, the backend is queried for the emailKS keys & templates & sent. The address recipient & email template defintions are expressed within the emailJS settings.

## Setup

Clone the repository:

    git clone https://github.com/AliCW/EmailJS-with-reCAPTCHA-v3-demo.git

Register a new site with reCAPTCHA & select version 3 (https://www.google.com/recaptcha/admin/create) - for the purposes of this demonstration, the only domain added is `localhost`. Be sure to make note of the `Site Key` & `Secret Key`.

Sign in & register with emailJS (https://dashboard.emailjs.com/sign-in). Add your target email address to the dashboard & edit the template if required. Make note of the public key, private key, service ID & template ID.

## BE

Initialise the /be folder:

    npm init

Create environment variables in the be/ root, `.env.test` & `.env.development` & assign the database names; `.test` as `PGDATABASE=emailjs_demo_test` & `.development` as `PGDATABASE=emailjs_demo`. The default address is set to 127.0.0.1:9090

Create your development data structure, the format should be identical to the test data but with the keys replaced. You can change the run-seed.js file to swap between seeding the test & development data if you wish. Once set, run the below to create the databases:

    npm run setup-dbs

Now seed the database:

    npm run seed

Start the database: 

    npm start

### Endpoints

Return all public keys

    GET - 127.0.0.1:9090/api/all/public_keys

Return reCAPTCHA public key

    GET - 127.0.0.1:9090/api/email_js/public_key

Returns emailJS public key & templates used for

    GET - 127.0.0.1:9090/api/send_email

Checks the user's reCAPTCHA response with google

    POST - 127.0.0.1:9090/api/reCAPTCHA/check, {"props": <user_response>}

## FE

Initialise the /fe folder:

    npm init

To start the frontend:

    npm start

The default address is set to 127.0.0.1:3000

Once arriving at the webpage, the users is checked by reCAPTCHA & verified by google on the backend, if verification fails, the form is automatically closed & displays & error response element to the user.