#Purpose
- To thoroughly simulate various voting methods with a wide range of possible candidates and personal opinions for each voter.
- To determine:
 - easiest method of voting
 - ballot spoiling
 - average satisfaction
 - ...

#Suggested Uses
###Range of Candidates:
- 2-10 nonpartisan candidates
- 2 partisan candidates + 0-8 non-partisan candidates
- 3 partisan candidates + 0-7 non-partisan candidates
- More candidates should be allowable
- (Pres + VP combination counts as 1 candidate)

###Position Specifications:
- 1 position of 1 position type to fill
- multiple position types (Pres, Justice, Mayor, etc)
- multiple positions of same type (2+ Justices, Members of Congress, Trustees, etc)

###Voter Qualities:
- Satisfaction Percentage for each candidate (or candidate combination)
- Knowledge of said satisfaction(May go unused)
- Expected voting style
- Adaptability to each new voting style(This is complex)

###Voting Methods(All Bubble fill.  Punch machines are known evil):
- Pick 1 choice per position per position type (current standard, multiple bubbles is Spoiled)
- Approve Yes/No (Fill in for Yes, Leave blank for No)
- Approve Yes/No (Fill in for No, Leave blank for Yes)
- Approve Yes/No (Two bubbles, blank for no opinion)
- Approve Yes/No/Maybe (Three Bubbles, blank is Maybe)
- Approve Yes/No/Maybe (Three Bubbles, blank is Spoiled)
- Approve 5-point scale (Five Bubbles, blank is 3/unknown)
- Approve 5-point scale (Five Bubbles, blank is Spoiled)
- Ranking (Number of Bubbles/Candidate is number of Candidates, Double Bubbles are Spoiled)
- Ranking Write-in (1-5 lines of top 1-5 candidates, illegible is Spoiled)
- ...

###Voter Demographics:
- The ratio of various types of voters should be highly customizable outside of this file (To the end user).
		
#Style
	Classes get first letter capitalized.  SuchaSuchaClass
	Methods and Variables get standard camel casing.  suchaSuchaMethod, suchaSuchaVariable