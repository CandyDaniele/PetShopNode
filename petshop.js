//modulo (aqui todas as funções do petshop)

let pets = [{nome: "doug"} , {nome: "Costelinha"}];

const listarPets = () => {
    let conteudo = "";
    for(let pet of pets){
        conteudo+= `
        -----------------
        Nome: ${pet.nome}
        -----------------`;
    }

    return conteudo;
};

const adicionarPet = novoPet => {
    return pets.push(novoPet); //return para retornar true/false e vc saber que ele adicionou ou não
};

const buscarPet = bucaPet => {
    for(let pet of pets){
        if(pet.nome == bucaPet){
            return pet.nome;
        }
    }
}

/*
função buscar da Hendy
const buscarPet = nomePet => {
    let petsEncontrados = pets.filter(pet => pet.nome == nomePet);
    return petsEncontrados;
};
*/
//sempre no final
module.exports = { listarPets, adicionarPet, buscarPet };
//igual o de cima
//module.exports = { listarPets: listarPets };