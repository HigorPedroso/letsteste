// Initialize app
var myApp = new Framework7();



// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
		
});
        
document.addEventListener('backbutton', function (e) {
  e.preventDefault();
  return false;
});	

// Now we need to run the code that will be executed only for About page.

myApp.onPageInit('login-screen', function (page) {
	
  var pageContainer = $$(page.container);
  pageContainer.find('.list-button').on('click', function () {
    var username = pageContainer.find('input[name="username"]').val();
    var password = pageContainer.find('input[name="password"]').val();
    // Handle username and password
    //myApp.alert('Username: ' + username + ', Password: ' + password, function () {
      //
	  $$.ajax({
    url : 'http://letstags.com.br/Aplicativo/login.php',
    type : 'post',
    data : {'email': username, 'senha': password},
    dataType: 'html',
    beforeSend: function(){
      myApp.showPreloader('Carregando');
    },
    timeout: 3000,    
    success: function(retorno){
		myApp.hidePreloader();
	  if(retorno != " "){
		 var data = JSON.parse(retorno);  
	 
	  $$.each(data,function(i, data){
		var id = data.idUser;
		window.localStorage.setItem("loggedIn", id);
		window.localStorage.setItem("username", data.nome);
		});
		mainView.router.back();
	  }else{
		  myApp.alert('Dados de usuário inválidos!', 'Ops');
	  }
    },
    error: function(erro){
      
    }       
            });
    });
  });


// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('player', function (page) {
    
})


function codigo(video) {
	
	function SocialShare(titulo) {
  $$('#btnCompartilhar').on("tap click", function () {
     window.plugins.socialsharing.share(titulo, null);
  });
}

var code = $$('.idvideo').text();

SocialShare("http://letstags.com.br/video.php?action=" + code);
 //Chamando meu método
	
		var verificando = $$('.verificacodigo').text();
		
if (verificando.indexOf('-') >= 1 && verificando.indexOf('&') >= 1)
{
  var codigo = $$('.idvideo').text();
}else{
	 var codigo = "erro";
}

		if(codigo != "erro"){	
		$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/loginweb.php',
		type : 'post',
		dataType: 'html',
		beforeSend: function(){
			myApp.showPreloader('Aguarde');
    },
    timeout: 3000,    
    success: function(retorno){
	var code = $$('.idvideo').text();
	
        $$('#video').html('<iframe width="100%" height="180" src="http://www.youtube.com/embed/' + code + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');
     myApp.hidePreloader('Aguarde');
	 	
		perguntas();
		verifica(code);
    },
    error: function(erro){
      
    }       
  });
		}else{
			$$('.sociais').hide();
			$$('.fav').hide();
			$$('.ops').show();
		}

		
if(window.localStorage.getItem("loggedIn") >= 1) {
			
			}
