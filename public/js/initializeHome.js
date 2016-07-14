
$(document).ready(function(event) {
	//window.setInterval(listMappings, 1000);
 	listMappings();

	$('#refresh_button').click(listMappings);
	 var succTasklets = parseInt(document.getElementById("successfulTasklets").innerHTML);
	 var failTasklets = parseInt(document.getElementById("failedTasklets").innerHTML);

	 Morris.Donut({
	      element: 'graph_donut',
	      data: [
	        {label: 'Successful Tasklets', value: succTasklets},
	        {label: 'Failed Tasklets', value: failTasklets},

	      ],
	      colors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
	      formatter: function (y) {
	        return y ;
	      },
	      resize: true
	    });

	       Chart.defaults.global.legend = {
        enabled: false
      };



      // Bar chart
      var ctx = document.getElementById("mybarChart");
      var labels = [];
      var succ = [];
      var fail = [];
      $("#containerManager li ").each(function(i,obj){
      	labels.push($(obj).attr('name'));
      	succ.push($(obj).attr('success'));
      	fail.push($(obj).attr('fail'));
      });

      var mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Successful Tasklets',
            backgroundColor: "#26B99A",
            data:succ
          }, {
            label: 'Failed Tasklets',
            backgroundColor: "#03586A",
            data: fail
          }]
        },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });



});

function listMappings(){
	$.get('./api/listMappings/', addMappingsToView);
}

function addMappingsToView(result){
	console.log("result is " + result);
	var html =  "";
	result.forEach(function(value){
		if(value.status === 1)
		   html += "<li class=\"mappingClick\" attr="+ value.fileName +"> <a> <i class=\"fa fa-check-circle\"></i><h4>" + value.name + "<h4></a></li>"
	    else
	       html += "<li class=\"mappingClick\" attr="+ value.fileName +"> <a> <i class=\"fa fa-times-circle\"></i><h4>" + value.name + "<h4></a></li>"
	});
    //adding clicks to class

	$('#mappings_list').html(html);
	$('.mappingClick').click(function(){

		var fileName = $(this).attr('attr')

		var url = "/?mapping=" + fileName;
		window.location.href=url;

	});
}
