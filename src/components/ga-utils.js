import ReactGA from 'react-ga';

export const initGA = (id) => {
   // if (process.env.NODE_ENV === "production") {
        console.log("init ga ", id);
      ReactGA.initialize(id);
   // }
  };