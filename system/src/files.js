import CV from './assets/CV.png';

export const files = [
  {
    id: 1,
    name: 'About me',
    type: 'folder',
    content: [{ type: 'text', text: 'text_inside' }],
    defaultPosition: { top: 50, left: 5 },
  },
  {
    id: 2,
    name: 'Curriculum Vitae',
    type: 'pdf',
    content: CV,
    defaultPosition: { top: 150, left: 5 },
  },
];
