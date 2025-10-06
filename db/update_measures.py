import json
import re

def get_measures_for_food(food_item):
    food_type = food_item.get('type', '').lower()
    name = food_item.get('name', {}).get('pt', '').lower()
    
    # Default measures
    measures = {
        "cup": None,
        "spoon": None,
        "teaSpoon": None,
        "unity": None,
        "unitySmall": None,
        "unityLarge": None,
        "can": None,
        "glass": None,
        "breast": None,
        "clove": None,
        "slice": None,
        "bunch": None,
        "pinch": None
    }
    
    # Fruits
    if food_type == 'fruit':
        if 'abacate' in name:
            measures.update({"cup": 150, "spoon": 15, "unity": 200, "unitySmall": 150, "unityLarge": 300, "slice": 30})
        elif 'abacaxi' in name:
            measures.update({"cup": 165, "spoon": 10, "unity": 900, "unitySmall": 700, "unityLarge": 1200, "slice": 80})
        elif 'abóbora' in name or 'abobora' in name:
            measures.update({"cup": 116, "spoon": 7, "unity": 500, "unitySmall": 300, "unityLarge": 800, "slice": 25})
        elif 'abobrinha' in name:
            measures.update({"cup": 124, "spoon": 8, "unity": 200, "unitySmall": 150, "unityLarge": 300, "slice": 20})
        elif 'banana' in name:
            measures.update({"cup": 150, "spoon": 9, "unity": 120, "unitySmall": 80, "unityLarge": 150, "slice": 15})
        elif 'beringela' in name:
            measures.update({"cup": 82, "spoon": 5, "unity": 450, "unitySmall": 300, "unityLarge": 600, "slice": 20})
        elif 'chuchu' in name:
            measures.update({"cup": 132, "spoon": 8, "unity": 200, "unitySmall": 150, "unityLarge": 300, "slice": 25})
        elif 'carambola' in name:
            measures.update({"cup": 108, "spoon": 7, "unity": 90, "unitySmall": 60, "unityLarge": 120, "slice": 15})
        elif 'azeitona' in name:
            measures.update({"cup": 134, "spoon": 8, "unity": 4, "unitySmall": 3, "unityLarge": 6})
    
    # Vegetables/Roots
    elif food_type in ['root', 'vegetable', 'legumen']:
        if 'batata' in name and 'doce' not in name:
            measures.update({"cup": 150, "spoon": 9, "unity": 150, "unitySmall": 100, "unityLarge": 250, "slice": 20})
        elif 'batata doce' in name or 'batata-doce' in name:
            measures.update({"cup": 133, "spoon": 8, "unity": 130, "unitySmall": 100, "unityLarge": 200, "slice": 25})
        elif 'beterraba' in name:
            measures.update({"cup": 136, "spoon": 9, "unity": 80, "unitySmall": 60, "unityLarge": 120, "slice": 15})
        elif 'cenoura' in name:
            measures.update({"cup": 128, "spoon": 8, "unity": 60, "unitySmall": 40, "unityLarge": 100, "slice": 10})
        elif 'cebola' in name:
            measures.update({"cup": 160, "spoon": 10, "unity": 110, "unitySmall": 70, "unityLarge": 150, "slice": 15})
        elif 'aipim' in name or 'mandioca' in name:
            measures.update({"cup": 140, "spoon": 9, "unity": 200, "unitySmall": 150, "unityLarge": 300, "slice": 30})
        elif 'couve-flor' in name:
            measures.update({"cup": 100, "spoon": 6, "unity": 600, "unitySmall": 400, "unityLarge": 900, "slice": 20})
    
    # Herbs/Spices
    elif food_type == 'herb':
        if 'alecrim' in name:
            measures.update({"spoon": 2, "teaSpoon": 1, "bunch": 10, "pinch": 0.5})
        elif 'alface' in name:
            measures.update({"cup": 36, "spoon": 2, "unity": 8, "unitySmall": 5, "unityLarge": 12, "slice": 3})
        elif 'alho' in name:
            measures.update({"spoon": 9, "teaSpoon": 3, "clove": 3, "pinch": 1})
        elif 'cebolinha' in name:
            measures.update({"cup": 16, "spoon": 1, "teaSpoon": 0.3, "bunch": 25, "pinch": 0.2})
        elif 'coentro' in name:
            measures.update({"cup": 16, "spoon": 1, "teaSpoon": 0.3, "bunch": 20, "pinch": 0.2})
        elif 'cravo' in name:
            measures.update({"teaSpoon": 2, "unity": 0.5, "pinch": 0.1})
    
    # Seeds/Nuts
    elif food_type == 'seed':
        if 'amêndoa' in name:
            measures.update({"cup": 143, "spoon": 9, "unity": 1.2, "unitySmall": 0.8, "unityLarge": 1.5})
        elif 'castanha' in name:
            measures.update({"cup": 140, "spoon": 9, "unity": 5, "unitySmall": 3, "unityLarge": 8})
        elif 'arroz' in name:
            measures.update({"cup": 185, "spoon": 12})
        elif 'ervilha' in name:
            measures.update({"cup": 145, "spoon": 9})
        elif 'cardamomo' in name:
            measures.update({"teaSpoon": 2, "unity": 0.3, "pinch": 0.1})
    
    # Powders/Flours
    elif food_type in ['powder', 'flake']:
        if 'açúcar' in name or 'acucar' in name:
            measures.update({"cup": 200, "spoon": 12, "teaSpoon": 4, "pinch": 1})
        elif 'sal' in name:
            measures.update({"spoon": 18, "teaSpoon": 6, "pinch": 1})
        elif 'farinha' in name or 'fubá' in name or 'amido' in name:
            measures.update({"cup": 120, "spoon": 8, "teaSpoon": 3})
        elif 'aveia' in name:
            measures.update({"cup": 80, "spoon": 5, "teaSpoon": 2})
        elif 'cacau' in name or 'achocolatado' in name:
            measures.update({"cup": 85, "spoon": 5, "teaSpoon": 2})
        elif 'canela' in name:
            measures.update({"spoon": 6, "teaSpoon": 2, "pinch": 0.5})
        elif 'bicarbonato' in name:
            measures.update({"spoon": 14, "teaSpoon": 5, "pinch": 1})
        elif 'coco ralado' in name:
            measures.update({"cup": 80, "spoon": 5, "teaSpoon": 2})
    
    # Liquids
    elif food_type == 'liquid':
        if 'água' in name or 'agua' in name:
            measures.update({"cup": 240, "spoon": 15, "teaSpoon": 5, "glass": 200})
        elif 'leite' in name:
            measures.update({"cup": 240, "spoon": 15, "teaSpoon": 5, "glass": 200})
        elif 'azeite' in name or 'óleo' in name:
            measures.update({"cup": 216, "spoon": 14, "teaSpoon": 5})
        elif 'cerveja' in name:
            measures.update({"cup": 240, "glass": 350, "can": 350})
        elif 'cachaça' in name:
            measures.update({"cup": 240, "spoon": 15, "teaSpoon": 5, "glass": 50})
        elif 'café' in name:
            measures.update({"cup": 240, "spoon": 15, "teaSpoon": 5, "glass": 150})
        elif 'caldo' in name:
            measures.update({"cup": 240, "spoon": 15, "teaSpoon": 5, "glass": 200})
        elif 'chá' in name:
            measures.update({"cup": 240, "spoon": 15, "teaSpoon": 5, "glass": 200})
        elif 'coalhada' in name:
            measures.update({"cup": 245, "spoon": 15, "teaSpoon": 5, "glass": 200})
        elif 'caril' in name:
            measures.update({"cup": 240, "spoon": 15, "teaSpoon": 5})
    
    # Oils
    elif food_type == 'oil':
        measures.update({"cup": 216, "spoon": 14, "teaSpoon": 5})
    
    # Meat
    elif food_type == 'meat':
        measures.update({"cup": 140, "spoon": 9, "unity": 100, "unitySmall": 80, "unityLarge": 150, "slice": 30})
    
    # Solids (general)
    elif food_type == 'solid':
        if 'amendoim' in name:
            measures.update({"cup": 146, "spoon": 9, "unity": 0.7})
        elif 'biscoito' in name:
            measures.update({"unity": 5, "unitySmall": 3, "unityLarge": 8})
        elif 'chocolate' in name:
            measures.update({"cup": 150, "spoon": 9, "unity": 25, "slice": 10})
        elif 'clara de ovo' in name:
            measures.update({"cup": 240, "spoon": 15, "unity": 30})
        elif 'banha' in name:
            measures.update({"cup": 205, "spoon": 13, "teaSpoon": 4})
    
    return measures

# Read the JSON file
with open('c:/Users/anton/Downloads/projetos/caderninho-de-receitas/db/backup/Foods_2025_09_13.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update measures for each food item
for item in data:
    if item.get('measures'):
        new_measures = get_measures_for_food(item)
        item['measures'] = new_measures

# Write back to file
with open('c:/Users/anton/Downloads/projetos/caderninho-de-receitas/db/backup/Foods_2025_09_13.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Updated measures for all food items")