document.addEventListener('DOMContentLoaded', () => {
    const produtos = {
        airfrayer: {
            nome: "AirFrayer",
            imagem: "airfrayer.png",
            qrCode: "qrcode1.jpg",
            valor: "R$ 200,00",
            pixCode: "00020101021126580014br.gov.bcb.pix01362e00f5b4-46c0-4d13-906b-b00a4ad12c1552040000530398654040.105802BR5924MATHEUS ZIBORDI PEDREIRA6009SAO PAULO622905251JE1E8ZXJ89NYQVKQZVTYJS6T6304AEA9",
            linkCartao: "https://mpago.li/23H1u7n"
        },
        faqueiro: {
            nome: "Faqueiro Inox",
            imagem: "faqueiro.png",
            qrCode: "qrcode2.jpg",
            valor: "R$ 500,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136faqueiro-pix-code",
            linkCartao: "https://mpago.li/23H1u7n"
        },
        tv: {
            nome: "Televisão 43 Polegadas",
            imagem: "tv.png",
            qrCode: "qrcode3.jpg",
            valor: "R$ 1.500,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136tv-pix-code",
            linkCartao: "https://mpago.li/23H1u7n"
        },
        sofa: {
            nome: "Sofá retrátil",
            imagem: "sofa.png",
            qrCode: "qrcode4.jpg",
            valor: "R$ 2.600,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136sofa-pix-code",
            linkCartao: "https://mpago.li/23H1u7n"
        },
        geladeira: {
            nome: "Geladeira",
            imagem: "geladeira.png",
            qrCode: "qrcode5.jpg",
            valor: "R$ 3.000,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136geladeira-pix-code",
            linkCartao: "https://mpago.li/23H1u7n"
        },
        fogao: {
            nome: "Fogão",
            imagem: "fogao.png",
            qrCode: "qrcode3.jpg",
            valor: "R$ 1.600,00",
            pixCode: "00020101021126580014br.gov.bcb.pix0136fogao-pix-code",
            linkCartao: "https://mpago.li/23H1u7n"
        }
    };

    // Função do menu lateral
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuLateral = document.querySelector('.menu-lateral');

    if (hamburgerMenu && menuLateral) {
        hamburgerMenu.addEventListener('click', () => {
            menuLateral.classList.toggle('ativo');
        });

        document.addEventListener('click', (event) => {
            if (
                !menuLateral.contains(event.target) && 
                !hamburgerMenu.contains(event.target)
            ) {
                menuLateral.classList.remove('ativo');
            }
        });
    }

    // Funções do modal
    const botoesPresentear = document.querySelectorAll('.btn-presentear');
    const modal = document.getElementById('modal');
    const modalImagem = document.getElementById('modal-imagem');
    const modalNome = document.getElementById('modal-nome');
    const modalValor = document.getElementById('modal-valor');
    const modalInicial = document.getElementById('modal-inicial');
    const modalPix = document.getElementById('modal-pix');
    const modalCartao = document.getElementById('modal-cartao');
    const closeModal = document.getElementById('close-modal');
    const btnCopiar = document.getElementById('btn-copiar');
    const btnPix = document.getElementById('btn-pix');
    const btnCartao = document.getElementById('btn-cartao');

    const modalTexto = document.createElement('p');
    modalTexto.className = 'modal-texto';
    modalTexto.textContent = "O pagamento por Pix é o mais rápido e sem taxas! Mas o pagamento por cartão também é muito bem-vindo. 😄";

    botoesPresentear.forEach(botao => {
        botao.addEventListener('click', () => {
            const produtoId = botao.dataset.id; // Obtém o ID do produto diretamente
            const produto = produtos[produtoId]; // Busca o produto pelo ID
    
            if (produto) {
                modalImagem.src = produto.imagem;
                modalNome.textContent = produto.nome;
                modalValor.textContent = produto.valor;
                btnCopiar.dataset.pixCode = produto.pixCode;
                btnCartao.dataset.linkCartao = produto.linkCartao;
                modal.style.display = 'block';
                modalInicial.style.display = 'flex';
                modalPix.style.display = 'none';
                modalCartao.style.display = 'none';
    
                if (!modalInicial.contains(modalTexto)) {
                    modalInicial.appendChild(modalTexto);
                }
            } else {
                console.error("Produto não encontrado para o ID:", produtoId);
            }
        });
    });
    

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    btnCopiar.addEventListener('click', () => {
        const pixCode = btnCopiar.dataset.pixCode;
        navigator.clipboard.writeText(pixCode)
            .then(() => alert('Código Pix copiado para a área de transferência!'))
            .catch(() => alert('Não foi possível copiar o código Pix. Tente novamente.'));
        });

        btnPix.addEventListener('click', () => {
            // Esconde o modal inicial e mostra o modal Pix
            modalInicial.style.display = 'none';
            modalPix.style.display = 'flex';
        
            // Limpa o conteúdo anterior do modal Pix
            modalPix.innerHTML = '';
        
            // Itera sobre todos os produtos para encontrar o correto
            const nomeProduto = modalNome.textContent.toLowerCase(); // nome do produto exibido no modal
            const produtoAtual = Object.values(produtos).find(produto => produto.nome.toLowerCase() === nomeProduto);
        
            // Verifica se encontrou o produto
            if (produtoAtual) {
                // Atualiza a imagem do QR code
                const qrCodePath = produtoAtual.qrCode || '';
            
                const qrImg = document.createElement('img');
                qrImg.className = 'modal-qr';
                qrImg.src = qrCodePath;
                qrImg.alt = qrCodePath ? 'QR Code do Pix' : 'Erro ao carregar o QR Code. Tente novamente.';
                modalPix.appendChild(qrImg);
            
                // Cria o botão de copiar código Pix
                const btnCopiar = document.createElement('button');
                btnCopiar.className = 'btn-copiar';
                btnCopiar.textContent = 'Copiar código Pix';
                btnCopiar.onclick = () => {
                    if (produtoAtual?.pixCode) {
                        navigator.clipboard.writeText(produtoAtual.pixCode)
                            .then(() => alert('Código Pix copiado!'))
                            .catch(() => alert('Erro ao copiar o código Pix.'));
                    } else {
                        alert('Código Pix indisponível.');
                    }
                };
                modalPix.appendChild(btnCopiar);
            
                // Cria o botão de enviar comprovante
                const btnEnviarComprovante = document.createElement('button');
                btnEnviarComprovante.className = 'btn-enviar';
                btnEnviarComprovante.textContent = 'Enviar comprovante';
                btnEnviarComprovante.onclick = () => window.open(produtoAtual.linkCartao, '_blank');
                modalPix.appendChild(btnEnviarComprovante);
            } else {
                alert('Produto não encontrado.');
            }
        });
         
    
        btnCartao.addEventListener('click', () => {
            modalInicial.style.display = 'none';
            modalCartao.style.display = 'flex';
        
            // Limpa o conteúdo anterior
            modalCartao.innerHTML = '';
        
            // Itera sobre todos os produtos para encontrar o correto
            const nomeProduto = modalNome.textContent.toLowerCase(); // nome do produto exibido no modal
            const produtoAtual = Object.values(produtos).find(produto => produto.nome.toLowerCase() === nomeProduto);
        
            // Verifica se encontrou o produto
            if (produtoAtual) {
                // Cria o botão de ir para o link de pagamento
                const btnIrParaPagamento = document.createElement('button');
                btnIrParaPagamento.className = 'btn-pix';
                btnIrParaPagamento.textContent = 'Ir para link de pagamento';
        
                // Verifica se o linkCartao existe e cria a ação
                if (produtoAtual.linkCartao) {
                    btnIrParaPagamento.onclick = () => {
                        window.open(produtoAtual.linkCartao, '_blank');
                    };
                } else {
                    console.error('Link de pagamento não disponível para este produto.');
                }
        
                // Cria o botão de enviar comprovante
                const btnEnviarComprovante = document.createElement('button');
                btnEnviarComprovante.className = 'btn-enviar';
                btnEnviarComprovante.textContent = 'Enviar comprovante';
                btnEnviarComprovante.onclick = () => window.open('https://www.casar.com', '_blank');
        
                // Adiciona os botões ao modal
                modalCartao.appendChild(btnIrParaPagamento);
                modalCartao.appendChild(btnEnviarComprovante);
            } else {
                alert('Produto não encontrado.');
            }
        });
        
    

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
