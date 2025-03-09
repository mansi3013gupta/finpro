import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def predict_expenses(df):
    """
    Process data and make predictions based on historical spending patterns
    """
    try:
        # Print the columns to debug
        print("Available columns:", df.columns)
        
        # Convert createdat to datetime if it isn't already
        df['createdat'] = pd.to_datetime(df['createdat'])
        
        # Group by budgetid and calculate average daily spending
        grouped = df.groupby('budgetid').agg({
            'amount': ['mean', 'std', 'count'],
            'createdat': 'max',
            'name': 'first'  # Also keep the name for reference
        }).reset_index()
        
        # Flatten column names
        grouped.columns = ['budgetid', 'avg_amount', 'std_amount', 'count', 'last_date', 'name']
        
        # Print grouped data for debugging
        print("Grouped data:", grouped)
        
        # Generate predictions for next 7 days
        predictions = []
        for _, row in grouped.iterrows():
            # Set minimum standard deviation to 10% of mean if std is too low or zero
            std = max(row['std_amount'], row['avg_amount'] * 0.1)
            
            for i in range(1, 8):  # Next 7 days
                prediction_date = row['last_date'] + timedelta(days=i)
                
                # Base prediction on average amount
                base_prediction = row['avg_amount']
                
                # Add random variation (between -15% to +15% of base prediction)
                variation = np.random.uniform(-0.15, 0.15) * base_prediction
                predicted_amount = base_prediction + variation
                
                # Ensure prediction is not negative and round to 2 decimal places
                predicted_amount = max(0, round(predicted_amount, 2))
                
                predictions.append({
                    'budgetid': int(row['budgetid']),
                    'name': row['name'],
                    'date': prediction_date,
                    'predicted_amount': predicted_amount,
                    'confidence': 'high' if row['count'] > 5 else 'low'
                })
        
        predictions_df = pd.DataFrame(predictions)
        
        # Sort by budgetid and date
        predictions_df = predictions_df.sort_values(['budgetid', 'date'])
        
        return predictions_df
        
    except Exception as e:
        print(f"Error in prediction: {e}")
        print("DataFrame info:", df.info())  # Print DataFrame info for debugging
        return None