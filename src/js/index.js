import "../style.css";
import * as ProjectsManager from './api/projectsManager.js';
import * as sidebar from './components/sidebar.js';

export const sharedState = {
    project: null
}
ProjectsManager.createDefaultProject();


