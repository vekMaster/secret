async function chooseBestOptionPizza(memoized, totalPizza, teamDistribution){
    if(totalPizza === 0){
        memoized.done = true;
        return memoized;
    } 

    for (const team in teamDistribution){
        let personByTeam = parseInt(team.slice(-1))
        
        if(totalPizza >= personByTeam && teamDistribution[team] > 0){
            teamDistribution[team] -= 1;
            memoized[team] += 1;

            await chooseBestOptionPizza(memoized, totalPizza - personByTeam, teamDistribution);
            
            if(memoized.done)
                return memoized
            
            teamDistribution[team] += 1;
            memoized[team] -= 1;
        }
    }

    return memoized;
}

async function choosePizzasForEachTeam(totalPizza, teamDistribution){
    const totalMembers = (teamDistribution.team2 * 2) + (teamDistribution.team3 * 3) + (teamDistribution.team4 * 4)
    if(totalMembers <= totalPizza){
        return teamDistribution
    }
        
    const result = await chooseBestOptionPizza({ team2:0, team3:0, team4:0 }, totalPizza, teamDistribution)
    console.log(result);
}


const teamD = {
    team2: 1,
    team3: 2,
    team4: 1
}

const pizzas = 5

choosePizzasForEachTeam(pizzas, teamD);