else
{
login();
}
		
      }

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'player') {
        // Following code will be executed for page with data-page attribute equal to "about"
     $$('.sociais').show();
	$$('.fav').hide(); 
	codigo(video);
	verificacurtida();
	
	
	$('.voltar').on('click', function(){
		mainView.router.loadPage('index.html');
		$$('.sociais').hide();
	$$('.fav').show();
	});
    }
	
	if (page.name === 'index') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //$$('.player').text('Inicio');
		//$$('.sociais').hide();
		//$$('.fav').show();
    }
	
	if (page.name === 'comprar') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //$$('.player').text('Inicio');
		$$('.sociais').hide();
		$$('.fav').hide();	
		
		var link = $$('.linkcomprar').text();
		
		$$('.comprar').html('<iframe width="100%" height="750px" frameborder="0"  marginheight="0" marginwidth="0" src="' + link + '" target="_top" ></iframe>');
		
		$('.voltar5').on('click', function(){
		mainView.router.back();
		$$('.sociais').show();
		$$('.fav').hide();
	});
    }
	
	if(page.name === 'vauncher'){
		
		var idUser = window.localStorage.getItem("loggedIn");
		var empresa = $$('.idCupom').text();  
		
		$$.ajax({
			url : 'http://letstags.com.br/Aplicativo/vauncher.php',
			type : 'post',
			data : {'idUser': idUser, 'empresa': empresa},
			dataType: 'html',
			beforeSend: function(){
			
			},
			timeout: 3000,    
			success: function(retorno){
				if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";	  
	 
	  $$.each(data,function(i, data){
		  item += '<li class="card" style="margin-top:10px;"><div class="card-header">' + data.codigo + '</div><div class="card-content"><div class="card-content-inner">Oferecido por: ' + data.empresa + '</div></div><div class="card-footer">' + data.desconto + ' de desconto</div></li>';
			});
			$$(".vauncher").html(item);
				}else{
					
				}
			},
			error: function(erro){
     
			}       
		});
	}
	
	if (page.name === 'cupons') {
		
		$$('.sociais').hide();
		$$('.fav').hide();	
		
		$('.voltar5').on('click', function(){
		mainView.router.back();
		$$('.sociais').show();
		$$('.fav').hide();
		verificacurtida();
	});
		
        
       		var idUser = window.localStorage.getItem("loggedIn");
	
		$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/receberCupons.php',
		type : 'post',
		data : {'idUser': idUser},
		dataType: 'html',
		beforeSend: function(){
			myApp.showPreloader('Carregando');
    },
    timeout: 3000,    
    success: function(retorno){
		myApp.hidePreloader('Carregando');
	if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";	  
	 
	  $$.each(data,function(i, data){
		var pontos = parseInt(data.pontos, 10);
		var pontosTotal = parseInt(data.pontosTotal, 10);
		
		if(pontos < pontosTotal){	
		
		  item += '<ul><li><div class="item-content"><div class="item-media" style="background:#007aff; padding: 3px; border-radius:4px; color:white"><span class="porcentagem' + data.idPonto + '">' + data.porcentagem + '</span></div> <div class="item-inner"><div class="item-title nomeEmpresaPonto' + data.idPonto + '">' + data.empresa + '</div><div class="item-after"><span class="pontos' + data.idPonto + '">' + data.pontos + '</span>/<span class="pontosTotal' + data.idPonto + '">' + data.pontosTotal + '</span></div></div></div><!-- Sortable handler  --><div class="sortable-handler"></div></li></ul>';
		}else{
			 
			  item += '<ul><a onClick="gerarCupom(' + data.idPonto +')"><li><div class="item-content remove' + data.id + '"><div class="item-media" style="background:#007aff; padding: 3px; border-radius:4px; color:white"><span class="porcentagem' + data.idPonto + '">' + data.porcentagem + '</span></div> <div class="item-inner"><div class="item-title nomeEmpresaPonto' + data.idPonto + '">' + data.empresa + '</div><div class="item-after"><span class="button active">Abrir</span></div></div></div><!-- Sortable handler  --><div class="sortable-handler"></div></li></a></ul>';
		}
		  
	  });
	  
	   $$(".cupons").html(item);
    }else{
		
	}
	},
    error: function(erro){
     
    }       
	   
    });
	}
	
	if (page.name === 'perfil') {
		$$('.sociais').hide();
		$$('.fav').hide();	
		
		var empresa = $$('.perfilempresa').text();
		
		$$('.empresanome').text(empresa);
	
		$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/seguidores.php',
		type : 'post',
		data : {'empresa': empresa},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		
		if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);  
	 var item = "";
	
	  $$.each(data,function(i, data){
			item += '<p><i class="fa fa-users" aria-hidden="true"></i> ' + data.total + ' Seguidores</p>';
			item += '<div class="modifica"><input style="display:none" class="qtseguidores" value="' + data.total + '"/></div>';
	  });
	  $$('.seguidores').html(item);
    }else{
		
	}
    },
    error: function(erro){
     
    }       
  });
  
  $$.ajax({
		url : 'http://letstags.com.br/Aplicativo/videos.php',
		type : 'post',
		data : {'empresa': empresa},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		
		if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);  
	  var item = "";
	
	  $$.each(data,function(i, data){
			item += '<li><a onClick="playerTwo(' + data.idPesquisa + ')" class="item-link item-content"><div class="item-media"><img src="https://img.youtube.com/vi/' + data.codigoVideo + '/0.jpg" width="44"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">' + data.titulo + '</div><p style="display:none" class="codigoVideo' + data.idPesquisa + '">' +data.codigoVideo + '</p> </div><div class="item-subtitle"><i class="f7-icons">' + data.visualizacao + ' Visualizações</div></div></a></li>';
	  });
	  $$('.empresavideo').html(item);
    }else{
		
	}
    },
    error: function(erro){
     
    }       
  });
  
  var idUser = window.localStorage.getItem("loggedIn");
	var empresa = $$('.empresanome').text();
	
	$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/verificaseguir.php',
		type : 'post',
		data : {'idUser': idUser, 'empresa': empresa},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		
		if(retorno.trim() == "true"){
			$$('.seguir').html('<p><a onClick="seguir()" class="button button-big">Seguir</a></p>');
		}else{
			$$('.seguir').html('<p><a onClick="seguir()" class="button active button-big">Seguindo</a></p>');
		}
    },
    error: function(erro){
     
    }       
  });
	}
	
	if (page.name === 'player2') {
		codigo(video);
		verificacurtida();
		$$('.sociais').show();
		$$('.fav').hide();
		
		$$('.voltar2').on('click', function(){
		mainView.router.loadPage('perfil.html');
		$$('.muda').html('<a onClick="voltares()" class="voltar2 link"><i class="icon icon-back color-white"></i> <span class="color-white">Inicio</span></a>');
		$$('.sociais').hide();
		$$('.fav').hide();
	});
	}
	
	if (page.name === 'player3') {
		codigo(video);
		verificacurtida();
		$$('.sociais').show();
		$$('.fav').hide();
	}
	
	if (page.name === 'favoritos') {
		
		
		
		if(window.localStorage.getItem("loggedIn") >= 1) {
					var idUser = window.localStorage.getItem("loggedIn");
	
	$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/receberFavoritos.php',
		type : 'post',
		data : {'idUser': idUser},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		if(retorno.trim() != ""){
		 var data = JSON.parse(retorno);
		var item = "";
		
		
	   $$.each(data,function(i, data){
	    item += '<li class="swipeout remover' + data.id + '"><div class="swipeout-content item-content" onClick="playerTree(' + data.id + ')"><div class="item-media"><img src="https://img.youtube.com/vi/' + data.codigo + '/0.jpg" width="44"></div><div class="item-inner">' + data.titulo + '<div class="item-after"><span class="button active">Assistir</span></div></div></div><div class="swipeout-actions-left"><a onClick="removerFavorito(' + data.id + ')" class="action1 bg-pink swipeout-delete">Remover</a></div><div class="swipeout-actions-right"><a onClick="removerFavorito(' + data.id + ')" class="action1 bg-pink">Remover</a></div></li><p style="display:none" class="codigoVideo' + data.id + '">' + data.codigo + '</p> ';
		

                });
	  $$(".favoritos").html(item);
		}else{
			$$(".favoritos").hide();
			$$(".ops").show();
		}
    },
    error: function(erro){
     
    }       
  });
			}
