var repo;
var ghObj;

var newForm = "<input type='text'id='user' />" +
    "<input type='text' id='repo' />" +
    "<button type='button' id='dataButton'>Write Data</button>" ;


function readToken(){
	$("#newForm").html("");
	var token = $("#token").val();
	
	ghObj = new Github({
		token: token,
		auth: "oauth"
    });

	$("#newForm").append(newForm);
	$("#dataButton").click(getData);
};

function getData(){
	console.log($("user").val());
	console.log($("repo").val());
	repo = ghObj.getRepo($("#user").val(), $("#repo").val());
	repo.show(function(error,repo){
		if (error) {
			$("#newForm").append("<h3>Error: " + error.error + "</h3>");
	    } else {
			$("#newForm").append("<p>Repo data:</p>" +
				      "<ul><li>Full name: " + repo.full_name + "</li>" +
				      "<li>Description: " + repo.description + "</li>" +
				      "<li>Created at: " + repo.created_at + "</li>" +
				      "</ul><button id='write'>Write File</button>" +
				      "<input type='text'id='text'/> " +
				      "<div id='writefile' />");
			
			$("#write").click(writeRepo);
	    }
	});
    
};

function writeRepo() {
    repo.write('master', 'datafile', 
		 $("#text").val(),
		 "Appending Text", function(err) {
		     console.log (err)
		 });
    	$("#newForm").append("<h2>Success!!</h2>");
};

$(document).ready(function() {

    $("#formButton").click(readToken);

    
});
