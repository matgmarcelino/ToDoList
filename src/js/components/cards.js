const renderCards = (el, tasks) => {
    // clearing past divs
    el.innerHTML = '';

    // appending and sorting tasks in a temporary array
    const temp = [];
    tasks.forEach((t) => temp.push(createCard(t)));
    temp.sort((a, b) => a.dueDate - b.dueDate);

    // inserting to el
    el.append(...temp);
}

function createCard(task) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = () => {
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
            cardDate.textContent = parseDate(date);

            cardInfoDiv.append(cardTitle, cardDate);
            return cardInfoDiv;
        })();

        const cardPriority = document.createElement('div');
        cardPriority.classList.add('card-priority', task.priority);
        cardPriority.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

        cardHeaderDiv.append(cardInfo, cardPriority);
        return cardHeaderDiv;
    } 
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.textContent = task.description;

    const cardFooter = (() => {
        const cardFooterDiv = document.createElement('div');
        cardFooterDiv.classList.add('card-footer');
        
        const label = document.createElement('label');
        label.classList.add('checkbox');

        const input = document.createElement('input');
        input.type = 'checkbox';
        
        const checkboxBox = document.createElement('span');
        checkboxBox.classList.add('checkbox-box');

        const checkboxLabel = document.createElement('span');
        checkboxLabel.classList.add('checkbox-label');

        label.append(input, checkboxBox, checkboxLabel);
        cardFooterDiv.append(label);
        return cardFooterDiv;
    })();

    card.append(cardHeader, cardBody, cardFooter);
    return card;
}

function parseDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed (0 = January)
    const day = date.getDate();        // Returns the day of the month (1-31)
    return `${month}/${day}/${year}`;
}

export { renderCards };