else
{
login();
}
		

	}
	
	if (page.name === 'seguindo') {
		if(window.localStorage.getItem("loggedIn") >= 1) {
			var idUser = window.localStorage.getItem("loggedIn");
	
	$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/receberSeguindo.php',
		type : 'post',
		data : {'idUser': idUser},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
if(retorno.trim() != ""){
		 var data = JSON.parse(retorno);
		var item = "";
	   $$.each(data,function(i, data){
		
	    item += ' <li class="item-content" onClick="perfil(' + data.id + ')"><div class="item-media"></div><div class="item-inner"><div class="item-title name' + data.id + '">' + data.empresa + '</div><div class="item-after"><span class="button active">Seguindo</span></div></div></li>';
                });
	  $$(".seguindoempresa").html(item);
}else{
	$$(".seguindoempresa").hide();
			$$(".ops").show();
}
    },
    error: function(erro){
     
    }       
  });
			}
else
{
login();
}
		

	}
	
	if (page.name === 'contatos') {
		
		if(window.localStorage.getItem("loggedIn") >= 1) {
					var idUser = window.localStorage.getItem("loggedIn");
	
	$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/receberContato.php',
		type : 'post',
		data : {'idUser': idUser},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		if(retorno.trim() != ""){
		 var data = JSON.parse(retorno);
		var item = "";
		
		
	   $$.each(data,function(i, data){
	    item += ' <li class="item-content" onClick="chat(' + data.idUser + ')"><div class="item-inner"><div class="item-title name nameConversa' + data.idUser + '">' + data.nome + '</div><div class="item-after"><span class="button active">Enviar</span></div></div></li>';
                });
	  $$(".contatos").html(item);
		}else{
			
		}
    },
    error: function(erro){
     
    }       
  });
			}
