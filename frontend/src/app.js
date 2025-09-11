$(document).ready(function() {
    $("#getMessage").click(function() {
        $.get("http://localhost:8080/api/hello", function(data) {
            console.log("Message from backend:", data);
            $("#message").text(data);
        }).fail(function() {
            $("#message").text("Failed to connect to backend.");
        });
    });
});

// set default date to today
$(function () {
  const today = new Date().toISOString().split("T")[0];
  $("#date").val(today);
});