window.onload = function() {
	$("#cabecalho").hide();
	$("#user").hide();
	$("#pub").hide();
	$("#cadastroUser").hide();
}

function mostrar() {
	$("#cabecalho").hide();
	$("#user").hide();
	$("#pub").hide();
	$("#logon").hide();
	$("#cadastroUser").show();
}

function Voltar() {
	$("#cadastroUser").hide();
		$("#logon").show();
}

function verificaUsuario() {
	$.ajax({
		url:'https://trabalhofadul.000webhostapp.com/servidor/consultaUser.php',
		dataType:'json',
		type:'POST',

		data:{usuario: $("#usuario").val(),
				senha: $("#senha").val()},
				success: function(r) {
					if (r.Resp==0) {
						navigator.notification.alert('Usuário e/ou senha não encontradas!!','','Mensagem');
					}else if(r.Resp==1){
						localStorage.setItem('Cod',r.Cod);
						localStorage.setItem('Nome',r.Nome);
						localStorage.setItem('Email',r.Email);
						localStorage.setItem('Perfil',r.Perfil);
						localStorage.setItem('Autores',r.Autores);
						inicio();
					}
				},
				error: function(e) {
					navigator.notification.alert('Houve um erro de conexão de banco de dados!!','','Erro');
				}
	})
}

function inicio() {
	$("#cabecalho").show();
	$("#user").show();
	$("#logon").hide();

	//recuperar dados do local storage
	var Nome = localStorage.getItem('Nome');
	var Perfil = localStorage.getItem('Perfil');
	var Autores = localStorage.getItem('Autores');
	//var foto = "<img class='foto' src='http://localhost:8080/servidor/uploads/"+Perfil+"width='80%'>";
	var foto = "<img class='foto' src='https://trabalhofadul.000webhostapp.com/servidor/uploads/" + Perfil +".png"+"' width='80%'>";
	var nome = "Nome:" + Nome + "<br><br>";
	var aut = "Outros Autores:" + Autores + "<br><br>";

	$("#Perfil").html(foto);
	$("#Nome").html(nome);
	$("#aut").html(aut);
}

function publicacoes() {
	var cod=localStorage.getItem('Cod');  // esse ano 

	$.ajax({
		url:'https://trabalhofadul.000webhostapp.com/servidor/consultaPublicacoes.php',
		dataType:'json',
		type:'POST',

		data:{cod: localStorage.getItem('Cod')},

		success: function(r) {
			var total = r.length;
			var i ;
			var postagens = "";


			for (i = 0; i<total; i++) {
					postagens+= "<br><br>";
					postagens+="Titulo:<div style='width:100%;text-align:center;margin-top:10px'>"+r[i].titulo + "</div>";
					postagens+="Local:<div style='width:100%;text-align:center;margin-top:10px'>"+r[i].local  + "</div>";
					postagens+="Editora/Ano:<div style='width:100%;text-align:center;margin-top:10px'>"+r[i].ed_ano + "</div>";
					postagens+="Outros Autores:<div style='width:100%;text-align:center;margin-top:10px'>"+r[i].outros_autores + "</div>";

					$("#pub").html(postagens);
					$("#pub").show();
				}		
				},
		error: function(e) {
				navigator.notification.alert('Houve um erro de conexão de banco de dados!!','','Erro');	
				}
	})
}

function sair() {
		navigator.notification.confirm(
			'Deseja sair',
				respostaSair,
				'Sair',
				['Não','Sim']);
}
function respostaSair(r) {
	if (r==1) {
		localStorage.clear();
		$("#pub").hide();	
		$("#user").hide();
		$("#cabecalho").hide();
		$("#logon").show();
	}
}


function cadastraUsuario() {
	$.ajax({
		url:'https://trabalhofadul.000webhostapp.com/servidor/insereUser.php',
		dataType:'json',
		type:'POST',

		data:{
			usuario: $("#usuario2").val(),
			senha: $("#senha2").val(),
			email: $("#email").val(),
			perfil: $("#perfil").val(),
			autores: $("#autores").val()},
				success: function(r) {
					if (r.Resp==0) {
						navigator.notification.alert('Usuário Não Cadastrado','','Mensagem');
					}else if(r.Resp==1){
						navigator.notification.alert('Usuário Cadastrado','','Mensagem');
					}
				},
				error: function(e) {
					navigator.notification.alert('Houve um erro de conexão de banco de dados!!','','Erro');
				}
	})
}