else
{
login();
}
		

	}
	
	if (page.name === 'chat') {
		var conversa = $$('.chatConversa').text();
		$$('.conversa').text(conversa);
/*var idUser = window.localStorage.getItem("loggedIn");
var idReceive = $('.idReceive').text();	 
	 
	 
      var APP = new Firebase('https://lets-tags.firebaseio.com/mensagens/');  

	  $('.send').on('click', function(){
		 var msg = $$('#mensagem').val();
    APP.push({mensagem: msg, sender: idUser, receive:  idReceive});

    $$('#mensagem').val('');
	});

	  
	 
	  APP.on('child_added', function(snap) {
  var novamensagem = snap.val(); //Nova mensagem recebida.
  carregaMensagem(novamensagem.mensagem, novamensagem.sender, novamensagem.receive);
});

APP.on('child_changed', 
   function (snap) {
       var novamensagem = snap.val(); //Nova mensagem recebida.
  carregaMensagem(novamensagem.mensagem, novamensagem.sender, novamensagem.receive);
   })
APP.on('child_removed', 
   function (snap) {
      var novamensagem = snap.val(); //Nova mensagem recebida.
  carregaMensagem(novamensagem.mensagem, novamensagem.sender, novamensagem.receive);
   })

function carregaMensagem(mensagem, sender, receive) {
	
	if(sender == idUser){
		if(idUser == sender && receive == idReceive || receive == idUser && sender == idReceive){
		 $$('<div/>').html('<div class="message message-sent"><div class="message-text">' + mensagem + '</div></div>')
		.appendTo($$('.messages'));

		 $('.messages-content').bind('scroll', function() {

        if($$(this).scrollTop() + $$(this).innerHeight() >= this.scrollHeight) {
            $$('body').append("<p>Fim da div</p>");
        }
    });

		}
	}else{
		if(idUser == sender && receive == idReceive || receive == idUser && sender == idReceive){
		if(receive == idUser){
		 $$('<div/>').html('<div class="message message-received"><div class="message-text">' + mensagem + '</div></div>')
		.appendTo($$('.messages'));

		 $('.messages-content').bind('scroll', function() {

        if($$(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
            $$('body').append("<p>Fim da div</p>");
        }
    });
		
		}else{
			$$('.messages').html('');
		}
		}
	}

 
};*/

var conversationStarted = false;

var idUser = window.localStorage.getItem("loggedIn");
var idReceive = $('.idReceive').text();	  

var APP = new Firebase('https://lets-tags.firebaseio.com/mensagens/');  
 
// Init Messages
var myMessages = myApp.messages('.messages', {
  autoLayout:true
});

APP.on('child_added', function(snap) {
  var novamensagem = snap.val(); //Nova mensagem recebida.
  carregaMensagem(novamensagem.mensagem, novamensagem.sender, novamensagem.receive);
});

APP.on('child_changed', 
   function (snap) {
       var novamensagem = snap.val(); //Nova mensagem recebida.
  carregaMensagem(novamensagem.mensagem, novamensagem.sender, novamensagem.receive);
   })
APP.on('child_removed', function (snap) {
		
	var novamensagem = snap.val(); //Nova mensagem recebida.
  removerMensagem(novamensagem.mensagem, novamensagem.sender, novamensagem.receive);
   })
   
   function removerMensagem(mensagem, sender, receive) {
	   if(sender == idUser){
		if(idUser == sender && receive == idReceive || receive == idUser && sender == idReceive){
		$$('.messages').html();
		}
   }else{
	   $$('.messages').html();
   }
   }

function carregaMensagem(mensagem, sender, receive) {
	
	if(sender == idUser){
		if(idUser == sender && receive == idReceive || receive == idUser && sender == idReceive){
 
  // Avatar and name for received message
  // Add message
  myMessages.addMessage({
    // Message text
    text: mensagem,
    // Random message type
    // Avatar and name:
    // Day
    //day: !conversationStarted ? 'Today' : false,
    //time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  })
		 /*$$('<div/>').html('<div class="message message-sent message-appear-from-bottom message-last message-with-tail message-first"><div class="message-text">' + mensagem + '</div></div>')
		.appendTo($$('.messages'));*/

		}
	}else{
		if(idUser == sender && receive == idReceive || receive == idUser && sender == idReceive){
		if(receive == idUser){
			 var messageType = 'received';
	
	 myMessages.addMessage({
    // Message text
    text: mensagem,
    // Random message type
	type: messageType,
    // Avatar and name:
    // Day
    //day: !conversationStarted ? 'Hoje' : false,
    //time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  })

		 /*$$('<div/>').html('<div class="message message-received message-with-avatar message-appear-from-bottom message-last message-with-tail"><div class="message-name">Kate</div><div class="message-text">' + mensagem + '</div><div class="message-avatar" style="background-image:url(http://lorempixel.com/output/people-q-c-100-100-9.jpg)"></div></div>')
		.appendTo($$('.messages'));*/
		
		}else{
			$$('.messages').html('');
		}
		}
	}

 }
// Init Messagebar
var myMessagebar = myApp.messagebar('.messagebar');
 
// Handle message
$$('.messagebar .link').on('click', function () {
  // Message text
  // Exit if empy message
  var messageText = myMessagebar.value().trim();
   APP.push({mensagem: messageText, sender: idUser, receive:  idReceive});
  // Empty messagebar
  myMessagebar.clear()
 
  // Update conversation flag
  conversationStarted = true;
});
	}
	
	
	
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="chat"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
  // Conversation flag
  
  $$('.fav').hide();
  $$('.sociais').hide();
  
});  

function scan()
{
	 
      cordova.plugins.barcodeScanner.scan(
	  

      function (result) {
		 myApp.showPreloader('Carregando');
		 myApp.hidePreloader('Carregando');
		
		$$('.verificacodigo').html(result.text);
		
		 var suaString = result.text;
		var text = suaString.split('-')[0];
          /*alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);*/
				
				mainView.router.loadPage('player.html');
				
				$$('.idvideo').html(text);
				
      },
      function (error) {
          alert("Falha: " + error);
      },
      {
		  
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Aponte para o Qr Code Let's Tags", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : false, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
   
}

function resposta1(id){
	$$('.per1').hide();
	$$('.per2').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
}

function resposta2(id){
	$$('.per2').hide();
	$$('.per3').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta2': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
}

function resposta3(id){
	$$('.per3').hide();
	$$('.per4').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta3': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
}

function resposta4(id){
	$$('.per4').hide();
	$$('.per5').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta4': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
}

function resposta5(id){
	$$('.per5').hide();
	$$('.per6').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta5': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
}

function resposta6(id){
	$$('.per6').hide();
	$$('.per7').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta6': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
}

function resposta7(id){
	$$('.per7').hide();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta7': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
	  pontos();
    },
    error: function(erro){
      
    }       
  });
  
   myApp.addNotification({
        title: 'Parabéns',
        message: 'Você acabou de adquirir seus pontos!'
    });
}

function resposta1Fin(id){
	$$('.per1').hide();
	$$('.answers').hide();
	$$('.plus').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
	  pontos();
    },
    error: function(erro){
      
    }       
  });
  
   myApp.addNotification({
        title: 'Parabéns',
        message: 'Você acabou de adquirir seus pontos!'
    });
}

function resposta2Fin(id){
	$$('.per2').hide();
	$$('.answers').hide();
	$$('.plus').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta2': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
	  pontos();
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
  

    myApp.addNotification({
        title: 'Parabéns',
        message: 'Você acabou de adquirir seus pontos!'
    });

}
		
function resposta3Fin(id){
	$$('.per3').hide();
	$$('.answers').hide();
	$$('.plus').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta3': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
	  pontos();
    },
    error: function(erro){
      
    }       
  });
  
   myApp.addNotification({
        title: 'Parabéns',
        message: 'Você acabou de adquirir seus pontos!'
    });
}

function resposta4Fin(id){
	$$('.per4').hide();
	$$('.answers').hide();
	$$('.plus').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta4': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn(); 
pontos();	  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
  
   myApp.addNotification({
        title: 'Parabéns',
        message: 'Você acabou de adquirir seus pontos!'
    });
}

function resposta5Fin(id){
	$$('.per5').hide();
	$$('.answers').hide();
	$$('.plus').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta5': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn(); 
pontos();	  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
  
   myApp.addNotification({
        title: 'Parabéns',
        message: 'Você acabou de adquirir seus pontos!'
    });
}

