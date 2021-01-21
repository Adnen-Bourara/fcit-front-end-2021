import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'formations/séminaires',
    icon: 'home-outline',
    children:
    [
      {
      title: 'Gestion des formations',
      icon: 'keypad-outline',
      link: '/pages/formation',
      },
      {
        title: 'Gestion des demandeurs',
        icon: 'keypad-outline',
        link: '/pages/demandeur',
      },
      {
        title: 'Gestion des clients',
        icon: 'keypad-outline',
        link: '/pages/client',
      },
      {
        title: 'Gestion des demandes',
        icon: 'keypad-outline',
        link: '/pages/demande',
      },
      {
        title: 'Gestion des sessions',
        icon: 'keypad-outline',
        link: '/pages/session',
      },
      {
      title:'paramétrage',
      icon:'settings-2-outline',
      link:'/pages/formation/settings',
      },
     
   
    ]
  }, 
  {
    title:'Formateur/Validation',
    icon: 'home-outline',
    children:
    [
      {
        title: 'Gestion des formateurs',
        icon: 'keypad-outline',
        link: '/pages/formateur',
      },
      {
        title: 'Gestion des validations',
        icon: 'keypad-outline',
        link: '/pages/validation',
      },
      {
        title:'paramétrage',
        link:'/pages/formateur/settings',
        icon:'settings-2-outline',
        
        },
    ]
  },
 



  {
    title: 'Actualité',
    icon: 'home-outline',
    link: '/pages/actualite',
  },

  {
    title:'Contact',
    icon:'',
    link:'/pages/contact',
  }
 
];
