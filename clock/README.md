# 🕐 Relógio Digital com Múltiplos Fusos Horários

Aplicação interativa que exibe a hora atual em diferentes fusos horários do mundo, com armazenamento local de preferências.

## ✨ Características

✅ **Relógios em Tempo Real** - Atualiza a cada segundo  
✅ **Múltiplos Fusos Horários** - Suporta 20+ fusos ao redor do mundo  
✅ **Local Storage** - Salva fusos selecionados automaticamente  
✅ **Formato Flexível** - Alterna entre formato 12h e 24h  
✅ **Design Responsivo** - Funciona em desktop, tablet e mobile  
✅ **Interface Moderna** - Animações suaves e visuais atraentes  
✅ **Informações Completas** - Data, dia da semana e offset UTC  

## 🚀 Como Usar

1. Abra o arquivo `index.html` no navegador
2. Selecione um fuso horário no menu
3. Clique em "Adicionar" para incluir na lista
4. Customize o formato (12h ou 24h) com o checkbox
5. Remova fusos clicando no botão (X) do card

## 📍 Fusos Horários Disponíveis

### América do Norte
- New York (EST/EDT)
- Los Angeles (PST/PDT)
- Chicago (CST/CDT)
- Denver (MST/MDT)
- Anchorage (AKST/AKDT)
- Honolulu (HST)
- Cidade do México

### Europa
- Londres (GMT/BST)
- Paris (CET/CEST)
- Berlim (CET/CEST)
- Moscou (MSK)

### Ásia
- Dubai (GST)
- Bangcoque (ICT)
- Hong Kong (HKT)
- Xangai (CST)
- Tóquio (JST)
- Seul (KST)

### Oceania
- Sydney (AEDT/AEST)
- Auckland (NZDT/NZST)

### América do Sul
- São Paulo (BRT/BRST)
- Buenos Aires (ART)

### Universal
- UTC (Tempo Universal Coordenado)

## 💾 Local Storage

A aplicação salva automaticamente:
- Fusos horários selecionados
- Preferência de formato (12h/24h)

Os dados persistem mesmo após fechar e reabrir o navegador.

## 🎨 Recursos Visuais

### Cards de Relógio
- Nome do fuso horário
- Offset UTC em tempo real
- Hora digital com segundos
- Data e dia da semana
- Botão para remover

### Controles
- Seletor de fusos horários
- Botão para adicionar
- Botão para resetar
- Toggle de formato horário

## 📱 Responsividade

**Desktop**: Grid automático de 3+ colunas  
**Tablet**: Grid de 2 colunas  
**Mobile**: Layout em coluna única  

## 🎯 Funcionalidades Técnicas

### JavaScript
- Intl.DateTimeFormat para formatação de data/hora
- LocalStorage API para persistência
- Interval Timer para atualização em tempo real
- Manipulação dinâmica do DOM

### CSS
- Grid Layout responsivo
- Gradientes modernos
- Animações suaves
- Media queries para mobile

### HTML
- Estrutura semântica
- Acessibilidade
- Meta tags de viewport

## 🔧 Estrutura de Arquivos

```
clock/
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos CSS
├── js/
│   └── script.js      # Lógica JavaScript
└── README.md          # Esta documentação
```

## 💡 Sugestões de Uso

- **Teleconferências**: Coordene horários globais
- **Trading**: Acompanhe mercados em diferentes fusos
- **Gestão de Equipes**: Veja hora de trabalho remoto
- **Planejamento**: Organize eventos internacionais
- **Aprendizado**: Explore fusos ao redor do mundo

## 🎓 Recursos de Aprendizado

Esta aplicação demonstra:
- Manipulação de Data/Hora em JavaScript
- Local Storage para persistência
- Responsividade mobile-first
- Animações CSS
- Event listeners e DOM manipulation

## 📝 Melhorias Futuras

- [ ] Suporte a mais fusos horários
- [ ] Previsão de fuso horário por cidade
- [ ] Conversor de hora entre fusos
- [ ] Temas escuro/claro
- [ ] Alarmes multi-fuso
- [ ] Exportar configuração
- [ ] Modo full-screen para cada relógio

## 📄 Licença

Projeto educacional - uso livre

---

**Desenvolvido com ❤️ para organizações globais** 🌍⏰
