import os
import sys
from collections import defaultdict
from files_manager import read_input_file


def count_people_from_teams(team_distribution):
    return sum(
        int(quantity_of_people[-1]) * teams
        for quantity_of_people, teams in team_distribution.items()
    )


def reshape_distribution(quantity_of_pizzas, team_distribution, memoized=None):
    memoized = memoized or defaultdict(int)

    if quantity_of_pizzas == 0:
        return True, memoized
        
    for team in team_distribution.keys():
        person_by_team = int(team[-1])
        
        if quantity_of_pizzas < person_by_team or team_distribution[team] == 0:
            continue

        team_distribution[team] -= 1
        memoized[team] += 1

        quantity_of_pizzas -= person_by_team
        done, memoized = reshape_distribution(quantity_of_pizzas, team_distribution, memoized)
        
        if done:
            return done, memoized
        
        team_distribution[team] += 1
        memoized[team] -= 1

    return True, memoized


def main(input_file):
    quantity_of_pizzas, team_distribution, pizzas = read_input_file(input_file)
    quantity_of_people = count_people_from_teams(team_distribution)

    if quantity_of_pizzas < quantity_of_people:
        _, team_distribution = reshape_distribution(quantity_of_pizzas, team_distribution)
        team_distribution = dict(team_distribution)

    print(pizzas)
    print(team_distribution)
    print(quantity_of_pizzas)


if __name__ == '__main__':
    input_file = sys.argv[1]
    if not os.path.isfile(input_file):
        print(f"{input_file} is not a file")
        exit()

    main(input_file)
