const createMain = (tasks) => {
    const main = document.createElement('main');

    if (tasks.length === 0) {
        main.classList.add('empty');

        const p = document.createElement('p');
        p.textContent = 'No tasks created yet...';

        main.append(p);
    }

    tasks.forEach((task) => main.append(createCard(task)));
    return main;
}

const createCard = (task) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = (() => {
        const cardHeaderDiv = document.createElement('div');
        cardHeaderDiv.classList.add('card-header');

        const cardInfo = (() => {
            const cardInfoDiv = document.createElement('div');
            cardInfoDiv.classList.add('card-info');

            const cardTitle = document.createElement('div');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = task.title;

            const cardDate = document.createElement('div');
            cardDate.classList.add('card-date');
            const [year, month, day] = task.dueDate.split('-');
            cardDate.textContent = `${month}/${day}/${year}`;

            cardInfoDiv.append(cardTitle, cardDate);
            return cardInfoDiv;
        })();

        const cardPriority = document.createElement('div');
        const prio = task.priority;
        cardPriority.classList.add('card-priority', prio);
        cardPriority.textContent = prio.charAt(0).toUpperCase() + prio.slice(1);

        cardHeaderDiv.append(cardInfo, cardPriority);
        return cardHeaderDiv;
    })();

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.textContent = task.description;

    const cardFooter = (() => {
        const cardFooterDiv = document.createElement('div');
        cardFooterDiv.classList.add('card-footer');

        const label = document.createElement('label');
        label.classList.add('task-status');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('custom-checkbox');

        const span = document.createElement('span');

        if (task.isComplete) {
            input.checked = true;
            span.textContent = 'Done';
        } else {
            input.checked = false;
            span.textContent = 'In Progress';
        }

        label.append(input, span);
        cardFooterDiv.append(label);
        return cardFooterDiv;
    })();

    card.append(cardHeader, cardBody, cardFooter);
    return card;
}

export { createMain };