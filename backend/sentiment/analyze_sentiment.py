import spacy
from flask import Flask, request, jsonify
import re

app = Flask(__name__)

# Load the spaCy language model. spaCy language model is the AI protion of the project. We can implement more complex language models and
# try to spice it up a little with some of the feedback.
nlp = spacy.load("en_core_web_sm")

def analyze_sentiment(text):
    # Tokenize and lemmatize the input text using spaCy
    doc = nlp(text)

    # Expanded positive and negative word lists with intensity weights
    positive_words = {
        "good": 1, "happy": 2, "love": 3, "great": 2, "joyful": 3, "grateful": 2,
        "optimistic": 2, "peaceful": 2, "content": 1, "satisfied": 2, "cheerful": 3,
        "thrilled": 4, "exhilarated": 4, "uplifted": 3, "relaxed": 2, "empowered": 3,
        "blissful": 4, "delighted": 3, "ecstatic": 4, "motivated": 3, "confident": 2,
        "admired": 3, "appreciated": 3, "healing": 2, "safe": 2
    }
    
    negative_words = {
        "bad": 1, "sad": 2, "hate": 3, "terrible": 3, "angry": 2, "frustrated": 2,
        "disappointed": 2, "miserable": 3, "hopeless": 3, "anxious": 2, "depressed": 4,
        "hurt": 2, "fearful": 2, "resentful": 2, "burnout": 3, "overwhelmed": 3,
        "exhausted": 2, "isolated": 2, "rejected": 3, "crushed": 4, "broken": 3,
        "demoralized": 4, "shattered": 4, "devastated": 4, "lonely": 3
    }
    
    # Multi-word phrases with higher intensity scores
    positive_phrases = {
        "walking on air": 4, "couldn't be happier": 4, "on cloud nine": 4,
        "found my stride": 3, "feeling better": 2, "turning things around": 3
    }
    
    negative_phrases = {
        "down in the dumps": 3, "hit me hard": 3, "couldn't shake off": 2,
        "falling apart": 3, "lost focus": 2, "felt drained": 3, "setback": 2,
        "at my worst": 4, "burning out": 4, "falling short": 3
    }
    
    # Negation words to handle negation context
    negation_words = {"not", "never", "no", "hardly", "rarely", "barely", "without"}

    # Initialize counters
    sentiment_score = 0
    negation_flag = False

    # Convert text to lowercase for easier matching
    text_lower = text.lower()

    # Check for multi-word phrases in the input text
    for phrase, score in positive_phrases.items():
        if phrase in text_lower:
            sentiment_score += score

    for phrase, score in negative_phrases.items():
        if phrase in text_lower:
            sentiment_score -= score

    # Check individual tokens in the input text
    for token in doc:
        word = token.lemma_.lower()

        # Handle negation context
        if word in negation_words:
            negation_flag = True
            continue

        # Adjust sentiment based on presence of negation
        if word in positive_words:
            if negation_flag:
                sentiment_score -= positive_words[word]  # Invert the sentiment
                negation_flag = False  # Reset flag
            else:
                sentiment_score += positive_words[word]

        elif word in negative_words:
            if negation_flag:
                sentiment_score += negative_words[word]  # Invert the sentiment
                negation_flag = False  # Reset flag
            else:
                sentiment_score -= negative_words[word]

    # Determine the overall sentiment based on the sentiment score
    if sentiment_score > 0:
        return 'positive'
    elif sentiment_score < 0:
        return 'negative'
    else:
        return 'neutral'

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.json
    text = data.get('text', '')

    # Run the text through different spaCy functions
    sentiment = analyze_sentiment(text)
    key_phrases = [ent.text for ent in nlp(text).ents]
    detected_tones = detect_emotional_tone(text)  # Add other functions as needed

    response = {
        'sentiment': sentiment,
        'key_phrases': key_phrases,
        'emotional_tones': detected_tones
    }
    return jsonify(response)

def extract_key_phrases(text):
    # Alright, this one’s all about finding the "important stuff" in the text.
    # I’m using spaCy's Named Entity Recognition (NER) to pull out things like names, dates, and places.
    # It's like highlighting the main points for the user—keeping it simple and direct.
    doc = nlp(text)
    key_phrases = [ent.text for ent in doc.ents]
    return key_phrases

def detect_intent(text):
    # Here’s where I get into intentions. 
    # I’m scanning the sentences to find phrases like "I want to…" to figure out what the user might be aiming for.
    # It’s kind of like Echo listening for specific goals or plans in the user's entries.
    doc = nlp(text)
    intents = []
    for sent in doc.sents:
        if 'want to' in sent.text.lower():
            intents.append(sent.text.strip())
    return intents

def empathy_feedback(text):
    # This function is all about making Echo feel a bit more human.
    # Depending on the sentiment, it gives feedback that matches how the user might be feeling.
    # The idea is to offer some supportive, empathetic responses—because nobody wants a cold app, right?
    sentiment = analyze_sentiment(text)
    if sentiment == 'positive':
        feedback = ["That's great to hear! Keep up the good vibes.", 
                    "Sounds like things are going well! 😊", 
                    "It's wonderful that you're feeling positive!"]
    elif sentiment == 'negative':
        feedback = ["I'm sorry you're feeling this way. Remember, it's okay to have tough days.", 
                    "It sounds like things are hard right now. Take it one step at a time.", 
                    "I'm here to listen. It's okay to let it all out."]
    else:
        feedback = ["Seems like you're having a neutral day. Anything specific on your mind?",
                    "Just another day, right? Anything you’d like to talk about?",
                    "Feel free to share more, if you’d like."]
    return feedback

def detect_emotional_tone(text):
    # This function gets a bit more granular with emotions.
    # I’ve set up categories like happiness, sadness, anger, fear, and calm, and I check if the text leans towards any of these tones.
    # The goal here is to give Echo a better sense of the emotional context in the user's entries.
    emotional_tones = {
        'happiness': ['happy', 'joyful', 'content', 'cheerful', 'blissful'],
        'sadness': ['sad', 'depressed', 'miserable', 'hopeless', 'lonely'],
        'anger': ['angry', 'frustrated', 'bitter', 'resentful'],
        'fear': ['fearful', 'nervous', 'anxious', 'worried'],
        'calm': ['peaceful', 'relaxed', 'serene', 'tranquil']
    }
    
    doc = nlp(text)
    detected_tones = []
    
    for token in doc:
        for tone, words in emotional_tones.items():
            if token.text.lower() in words:
                detected_tones.append(tone)
    
    return list(set(detected_tones))

if __name__ == "__main__":
    import sys
    text = sys.argv[1]
    print(analyze_sentiment(text))
