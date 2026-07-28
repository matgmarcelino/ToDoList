const createSidebar = () => {
    const createSidebarBrand = () => {
        const sidebarBrand = document.createElement('div');
        sidebarBrand.classList.add('sidebar-brand');
        sidebarBrand.textContent = 'Mar';
    
        const sidebarBrandAccent = document.createElement('span');
        sidebarBrandAccent.classList.add('sidebar-brand-accent');
        sidebarBrandAccent.textContent = 'ker';
    
        sidebarBrand.append(sidebarBrandAccent);
        return sidebarBrand;
    }
    
    const createSidebarProjects = () => {
        const div = document.createElement('div');
        div.classList.add('sidebar-projects');
        return div;
    }
    
    const createSidebarNewProjectBtn = () => {
    
        const createPlusIcon = () => {
            const svgNS = 'http://www.w3.org/2000/svg';
          
            const svg = document.createElementNS(svgNS, 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
          
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', 'M6 12H18M12 6V18');
            path.setAttribute('stroke', 'currentColor');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
          
            svg.appendChild(path);
            return svg;
        }
        
        const btn = document.createElement('button');
        btn.classList.add('sidebar-new-project-btn');
    
        const svg = createPlusIcon();
        const p = document.createElement('p');
        p.textContent = 'New Project';
    
        btn.append(svg, p);
        return btn;
    }

    const sidebar = document.createElement('aside');
    sidebar.append(createSidebarBrand(), createSidebarProjects(), createSidebarNewProjectBtn());

    return sidebar;
};

const createProject = (title) => {
    if (document.querySelector(`.project[data-title="${title}"]`)) return;


    const project = document.createElement('div');
    project.classList.add('project');
    project.dataset.title = title;
    
    const btn = document.createElement('button');
    btn.classList.add('project-header');

    const projectHeaderTitle = document.createElement('span');
    projectHeaderTitle.classList.add('project-header-title');
    projectHeaderTitle.textContent = title;

    const chevron = document.createElement('span');
    chevron.classList.add('chevron');
    chevron.textContent = '▸';

    btn.append(projectHeaderTitle, chevron);

    const projectItems = document.createElement('ul');
    projectItems.classList.add('project-items');

    project.append(btn, projectItems);
    const container = document.querySelector('.sidebar-projects');
    if (!container) return;
    container.append(project);
}

const addTaskToProject = (taskTitle, projectTitle) => {
    const project = document.querySelector(`.project[data-title="${projectTitle}"]`);
    if (!project) return;

    const projectItems = project.querySelector('.project-items');

    const task = document.createElement('li');
    task.classList.add('project-item');
    
    const taskSpan = document.createElement('span');
    taskSpan.classList.add('project-item-title');
    taskSpan.textContent = taskTitle;

    const trashIcon = (() => {
        const svgNS = 'http://www.w3.org/2000/svg';
    
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
    
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute(
            'd',
            'M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6'
        );
        path.setAttribute('stroke', '#bc3838');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
    
        svg.appendChild(path);
        return svg;
    })();

    task.append(taskSpan, trashIcon);
    projectItems.append(task);
}

export { createSidebar, createProject, addTaskToProject };
