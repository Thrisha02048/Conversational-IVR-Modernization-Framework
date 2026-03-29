from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sessions = {}

@app.get("/")
def root():
    return {"message": "CarePlus Hospital IVR Running"}

@app.get("/ivr/start")
def start():
    return {
        "menu": "main-menu",
        "message": "Welcome to CarePlus Hospital. Press 1 for Cardiology. Press 2 for Orthopedics. Press 3 for General Medicine. Press 4 for Neurology. Press 5 for Dermatology."
    }

@app.post("/ivr/session")
def create_session(call_id: str):
    sessions[call_id] = {"menu": "main-menu"}
    return {"message": "Session created"}

@app.post("/handle_key")
def handle(call_id: str, Digits: int):

    if call_id not in sessions:
        sessions[call_id] = {"menu": "main-menu"}

    menu = sessions[call_id]["menu"]

    if menu == "main-menu":
        if Digits == 1:
            sessions[call_id]["menu"] = "cardiology"
            return {"message": "Cardiology selected. Press 1 for Dr Arvind Kumar. Press 2 for Dr Meera Singh."}

        elif Digits == 2:
            sessions[call_id]["menu"] = "orthopedics"
            return {"message": "Orthopedics selected. Press 1 for Dr Rakesh Patel. Press 2 for Dr Kavya Reddy."}

        elif Digits == 3:
            sessions[call_id]["menu"] = "general"
            return {"message": "General Medicine selected. Press 1 for Dr Amit Verma. Press 2 for Dr Neha Kapoor."}

        elif Digits == 4:
            sessions[call_id]["menu"] = "neurology"
            return {"message": "Neurology selected. Press 1 for Dr Suresh Iyer. Press 2 for Dr Anjali Mehta."}

        elif Digits == 5:
            sessions[call_id]["menu"] = "dermatology"
            return {"message": "Dermatology selected. Press 1 for Dr Rahul Das. Press 2 for Dr Sneha Gupta."}

    elif menu in ["cardiology","orthopedics","general","neurology","dermatology"]:
        if Digits in [1,2]:
            sessions[call_id]["menu"] = "confirm"
            return {"message": "Doctor selected. Press 1 to confirm appointment. Press 2 to cancel."}

    elif menu == "confirm":
        if Digits == 1:
            return {"message": "Appointment confirmed. Thank you."}
        else:
            return {"message": "Appointment cancelled."}

    return {"message": "Invalid option"}