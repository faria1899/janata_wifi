import pandas as pd
import mysql.connector

# Database Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="montu12345",
    database="stockdatabase"
)

cursor = db.cursor()


csv_file_path = "./stock_market_data.csv"

# Read CSV File
df = pd.read_csv(csv_file_path)

# SQL Query to Insert Data
sql_query = """
    INSERT INTO stock_data (date, trade_code, high, low, open, close, volume)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
"""

# Insert Data Row by Row
for _, row in df.iterrows():
    trade_date = row['date']
    trade_code = row['trade_code']
    high = str(row['high'])
    low = str(row['low'])
    opening_price = str(row['open'])
    closing_price = str(row['close'])
    volume = str(row['volume']).replace(',', '')  

    cursor.execute(sql_query, (trade_date, trade_code, high, low, opening_price, closing_price, volume))


db.commit()
cursor.close()
db.close()

print("Data inserted successfully!")