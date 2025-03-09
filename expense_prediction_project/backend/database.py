import os
import pandas as pd
from sqlalchemy import create_engine

# Database configuration
PGHOST='ep-muddy-bread-a8cbwov1-pooler.eastus2.azure.neon.tech'
PGDATABASE='aibackend'
PGUSER='neondb_owner'
PGPASSWORD='npg_0zBrPQc2TSsA'

# Create SQLAlchemy engine
DATABASE_URL = f"postgresql://{PGUSER}:{PGPASSWORD}@{PGHOST}/{PGDATABASE}"
engine = create_engine(DATABASE_URL)

def fetch_data():
    """Fetch expense data from the database"""
    query = "SELECT id, name, amount, budgetid, createdat FROM expense"
    try:
        df = pd.read_sql(query, engine)
        print("Fetched data columns:", df.columns)  # Debug print
        print("Data sample:", df.head())  # Debug print
        return df
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def save_predictions(df):
    """Save predictions to the database"""
    try:
        # Convert date column to timestamp if it isn't already
        df['date'] = pd.to_datetime(df['date'])
        
        # Save to predictions table
        df.to_sql('predictions', engine, if_exists='replace', index=False)
        return True
    except Exception as e:
        print(f"Error saving predictions: {e}")
        return False
