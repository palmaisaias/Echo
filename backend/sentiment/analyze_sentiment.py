import spacy

# Load the spaCy language model. spaCy language model is the AI protion of the project. We can implement more complex language models and
# try to spice it up a little with some of the feedback.
nlp = spacy.load("en_core_web_sm")

def analyze_sentiment(text):
    # So, here's the basic sentiment analysis function.
    # I’m checking each word in the input text against a list of positive and negative words.
    # If positive words outweigh negative ones, it's classified as 'positive'; vice versa for 'negative'.
    # If it's a tie, it's just 'neutral'—because...not every day is dramatic.
    doc = nlp(text)
    positive_words = ["good", "happy", "love", "great", "positive", "joyful", "grateful", "optimistic", "peaceful", "content", "satisfied", "hopeful", "cheerful", "vibrant", "blissful", "confident", "empowered", "energetic", "friendly", "harmonious", "inspired", "motivated", "radiant", "thrilled", "uplifted"]
    negative_words = ["bad", "sad", "hate", "terrible", "negative", "angry", "frustrated", "disappointed", "upset", "miserable", "hopeless", "lonely", "anxious", "depressed", "hurt", "fearful", "bitter", "resentful", "unhappy", "stressed", "worried", "irritated", "discouraged", "nervous", "exhausted"]

    positive_count = sum([1 for token in doc if token.text.lower() in positive_words])
    negative_count = sum([1 for token in doc if token.text.lower() in negative_words])

    if positive_count > negative_count:
        return 'positive'
    elif negative_count > positive_count:
        return 'negative'
    else:
        return 'neutral'

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
