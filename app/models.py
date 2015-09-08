from . import db

class Message(db.Model):
  __tablename__  = 'messages'

  id             = db.Column(db.Integer, primary_key=True, unique=True)
  author         = db.Column(db.VARCHAR)
  message        = db.Column(db.Text)

  def __init__(self, author, message):
    self.author  = author
    self.message = message