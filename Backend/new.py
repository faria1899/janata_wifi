from flask import Flask,request,jsonify
import mysql.connector
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

#DATABASE CONNECTION
db = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password ='montu12345',
    database = 'stockdatabase'
)



#INSERT SINGLE DATA
@app.route('/InsertData', methods=['POST'])
def InsertData():
    try:
        data = request.get_json()

      
        trade_date = data.get('date') 
        trade_code = data.get('trade_code')
        high = str(data.get('high')) 
        low = str(data.get('low'))  
        opening_price = str(data.get('open')) 
        closing_price = str(data.get('close'))
        volume = str(data.get('volume'))  
        volume = volume.replace(',', '')

        if not all([trade_date, trade_code, high, low, opening_price, closing_price, volume]):
            return jsonify({"error": "Missing required fields"}), 400

        cursor = db.cursor()

        sql_query = """
            INSERT INTO stock_data (date, trade_code, high, low, open, close, volume) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql_query, (trade_date, trade_code, high, low, opening_price, closing_price, volume))

        db.commit()
        return jsonify({"message": "posted"}), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
# INSERT MULTIPLE DATA

@app.route('/InsertMultiData', methods=['POST'])
def InsertMultiData():
    try:
        data = request.get_json()
        
       
        if not isinstance(data, list):
            return jsonify({"error": "Invalid JSON format. Expected a list of objects."}), 400

        cursor = db.cursor()

        sql_query = """
            INSERT INTO stock_data (date, trade_code, high, low, open, close, volume)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        values = []
        for stock_data in data:
            trade_date = stock_data.get('date')  
            trade_code = stock_data.get('trade_code')  
            high = str(stock_data.get('high', '0'))  
            low = str(stock_data.get('low', '0'))
            opening_price = str(stock_data.get('open', '0'))
            closing_price = str(stock_data.get('close', '0'))
            volume = str(stock_data.get('volume', '0')).replace(',', '')  

            values.append((trade_date, trade_code, high, low, opening_price, closing_price, volume))

        cursor.executemany(sql_query, values)  

        db.commit()
        cursor.close()
        return jsonify({"message": "Data inserted successfully!"}), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
    
#FETCH BY SINGLE ID
    
@app.route('/fetchSingle/<int:id>', methods=['GET'])
def fetch_single(id):
    try:
        cursor = db.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM stock_data WHERE id = %s", (id,))
        
        row = cursor.fetchone()
        
        cursor.close()

        if row:
            return jsonify(row), 200
        else:
            return jsonify({"error": "Record not found"}), 404

    except mysql.connector.Error as e:
        
        return jsonify({"error": str(e)}), 500

    
 # FETCH FROM A GIVEN RANGE OF ID 
 
@app.route('/fetch/<int:start_id>/<int:end_id>', methods=['GET'])

def fetch_range(start_id, end_id):
    
    try:
        cursor = db.cursor(dictionary=True)  
        
        query = "SELECT * FROM stock_data WHERE id BETWEEN %s AND %s"
        
        cursor.execute(query, (start_id, end_id))
        
        rows = cursor.fetchall() 
         
        cursor.close()
        

        if rows:
            return jsonify(rows), 200
        else:
            return jsonify({"error": "No records found in the given range"}), 404

    except mysql.connector.Error as e:
        
        print(f"Error: {str(e)}")
        
        return jsonify({"error": str(e)}), 500




 #FETCH LAST 15 DATA
 
@app.route('/fetch/latest', methods=['GET'])

def fetch_latest():
     try:
         cursor = db.cursor(dictionary=True)

         query = """
             SELECT * FROM stock_data
             ORDER BY id DESC
             LIMIT 15
         """

         cursor.execute(query)
         rows = cursor.fetchall()

         cursor.close()

         if rows:
             return jsonify(rows), 200
         else:
             return jsonify({"error": "No records found"}), 404

     except mysql.connector.Error as e:
         print(f"Error: {str(e)}")
         return jsonify({"error": str(e)}), 500


    
#FETCH ALL

@app.route('/fetchall', methods=['GET'])

def fetch_All():
    
    try:
       
        cursor = db.cursor(dictionary=True)
        
        query = """SELECT  id, DATE_FORMAT(date, '%a, %d %b %Y') AS date, trade_code, high, low, open, close, volume FROM stock_data ORDER BY date desc;"""
        
        cursor.execute(query)
        
        rows = cursor.fetchall()
        
        print(f"Fetched {len(rows)} records") 
         
        cursor.close()
        
        return jsonify(rows), 200
    
    except mysql.connector.Error as e:
        
        print("Database error:", str(e))
          
        return jsonify({"error": str(e)}), 500
    
#UPDATE DATA

@app.route('/update', methods=['PUT'])
def update_data():
    try:
        id = request.json.get('id')
        trade_date = request.json.get('date')  
        trade_code = request.json.get('trade_code')
        high = request.json.get('high') 
        low = request.json.get('low')
        opening_price = request.json.get('open')
        closing_price = request.json.get('close')
        volume = request.json.get('volume').replace(',', '')  
        
        query = "UPDATE stock_data SET date=%s, trade_code=%s,high=%s,low=%s,open=%s,close=%s,volume=%s WHERE id = %s"
        cursor.execute(query,(trade_date, trade_code, high, low, opening_price, closing_price, volume,id))
        
        db.commit()
        cursor.close()
        
        return jsonify({"message": "Data updated successfully"}), 200
    
    except mysql.connector.Error as e:
        print("Database error:", str(e)) 
        return jsonify({"error": str(e)}), 500
    
    
#UPDATE DATA BY ID

@app.route('/updateId/<int:id>', methods=['PUT'])
def updateId_data(id):
    try:
        
        trade_date = request.json.get('date')  
        trade_code = request.json.get('trade_code')
        high = request.json.get('high')
        low = request.json.get('low')
        opening_price = request.json.get('open')
        closing_price = request.json.get('close')
        volume = request.json.get('volume').replace(',', '')  
        
        cursor = db.cursor()
        query = """
            UPDATE stock_data 
            SET date=%s, trade_code=%s, high=%s, low=%s, open=%s, close=%s, volume=%s 
            WHERE id = %s
        """
        cursor.execute(query, (trade_date, trade_code, high, low, opening_price, closing_price, volume, id))
        
        db.commit()
        cursor.close()
        
        return jsonify({"message": "Data updated successfully"}), 200
    
    except mysql.connector.Error as e:
        
        print("Database error:", str(e))
          
        return jsonify({"error": str(e)}), 500
    
    
 # DELETE BY ID
@app.route('/delete/<int:id>', methods=['DELETE'])
def Delete(id):
    try:
        cursor = db.cursor()
        
        query = "DELETE FROM stock_data WHERE id = %s"
        
        cursor.execute(query,(id,))
        
        db.commit()
        
        cursor.close() 
        
        return jsonify({"message": "Data deleted successfully"}), 200
    
    except mysql.connector.Error as e: 
        
        return jsonify({"error": str(e)}), 500
    


    

    




if __name__ == '__main__':
    print("Connecting to DB...")
    print(app.url_map)
    app.run(debug=True,port=5001)