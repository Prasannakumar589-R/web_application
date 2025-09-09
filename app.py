from flask import Flask, request, render_template, redirect, jsonify, Response
from pymongo import MongoClient
import json
from bson import ObjectId

client = MongoClient("mongoconnect")

db = client['sih']
ld = db['login_details']
content = db['content']
lsns = content['lesson']
profile = db['profiles']
global user_db, lang
user_db = None
lang = None

app = Flask(__name__)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get JSON body
    username = data.get('username')
    password = data.get('password')

    d = ld.find_one({'user':username, 'password':password})
    if d:
        #connect to collection of corresponding user
        global user_db, lang
        user_db = profile[username]
        lang = data.get('lang')
        print(lang)
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
    
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/profile_page')
def profile_page():
    return render_template('profile_page.html')

@app.route('/quizzes')
def quizzes():
    return render_template('quizzes.html')

@app.route('/checkpoint')
def checkpoints():
    cp = request.args.get('cp')
    return render_template('checkpoints.html', cp=cp, lang=lang)

@app.route('/lessons')
def lesson():
    return render_template('lessons.html')

@app.route('/achievements')
def achievements():
    return render_template('achievements.html')

@app.route('/bookmarks')
def bookmarks():
    return render_template('bookmarks.html')

@app.route('/lsn')
def lsn():
    return render_template('lsn.html')

@app.route('/get_content', methods=['POST'])
def get_content():
    data = request.get_json()
    lsn, cp = data.get('lsn'), data.get('cp')

    lsn_conn = lsns[lsn]
    heading_doc = lsn_conn.find_one({'purpose': 'topics'})  # heading is a document

    cp_conn = lsn_conn[cp]
    cards = list(cp_conn.find())

    

    # Extract index from cp (e.g., 'cp3' -> 3)
    print(heading_doc)
    try:
        index = int(cp[-1]) - 1
        heading_text = heading_doc.get('topics', [])[index]  # assuming heading_doc['headings'] is a list
    except (ValueError, IndexError, TypeError):
        heading_text = "No heading found"

    return Response(
    JSONEncoder().encode({
        'cards': cards,
        'heading': heading_text
    }),
    mimetype='application/json'
)

@app.route('/get_profile', methods=['POST'])
def get_profile():
    if user_db==None:
        return jsonify({"error": "Invalid username or password"}), 401
    
    dt = request.get_json()
    res = user_db.find_one({'username':dt.get('username', '')})

    res['_id'] = str(res['_id'])
    return jsonify({'message':'ok', 'response':res})

@app.route('/get_achievements')
def get_achievements():
    if user_db==None:
        return jsonify({"error":"Invalid Request"}), 401
    
    Achievements = user_db['Achievements']
    res = list(Achievements.find())

    return JSONEncoder().encode(res[0])

@app.route('/get_badges')
def get_badges():
    if user_db==None:
        return jsonify({"error":"Invalid Request"}), 401
    
    Badges = user_db['Badges']
    res = list(Badges.find())

    return JSONEncoder().encode(res)

@app.route('/get_progress')
def get_progress():
    if user_db==None:
        return jsonify({"error":"Invalid Request"}), 401
    
    Progress = user_db['Progress']
    res = list(Progress.find())

    return JSONEncoder().encode(res)

@app.route('/get_points')
def get_points():
    if user_db==None:
        return jsonify({"error":"Invalid Request"}), 401
    
    Points = user_db['Points']
    res = list(Points.find())

    return JSONEncoder().encode(res)

if __name__=='__main__':

    app.run(debug = True)
