from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel
from datetime import datetime
from database import engine, fetch_data, save_predictions
from predict import predict_expenses

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data validation model
class ExpenseItem(BaseModel):
    name: str
    amount: float
    budgetid: int

@app.post("/insert")
async def insert_data(expense: ExpenseItem):
    try:
        # Convert Pydantic model to dict
        data = expense.dict()
        
        # Add createdat timestamp
        data['createdat'] = datetime.now()
        
        # Convert to DataFrame
        df = pd.DataFrame([data])
        
        # Save to database
        df.to_sql('expense', engine, if_exists='append', index=False)
        
        return {"message": "Data inserted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/predict")
async def get_predictions():
    try:
        # Fetch data from database
        df = fetch_data()
        if df is None:
            raise HTTPException(status_code=500, detail="Failed to fetch data from database")
        
        # Generate predictions
        predictions_df = predict_expenses(df)
        if predictions_df is None:
            raise HTTPException(status_code=500, detail="Failed to generate predictions")
        
        # Save predictions
        if not save_predictions(predictions_df):
            raise HTTPException(status_code=500, detail="Failed to save predictions")
        
        # Return predictions as JSON
        predictions = predictions_df.to_dict('records')
        return {
            "message": "Predictions generated successfully",
            "data": predictions
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/expenses")
async def get_expenses():
    try:
        # Fetch all expenses from database
        query = "SELECT * FROM expense ORDER BY date DESC"
        df = pd.read_sql(query, engine)
        
        # Convert to JSON-friendly format
        expenses = df.to_dict('records')
        return {"data": expenses}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)