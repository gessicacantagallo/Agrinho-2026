// Estado da aplicação
const state = {
    timezones: [],
    format24h: true,
    updateInterval: null
};

// Elementos do DOM
const timezoneSelect = document.getElementById('timezone-select');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const format24hCheckbox = document.getElementById('format-24h');
const clocksContainer = document.getElementById('clocks-container');
const emptyState = document.getElementById('empty-state');

// Inicializar com fusos padrão
const DEFAULT_TIMEZONES = ['America/Sao_Paulo', 'Europe/London', 'Asia/Tokyo'];

// Carregar dados do localStorage
function loadFromStorage() {
    const stored = localStorage.getItem('timezones');
    const storedFormat = localStorage.getItem('format24h');
    
    if (stored) {
        state.timezones = JSON.parse(stored);
    } else {
        state.timezones = DEFAULT_TIMEZONES;
    }
    
    if (storedFormat !== null) {
        state.format24h = JSON.parse(storedFormat);
        format24hCheckbox.checked = state.format24h;
    }
}

// Salvar dados no localStorage
function saveToStorage() {
    localStorage.setItem('timezones', JSON.stringify(state.timezones));
    localStorage.setItem('format24h', JSON.stringify(state.format24h));
}

// Obter nome legível do fuso horário
function getTimezoneName(timezone) {
    const parts = timezone.split('/');
    const city = parts[1] || parts[0];
    return city.replace(/_/g, ' ');
}

// Obter offset UTC do fuso
function getTimezoneOffset(timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    const now = new Date();
    const utcTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(now);
    
    const tzTime = formatter.format(now);
    const [tzHour, tzMin] = tzTime.split(':').map(Number);
    const [utcHour, utcMin] = utcTime.split(':').map(Number);
    
    let diff = tzHour - utcHour;
    if (diff > 12) diff -= 24;
    if (diff < -12) diff += 24;
    
    const sign = diff >= 0 ? '+' : '';
    return `UTC${sign}${diff}`;
}

// Formatar hora
function formatTime(date, timezone, format24h) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !format24h
    });
    
    return formatter.format(date);
}

// Obter informações adicionais da data
function getDateInfo(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });
    
    return formatter.format(date);
}

// Criar elemento do relógio
function createClockCard(timezone) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.id = `clock-${timezone}`;
    
    const timezoneName = getTimezoneName(timezone);
    const offset = getTimezoneOffset(timezone);
    
    card.innerHTML = `
        <div class="clock-header">
            <div>
                <div class="timezone-name">${timezoneName}</div>
                <div class="timezone-offset">${offset}</div>
            </div>
            <button class="btn-remove" title="Remover" data-timezone="${timezone}">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="clock-display">
            <div class="time-display" data-time="${timezone}">00:00:00</div>
            <div class="period" data-period="${timezone}"></div>
        </div>
        <div class="clock-info">
            <div class="info-item">
                <div class="info-label">Data</div>
                <div class="info-value" data-date="${timezone}">Jan 1</div>
            </div>
            <div class="info-item">
                <div class="info-label">Dia da Semana</div>
                <div class="info-value" data-weekday="${timezone}">Monday</div>
            </div>
        </div>
    `;
    
    card.querySelector('.btn-remove').addEventListener('click', () => {
        removeTimezone(timezone);
    });
    
    return card;
}

// Adicionar fuso horário
function addTimezone(timezone) {
    if (!timezone || state.timezones.includes(timezone)) {
        alert('Este fuso horário já foi adicionado!');
        return;
    }
    
    state.timezones.push(timezone);
    saveToStorage();
    
    const card = createClockCard(timezone);
    clocksContainer.appendChild(card);
    
    timezoneSelect.value = '';
    updateClocks();
    updateEmptyState();
}

// Remover fuso horário
function removeTimezone(timezone) {
    state.timezones = state.timezones.filter(tz => tz !== timezone);
    saveToStorage();
    
    const card = document.getElementById(`clock-${timezone}`);
    if (card) {
        card.style.animation = 'popOut 0.4s ease-out';
        setTimeout(() => card.remove(), 400);
    }
    
    updateEmptyState();
}

// Resetar para padrão
function resetToDefault() {
    if (confirm('Tem certeza que deseja resetar para os fusos padrão?')) {
        state.timezones = [...DEFAULT_TIMEZONES];
        saveToStorage();
        render();
    }
}

// Atualizar relógios
function updateClocks() {
    const now = new Date();
    
    state.timezones.forEach(timezone => {
        const timeElement = document.querySelector(`[data-time="${timezone}"]`);
        const periodElement = document.querySelector(`[data-period="${timezone}"]`);
        const dateElement = document.querySelector(`[data-date="${timezone}"]`);
        const weekdayElement = document.querySelector(`[data-weekday="${timezone}"]`);
        
        if (timeElement) {
            const time = formatTime(now, timezone, state.format24h);
            timeElement.textContent = time;
            
            // Atualizar período (AM/PM) se formato 12h
            if (!state.format24h) {
                const isPM = time.includes('PM');
                periodElement.textContent = isPM ? 'PM' : 'AM';
            } else {
                periodElement.textContent = '';
            }
        }
        
        if (dateElement) {
            const dateInfo = getDateInfo(now, timezone);
            const dateParts = dateInfo.split(',');
            dateElement.textContent = dateParts.slice(1).join(',').trim();
        }
        
        if (weekdayElement) {
            const dateInfo = getDateInfo(now, timezone);
            const weekday = dateInfo.split(',')[0];
            weekdayElement.textContent = weekday;
        }
    });
}

// Atualizar estado vazio
function updateEmptyState() {
    if (state.timezones.length === 0) {
        clocksContainer.innerHTML = '';
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
}

// Renderizar interface
function render() {
    clocksContainer.innerHTML = '';
    state.timezones.forEach(timezone => {
        const card = createClockCard(timezone);
        clocksContainer.appendChild(card);
    });
    updateClocks();
    updateEmptyState();
}

// Inicializar
function init() {
    loadFromStorage();
    render();
    
    // Iniciar atualização contínua
    state.updateInterval = setInterval(updateClocks, 1000);
    
    // Event listeners
    addBtn.addEventListener('click', () => {
        const timezone = timezoneSelect.value;
        if (timezone) {
            addTimezone(timezone);
        }
    });
    
    resetBtn.addEventListener('click', resetToDefault);
    
    format24hCheckbox.addEventListener('change', (e) => {
        state.format24h = e.target.checked;
        saveToStorage();
        updateClocks();
    });
    
    // Permitir adicionar pelo Enter
    timezoneSelect.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const timezone = timezoneSelect.value;
            if (timezone) {
                addTimezone(timezone);
            }
        }
    });
}

// Adicionar animação popOut ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes popOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Iniciar aplicação quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('✓ Relógio Digital carregado com sucesso!');