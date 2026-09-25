from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Character(BaseModel):
    name: str
    level: int
    job: str
    world: str
    guild: str | None = None


@app.get("/health")
def check_server():
    return {"status": "okkk"}


@app.get("/hello")
def hello():
    return {"message": "안녕하세요, 메이플 코치입니다!"}


@app.get("/character/{name}")
def get_character(name: str) -> Character:
    # Mock data for now. Layer 2-6 replaces this with a real Nexon API call.
    return Character(
        name=name,
        level=285,
        job="아크메이지(불,독)",
        world="스카니아",
        guild="메이플코치",
    )
