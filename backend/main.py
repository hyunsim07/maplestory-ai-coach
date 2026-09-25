from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def check_server():
    return {"status": "okkk"}

@app.get("/hello")
def hello():
    return {"message": "안녕하세요, 메이플 코치입니다!"}