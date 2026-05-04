# from sqlalchemy import Column, Integer, String
# from database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     email = Column(String, unique=True, index=True)
#     password = Column(String)
from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)


class Widget(Base):   # ✅ separate class
    __tablename__ = "widgets"

    id = Column(Integer, primary_key=True, index=True)
    widget_id = Column(String, unique=True, index=True)
    user_id = Column(Integer)
    knowledge_base = Column(String)
    color = Column(String)
    width = Column(String)
    height = Column(String)