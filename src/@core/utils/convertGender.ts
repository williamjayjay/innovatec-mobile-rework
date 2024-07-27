export function convertGender(gender:string) {
    if (gender.toLowerCase() === 'male') {
      return 'Homem';
    } else if (gender.toLowerCase() === 'female') {
      return 'Mulher';
    } else {
      return 'Gênero desconhecido'; 
    }
  }