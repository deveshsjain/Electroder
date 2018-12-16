$(document).ready(function(){
    $("#regBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/register',
          success: function(data){
            $("#regDiv").html(data);
          }
        });
    });
 
    $("#loginBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/login',
          success: function(data){
            $("#loginDiv").html(data);
          }
        });
    });
    //=====Login Form Request=============================================
    $("#loginForm").click(function(){
      var uname  = $("#uname").val();
      var upass = $("#upass").val();
      var loginData ={'name': uname,'pass':upass};
      $.ajax({
          type : 'POST',
          url : '/demo',
          data : loginData,
          success: function(data){
          $("#mainDiv").html(data);
          }
        });
 
    });
 //=====Register Form=============================================
    $("#regForm").click(function(){
      var uname  = $("#uname").val();
      var upass = $("#upass").val();
      var regData ={'name': uname,'pass':upass};
        $.ajax({
          type : 'POST',
          url : '/profile',
          data : regData,
          success: function(data){
          $("#mainDiv").html(data);
          }
        });
    });
 
 });