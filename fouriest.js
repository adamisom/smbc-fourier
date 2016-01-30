/*
      HOW TO USE (FOR NON-DEVELOPERS):

1. OPEN DEVELOPER TOOLS (SPECIFICALLY THE CONSOLE). I RECOMMEND CHROME.

    ***TIP***: ON A MAC, THIS KEYBOARD SHORTCUT IS COMMAND-OPTION-J

2. COPY AND PASTE ALL OF THIS CODE (YES, ALL) INTO THE OPEN WINDOW, AND HIT ENTER
3. AFTER HITTING ENTER, TYPE THIS:
      fouriest()
4. PUT A POSITIVE INTEGER (NOT TOO BIG!) INSIDE THE PARENTHESES
5. HIT THE ENTER KEY (DON'T HIT IT UNTIL YOU PUT IN THE INTEGER)

BONUS! REPEAT STEPS 3-5 TO TRY WITH MORE NUMBERS!

CAUTION: BROWSER MAY CRASH IF YOUR NUMBER IS RIDICULOUSLY HUGE.

PROTIP: DON'T WORRY ABOUT THE BLUE NUMBER THAT POPS UP EACH TIME YOU DO IT.
THAT'S THE FUNCTION'S RETURN VALUE, BUT YOU WON'T BE USING IT. */


// fouriest() takes in a number (base 10) and returns the base (from 5 to 10)
// in which it has the most fours.
var fouriest = function(n){

  /* iterate through bases 5-10 and convert 'n' to that base
    then count how many fours appear in that base, and push to foursFound */
  var convertedN, differentBases = [];
  var numberOfFours, foursFound = [];
  for (var i=5; i<=10; i++){
    convertedN = convertBase(n,i);
    differentBases.push(convertedN);
    numberOfFours = countTheFours(convertedN);
    foursFound.push(numberOfFours);
  }

  /* now find the base, represented in foursFound (index 0 = base 5, etc)
    note: We don't care if other bases have equal four-i-ness as base 10,
    only if it has more 4's. 'foursInOriginal' and the if-test reflects this. */
  var fouriestBaseIndex = highestNumber(foursFound);
  var highestNumberOfFours = foursFound[fouriestBaseIndex];

  var foursInOriginal = foursFound[5]; //index 5 corresponds to base 10
  if (highestNumberOfFours <= foursInOriginal){
    fouriestBaseIndex = 5;
  }

  var fouriestVersionOfN = differentBases[fouriestBaseIndex];

  /* If there are multiple equally-foury bases we want to know that,
    but fouriestVersionOfN will be the smallest such base, unless base 10 is fouriest.
    But if there are no equally foury bases, fouriestBaseIndex will be the only
    one added, so let's go ahead and remove it in that case to make the array empty*/
  var equallyFouryBases = [];
  for (var j=0; j<foursFound.length; j++){
    if (foursFound[j] === highestNumberOfFours){
      equallyFouryBases.push(j+5);
    }
  }
  if (equallyFouryBases.length === 1){
    equallyFouryBases.splice(0,1);
  }

  /* Now log the info to the console, where the user will see it if they followed instructions.
    Specifically:
    - whether 'n' has any foury bases at all, and if multiple equally foury, all of them
    - what 'n' is when converted in any of the bases 5 to 9 (of course we already have base 10)
  */
  if (highestNumberOfFours === 0){
    console.log("Actually, " + n + " has NO fours in any base from 5 to 10!");
  }
  else {
    if (equallyFouryBases.length){
      var allBases = "It's a tie. These bases are equally foury: ";
      for (var k = 0; k < equallyFouryBases.length-1; k++){
        allBases += equallyFouryBases[k];
        allBases += ", ";
      }
      allBases += equallyFouryBases[k];
      console.log(allBases);
    } else {
      console.log("The fouriest base for " + n + " is base " + (fouriestBaseIndex+5));
      console.log(n + " is " + fouriestVersionOfN + " in that base ");
    }
  }

  console.log("In each base, " + n + " is....");
  for (var i=0; i<differentBases.length-1; i++){
    console.log(differentBases[i] + " in base " + (i+5) + ".");
  }

  // Note: we aren't returning fouriestBaseIndex, but we could if we wanted that info.
  return fouriestVersionOfN;
}



// convert 'n' (base 10) to the target base
function convertBase(n,targetBase){

  /* These two tests ensure that 'n' and 'targetBase' are valid
    If this code were being used for other purposes, this mightn't be good enough;
    we'd probably also want to stop fouriest from completing. */
  if ((targetBase !== parseInt(targetBase,10)) || (targetBase < 5 || targetBase > 10)){
    console.log("Invalid target base passed in (must be integer from 5 to 10)");
  }
  if ((n !== parseInt(n,10)) || n < 0){
    console.log("Invalid number 'n' passed in (must be a positive integer)");
  }

  var resultString = "";
  var reduceToZero = n;
  var temp;

  while (reduceToZero > 0){
    temp = reduceToZero % targetBase;
    resultString = temp + resultString;
    reduceToZero = Math.floor(reduceToZero/targetBase);
  }

  var converted = parseInt(resultString,10);
  return converted;
}



// count the number of 4s that appear in 'n'
function countTheFours(n){
  var fours = 0;
  var numberString = n.toString();

  for (var i=0; i<numberString.length; i++){
    if (numberString.charAt(i)==='4'){
      fours++;
    }
  }

  return fours;
}



// return the index of the highest number in an array,
// provided that it is higher than 0
function highestNumber(arr){
  var highest = 0;
  var index = 0;

  for (var i=0; i<arr.length; i++){
    if(arr[i] > highest){
      highest = arr[i];
      index = i;
    }
  }

  return index;
}
