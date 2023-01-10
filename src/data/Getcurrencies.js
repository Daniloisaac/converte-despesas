const getCurrencies = async () => {
  const fetchResult = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await fetchResult.json();
  return result;
};

export default getCurrencies;
