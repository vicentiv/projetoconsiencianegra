(function () {

  const questions = [
    {
      question: "Qual é o objetivo principal de se promover a diversidade e inclusão nas empresas?",
      options: [
        "Reduzir custos operacionais",
        "Aumenta o número de funcionários",
        "Construir ambientes mais justos e produtivos"
      ],
      correct: 2
    },
    {
      question: 'O que significa "Diversidade" no contexto organizacional?',
      options: [
        "Reunir pessoas com diferentes origens, gêneros, raças, idades e culturas",
        "ter um escritório em vários países",
        "Oferecer diversos benefícios"
      ],
      correct: 0
    },
    {
      question: 'E o que significa "Inclusão"?',
      options: [
        "Ter uma política de demissão justa",
        "Garantir que todos sejam respeitados e tenham oportunidades iguais",
        "Contratar pessoas de outros países"
      ],
      correct: 1
    },
    {
      question: '"Diversidade" e "Inclusão" significam exatamente a mesma coisa.',
      options: ["Verdadeiro", "Falso"],
      correct: 1
    },
    {
      question: "Qual é uma vantagem direta para uma empresa que pratica a diversidade e inclusão?",
      options: [
        "Ganho em criatividade, inovação e engajamento",
        "Menos necessidade de gerentes",
        "Eliminação completa de conflitos"
      ],
      correct: 0
    },
    {
      question: "Além do ambiente interno, o que melhora para a empresa quando ela valoriza a diversidade?",
      options: [
        "A localização do seu escritório",
        "O preço das suas ações",
        "A sua imagem no mercado"
      ],
      correct: 2
    },
    {
      question: "Qual das alternativas é um passo importante para um local de trabalho mais acolhedor?",
      options: [
        "Promover treinamentos e políticas igualitárias",
        "Comprar móveis novos e modernos",
        "Exigir que todos vistam a mesma cor"
      ],
      correct: 0
    },
    {
      question: "Além de treinamentos e políticas, o que mais é crucial para tornar o local de trabalho mais acessível?",
      options: ["Uniformidade", "Competitividade", "Acessibilidade"],
      correct: 2
    },
    {
      question: '"Diversidade é ser convidado para a festa. Inclusão é..."',
      options: ['"...saber o que vai ser servido."', '"...ser convidado para dançar."', '"...conhecer todos os convidados."'],
      correct: 1
    },
    {
      question: "Um ambiente de trabalho que pratica a diversidade e a inclusão se torna:",
      options: [
        "Mais acolhedor e equilibrado",
        "Mais caro e complexo",
        "Mais focado em resultados imediatos"
      ],
      correct: 0
    }
  ];

  let currentIndex = 0;
  let score = 0;
  const container = document.getElementById("quiz-container");
  const resultBox = document.getElementById("quiz-result");
  const scoreText = document.getElementById("quiz-score");
  const restartBtn = document.getElementById("quiz-restart");

  // cria um card de pergunta
  function createCard(qObj, idx) {
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.dataset.index = idx;

    // opcional: imagem topo (uso da tua imagem padrão)
    const img = document.createElement("img");
    img.src = "imgs/carr1.png";
    img.alt = "Imagem do quiz";
    img.className = "card-img";
    card.appendChild(img);

    
    const title = document.createElement("div");
    title.className = "question-title";
    title.textContent = `${idx + 1}. ${qObj.question}`;
    card.appendChild(title);

    
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "quiz-options";
    qObj.options.forEach((opt, i) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="q${idx}" value="${i}" />
        <span>${opt}</span>
      `;
      optionsDiv.appendChild(label);
    });
    card.appendChild(optionsDiv);

    // ações
    const actions = document.createElement("div");
    actions.className = "quiz-actions";

    const btnEnviar = document.createElement("button");
    btnEnviar.className = "btn btn-primary";
    btnEnviar.textContent = "Enviar";
    btnEnviar.addEventListener("click", () => handleSend(idx, card));
    actions.appendChild(btnEnviar);

    const btnPular = document.createElement("button");
    btnPular.className = "btn btn-outline-secondary";
    btnPular.textContent = "Pular";
    btnPular.addEventListener("click", () => goNext());
    actions.appendChild(btnPular);

    card.appendChild(actions);

    return card;
  }

  // renderiza todos os cards, mas mostra só o atual
  function renderQuiz() {
    container.innerHTML = "";
    questions.forEach((q, i) => {
      const card = createCard(q, i);
      if (i !== currentIndex) card.style.display = "none";
      container.appendChild(card);
    });
  }

  // avançar para o próximo card
  function goNext() {
    const cards = container.querySelectorAll(".quiz-card");
    if (currentIndex < cards.length - 1) {
      cards[currentIndex].style.display = "none";
      currentIndex++;
      cards[currentIndex].style.display = "";
    } else {
      // fim do quiz
      showResult();
    }
  }

  // ação do botão Enviar
  function handleSend(idx, cardEl) {
    const radios = cardEl.querySelectorAll(`input[name="q${idx}"]`);
    let selected = null;
    radios.forEach(r => { if (r.checked) selected = Number(r.value); });

    if (selected === null) {
      alert("Por favor, escolha uma opção antes de enviar.");
      return;
    }

    // desabilita opções para evitar mudar
    radios.forEach(r => r.disabled = true);

    const isCorrect = (selected === questions[idx].correct);
    // feedback visual
    const labels = cardEl.querySelectorAll(".quiz-options label");
    labels.forEach((lab, i) => {
      const input = lab.querySelector("input");
      if (i === questions[idx].correct) {
        lab.style.borderColor = "rgba(255,204,0,0.6)";
        lab.style.boxShadow = "0 6px 18px rgba(255,204,0,0.08)";
      }
      if (input.checked && !isCorrect) {
        lab.style.borderColor = "rgba(220,80,80,0.8)";
      }
    });

    if (isCorrect) score++;
    // pequena pausa pra ver o feedback, depois avança automaticamente
    setTimeout(() => {
      goNext();
    }, 700);
  }

  // mostra o resultado final
  function showResult() {
    container.style.display = "none";
    resultBox.classList.remove("d-none");
    scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
  }

  // reiniciar quiz
  function restartQuiz() {
    currentIndex = 0;
    score = 0;
    resultBox.classList.add("d-none");
    container.style.display = "";
    renderQuiz();
    window.scrollTo({ top: document.getElementById("quiz").offsetTop - 20, behavior: "smooth" });
  }

  // inicialização
  renderQuiz();
  restartBtn && restartBtn.addEventListener("click", restartQuiz);

})();
