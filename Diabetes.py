import joblib
import numpy as np
from flask import flask,jsonify,request


app=flask(__name__)
model = joblib.load("Diabetes.pkl")
@app.rout("\predict" , methods=["POST"])
def prefict():
    