function resposta6Fin(id){
	$$('.per6').hide();
	$$('.answers').hide();
	$$('.plus').show();
	
	var idUser = window.localStorage.getItem("loggedIn");
	var resposta = $$('.resposta' + id).text();
	var idPesquisa = $$('.idpesquisa').text();
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/respostas.php',
    type : 'post',
	data : {'idUser': idUser, 'idPesquisa' : idPesquisa, 'resposta6': resposta},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn(); 
pontos();	  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
  
   myApp.addNotification({
        title: 'Parabéns',
        message: 'Você acabou de adquirir seus pontos!'
    });
}

function pontos(){
	var pontos = $$('#pontos').text();
	var empresa = $$('#empresaNome').text();
	var codigo = $$('#codigo').text();
	var pontosTotal = $$('#pontosTotal').text();
	var desconto = $$('#desconto').text();
	var idUser = window.localStorage.getItem("loggedIn");
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/pontos.php',
    type : 'post',
	data : {'idUser': idUser, 'pontos': pontos, 'empresa': empresa, 'codigo': codigo, 'pontosTotal': pontosTotal, 'desconto': desconto},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
    },
    error: function(erro){
      
    }       
  });
}
	
function logout(){
window.localStorage.removeItem("loggedIn");
window.localStorage.removeItem("username");
myApp.alert('Deslogado com sucesso!');
mainView.router.loadPage('index.html');
$$('.fav').show();
$$('.sociais').hide();
}

function login(){
myApp.alert('Você precisa estar logado!',function(){
    mainView.router.loadPage('login.html');
});
}

