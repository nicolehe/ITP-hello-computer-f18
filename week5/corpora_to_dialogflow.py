import json
import sys

results = []

with open('clothing.json') as data_file:
    data = json.load(data_file)
    for word in data['clothes']:
        word_obj = {}
        word_obj['value'] = word
        word_obj['synonyms'] = [word]
        results.append(word_obj)
        
with open('clothing_results.json', 'w') as results_file:
    print results
    json.dump(results, results_file)
    

