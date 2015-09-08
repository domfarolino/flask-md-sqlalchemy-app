# Dom Farolino
## flask-md-sqlalchemy-app - A Basic Flask Starter Application

This basic Flask application is equipped with material design and an AngularJS front-end accessing an easy to set up REST API.

Project Features:
  - [Material Design](https://material.angularjs.org)
  - [AngularJS](https://angularjs.org/) front end
  - [Python Flask](http://flask.pocoo.org/)
  - Basis for a REST API
  - [Heroku](https://www.heroku.com/) deployable out of the box

This basic site and repo was created and is maintained by [Dom Farolino](http://domfarolino.com) and can be viewed as an online demo on [this heroku site](coming soon):

> The goal of this project is to give users a
> starting point that they can use to
> get started building their own beautiful Flask
> apps relying on a REST API
> accompanied by an AngularJS front end.

### Version
1.0.0

### Tech

flask-md-sqlalchemy-app relies on just a few open source modern projects to keep running

* [AngularJS](https://angularjs.org/) - HTML enhanced for web apps!
* [Angular Material Design](https://material.angularjs.org) - Great UI framework for modern MD based web apps
* [Flask](http://flask.pocoo.org/)

### Installation & Getting Started

Local Development
```sh
$ git clone https://github.com/domfarolino/flask-md-sqlalchemy-app
$ cd flask-md-sqlalchemy-app
$ virtualenv venv
$ cd venv/scripts
$ ./activate
$ cd ../../
$ pip install -r requirements.txt
$ python run.py
```
Deploy To Heroku
```sh
$ git clone https://github.com/domfarolino/flask-md-sqlalchemy-app
$ cd flask-md-sqlalchemy-app
$ heroku create # this also creates remote called 'heroku'
$ heroku apps:rename newappname
$ git push heroku master
$ heroku open
```
Common Application Commands:
```sh
# Common Heroku application tools

    # Rename application within checkout
      heroku apps:rename newname
      
    # Rename application without a checkout
      heroku apps:rename newname --app oldname
  
# Common remote tools
    
    # View/Verify
      git remote -v

    # Remove Remote
      git remove rm remotename

    # Add Remote
      heroku git:remote -a projectname # adds remote named heroku
      heroku git:remote -a projectname -r custom remote name

    # Update Remote
      heroku git:remote
```
### Development

Want to contribute? Great! Design improvements (both front and back end) are always welcomed however I would like to keep the app simple as it is a basic template

Pull requests and aditional branches/features are welcomed!

### Todo's

 - Write Tests
 - Basic API security (not 100% open)
 - Add Night Mode
 - More?

License
-------

MIT