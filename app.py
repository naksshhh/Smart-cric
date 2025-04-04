import streamlit as st
import pickle
import pandas as pd
import numpy as np
import xgboost
from xgboost import XGBRegressor

# Load the trained pipeline
pipe = pickle.load(open('pipe.pkl', 'rb'))

# List of IPL teams
teams = ['Mumbai Indians', 'Delhi Capitals', 'Chennai Super Kings',
         'Kolkata Knight Riders', 'Punjab Kings',
         'Royal Challengers Bengaluru', 'Rajasthan Royals',
         'Sunrisers Hyderabad', 'Gujarat Titans', 'Lucknow Super Giants']

# List of cities (Added more cities to improve usability)
cities = ['Ahmedabad', 'Bangalore', 'Chandigarh', 'Chennai', 'Delhi', 
          'Hyderabad', 'Jaipur', 'Kolkata', 'Lucknow', 'Mumbai', 'Pune']

# Streamlit UI
st.title('🏏 IPL Cricket Score Predictor')

# Columns for team selection
col1, col2 = st.columns(2)

with col1:
    batting_team = st.selectbox('🏏 Select Batting Team', sorted(teams))
with col2:
    bowling_team = st.selectbox('🎯 Select Bowling Team', sorted(teams))

# City selection
city = st.selectbox('📍 Select Match City', sorted(cities))

# Match details
col3, col4, col5 = st.columns(3)

with col3:
    current_runs = st.number_input('🏆 Current Score', min_value=0, step=1)

with col4:
    overs = st.number_input('⌛ Overs Completed (Must be >5)', min_value=0.0, max_value=20.0, step=0.1)

with col5:
    wickets = st.number_input('❌ Wickets Fallen', min_value=0, max_value=10, step=1)

# Runs in last 5 overs
last_five = st.number_input('🔥 Runs Scored in Last 5 Overs', min_value=0, step=1)

# Prediction Button
if st.button('🔮 Predict Score'):
    # Calculate derived features
    balls_left = int(120 - (overs * 6))
    wickets_left = int(10 - wickets)

    # Prevent division by zero
    crr = current_runs / overs if overs > 0 else 0.0

    # Prepare input DataFrame
    input_df = pd.DataFrame({
        'batting_team': [batting_team],
        'bowling_team': [bowling_team],
        'city': [city],
        'current_runs': [current_runs],
        'balls_left': [balls_left],
        'wickets_left': [wickets_left],
        'crr': [crr],
        'last_five': [last_five]
    })

    # Predict and display result
    result = pipe.predict(input_df)
    st.header(f"🏏 Predicted Final Score: **{int(result[0])}**")
