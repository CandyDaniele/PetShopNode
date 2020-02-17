const http = require("http");
const petshop = require("./petshop");  //importar o modulo que eu criei
const url = require("url");  //para trazer parametros da url, pega a url inteira e separa em partes o que é parametro, o que é rota e o caminho 

const server = http.createServer((req, res) => {
    //quando faço requisição no navegador
    // req = request, res = response 

    res.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"}); //arrumar quando tem caracter especial e aparece bagunçado

    let urlCompleta = url.parse(req.url, true);  //o true faz retornar em forma de objeto
    let queryString = urlCompleta.query; //query = parametros  ex: user=hendy&senha=123 (o que vem depois da interrogação ? são os parametros)
    let rota = urlCompleta.pathname;  // ex: pets/add

    //console.log(urlCompleta); //pra ver tudo o que tem (olha no terminal)

    //criando rota
    // if(req.url  == "/pets"){
    //     return res.end("aqui eu tô listando pets");
    // }
    //switch(req.url){
    switch(rota){
        case "/pets": 
            let conteudo = petshop.listarPets();
            res.write("lista de pets \n \n");  // \n da um enter
            if(conteudo.length > 0){
                res.write(conteudo);
            } else {
                res.write("Nenhum pet cadastrado :(");
            }
            break;
        case "/pets/add":
            let novoPet = queryString;
            if(novoPet.nome == undefined || novoPet.nome == ""){
                res.write("informar o nome do pet");
            } else {
                if(petshop.adicionarPet(novoPet)) {
                    res.write(`${novoPet.nome} foi adicionando a nossa lista!`);
                } else{
                    res.write("Ops algo deu errado");
                }
            }
            break;
        case "/pets/buscar":
            let buscapet = queryString;
            let nomepetencontrado = petshop.buscarPet(buscapet.nome);
            if(nomepetencontrado == undefined || nomepetencontrado == ""){
                res.write("pet não localizado na base de dados: " + buscapet.nome);
            } else {
                res.write("pet encontrado: "+ nomepetencontrado);
            }
            break;
        /*
        função buscar da hendy
        case "pets/buscar":
            let nomePet = queryString.nome;
            let petsEncontrados = petshop.buscarPet(nomePet);
            if (petsEncontrados.length > 0){
                res.write(
                    `Encontramos ${petsEncontrados.length} pets com o nome ${nomePet}`
                );
            } else {
                res.write("Ops, nenhum pet cadastrado com esse nome!");
            }
            break;
        */
        default:
            res.write("tô perdido");
    }
   
    //console.log("Olá Mundo");
    //res.end("Olá mundo");
    res.end();  //tem que ter o end, pra ele parar
}).listen(3000, "localhost", () => {
    //quando ligo o servidor

    //o callback (terceiro parametro) é opcional
    console.log("Servidor rodando :)")
});