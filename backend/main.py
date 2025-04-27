from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import User, ToDo
from auth import get_password_hash, verify_password, create_access_token, get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def register_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == form_data.username).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=form_data.username, password=get_password_hash(form_data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User created"}

@app.post("/token")
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect credentials")
    token, expire = create_access_token({"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_at": expire.isoformat()  # 🔥 Burası çok önemli!
    }

@app.get("/todos")
def read_todos(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(ToDo).filter(ToDo.owner_id == current_user.id).all()

@app.post("/todos")
def create_todo(title: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    todo = ToDo(title=title, owner_id=current_user.id)
    db.add(todo)
    db.commit()
    return {"msg": "Todo created"}
@app.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()
