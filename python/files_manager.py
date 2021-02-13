from collections import defaultdict


def search_pizzas(input_lines):
    for index, line in enumerate(input_lines):
        quantity_of_ingredients, *ingredients = line.split()
        
        yield {
            'ingredients': ingredients,
            'quantity_of_ingredients': int(quantity_of_ingredients),
            'line': index
        }


def sort_max_to_min_ingredients(pizzas):
    pizzas.sort(key = lambda element : element['quantity_of_ingredients'], reverse = True)
    return pizzas
    

def read_input_file(filename):
    pizzas = []
    people_by_team = 0
    quantity_of_pizzas = 0

    with open(filename) as file:
        input_lines = file.readlines()
        quantity_of_pizzas, *people_by_team = map(int, input_lines.pop(0).split())

        pizzas = list(search_pizzas(input_lines))
         
    pizzas = sort_max_to_min_ingredients(pizzas)
    team_distribution = zip(("team_2", "team_3", "team_4"), people_by_team)

    return quantity_of_pizzas, dict(team_distribution), pizzas 


def write_output_file(filename, content):
    with open(f'outputs/{filename}', 'w') as f:
        f.write('\n'.join(content))
