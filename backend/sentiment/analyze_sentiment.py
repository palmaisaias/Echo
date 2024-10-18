import spacy

# Load the spaCy language model. spaCy language model is the AI protion of the project. We can implement more complex language models and
# try to spice it up a little with some of the feedback.
nlp = spacy.load("en_core_web_sm")

def analyze_sentiment(text):
    # Perform basic sentiment classification based on word token analysis
    doc = nlp(text)
    positive_words = ["good", "happy", "love", "great", "positive", "joyful", "grateful", "optimistic", "peaceful", "content", "satisfied", "hopeful", "cheerful", "vibrant", "blissful", "confident", "empowered", "energetic", "friendly", "harmonious", "inspired", "motivated", "radiant", "thrilled", "uplifted"]
    negative_words = ["bad", "sad", "hate", "terrible", "negative"]

    positive_count = sum([1 for token in doc if token.text.lower() in positive_words])
    negative_count = sum([1 for token in doc if token.text.lower() in negative_words])

    if positive_count > negative_count:
        return 'positive'
    elif negative_count > positive_count:
        return 'negative'
    else:
        return 'neutral'

if __name__ == "__main__":
    import sys
    text = sys.argv[1]
    print(analyze_sentiment(text))
