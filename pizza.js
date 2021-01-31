async function chooseBestOptionPizza(memoized, totalPizza, teamDistribution){
    if(totalPizza === 0){
        memoized.done = true;
        return memoized;
    } 

    if(totalPizza >= 4 && teamDistribution.team4 > 0){
        teamDistribution.team4 -= 1;
        memoized.team4 += 1;
        await chooseBestOptionPizza(memoized, totalPizza - 4, teamDistribution);
        if(memoized.done)
            return memoized
        teamDistribution.team4 += 1;
        memoized.team4 -= 1;
    }
    if(totalPizza >= 3 && teamDistribution.team3 > 0){
        teamDistribution.team3 -= 1;
        memoized.team3 += 1;
        await chooseBestOptionPizza(memoized, totalPizza - 3, teamDistribution);
        if(memoized.done)
            return memoized
        teamDistribution.team3 += 1;
        memoized.team3 -= 1;
    }
    if(totalPizza >= 2 && teamDistribution.team2 > 0){
        teamDistribution.team2 -= 1;
        memoized.team2 += 1;
        await chooseBestOptionPizza(memoized, totalPizza - 2, teamDistribution);
        if(memoized.done)
            return memoized
        teamDistribution.team2 += 1;
        memoized.team2 -= 1;
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
    team3: 1,
    team4: 1
}

const pizzas = 1

choosePizzasForEachTeam(pizzas, teamD);