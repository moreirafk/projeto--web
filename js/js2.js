window.onload = function() {
	$("#pagareaprofessor").hide();
	$("#pagareaaluno").hide();
	$("#cadasprofessor").hide();
	$("#pageprofessorlogado").hide();
	$("#escolhaTCCAlunos").hide();		
	$("#cadasTCC").hide();	
	$("#cadastrarEscolha").hide();

}



function mostrarAreaProfessor() {
	$("#pagprincipal").hide();
	$("#pagareaprofessor").show();
}

function voltarPrincipal() {
	$("#pagareaprofessor").hide();
	$("#pagareaaluno").hide();
	$("#cadastrarEscolha").hide();
	$("#pagprincipal").show();
}


function voltarProfessor() {
	$("#cadasTCC").hide();
	$("#pageprofessorlogado").hide();
	$("#cadasprofessor").hide();
	$("#pagareaprofessor").show();
}

function voltarProfessorPage() {
	$("#escolhaTCCAlunos").hide();
	$("#cadasTCC").hide();
	$("#cadasprofessor").hide();
	$("#pagareaprofessor").hide();
	$("#pageprofessorlogado").show();
}


function cadastrarProfessor() {
	$("#pagareaprofessor").hide();
	$("#cadasprofessor").show();	
}

function cadastrarProfessorBanco() {
	$.ajax({
		url:'https://borges-e.000webhostapp.com/insereUser.php',
		dataType:'json',
		type:'POST',

		data:{
			matricula: $("#matriculacadastrar").val(),
			senha: $("#senhacadastrar").val(),
			email: $("#usuariocadastrar").val()},
				success: function(r) {
                    if (r.Resp==0) {
                        alert('Usuário Não Cadastrado','','Mensagem');
                    }else if(r.Resp==1){
                        alert('Usuário Cadastrado','','Mensagem');
                    }
				},
				error: function(e) {
					alert('Houve um erro de conexão de banco de dados!!','','Erro');
				}
	})
}

function entrarProfessor() {
	$.ajax({
		url:'https://borges-e.000webhostapp.com/consultaUser.php',
		dataType:'json',
		type:'POST',

		data:{
			usuario: $("#usuariologin").val(),
			senha: $("#senhalogin").val()},
				success: function(r) {
                    if (r.Resp==0) {
                        navigator.notification.alert('Usuário e/ou senha não encontradas!!','','Mensagem');
                    }else if(r.Resp==1){
						localStorage.setItem('Matricula',r.Matricula);
						localStorage.setItem('Email',r.Email);
						inicio();
                    }
				},
				error: function(e) {
					alert('Houve um erro de conexão de banco de dados!!','','Erro');
				}
	})
}
function inicio() {
	$("#pagareaprofessor").hide();	
	$("#pageprofessorlogado").show();

	//recuperar dados do local storage
	var Matricula = localStorage.getItem('Matricula');
	var Email = localStorage.getItem('Email');
	localStorage.setItem('Matricula',Matricula);
	localStorage.setItem('Email',Email);	
}

function VercadastrarTCC() {
	$("#pageprofessorlogado").hide();	
	$("#cadasTCC").show();
}


function cadastrarTCC() {

	$.ajax({
		url:'https://borges-e.000webhostapp.com/insereTCC.php',
		dataType:'json',
		type:'POST',

		data:{
			matricula: localStorage.getItem('Matricula'),
			titulo: $("#titulo").val(),
			descricao: $("#descricao").val(),
			area_referencia: $("#area_referencia").val(),
			nome_orientador: $("#nome_orientador").val()},

				success: function(r) {
                    if (r.Resp==0) {
                        alert('Usuário Não Cadastrado','','Mensagem');
                    }else if(r.Resp==1){
                        alert('Usuário Cadastrado','','Mensagem');
                    }
				},
				error: function(e) {
					alert('Houve um erro de conexão de banco de dados!!','','Erro');
				}
	})

}





