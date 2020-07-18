import random
import json
import torch
from model import NeuralNet
from nltk_util import bag_of_words, tokenize

# if the pytorch is installed with cuda 
# run this command to find the compatibility of the system 
# device = torch.device('cuda' if torch.cuda.is_available else 'cpu')
# otherwise initialize device='cpu' 
device = 'cpu'

with open('./scripts/intent.json', 'r') as f:
    intents = json.load(f)

FILE = "./scripts/data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

def response(sentence):
    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X)

    output = model(X)
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.75:    
        for intent in intents['intents']:
            if tag == intent['tag']:
                return(random.choice(intent['responses']))
    else:
        return("I do not understand...")
