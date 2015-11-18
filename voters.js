/*Classes*/
//var Voter1 = new Voter(int, [[int,int,int,...],[int,int,int,...],...], string, int)//
Voter = function(id, satisfaction, expectation, adaptation, game) {
	this.id = id || 0; // Voter id, to prevent multiple votes from a single person.
	// A voter with an id of 0 does not get counted in the massive polls.
	
	this.satisfaction = satisfaction || {}; // How satisfied they would be with each candidate.
	this.satisfaction.all = this.satisfaction.all || .5;
	this.satisfaction.cutoff = this.satisfaction.cutoff || .5;
	// "nameOfPosition":[cand1,cand2,cand3,...]
	// if "all" is not filled out, assume 50% for all candidates.
	// Other positions take precedence above "all"
	// if actual satisfaction varies from expected satisfaction, change this value after voting is over.
	
	this.expectation = expectation || "Pick1"; // Preferred or Expected Voting Style.
	// influences ballot spoilage rates
	// influences ease of voting
	
	this.adaptation = adaptation || 0; // List of functions for how voter adapts to each new style
	// if not initialized, it should change based on a customizable function of preferred voting style and user entry
	// Adaptation functions should include a spot for Gaming the System functions.
	
	this.game = game || 0; // Gaming The System function list
	// if not initialized, this should do nothing.
}
VotingMethod = function (id, name, basic, game, adapt) {
	this.name = name || "NoNameHere";
	
	this.id = id || 0; // Should never be without an id!!!
	if (this.id == 0){
		console.log("Error!  VotingMethod "+ this.name +" has no id!");
	}
	
	this.basic = basic;
	if (typeof this.basic != "function"){
		console.log("Error!  VotingMethod "+ this.name +" has no basic function!");
	}
	
	this.game = game || []; // How voters can game the system
	this.adapt = adapt || {}; // How voters adapt to the system if it's strange to them
}
Candidate = function (id, party, name){
	this.name = name || "NoNameHere";
	this.id = id || 0;
	if (this.id == 0){
		console.log("Error!  Candidate "+ this.name +" has no id!");
	}
	this.party = party || "non-partisan";
}
Poll = function (id, candidates, voters){
	this.id = id || 0;
	this.candidates = candidates || [];
	this.voters = voters || [];
	this.run = function (type){
		var results = "";
		var poll = games[type]||adaptations[type]||methods[type];
		for(c in candidates){
			c.votes = 0;
		}
		results = poll(this.candidates,this.voters);
		for(c of candidates){
			c.votes=results[c.name];
		}
		console.log(results);
		return results;
	}
}
/*Initializations*/
methods = {
	"pick1": function(cands,voters){
		var count = {};
		for(c of cands){
			count[c.name] = 0;
		}
		for(v of voters){
			if(true){ // This if will see if the id has already been done.}
				var highest = 0;
				var voteIn = "";
				for(y in v.satisfaction){
					if (y!="all"&&y!="cutoff"){
						if(v.satisfaction[y]>highest){
							highest = v.satisfaction[y];
							voteIn = y;
						}
					}
				}
				//console.log(highest,voteIn);
				count[voteIn]++;
			}
		}
		return count;
	},
	"approvalY": function(cands,voters){
		var count = {};
		for(c of cands){
			count[c.name] = 0;
		}
		for(v of voters){
			if(true){ // This if will see if the id has already been done.}
				//var highest = 0;
				var voteIn = {};
				for(y in v.satisfaction){
					if (y!="all"&&y!="cutoff"){
						if(v.satisfaction[y]>v.satisfaction["cutoff"]){
							voteIn[y] = true;
							count[y]++;
						} else {
							voteIn[y] = false;
							//count[y]--;
						}
						//console.log(y,voteIn[y]);
					}
				}
			}
		}
		return count;
	},
	"approvalYN": function(cands,voters){
		var count = {};
		for(c of cands){
			count[c.name] = 0;
		}
		for(v of voters){
			if(true){ // This if will see if the id has already been done.}
				//var highest = 0;
				var voteIn = {};
				for(y in v.satisfaction){
					if (y!="all"&&y!="cutoff"){
						if(v.satisfaction[y]>v.satisfaction["cutoff"]){
							voteIn[y] = true;
							count[y]++;
						} else {
							voteIn[y] = false;
							count[y]--;
						}
						//console.log(y,voteIn[y]);
					}
				}
			}
		}
		return count;
	}
};
games = {};
adaptations = {};
runPolls = function(){
	console.log(myPoll.run("Pick1"));
}
/*Running Console Simulation*/
allVoters = [];
allCands = [];
for (i=0;i<10;i++){
	allCands[i] = new Candidate(i, "non-partisan", "Noob"+i);
}
for (i=0;i<100;i++){
	var sats = {};
	for (j of allCands){
		sats[j.name] = Math.random();
	}
	if(!(i%10)){
	//console.log("Voter "+i+" "+sats.Noob0+" "+sats.Noob1+" "+sats.Noob2+" "+sats.Noob3+" ");
	}
	allVoters[i] = new Voter(i,sats,"pick1");
}
myPoll = new Poll(0, allCands, allVoters);
myPoll.run("pick1");
myPoll.run("approvalY");
myPoll.run("approvalYN");
/*Setting up GUI*/
$(document).ready(function(){
	/*Actions*/
	$("form").submit(function(e){
		e.preventDefault();
	});
	$("button#addCand").click(function(){
		var newID = $("table#candidates").find("tr").length-1;
		$("tr#original.cand").clone(true).attr("id","").appendTo("table#candidates tbody").show().find("td:first-child").text($("table#candidates tr").length-2);
		$("fieldset#voters input#numOfVoters").attr("min",newID*10);
	});
	$("button.remove").click(function(){
		var row = $(this).parent().parent();
		if(row.attr("id")!="original"){
			$(this).parent().parent().remove();
		}
		$("table#candidates tr.cand td:first-child").each(function(){
			this.innerHTML = $(this).parent().index()-1;
		});
	});
	$("button#buildSim").click(function(){
		var candidates = [];
		var voters = [];
		var pollId = 0;
		for (i=2;i<$("table#candidates tr").length;i++){
			candidates.push(new Candidate(
				i-1,
				$("table#candidates tr:nth-child("+(i+1)+") select.party").val(),
				$("table#candidates tr:nth-child("+(i+1)+") input.name").val()
			))
		};
		for (i=0;i<$("input#numOfVoters").val();i++){
			var sats = {};
			for (j of candidates){
				var likeableChange = (50 - $("table#candidates tr:nth-child("+(j.id+2)+") input.likeable").val())/100
				sats[j.name] = Math.random()-(Math.random()*likeableChange);
			}
			voters.push(new Voter(i,sats,"pick1"));
		}
		thisPoll = new Poll(pollId, candidates, voters);
		$("div#poll").data("whichPoll",thisPoll);
		//console.log("Candidates:",thisPoll.candidates);
		$("table#satisfaction tr:not(#original,.header)").remove();
		for(j in candidates){
			var satis = 0;
			for (i=0;i<voters.length;i++){
				satis += voters[i].satisfaction[candidates[j].name];
			}
			satis /= voters.length;
			$("table#satisfaction tr#original").clone()
				.find("th").text(candidates[j].name).parent()
				.find("td:nth-child(2)").text(satis).parent()
				.appendTo("table#satisfaction tbody")
				.attr("id","")
				.show();
		}
	});
	$("button#runSim").click(function(){
		var poll = $("div#poll").data("whichPoll");
		var voters = poll.voters;
		var candidates = poll.candidates;
		var types = [];
		$("fieldset#polls input:checked").each(function(){
			types.push([this.id,this.value]);
		});
		console.log(types);
		//Remove old Poll data
		$("table#results tr :not(:nth-Child(1))").remove();
		/*Run Each Poll*/
		for(i=0;i<types.length;i++){
			votes = poll.run(types[i][0]);
			var cands = [];
			for (c of candidates){
				cands.push([c.id,c.name,c.votes]);
			}
			cands.sort(function(a,b){
				return b[2]-a[2];
			});
			$("table#results tr.header").append($("<th>"+types[i][1]+"</th>"));
			$("table#results tr#winner").append($("<td>"+cands[0][1]+"</td>"));
			var voteDisplay = $("<td><ul></ul></td>");
			for(c of cands){
				voteDisplay.find("ul").append($("<li>"+c[1]+": "+c[2]+"</li>"));
			}
			$("table#results tr#votes").append(voteDisplay);
		}
	});
	/*Styling*/
	for(var i=1;i<5;i++){
		$("table#candidates tr.heading th:nth-child("+i+")").width($("table#candidates tr#original td:nth-child("+i+")").width());
	}
});