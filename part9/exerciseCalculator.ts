interface CalcuValue {
  target: number;
  time: number[]; 
}

const parseArgument = (args: string[]): CalcuValue => {
  if(args.length < 4)
      throw new Error('Not enough arguments');

  const time: number[] = [];

  for(let i = 3; i < args.length; i++){
      if(isNaN(Number(args[2])) && isNaN(Number(args[3]))){
          throw new Error('provided value were not numbers');
      }else{
          time.push(Number(args[i])); 
      }
     
  }

  return {
      target: Number(args[2]),
      time: time
  };
  
};

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


export const calculateExercises = (target:number, days: number[]): Result => {
  const periodLength = days.length;

  const trainingDays = days.filter(n => n !== 0).length;

  const average = (days.reduce((a, b) => a + b, 0))/(days.length);

  const success = average >= target;

  const rates = (average : number, target: number): number => {
      const rate = average/target;
      if(rate >= 1){
          return 3;
      }else if(rate >= 0.9){
          return 2;
      }else{
          return 1;
      }
  };

  const descriptions = (rating: number): string => {
      if(rating === 1){
          return "You need to exercise more";
      }else if (rating === 2){
          return "Not too bad but could be better";
      }else{
          return "You've met your target!";
      }
  };

  const rating = rates(average, target);

  const ratingDescription = descriptions(rating);

  return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
  }; 
};


try{
  const { target, time } = parseArgument(process.argv);
  const result = calculateExercises(target, time);
  console.log(result);

}catch(error: unknown){
  if(error instanceof Error){
    console.log('Error: ' + error.message);
  }
}
