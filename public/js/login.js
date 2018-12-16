

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
          url : '/regiterToDb',
          data : regData,
          success: function(data){
          $("#mainDiv").html(data);
          }
        });
    });
 //Save profile Data================================================
 $('#saveBtn').click(function(){
   
   console.log('in login.js');
  
   var name = $("#name").val();
   var address = $("#address").val();
   var email = $("#email").val();
   var phone = $("#phone").val();
   var pass = $("#pass").val();
   var profileData = {'email':email,'phone':phone,'address' : address,'name' : name,'pass' : pass};
   $.ajax({
     type : 'POST',
     dataType: "json",
     url : 'http://localhost:3000/user/home',
     data : profileData,
     
     success : function(data){
     // window.location.href = data.redirecturl; // your action should return an object having [redirecturl] property
        $("#mainDiv").html(data); //dynamic content 
        console.log(this.url)
     },
     error: function (httpRequest, textStatus, errorThrown) {  // detailed error messsage 
      alert("Error: " + textStatus + " " + errorThrown + " " + httpRequest);
  }
     
   });
 });
 });