function perguntas(){
	var codigo = $$('.idvideo').text(); 
	
	$$.ajax({
    url : 'http://letstags.com.br/Aplicativo/pesquisa.php',
    type : 'post',
    data : {'codigoVideo': codigo},
    dataType: 'html',
    beforeSend: function(){
      //myApp.showPreloader('Carregando');
    },
    timeout: 3000,    
    success: function(retorno){
	//myApp.hidePreloader();
	  if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";	  
	 
	  $$.each(data,function(i, data){
		if(data.PerguntaVideo2 != ""){
		$$('.player').text(data.empresa); 
		$$('.linkcomprar').text(data.urlSite);
		$$('.perfilempresa').text(data.empresa);
		var codigoVideo = $$('.idvideo').text(); 
		
		
		item += '<h3 class="tituloVideo">' + data.titulo + '</h3>';
		item += '<h4>Responda a pesquisa e ganhe ' + data.pontos + ' pontos</h4>';  
		item += '<p id="pontos" style="display:none">' + data.pontos + '</p>';  
		item += '<p id="pontosTotal" style="display:none">' + data.pontosTotal + '</p>';  
		item += '<p id="desconto" style="display:none">' + data.desconto + '</p>';  
		item += '<p id="codigo" style="display:none">' + data.codigoVideo + '</p>';  
		item += '<div class="per1">';
		item += '<h2>' + data.PerguntaVideo +'</h2>';
		item += '<p id="idpesquisa" class="idpesquisa" style="display:none">' + data.idPesquisa + '</p>';  
		item += '<p><a onClick="resposta1(1)" class="button  button-big resposta1">' + data.OpcaoUm + '</a></p>';
		item += '<p><a onClick="resposta1(2)" class="button  button-big resposta2">' + data.OpcaoDois + '</a></p>';
		
		if(data.OpcaoTres != ""){
			item += '<p><a onClick="resposta1(3)" class="button  button-big resposta3">' + data.OpcaoTres + '</a></p>';
		}
		if(data.OpcaoQuatro != ""){
			item += '<p><a onClick="resposta1(4)" class="button button-big resposta4">' + data.OpcaoQuatro + '</a></p>';
		}
		item += '</div>';
		}else{
			item += '<h4>Responda as perguntas</h4>';  
		item += '<div class="per1">';
		item += '<h2>' + data.PerguntaVideo +'</h2>';
		item += '<p><a onClick="resposta1Fin(1)" class="button  button-big resposta1">' + data.OpcaoUm + '</a></p>';
		item += '<p><a onClick="resposta1Fin(2)" class="button  button-big resposta2">' + data.OpcaoDois + '</a></p>';
		if(data.OpcaoTres != ""){
			item += '<p><a onClick="resposta1Fin(3)" class="button  button-big resposta3">' + data.OpcaoTres + '</a></p>';
		}
		if(data.OpcaoQuatro != ""){
			item += '<p><a onClick="resposta1Fin(4)" class="button button-big resposta4">' + data.OpcaoQuatro + '</a></p>';
		}
		item += '</div>';
		}
		
		if(data.PerguntaVideo3 != ""){
		item += '<div class="per2" style="display:none">';
		item += '<h2>' + data.PerguntaVideo2 +'</h2>';
		item += '<p><a onClick="resposta2(5)" class="button  button-big resposta5 open-full">' + data.opcaoCinco + '</a></p>';
		item += '<p><a onClick="resposta2(6)" class="button  button-big resposta6">' + data.opcaoSeis + '</a></p>';
		if(data.opcaoSete != ""){
			item += '<p><a onClick="resposta2(7)" class="button  button-big resposta7">' + data.opcaoSete + '</a></p>';
		}
		if(data.opcaoOito != ""){
			item += '<p><a onClick="resposta2(8)" class="button button-big resposta8">' + data.opcaoOito + '</a></p>';
		}
		item += '</div>';
		}else{
			item += '<div class="per2" style="display:none">';
		item += '<h2>' + data.PerguntaVideo2 +'</h2>';
		item += '<p><a onClick="resposta2Fin(5)" class="button  button-big resposta5">' + data.opcaoCinco + '</a></p>';
		item += '<p><a onClick="resposta2Fin(6)" class="button  button-big resposta6">' + data.opcaoSeis + '</a></p>';
		if(data.opcaoSete != ""){
			item += '<p><a onClick="resposta2Fin(7)" class="button  button-big resposta7">' + data.opcaoSete + '</a></p>';
		}
		if(data.opcaoOito != ""){
			item += '<p><a onClick="resposta2Fin(8)" class="button button-big resposta8">' + data.opcaoOito + '</a></p>';
		}
		item += '</div>';
		}
		
		if(data.PerguntaVideo4 != ""){
		item += '<div class="per3" style="display:none">';
		item += '<h2>' + data.PerguntaVideo3 +'</h2>';
		item += '<p><a onClick="resposta3(9)" class="button  button-big resposta9">' + data.opcaoNove + '</a></p>';
		item += '<p><a onClick="resposta3(10)" class="button  button-big resposta10">' + data.opcaoDez + '</a></p>';
		if(data.opcaoOnze != ""){
			item += '<p><a onClick="resposta3(11)" class="button  button-big resposta11">' + data.opcaoOnze + '</a></p>';
		}
		if(data.opcaoDoze != ""){
			item += '<p><a onClick="resposta3(12)" class="button button-big resposta12">' + data.opcaoDoze + '</a></p>';
		}
		item += '</div>';
		}else{
			item += '<div class="per3" style="display:none">';
		item += '<h2>' + data.PerguntaVideo3 +'</h2>';
		item += '<p><a onClick="resposta3Fin(9)" class="button  button-big resposta9">' + data.opcaoNove + '</a></p>';
		item += '<p><a onClick="resposta3Fin(10)" class="button  button-big resposta10">' + data.opcaoDez + '</a></p>';
		if(data.opcaoOnze != ""){
			item += '<p><a onClick="resposta3Fin(11)" class="button  button-big resposta12">' + data.opcaoOnze + '</a></p>';
		}
		if(data.opcaoDoze != ""){
			item += '<p><a onClick="resposta3Fin(12)" class="button button-big resposta11">' + data.opcaoDoze + '</a></p>';
		}
		item += '</div>';
		}
		
		if(data.PerguntaVideo5 != ""){
		item += '<div class="per4" style="display:none">';
		item += '<h2>' + data.PerguntaVideo4 +'</h2>';
		item += '<p><a onClick="resposta4Fin(13)" class="button  button-big resposta13">' + data.opcaoTreze + '</a></p>';
		item += '<p><a onClick="resposta4Fin(14)" class="button  button-big resposta14">' + data.opcaoQuartorze + '</a></p>';
		if(data.opcaoQuinze != ""){
			item += '<p><a onClick="resposta4Fin(15)" class="button  button-big resposta15">' + data.opcaoQuinze + '</a></p>';
		}
		if(data.opcaoDezeseis != ""){
			item += '<p><a onClick="resposta4Fin(16)" class="button button-big resposta16">' + data.opcaoDezeseis + '</a></p>';
		}
		item += '</div>';
		}else{
			item += '<div class="per4" style="display:none">';
		item += '<h2>' + data.PerguntaVideo4 +'</h2>';
		item += '<p><a onClick="resposta4Fin(13)" class="button  button-big resposta13">' + data.opcaoTreze + '</a></p>';
		item += '<p><a onClick="resposta4Fin(14)" class="button  button-big resposta14">' + data.opcaoQuartorze + '</a></p>';
		if(data.opcaoQuinze != ""){
			item += '<p><a onClick="resposta4Fin(15)" class="button  button-big resposta15">' + data.opcaoQuinze + '</a></p>';
		}
		if(data.opcaoDezeseis != ""){
			item += '<p><a onClick="resposta4Fin(16)" class="button button-big resposta16">' + data.opcaoDezeseis + '</a></p>';
		}
		item += '</div>';
		}
		
		if(data.PerguntaVideo6 != ""){
		item += '<div class="per5" style="display:none">';
		item += '<h2>' + data.PerguntaVideo5 +'</h2>';
		item += '<p><a onClick="resposta5(17)" class="button  button-big resposta17">' + data.opcaoDezesete + '</a></p>';
		item += '<p><a onClick="resposta5(18)" class="button  button-big resposta18">' + data.opcaoDezoito + '</a></p>';
		if(data.opcaoDezenove != ""){
			item += '<p><a onClick="resposta5(19)" class="button  button-big resposta19">' + data.opcaoDezenove + '</a></p>';
		}
		if(data.opcaoVinte != ""){
			item += '<p><a onClick="resposta5(20)" class="button button-big resposta20">' + data.opcaoVinte + '</a></p>';
		}
		item += '</div>';
		}else{
			item += '<div class="per5" style="display:none">';
		item += '<h2>' + data.PerguntaVideo5 +'</h2>';
		item += '<p><a onClick="resposta5Fin(17)" class="button  button-big resposta17">' + data.opcaoDezesete + '</a></p>';
		item += '<p><a onClick="resposta5Fin(18)" class="button  button-big resposta18">' + data.opcaoDezoito + '</a></p>';
		if(data.opcaoDezenove != ""){
			item += '<p><a onClick="resposta5Fin(19)" class="button  button-big resposta19">' + data.opcaoDezenove + '</a></p>';
		}
		if(data.opcaoVinte != ""){
			item += '<p><a onClick="resposta5Fin(20)" class="button button-big resposta20">' + data.opcaoVinte + '</a></p>';
		}
		item += '</div>';
		}
		
		if(data.PerguntaVideo7 != ""){
		item += '<div class="per6" style="display:none">';
		item += '<h2>' + data.PerguntaVideo6 +'</h2>';
		item += '<p><a onClick="resposta6(21)" class="button  button-big resposta21">' + data.opcaoVinteUm + '</a></p>';
		item += '<p><a onClick="resposta6(22)" class="button  button-big resposta22">' + data.opcaoVinteDois + '</a></p>';
		if(data.opcaoVinteTres != ""){
			item += '<p><a onClick="resposta6(23)" class="button  button-big resposta23">' + data.opcaoVinteTres + '</a></p>';
		}
		if(data.opcaoVinteQuatro != ""){
			item += '<p><a onClick="resposta6(24)" class="button button-big resposta24">' + data.opcaoVinteQuatro + '</a></p>';
		}
		item += '</div>';
		}else{
			item += '<div class="per6" style="display:none">';
		item += '<h2>' + data.PerguntaVideo6 +'</h2>';
		item += '<p><a onClick="resposta6Fin(21)" class="button button-big resposta21">' + data.opcaoVinteUm + '</a></p>';
		item += '<p><a onClick="resposta6Fin(22)" class="button button-big resposta22">' + data.opcaoVinteDois + '</a></p>';
		if(data.opcaoVinteTres != ""){
			item += '<p><a onClick="resposta6Fin(23)" class="button  button-big resposta23">' + data.opcaoVinteTres + '</a></p>';
		}
		if(data.opcaoVinteQuatro != ""){
			item += '<p><a onClick="resposta6Fin(24)" class="button button-big resposta24">' + data.opcaoVinteQuatro + '</a></p>';
		}
		item += '</div>';
		}
		
		item += '<div class="per7" style="display:none">';
		item += '<h2>' + data.PerguntaVideo7 +'</h2>';
		item += '<p><a onClick="resposta7(25)" class="button  button-big resposta25">' + data.opcaoVinteCinco + '</a></p>';
		item += '<p><a onClick="resposta7(26)" class="button  button-big resposta26">' + data.opcaoVinteSeis + '</a></p>';
		if(data.opcaoVinteSete != ""){
			item += '<p><a onClick="resposta7(27)" class="button  button-big resposta27">' + data.opcaoVinteSete + '</a></p>';
		}
		if(data.opcaoVinteOito != ""){
			item += '<p><a onClick="resposta7(28)" class="button button-big resposta28">' + data.opcaoVinteOito + '</a></p>';
		}
		item += '</div>';
		item += '<div style="display:none">Promovido por: <p id="empresaNome">' + data.empresa + '</p></div>';
				
                });
	 
	 $$(".answers").html(item);
	  }else{
		  var item =  '<h4 >Não é um tipo de arquivo lets tags</h4>';
	   $$(".answers").html(item);
	  }
    },
    error: function(erro){
      
    }       
		});
	
}


