import CV from './assets/CV.png';

export const files = [
  {
    id: 1,
    name: 'Apps',
    type: 'folder',
    content: [
      {
        type: 'anagram',
        name: 'Anagram Checker',
      },
      {
        id: 'text',
        name: 'Text Editor',
        type: 'text',
        content: 'Some placeholder text for now',
        defaultPosition: { top: 260, left: 5 },
      },
    ],
    defaultPosition: { top: 50, left: 5 },
  },
  {
    id: 2,
    name: 'Curriculum Vitae',
    type: 'pdf',
    content: CV,
    defaultPosition: { top: 150, left: 5 },
  },

  {
    id: 'safari',
    name: 'Projects',
    type: 'safari',
    defaultPosition: { top: 50, left: 90 },
  },
];
