// Carrossel
let index = 0;
const carousel = document.getElementById("animacao");
const slides = document.querySelectorAll(".slide");

function moveSlide(direction) {
    index += direction;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    if (carousel) carousel.style.transform = `translateX(${-index * 100}%)`;
}

// ======== ADIÇÃO: autoplay do carrossel ========
let autoplayInterval = null;
const AUTOPLAY_DELAY = 4000; // tempo em ms entre trocas (ajuste aqui)

function startAutoplay() {
    if (!carousel || slides.length <= 1) return;
    stopAutoplay();
    autoplayInterval = setInterval(() => moveSlide(1), AUTOPLAY_DELAY);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}
// ======== FIM autoplay ========

// Formulário
const form = document.getElementById('formContato');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            nomeCompleto: form.nomeCompleto.value,
            email: form.email.value,
            telefone: form.telefone.value,
            mensagem: form.mensagem.value
        };

        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                try {
                    const resposta = JSON.parse(xhr.response);
                    const status = xhr.status;
                    const exito = status >= 200 && status < 300;
                    const mensagem = resposta.message || resposta[Object.keys(resposta)[0]];

                    if (exito) {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: mensagem,
                            icon: 'success',
                            confirmButtonText: 'Continuar',
                        });
                        limparFormulario(form);
                    } else {
                        Swal.fire({
                            title: 'ERRO!',
                            text: mensagem,
                            icon: 'error',
                            confirmButtonText: 'Continuar',
                        });
                    }
                } catch (e) {
                    console.error('Erro ao processar resposta:', e);
                }
            }
        };

        xhr.open("POST", "/contato");
        xhr.setRequestHeader("Content-Type", "application/json");

        try {
            xhr.send(JSON.stringify(data));
        } catch (e) {
            console.error('Erro ao enviar dados:', e);
        }
    });
}

function limparFormulario(form) {
    // Limpa inputs e textareas
    const campos = form.querySelectorAll('input:not([type="submit"]), textarea');
    campos.forEach(campo => {
        campo.value = '';
    });
}

// Função para scroll suave
function scrollParaContato(event) {
    event.preventDefault();
    const secao = document.getElementById('areaFormContato');
    if (secao) {
        secao.scrollIntoView({ behavior: 'smooth' });
    }
}

// Adiciona listeners para botões de contato e inicia autoplay
document.addEventListener('DOMContentLoaded', () => {
    const botoesContato = document.querySelectorAll('a[href="#areaFormContato"]');
    botoesContato.forEach(botao => {
        botao.addEventListener('click', scrollParaContato);
    });

    // inicia autoplay e pausa ao hover
    startAutoplay();
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }
});

const modal = document.getElementById("contactModal");
const helpModal = document.getElementById("helpModal");
const closeBtn = document.getElementById("closeModalBtn");
const closeHelpBtn = document.getElementById("closeHelpModalBtn");

// Seleciona todos os botões/links que devem abrir o modal de ajuda
const openTriggers = document.querySelectorAll(".openModalTrigger");

// Abrir modal de ajuda ao clicar no botão flutuante
openTriggers.forEach(trigger => {
  trigger.addEventListener("click", () => {
    helpModal.style.display = "flex";
  });
});

// Fechar modal de ajuda
closeHelpBtn.addEventListener("click", () => {
  helpModal.style.display = "none";
});

// Fechar modal de formulário
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fechar clicando fora
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
  if (event.target === helpModal) {
    helpModal.style.display = "none";
  }
});

// Funções para as opções de ajuda
function openContactForm() {
  helpModal.style.display = "none";
  modal.style.display = "flex";
}

function openWhatsApp() {
  // Substitua pelo seu número de WhatsApp
  window.open("https://wa.me/5511999999999", "_blank");
  helpModal.style.display = "none";
}

function openPhone() {
  // Substitua pelo seu número de telefone
  window.location.href = "tel:+5511999999999";
  helpModal.style.display = "none";
}

function openEmail() {
  // Substitua pelo seu email
  window.location.href = "mailto:contato@brino.com.br";
  helpModal.style.display = "none";
}

// Função para alternar abas
function switchTab(tabName) {
  // Esconde todos os tabs
  const allTabs = document.querySelectorAll('.help-tab-content');
  allTabs.forEach(tab => tab.classList.remove('active'));
  
  // Remove classe active de todos os botões
  const allBtns = document.querySelectorAll('.help-tab-btn');
  allBtns.forEach(btn => btn.classList.remove('active'));
  
  // Mostra o tab selecionado e marca o botão
  const selectedTab = document.getElementById(tabName + '-tab');
  if (selectedTab) selectedTab.classList.add('active');
  
  // Encontra o botão correspondente e marca como ativo
  const selectedBtn = document.querySelector(`.help-tab-btn[onclick="switchTab('${tabName}')"]`);
  if (selectedBtn) selectedBtn.classList.add('active');
}

// Função para alternar acordeão
function toggleAccordion(header) {
  const item = header.parentElement;
  
  // Se já está aberto, fecha
  if (item.classList.contains('open')) {
    item.classList.remove('open');
    return;
  }
  
  // Fecha todos os outros acordeões
  const allItems = document.querySelectorAll('.accordion-item');
  allItems.forEach(el => el.classList.remove('open'));
  
  // Abre o clicado
  item.classList.add('open');
}