function verifica(codigo){
	var idUser = window.localStorage.getItem("loggedIn");
	
		$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/verifica.php',
		type : 'post',
		data : {'idUser': idUser, 'codigoVideo': codigo},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){

	
     if(retorno.trim() == "erro"){
		 $$('.answers').hide();
		 $$('.plus').show();
		 
	 }else{
		 $$('.answers').show();
		 $$('.plus').hide();
		 
	 }
    },
    error: function(erro){
     
    }       
  });
}

function favoritar(){
		var idUser = window.localStorage.getItem("loggedIn");
		var titulo = $$('.tituloVideo').text(); 
		var codigo = $$('.idvideo').text(); 
	
		$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/favoritos.php',
		type : 'post',
		data : {'id': idUser, 'titulo': titulo, 'codigo': codigo},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		if(retorno.trim() == "true"){
			myApp.addNotification({
			title: 'Favoritos',
			message: 'Adicionado aos favoritos com sucesso'
});
		}else{
			
    myApp.alert('Já existe nos seus favoritos', 'Ops!');
		}
    },
    error: function(erro){
     
    }       
  });
}

function gerarCupom(idPonto){
		var idUser = window.localStorage.getItem("loggedIn");
		var empresa = $$('.nomeEmpresaPonto' + idPonto).text(); 
		var pontos = $$('.pontos' + idPonto).text(); 
		var pontosTotal = $$('.pontosTotal' + idPonto).text(); 
		var porcentagem = $$('.porcentagem' + idPonto).text(); 
		
		$$('.idCupom').text(empresa);
	
		$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/vauncher.php',
		type : 'post',
		data : {'idUser': idUser, 'empresa': empresa, 'pontos': pontos, 'pontosTotal': pontosTotal, 'porcentagem': porcentagem},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		mainView.router.loadPage('vauncher.html');
    },
    error: function(erro){
     
    }       
  });
}

function seguir(){
	
	var idUser = window.localStorage.getItem("loggedIn");
	var empresa = $$('.empresanome').text();
	
	$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/seguir.php',
		type : 'post',
		data : {'idUser': idUser, 'empresa': empresa},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		
		if(retorno.trim() == "true"){
			var qtseguidores = parseInt($$(".qtseguidores").val(), 10);
			var modifica = qtseguidores + 1;
			$$('.seguidores').html('<p><i class="fa fa-users" aria-hidden="true"></i> ' + modifica + ' Seguidores</p><input style="display:none" class="qtseguidores" value="' + modifica + '"/>');
			$$('.seguir').html('<p><a onClick="seguir()" class="button active button-big">Seguindo</a></p>');
		}else{
			var qtseguidores = parseInt($$(".qtseguidores").val(), 10);
			var modifica = qtseguidores - 1;
			$$('.seguidores').html('<p><i class="fa fa-users" aria-hidden="true"></i> ' + modifica + ' Seguidores</p><input style="display:none" class="qtseguidores"  value="' + modifica + '"/>');
			$$('.seguir').html('<p><a onClick="seguir()" class="button button-big">Seguir</a></p>');
		}
    },
    error: function(erro){
     
    }       
  });
}

