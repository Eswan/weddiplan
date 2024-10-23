export interface Person {
  firstName: string;
  name: string;
  birthdate: string;
  gender: string;
}

export interface Configuration {
  married: {
    her: Person;
    him: Person;
  };
  icons: string[];
  marriageDate: string;
}

const configuration: Configuration = {
  marriageDate: '2025-08-14',
  married: {
    her: {
      firstName: 'Ana',
      name: 'MIGUEL',
      birthdate: '1993-09-24',
      gender: 'FEMALE'
    },
    him: {
      firstName: 'Yoann',
      name: 'MOZZI',
      birthdate: '1994-09-21',
      gender: 'MALE'
    }
  },
  icons: [
    'heart', 'fast-food-outline', 'car-sport-outline', 'people', 'rose-outline', 'woman-outline'
  ]
};

export default configuration;
