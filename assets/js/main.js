
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('main section:not(.hero) .container > *, main section .grid > .card, .metric, .method-step').forEach(element => {
    element.dataset.reveal = '';
  });

  const reveal = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(el => io.observe(el));
  } else {
    reveal.forEach(el => el.classList.add('is-visible'));
  }

  const hero = document.querySelector('[data-hero-symbol]');
  if (hero && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    window.addEventListener('pointermove', e => {
      const x = (e.clientX / innerWidth - .5) * 10;
      const y = (e.clientY / innerHeight - .5) * 10;
      hero.style.transform = `translate3d(${x}px,${y}px,0) rotateY(${x * .4}deg) rotateX(${-y * .4}deg)`;
    }, { passive: true });
  }

  const method = document.querySelector('[data-method]');
  const progress = document.querySelector('[data-method-progress]');
  if (method && progress) {
    const steps = [...method.querySelectorAll('.method-step')];
    const updateMethod = () => {
      const rect = method.getBoundingClientRect();
      const viewport = innerHeight;
      const raw = (viewport * .75 - rect.top) / Math.max(rect.height, 1);
      const p = Math.min(1, Math.max(0, raw));
      progress.style.width = `${p * 84}%`;
      steps.forEach((step, i) => step.classList.toggle('is-active', p >= i / Math.max(steps.length - 1,1) - .03));
    };
    updateMethod();
    window.addEventListener('scroll', updateMethod, { passive: true });
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        status.dataset.state = 'error';
        status.textContent = 'Preencha os campos obrigatórios antes de continuar.';
        return;
      }

      const data = new FormData(form);
      const subject = encodeURIComponent(`Contato pelo site | ${data.get('empresa') || data.get('nome') || 'Safira Secure'}`);
      const body = encodeURIComponent(
`Nome: ${data.get('nome') || ''}
Empresa: ${data.get('empresa') || ''}
E-mail: ${data.get('email') || ''}
Tema: ${data.get('tema') || ''}

Mensagem:
${data.get('mensagem') || ''}`
      );

      status.dataset.state = 'success';
      status.textContent = 'Abrindo seu e-mail para envio...';
      window.location.href = `mailto:contato@safirasecure.com.br?subject=${subject}&body=${body}`;
    });
  }

  const chatWidget = document.querySelector('.chatbot-widget');
  const chatToggle = document.querySelector('.chatbot-toggle');
  const chatPanel = document.querySelector('.chatbot-panel');
  const chatClose = document.querySelector('.chatbot-close');
  const chatInput = document.querySelector('.chatbot-input');
  const chatSend = document.querySelector('.chatbot-send');
  const chatMessages = document.querySelector('.chatbot-messages');
  const chatSuggestions = document.querySelectorAll('[data-chat-faq]');
  const chatFaqAnswers = {
    services: 'A Safira apoia empresas em governança e riscos, defesa cibernética, segurança OT/ICS e capacitação, alinhando proteção às prioridades do negócio.',
    ot: 'A atuação em Cyber OT/ICS considera riscos cibernéticos, disponibilidade e continuidade da operação industrial. O trabalho começa entendendo o contexto do ambiente.',
    risk: 'A priorização combina criticidade técnica, impacto no negócio e contexto operacional para orientar as ações mais importantes primeiro.',
    proposal: 'Para receber uma proposta, conte um pouco sobre o desafio, o escopo e o prazo desejado. A equipe avalia o contexto antes de recomendar uma abordagem.',
    contact: 'Você pode falar com a equipe pelo e-mail contato@safirasecure.com.br ou pela página de contato.'
  };

  if (chatWidget && chatToggle && chatPanel && chatInput && chatSend && chatMessages) {
    const openChat = () => {
      chatWidget.classList.add('is-open');
      chatPanel.hidden = false;
      chatToggle.setAttribute('aria-expanded', 'true');
      setTimeout(() => chatInput.focus(), 120);
    };

    const closeChat = () => {
      chatWidget.classList.remove('is-open');
      chatPanel.hidden = true;
      chatToggle.setAttribute('aria-expanded', 'false');
    };

    const addMessage = (type, text) => {
      const bubble = document.createElement('div');
      bubble.className = `message ${type}`;
      bubble.textContent = text;
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const getBotReply = (message) => {
      const normalized = message.toLowerCase();

      if (normalized.includes('orçamento') || normalized.includes('preco') || normalized.includes('valor') || normalized.includes('cotacao')) {
        return 'Podemos avaliar o seu cenário e montar uma proposta com foco no risco, na operação e na maturidade da sua organização.';
      }

      if (normalized.includes('ot') || normalized.includes('industrial') || normalized.includes('ics')) {
        return 'A Safira atua com segurança operacional e Cyber OT, ajudando a proteger ambientes industriais sem comprometer continuidade.';
      }

      if (normalized.includes('governanca') || normalized.includes('risco') || normalized.includes('grc')) {
        return 'A melhor forma de começar é mapear riscos, papéis e controles para priorizar ações com impacto real no negócio.';
      }

      if (normalized.includes('contato') || normalized.includes('falar') || normalized.includes('agendar')) {
        return 'Posso te encaminhar para uma conversa com a equipe da Safira. Você pode enviar e-mail para contato@safirasecure.com.br.';
      }

      return 'Entendi. A Safira pode ajudar com governança, defesa cibernética, risco e soluções para ambientes OT/ICS. Fale mais sobre sua necessidade.';
    };

    chatToggle.addEventListener('click', () => {
      if (chatWidget.classList.contains('is-open')) {
        closeChat();
        return;
      }

      openChat();
    });

    chatClose.addEventListener('click', closeChat);

    chatSend.addEventListener('click', () => {
      const value = chatInput.value.trim();
      if (!value) return;

      addMessage('user', value);
      chatInput.value = '';
      chatSuggestions.forEach(suggestion => { suggestion.hidden = true; });

      window.setTimeout(() => {
        addMessage('bot', getBotReply(value));
      }, 420);
    });

    chatSuggestions.forEach(suggestion => {
      suggestion.addEventListener('click', () => {
        const question = suggestion.textContent.trim();
        const answer = chatFaqAnswers[suggestion.dataset.chatFaq];
        if (!answer) return;

        addMessage('user', question);
        window.setTimeout(() => addMessage('bot', answer), 250);
      });
    });

    chatInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        chatSend.click();
      }
    });

    document.addEventListener('click', event => {
      if (!chatWidget.contains(event.target)) {
        closeChat();
      }
    });

    chatPanel.hidden = true;
  }
})();