function mostrarAreaAluno() {
	$("#pagprincipal").hide();
	$("#pagareaaluno").show();	
	//var cod=localStorage.getItem('Cod');  // esse ano 
	$.ajax({
		url:'https://borges-e.000webhostapp.com/consultaPublicacoes.php',
		dataType:'json',
		type:'POST',

		data:{cod: localStorage.getItem('Matricula')},

		success: function(r) {
			var total = r.length;
			var i ;
			var postagens = "";
			for (i = 0; i<total; i++) {
					localStorage.setItem('matricula'+i,r[i].matricula);
					localStorage.setItem('titulo'+i,r[i].titulo);
					localStorage.setItem('descricao'+i,r[i].descricao);
					localStorage.setItem('area_referencia'+i,r[i].area_referencia);	
					postagens+="<img class='foto' src='https://borges-e.000webhostapp.com/22.png' width='80%'>";																		
					postagens+="<div id=titulo"+i+">Titulo: "+r[i].titulo + "</div>";
					postagens+="<div id=descricao"+i+">Descricao: "+r[i].descricao  + "</div>";
					postagens+="<div id=area_referencia"+i+">Area de Referencia: "+r[i].area_referencia + "</div>";
					postagens+="<div id=nome_orientador"+i+">Nome do Orientador: "+r[i].nome_orientador + "</div>";
					postagens+="<div><button onclick=mostrarEscolha("+i+")>Escolher</button></div>";
					postagens+= "<br><br>";
					$("#pagareaaluno").html(postagens);
				}	
				},
		error: function(e) {
				alert('Houve um erro de conexão de banco de dados!!','','Erro');	
				}
	

	})


}


function mostrarEscolha(m) {
		$("#pagareaaluno").hide();
		$("#cadastrarEscolha").show();
		var i = m;
		$("#escolherTCCLegal").html("<button onclick=cadastrarEscolha("+i+")>Enviar</button>");
}


function cadastrarEscolha(m) {
		$("#pagareaaluno").hide();
		$("#cadastrarEscolha").show();
	
	$.ajax({
		url:'https://borges-e.000webhostapp.com/escolhaTCC.php',
		dataType:'json',
		type:'POST',

		data:{
			matricula: localStorage.getItem('matricula'+m),
			titulo: localStorage.getItem('titulo'+m),
			descricao: localStorage.getItem('descricao'+m),
			area_referencia: localStorage.getItem('area_referencia'+m),
			mensagem: $("#cadastrarEscolhaAluno").val()
		},

				success: function(r) {
                        alert('TCC ESCOLHIDO, PREPARE-SE!','','Mensagem');
                         document.getElementById('cadastrarEscolhaAluno').value = "";             
				},
				error: function(e) {
					alert('ALGO DE ERRADO ACONTECEU, CONTADE O SUPORTE!','','Mensagem');      
					document.getElementById('cadastrarEscolhaAluno').value = "";      
				}
	})
}


function tccSolicitado() {
	$("#pageprofessorlogado").hide();	
	$("#escolhaTCCAlunos").show();
	var Matricula = localStorage.getItem('Matricula');
	//var cod=localStorage.getItem('Cod');  // esse ano 
	$.ajax({
		url:'https://borges-e.000webhostapp.com/consultaTCCEscolhidos.php',
		dataType:'json',
		type:'POST',

		data:{Matricula: localStorage.getItem('Matricula')},

		success: function(r) {
			var total = r.length;
			var i ;
			var postagens = "";
			for (i = 0; i<total; i++) {																		
					postagens+="<div id=titulo"+i+">Titulo: "+r[i].titulo + "</div>";
					postagens+="<div id=area_referencia"+i+">Area de Referencia: "+r[i].area_referencia + "</div>";					
					postagens+="<div id=descricao"+i+">Descricao: "+r[i].descricao  + "</div>";
					postagens+="<div id=mensagem"+i+">Mesnagem do Orientando: "+r[i].mensagem + "</div>";
					postagens+= "<br><br>";
					$("#escolhaTCCAlunos").html(postagens);
				}
					postagens+= "<button onclick=voltarProfessorPage()>Voltar</button>" 
					$("#escolhaTCCAlunos").html(postagens);	
				},
		error: function(e) {
				alert('Houve um erro de conexão de banco de dados!!','','Erro');	
				}
	

	})


}