function curtir(){
	
	var idUser = window.localStorage.getItem("loggedIn");
	var codigo = $$('.idvideo').text(); 
	
	$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/curtir.php',
		type : 'post',
		data : {'idUser': idUser, 'codigo': codigo},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		
		if(retorno.trim() == "true"){
			$$('.curtir').html('<i class="fa fa-heart" aria-hidden="true"></i><span></span> Curtida');
		}else{	
			$$('.curtir').html('<i class="fa fa-heart-o" aria-hidden="true"></i><span></span> Curtir');
		}
    },
    error: function(erro){
     
    }       
  });
}



function verificacurtida(){
	var idUser = window.localStorage.getItem("loggedIn");
	var codigo = $$('.idvideo').text(); 
	
	$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/verificacurtir.php',
		type : 'post',
		data : {'idUser': idUser, 'codigo': codigo},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		
		if(retorno.trim() == "true"){
			$$('.curtir').html('<i class="fa fa-heart-o" aria-hidden="true"></i><span></span> Curtir');
		}else{	
			$$('.curtir').html('<i class="fa fa-heart" aria-hidden="true"></i><span></span> Curtida');
		}
    },
    error: function(erro){
     
    }       
  });
  
}

function removerFavorito(id){
	var idUser = window.localStorage.getItem("loggedIn");
	var codigo = $$('.codigoVideo' + id).text();
	
	$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/removerFavorito.php',
		type : 'post',
		data : {'idUser': idUser, 'codigo': codigo, 'id': id},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		
		
		if(retorno.trim() != "existe"){
			var remover = 'remover' + id;
			$$(remover).on('deleted', function () {
 // myApp.alert('Item removed');
}); 
		}else{	
			
		}
    },
    error: function(erro){
     
    }       
  });
  
}

function playerTwo(codigo){
	var codigoVideo = $$('.codigoVideo' + codigo).text();
	$$('.idvideo').text(codigoVideo);
	mainView.router.loadPage('player2.html');
}

function playerTree(codigo){
	var codigoVideo = $$('.codigoVideo' + codigo).text();
	$$('.idvideo').text(codigoVideo);
	mainView.router.loadPage('player3.html');
}

function voltares(){
		mainView.router.loadPage('index.html');
		$$('.sociais').hide();
		$$('.fav').show();
}

function voltar(){
		mainView.router.back();
		$$('.sociais').hide();
		$$('.fav').show();
}

function perfil(id){
	var empresa = $$('.name' + id).text();
	$$('.perfilempresa').text(empresa);
	mainView.router.loadPage('perfil.html');
}

function cadastrar(){
	var nome, email, senha, confirmSenha, confirmEmail, ok;
	
	nome = $$('.username').val();
	email = $$('.email').val();
	senha = $$('.senha').val();
	confirmSenha = $$('.confirmsenha').val();
	confirmEmail = $$('.confirmemail').val();
	
	var nNome = nome.length;
	var nEmail = email.length;
	var nSenha = senha.length;
	var nConfirmEmail = confirmEmail.length;
	var nConfirmSenha = confirmSenha.length;
	
	if(nNome > 4){
		ok = "ok";
	}else{
		myApp.alert('Você deve preencher o campo com seu nome');
		ok = "erro";
	}
	
	if(nEmail > 5 && email.indexOf("@")!=-1){
		ok = "ok";
	}else{
		myApp.alert('Você deve preencher um email válido');
		ok = "erro";
	}
	
	if(nSenha > 5){
		ok = "ok";
	}else{
		myApp.alert('Você deve preencher uma senha de no mínimo 6 digitos');
		ok = "erro";
	}
	
	if(nConfirmEmail > 5){
		if(confirmEmail == email){
		ok = "ok";
	}else{
		myApp.alert('Email não confere!');
		ok = "erro";
	}
	}else{
		ok = "erro";
		myApp.alert('Email não confere!');
	}
	
	if(nConfirmSenha > 5){
		if(confirmSenha == senha){
		ok = "ok";
	}else{
		myApp.alert('Senha não confere!');
		ok = "erro";
	}
	}else{
		ok = "erro";
		myApp.alert('Senha não confere!');
	}
	
	
	if(ok == "ok"){
		$$.ajax({
		url : 'http://letstags.com.br/Aplicativo/cadastro.php',
		type : 'post',
		data : {'nome': nome, 'email': email, 'senha': senha},
		dataType: 'html',
		beforeSend: function(){
			
    },
    timeout: 3000,    
    success: function(retorno){
		
		if(retorno.trim() == "false"){
			myApp.alert('Usuário já existe');
		}else{	
			mainView.router.back();
		}
    },
    error: function(erro){
     
    }       
  });
	}
}

function chat(id){
	$$('.idReceive').text(id);
	var conversa = $$('.nameConversa' + id).text();
	$$('.chatConversa').text(conversa);
	
	mainView.router.loadPage('chat.html');
}
