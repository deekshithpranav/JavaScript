
//check if a given string is palindrome

function isPalindrome(str){
    return str === reverseString(str);
}

function reverseString(str){
    // let strArray = str.split("");
    // strArray.reverse();
    // let result = strArray.join("");
    
    //the above functions can be combined
    let result = str.split("").reverse().join("");
    return result;
}

console.log(isPalindrome("kayak"));