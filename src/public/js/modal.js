botao_pesquisar = document.getElementById('botao-pesquisar')

function abrirModal(){
    const janelaModal = document.getElementById('janela-modal')
    
    janelaModal.classList.add('abrir')

    janelaModal.addEventListener('click', (e) => {
        if(e.target.id == 'fechar'){
            janelaModal.classList.remove('abrir')    
        }
})
}

document.addEventListener('DOMContentLoaded', () => {
   
    abrirModal();
});

/*função scroll para rolagem do modal*/
/*btn_pesquisar.addEventListener('click', () =>{
    window.scroll({top:window.innerHeight, behavior:"smooth"})
})*/