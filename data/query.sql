select distinct performance.id as performance_id, 
		performance.title as performance, 
		performance.isPremiere, 
        concert.title as concert,
        work.title as work,
        work.isCommission,
        work.isResidency,
        work.sortYear as work_year,
        ensemble.title as ensemble,
        season.title as season,
        venue.title as venue,
        person.title as person,
        country.title as country
from performance
left join concert on performance.concert_id = concert.id
left join work on performance.work_id = work.id
left join performancegrouping_ensemble on performance.performanceGrouping_id = performancegrouping_ensemble.id
left join ensemble on performancegrouping_ensemble.ensemble_id = ensemble.id
left join country on ensemble.country_id = country.id
left join person on person.country_id = country.id
left join season on concert.season_id = season.id
left join venue on concert.venue_id = venue.id
order by work.isCommission desc

        
        
        
        




        