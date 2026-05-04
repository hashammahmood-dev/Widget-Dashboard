
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db, engine, Base
from models import User,Widget
from auth import hash_password, verify_password, create_token
from pydantic import BaseModel
import uuid

app = FastAPI()

# ======================
# CORS (DEV-FRIENDLY)
# ======================
app.add_middleware(
    CORSMiddleware,
    # Vite/React dev servers commonly change ports (5173, 5174, 5175, 3000, etc.)
    # Allow localhost/127.0.0.1 on any port for local development.
    allow_origin_regex=r"^http://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================
# CREATE TABLES
# ======================
Base.metadata.create_all(bind=engine)

# ======================
# SCHEMAS (IMPORTANT)
# ======================
class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str

def normalize_email(email: str) -> str:
    return email.strip().lower()


# ======================
# SIGNUP API
# ======================
@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    normalized_email = normalize_email(user.email)

    # check if user exists
    existing_user = db.query(User).filter(User.email == normalized_email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    # create user
    new_user = User(
        name=user.name.strip(),
        email=normalized_email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_token({"user_id": new_user.id})

    return {
        "message": "User created successfully",
        "user_id": new_user.id,
        "token": token,
    }


# ======================
# LOGIN API
# ======================
@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    normalized_email = normalize_email(user.email)

    db_user = db.query(User).filter(User.email == normalized_email).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Wrong password")

    token = create_token({"user_id": db_user.id})

    return {
        "message": "Login successful",
        "token": token
    }
@app.post("/create-widget")
def create_widget(data: dict, db: Session = Depends(get_db)):

    widget_id = "WIDG-" + str(uuid.uuid4())[:8]

    new_widget = Widget(
        widget_id=widget_id,
        user_id=1,  # baad me auth se lena
        knowledge_base=data.get("knowledgeBase"),
        color=data.get("color"),
        width=data.get("width"),
        height=data.get("height"),
    )

    db.add(new_widget)
    db.commit()

    script = f'<script src="http://localhost:8000/static/widget.js" data-id="{widget_id}"></script>'

    return {
        "widget_id": widget_id,
        "script": script
    }
@app.get("/widget/{widget_id}")
def get_widget(widget_id: str, db: Session = Depends(get_db)):
    widget = db.query(Widget).filter(Widget.widget_id == widget_id).first()

    if not widget:
        raise HTTPException(status_code=404, detail="Not found")

    return {
        "knowledge_base": widget.knowledge_base,
        "color": widget.color,
        "width": widget.width,
        "height": widget.height
    }
from fastapi.staticfiles import StaticFiles

app.mount("/static", StaticFiles(directory="static"), name="static")