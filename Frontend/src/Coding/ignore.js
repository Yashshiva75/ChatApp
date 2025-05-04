

function pal(num){
    let org = num
    let rev = 0;
    while(num > 0){
        let last = num % 10;
        rev = rev * 10 + last;
        num = Math.floor(num/10)
    }
    return org === rev
}

console.log(pal(121))

string palindrome
function pal(str){
    let start = 0
    let end = str.length
    for(let i=0;i<str.length/2;i++){
        if(str[start] !== str[end]){
            return false
        }
}
      return true
}

console.log(pal('ana'))



highest in array

function highest(arr){
    let highest = -Infinity
    for(let i=0;i<arr.length;i++){
        if(arr[i] > highest){
            highest = arr[i]
        }
    }
    return highest
}
let arr = [55,3,9,10]
console.log(highest(arr))

second highest

let arr = [100,3,5]
function secondHighest(arr){
    let highest = -Infinity
    let secondHighest = -Infinity
    for(let i=0;i<arr.length;i++){
        if(highest < arr[i]){
            secondHighest = highest
            highest = arr[i]
        }else if(arr[i] < highest && arr[i] > secondHighest){
            secondHighest = arr[i]
        }
    }
    return secondHighest
}

console.log(secondHighest(arr))

Duplicate in array
function duplicate(arr){
    let obj ={}
    for(let i=0;i<arr.length;i++){
        let val = arr[i]
        obj[val] = (obj[val] || 0) + 1
        
    }
    for(let key in obj){
        if(obj[key] > 1){
            console.log(key,'comes',obj[key],'times')
        }
    }
}
let arr = ['a','b','c','c']
duplicate(arr)

//Pattern

function pattern(num){
    let count = 1
    for(let i=1;i<num;i++){
    let row = ''
        for(let j=1;j<i;j++){
            row += count
            count++
        }
        console.log(row)
    }
}
pattern(5)

function diamond(num){
    for(let i=0;i<num;i++){
        let space = ""
        let star = ""
        for(let j=0;j<num-i;j++){
            space+=" "
        }
        for(let k=0;k<2 * i -1;k++){
            star+="*"
        }
        console.log(space+star)
    }
    for(let i=num-1;i>0;i--){
        let space = ""
        let star = ""
        for(let j=0;j<num-i;j++){
            space+=" "
        }
        for(let k=0;k<2 * i -1;k++){
            star+="*"
        }
        console.log(space+star)
    }
}
diamond(5)

function hollowSquare(num){
    for(let i=1;i<=num;i++){
        let row = ''
        for(let j=1;j<=num;j++){
            if(i===1 || i===num || j===1 || j === num){
                row += "*"
            }else{
                row += " "
            }
        }
        console.log(row)
    }
}
hollowSquare(5)














