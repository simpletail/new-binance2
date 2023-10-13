/** @type {import('tailwindcss').Config} */

  module.exports = {
     darkMode: 'class',
    purge: {
      enabled: true,
      content: ['./views/*.ejs'],
      options: {
        safelist: [],
      },
    },
    theme: {
     
    },
    variants: [
    
    ],
    content: [
      "./node_modules/flowbite/**/*.js"
  ],
    plugins: [


      
        require('flowbite/plugin'),
    
      
      
    ],
  };
  