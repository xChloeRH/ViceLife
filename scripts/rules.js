document.addEventListener('DOMContentLoaded', () => {
    async function loadRules() {
        try {
            const response = await fetch('rules.json');
            if (!response.ok) throw new Error('Netzwerk-Fehler');
            const data = await response.json();

            const container = document.getElementById('rules-container');

            data.rules.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'section-container';

                const sectionTitle = document.createElement('h2');
                sectionTitle.textContent = section.title;
                sectionDiv.appendChild(sectionTitle);

                section.rules.forEach(rule => {
                    const ruleDiv = document.createElement('div');
                    ruleDiv.className = 'content-container';

                    const title = document.createElement('h3');
                    title.textContent = rule.paragraph;
                    ruleDiv.appendChild(title);

                    const description = document.createElement('p');
                    description.innerHTML = rule.description.replace(/\n/g, '<br>');
                    ruleDiv.appendChild(description);

                    const penalties = document.createElement('h4');
                    penalties.classList.add('penalties');

                    const penaltyTexts = [
                        `Jail: ${rule.penalties.jail}`,
                        `Work: ${rule.penalties.work}`,
                        ` ${rule.penalties.ban}`
                    ];

                    penalties.innerHTML = penaltyTexts.join(' | ');
                    ruleDiv.appendChild(penalties);

                    sectionDiv.appendChild(ruleDiv);
                });

                container.appendChild(sectionDiv);
            });
        } catch (error) {
            console.error('Fehler beim Laden der Regeln:', error);
        }
    }

    loadRules();
});
