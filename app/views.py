"""
  Routing for your application
"""

from . import app, db
from app.models import *
from flask import render_template, request, redirect, url_for, jsonify, make_response, session, flash, g

"""
  Standard Dependencies
"""
css_list = ['https://fonts.googleapis.com/css?family=RobotoDraft:400,500,700,400italic',
            'https://ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.css',
            '/static/styles/global.css']

js_list =  ['https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js',
            'https://code.angularjs.org/1.3.15/angular-animate.js',
            'https://ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-aria.min.js',
            '/static/js/app.js',
            '/static/js/controllers/MessageController.js',
            '/static/js/controllers/MenuController.js',
            ]


#http://arusahni.net/blog/2014/03/flask-nocache.html
from functools import wraps, update_wrapper
from datetime import datetime
def nocache(view):
  @wraps(view)
  def no_cache(*args, **kwargs):
    response = make_response(view(*args, **kwargs))
    response.headers['Last-Modified'] = datetime.now()
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return response
        
  return update_wrapper(no_cache, view)

@app.route('/')
def home():
  return render_template('home.html', cssdep=css_list, jsdep=js_list)

@app.route('/message/<id>', methods=['GET'])
@nocache
def get_message_by_id(id):
  try:
    m = Message.query.get(id)
    data = {'id': m.id, 'author': m.author, 'message': m.message}
    resp = make_response()
    resp = jsonify(data)
  except Exception as e:
    resp = str(e)
  finally:
    return resp

@app.route('/messages', methods=['GET'])
@nocache
def get_all_messages():
  resp = make_response()
  err = []
  try:
    messageList = Message.query.all()
    li = []
    for message in messageList:
      li.append({'id': message.id, 'author': message.author, 'message': message.message})
    resp = jsonify(messages = li)
  except Exception as e:
    err.append(str(e))
    print(e)
    return resp, 500
  return resp

@app.route('/addMessage', methods=['POST', 'OPTIONS'])
def addMessage():
  a = request.get_json()
  resp = make_response();
  err = []
  ins = Message(a['author'], a['message'])
  try:
    db.session.add(ins)
    db.session.commit()
  except Exception as e:
    err.append(str(e))
    print(err)
    return resp, 500
  return resp, 201

@app.route('/deleteMessage', methods=['POST'])
def deleteMessages():
  a = request.get_json();
  err = []
  resp = make_response()
  for x in a['id']:
    try:
      Message.query.filter(Message.id == x).delete()
      db.session.commit()
    except Exception as e:
      err.append(str(e))
      print(e)
      return resp, 500
  return resp, 200

@app.route('/about/')
def about():
  return render_template('about.html', cssdep=css_list, jsdep=js_list)

###
# The functions below should be applicable to all Flask apps.
###

@app.after_request
def add_header(response):
  """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
  """
  response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
  response.headers['Cache-Control'] = 'public, max-age=600'
  return response


@app.errorhandler(404)
def page_not_found(error):
  this_js = js_list[:]
  this_js.append('/static/js/404.js')
  return render_template('404.html', cssdep=css_list, jsdep=this_js), 404


if __name__ == '__main__':
  app.run(debug=True, host="0.0.0.0", port="8888")